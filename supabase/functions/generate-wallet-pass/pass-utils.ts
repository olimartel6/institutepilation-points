import forge from "npm:node-forge@1.3.1";
import JSZip from "npm:jszip@3.10.1";

// --- Color helper ---

export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// --- Tier logic ---

export interface TierInfo {
  name: string;
  emoji: string;
}

export function getTier(totalPoints: number): TierInfo {
  if (totalPoints >= 5000) return { name: "Platine", emoji: "💎" };
  if (totalPoints >= 2000) return { name: "Or", emoji: "🥇" };
  if (totalPoints >= 500) return { name: "Argent", emoji: "🥈" };
  return { name: "Bronze", emoji: "🥉" };
}

// --- Pass JSON builder ---

export interface PassParams {
  clientId: string;
  clientName: string;
  businessName: string;
  points: number;
  tier: TierInfo;
  themeColor: string;
  passTypeIdentifier: string;
  teamIdentifier: string;
}

export function buildPassJson(params: PassParams): Record<string, unknown> {
  const {
    clientId,
    clientName,
    businessName,
    points,
    tier,
    themeColor,
    passTypeIdentifier,
    teamIdentifier,
  } = params;

  const serial = `loyalty-${clientId}-${Date.now()}`;

  return {
    formatVersion: 1,
    passTypeIdentifier,
    teamIdentifier,
    organizationName: businessName,
    description: `Carte fidélité ${businessName}`,
    serialNumber: serial,
    backgroundColor: hexToRgb(themeColor || "#1a1a2e"),
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(200, 200, 200)",
    logoText: businessName,
    storeCard: {
      headerFields: [
        {
          key: "points",
          label: "POINTS",
          value: points || 0,
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      primaryFields: [
        { key: "name", label: "MEMBRE", value: clientName || "Client" },
      ],
      secondaryFields: [
        {
          key: "tier",
          label: "NIVEAU",
          value: `${tier.emoji} ${tier.name}`,
        },
        {
          key: "status",
          label: "STATUT",
          value: "Actif",
          textAlignment: "PKTextAlignmentRight",
        },
      ],
      auxiliaryFields: [
        { key: "business", label: "COMMERCE", value: businessName },
      ],
      backFields: [
        {
          key: "program",
          label: "Programme de fidélité",
          value: `Accumulez des points à chaque visite chez ${businessName} et échangez-les contre des récompenses exclusives!\n\n🥉 Bronze: x1 points\n🥈 Argent (500+ pts): x1.5 points\n🥇 Or (2000+ pts): x2 points\n💎 Platine (5000+ pts): x3 points`,
        },
        {
          key: "contact",
          label: "Contact",
          value: "Propulsé par LogicSupplies\ninfo@logicsupplies.com",
        },
      ],
    },
    barcode: {
      format: "PKBarcodeFormatQR",
      message: clientId,
      messageEncoding: "iso-8859-1",
      altText: `ID: ${clientId.substring(0, 8)}`,
    },
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        message: clientId,
        messageEncoding: "iso-8859-1",
        altText: `ID: ${clientId.substring(0, 8)}`,
      },
    ],
  };
}

// --- 1x1 transparent PNG placeholder ---

export function placeholderPng(): Uint8Array {
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

// --- PKCS#7 signing with node-forge (replaces openssl smime) ---

export function signManifest(
  manifestJson: string,
  certPem: string,
  keyPem: string,
  wwdrPem: string,
): Uint8Array {
  const cert = forge.pki.certificateFromPem(certPem);
  const key = forge.pki.privateKeyFromPem(keyPem);
  const wwdr = forge.pki.certificateFromPem(wwdrPem);

  const p7 = forge.pkcs7.createSignedData();
  p7.content = forge.util.createBuffer(manifestJson, "utf8");
  p7.addCertificate(cert);
  p7.addCertificate(wwdr);
  p7.addSigner({
    key,
    certificate: cert,
    digestAlgorithm: forge.pki.oids.sha256,
    authenticatedAttributes: [
      { type: forge.pki.oids.contentType, value: forge.pki.oids.data },
      {
        type: forge.pki.oids.messageDigest,
        // value will be auto-calculated
      },
      { type: forge.pki.oids.signingTime, value: new Date() },
    ],
  });
  p7.sign({ detached: true });

  const asn1 = p7.toAsn1();
  const der = forge.asn1.toDer(asn1);
  const bytes = new Uint8Array(der.length());
  for (let i = 0; i < der.length(); i++) {
    bytes[i] = der.at(i);
  }
  return bytes;
}

// --- Build manifest, sign, and zip into .pkpass ---

export async function packagePass(
  files: Record<string, Uint8Array>,
  certPem: string,
  keyPem: string,
  wwdrPem: string,
): Promise<Uint8Array> {
  // Build manifest.json with SHA1 hash of each file
  const manifest: Record<string, string> = {};
  for (const [name, data] of Object.entries(files)) {
    const md = forge.md.sha1.create();
    md.update(forge.util.binary.raw.encode(data));
    manifest[name] = md.digest().toHex();
  }
  const manifestJson = JSON.stringify(manifest);
  const manifestBytes = new TextEncoder().encode(manifestJson);

  // Sign the manifest
  const signature = signManifest(manifestJson, certPem, keyPem, wwdrPem);

  // Zip everything
  const zip = new JSZip();
  for (const [name, data] of Object.entries(files)) {
    zip.file(name, data);
  }
  zip.file("manifest.json", manifestBytes);
  zip.file("signature", signature);

  const pkpass = await zip.generateAsync({ type: "uint8array" });
  return pkpass;
}
