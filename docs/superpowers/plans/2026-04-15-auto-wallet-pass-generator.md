# Auto Wallet Pass Generator — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Automatically generate Apple Wallet passes when loyalty clients sign up, with "Add to Wallet" buttons in the web app and iOS Expo app.

**Architecture:** A Supabase Edge Function replaces the local Node.js script for pass generation. A database webhook triggers it on new client insertions. The iOS app gets a native wallet button using `react-native-passkit-wallet`.

**Tech Stack:** Supabase Edge Functions (Deno), node-forge (signing), JSZip, react-native-passkit-wallet (iOS)

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `supabase/functions/generate-wallet-pass/index.ts` | Create | Edge Function: fetch client/business, build pass.json, sign, zip, upload to Storage |
| `supabase/functions/generate-wallet-pass/pass-utils.ts` | Create | Helper: image resizing, manifest hashing, PKCS#7 signing with node-forge |
| `src/pages/MyQR.jsx` | Modify | Add fallback: if pass 404, trigger on-demand generation |
| `src/services/supabase.js` | Modify | Simplify `generateWalletPass()` to only send `client_id` |
| `/Users/oli/Desktop/LogicSupplies/src/screens/MyQRScreen.tsx` | Modify | Add "Add to Apple Wallet" button |
| `/Users/oli/Desktop/LogicSupplies/src/services/supabase.ts` | Modify | Add `generateWalletPass()` function |
| `/Users/oli/Desktop/LogicSupplies/package.json` | Modify | Add `react-native-passkit-wallet` dependency |

---

### Task 1: Initialize Supabase project structure

**Files:**
- Create: `supabase/config.toml`
- Create: `supabase/functions/generate-wallet-pass/index.ts` (skeleton)

- [ ] **Step 1: Initialize Supabase CLI in the project**

```bash
cd /Users/oli/institutepilation-points
npx supabase init
```

This creates `supabase/config.toml` and the `supabase/` directory structure.

- [ ] **Step 2: Create the Edge Function scaffold**

```bash
cd /Users/oli/institutepilation-points
npx supabase functions new generate-wallet-pass
```

This creates `supabase/functions/generate-wallet-pass/index.ts` with a boilerplate handler.

- [ ] **Step 3: Commit**

```bash
cd /Users/oli/institutepilation-points
git add supabase/
git commit -m "feat: initialize Supabase project + generate-wallet-pass function scaffold"
```

---

### Task 2: Build pass-utils.ts — signing and packaging helpers

**Files:**
- Create: `supabase/functions/generate-wallet-pass/pass-utils.ts`

- [ ] **Step 1: Create pass-utils.ts with all helper functions**

```typescript
// supabase/functions/generate-wallet-pass/pass-utils.ts
import * as forge from "npm:node-forge@1.3.1";
import JSZip from "npm:jszip@3.10.1";

/**
 * Convert hex color to Apple pass RGB string
 */
export function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculate loyalty tier from total points earned
 */
export function getTier(totalPoints: number): { name: string; emoji: string } {
  if (totalPoints >= 5000) return { name: "Platine", emoji: "💎" };
  if (totalPoints >= 2000) return { name: "Or", emoji: "🥇" };
  if (totalPoints >= 500) return { name: "Argent", emoji: "🥈" };
  return { name: "Bronze", emoji: "🥉" };
}

/**
 * Build the pass.json object for an Apple Wallet storeCard
 */
export function buildPassJson(params: {
  clientId: string;
  clientName: string;
  businessName: string;
  points: number;
  tier: { name: string; emoji: string };
  color: string;
  serial: string;
  passTypeId: string;
  teamId: string;
}): Record<string, unknown> {
  const { clientId, clientName, businessName, points, tier, color, serial, passTypeId, teamId } = params;
  return {
    formatVersion: 1,
    passTypeIdentifier: passTypeId,
    teamIdentifier: teamId,
    organizationName: businessName,
    description: `Carte fidélité ${businessName}`,
    serialNumber: serial,
    backgroundColor: hexToRgb(color),
    foregroundColor: "rgb(255, 255, 255)",
    labelColor: "rgb(200, 200, 200)",
    logoText: businessName,
    storeCard: {
      headerFields: [
        { key: "points", label: "POINTS", value: points, textAlignment: "PKTextAlignmentRight" },
      ],
      primaryFields: [
        { key: "name", label: "MEMBRE", value: clientName },
      ],
      secondaryFields: [
        { key: "tier", label: "NIVEAU", value: `${tier.emoji} ${tier.name}` },
        { key: "status", label: "STATUT", value: "Actif", textAlignment: "PKTextAlignmentRight" },
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

/**
 * Create a 1x1 transparent PNG placeholder (used when no logo available)
 */
export function placeholderPng(): Uint8Array {
  return Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="), (c) => c.charCodeAt(0));
}

/**
 * SHA1 hash of data, returned as hex string
 */
function sha1Hex(data: Uint8Array): string {
  const md = forge.md.sha1.create();
  md.update(forge.util.binary.raw.encode(data));
  return md.digest().toHex();
}

/**
 * Sign the manifest with Apple certificates using PKCS#7 (node-forge, pure JS)
 */
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
      { type: forge.pki.oids.messageDigest },
      { type: forge.pki.oids.signingTime, value: new Date() },
    ],
  });
  p7.sign({ detached: true });

  const asn1 = p7.toAsn1();
  const der = forge.asn1.toDer(asn1);
  return new Uint8Array(forge.util.binary.raw.decode(der.getBytes()));
}

/**
 * Package all pass files into a signed .pkpass zip
 * 
 * @param files - Map of filename to file content (Uint8Array)
 *   Must include pass.json and image files (icon.png, logo.png, etc.)
 * @param certPem - Apple pass certificate PEM
 * @param keyPem - Apple pass private key PEM
 * @param wwdrPem - Apple WWDR intermediate certificate PEM
 * @returns Uint8Array of the .pkpass zip file
 */
export async function packagePass(
  files: Map<string, Uint8Array>,
  certPem: string,
  keyPem: string,
  wwdrPem: string,
): Promise<Uint8Array> {
  // Build manifest (SHA1 of each file)
  const manifest: Record<string, string> = {};
  for (const [name, data] of files) {
    manifest[name] = sha1Hex(data);
  }
  const manifestJson = JSON.stringify(manifest);
  const manifestBytes = new TextEncoder().encode(manifestJson);

  // Sign manifest
  const signature = signManifest(manifestJson, certPem, keyPem, wwdrPem);

  // Create zip
  const zip = new JSZip();
  for (const [name, data] of files) {
    zip.file(name, data);
  }
  zip.file("manifest.json", manifestBytes);
  zip.file("signature", signature);

  return await zip.generateAsync({ type: "uint8array" });
}
```

- [ ] **Step 2: Commit**

```bash
cd /Users/oli/institutepilation-points
git add supabase/functions/generate-wallet-pass/pass-utils.ts
git commit -m "feat: add pass-utils with signing, packaging, and pass.json builder"
```

---

### Task 3: Build the Edge Function handler

**Files:**
- Modify: `supabase/functions/generate-wallet-pass/index.ts`

- [ ] **Step 1: Write the Edge Function handler**

Replace the scaffold content of `supabase/functions/generate-wallet-pass/index.ts` with:

```typescript
// supabase/functions/generate-wallet-pass/index.ts
import { createClient } from "npm:@supabase/supabase-js@2";
import { buildPassJson, getTier, packagePass, placeholderPng } from "./pass-utils.ts";

const PASS_TYPE_ID = "pass.pass.com.logicsupplies.loyalty";
const TEAM_ID = "D8SXYV7QXP";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { client_id } = await req.json();
    if (!client_id) {
      return new Response(JSON.stringify({ error: "client_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Init Supabase with service role key for Storage access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch client with joined business
    const { data: client, error: clientErr } = await supabase
      .from("loyalty_clients")
      .select("*, loyalty_businesses(name, slug, theme_color)")
      .eq("id", client_id)
      .single();

    if (clientErr || !client) {
      return new Response(JSON.stringify({ error: "Client not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const business = client.loyalty_businesses;
    const businessName = business?.name || "Commerce";
    const businessSlug = business?.slug || "default";
    const businessColor = business?.theme_color || "#1a1a2e";

    const tier = getTier(client.total_points_earned || 0);
    const serial = `loyalty-${client_id}-${Date.now()}`;

    // Build pass.json
    const passJson = buildPassJson({
      clientId: client_id,
      clientName: client.name || "Client",
      businessName,
      points: client.points_balance || 0,
      tier,
      color: businessColor,
      serial,
      passTypeId: PASS_TYPE_ID,
      teamId: TEAM_ID,
    });

    const passJsonBytes = new TextEncoder().encode(JSON.stringify(passJson));

    // Fetch business logo from Storage (or use placeholder)
    let logoBytes: Uint8Array;
    const { data: logoData } = await supabase.storage
      .from("reward-images")
      .download(`logos/${businessSlug}.png`);

    if (logoData) {
      logoBytes = new Uint8Array(await logoData.arrayBuffer());
    } else {
      logoBytes = placeholderPng();
    }

    // Build files map — use same logo for all sizes (Apple will scale)
    const files = new Map<string, Uint8Array>();
    files.set("pass.json", passJsonBytes);
    files.set("icon.png", logoBytes);
    files.set("icon@2x.png", logoBytes);
    files.set("logo.png", logoBytes);
    files.set("logo@2x.png", logoBytes);

    // Get Apple certificates from secrets
    const certPem = Deno.env.get("APPLE_PASS_CERT")!;
    const keyPem = Deno.env.get("APPLE_PASS_KEY")!;
    const wwdrPem = Deno.env.get("APPLE_WWDR_CERT")!;

    // Package and sign
    const pkpassData = await packagePass(files, certPem, keyPem, wwdrPem);

    // Upload to Storage (upsert)
    const storagePath = `passes/${client_id}.pkpass`;
    const { error: uploadErr } = await supabase.storage
      .from("reward-images")
      .upload(storagePath, pkpassData, {
        contentType: "application/vnd.apple.pkpass",
        upsert: true,
      });

    if (uploadErr) {
      return new Response(JSON.stringify({ error: "Upload failed", details: uploadErr.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = `${supabaseUrl}/storage/v1/object/public/reward-images/${storagePath}`;

    return new Response(JSON.stringify({ url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

- [ ] **Step 2: Commit**

```bash
cd /Users/oli/institutepilation-points
git add supabase/functions/generate-wallet-pass/index.ts
git commit -m "feat: implement generate-wallet-pass Edge Function"
```

---

### Task 4: Upload Apple certificates as Supabase secrets

**Files:** None (Supabase CLI commands)

- [ ] **Step 1: Read the existing certificate files and set as secrets**

The certificates are currently at `/tmp/pass-cert.pem`, `/tmp/pass-key.pem`, `/tmp/wwdr.pem`. If they're not there, re-export them from the Keychain. Then set them as Supabase secrets:

```bash
cd /Users/oli/institutepilation-points
npx supabase secrets set APPLE_PASS_CERT="$(cat /tmp/pass-cert.pem)"
npx supabase secrets set APPLE_PASS_KEY="$(cat /tmp/pass-key.pem)"
npx supabase secrets set APPLE_WWDR_CERT="$(cat /tmp/wwdr.pem)"
```

- [ ] **Step 2: Verify secrets are set**

```bash
cd /Users/oli/institutepilation-points
npx supabase secrets list
```

Expected: `APPLE_PASS_CERT`, `APPLE_PASS_KEY`, `APPLE_WWDR_CERT` listed.

---

### Task 5: Deploy Edge Function and test

**Files:** None (deployment + manual test)

- [ ] **Step 1: Deploy the function**

```bash
cd /Users/oli/institutepilation-points
npx supabase functions deploy generate-wallet-pass --no-verify-jwt
```

`--no-verify-jwt` allows the DB webhook to call it without auth headers.

- [ ] **Step 2: Test with curl**

Pick an existing client ID from the database and test:

```bash
curl -X POST \
  https://kptphghxhexirezukarr.supabase.co/functions/v1/generate-wallet-pass \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdHBoZ2h4aGV4aXJlenVrYXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA1NzMsImV4cCI6MjA4OTA5NjU3M30.TW9IZlmUQ1H4dJfWRAJ8fXgqR3YKjin8WJZGVPmOjFg" \
  -d '{"client_id": "39b2ddfa-7e49-4199-b98e-bc7d44828d3e"}'
```

Expected: `{ "url": "https://kptphghxhexirezukarr.supabase.co/storage/v1/object/public/reward-images/passes/39b2ddfa-....pkpass" }`

- [ ] **Step 3: Download the pass and verify it opens in Apple Wallet**

```bash
curl -o /tmp/test-pass.pkpass "THE_URL_FROM_STEP_2"
open /tmp/test-pass.pkpass
```

Expected: Apple Wallet opens and shows the pass with correct branding.

- [ ] **Step 4: Commit (no code changes, just confirming deploy works)**

---

### Task 6: Set up database webhook for auto-generation

**Files:** None (Supabase Dashboard configuration)

- [ ] **Step 1: Create the webhook via SQL**

Run this SQL in the Supabase SQL Editor (Dashboard > SQL Editor):

```sql
-- Create a function that calls the Edge Function
CREATE OR REPLACE FUNCTION notify_generate_wallet_pass()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := current_setting('app.settings.supabase_url') || '/functions/v1/generate-wallet-pass',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := jsonb_build_object('client_id', NEW.id)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on loyalty_clients INSERT
DROP TRIGGER IF EXISTS on_client_created_generate_pass ON loyalty_clients;
CREATE TRIGGER on_client_created_generate_pass
  AFTER INSERT ON loyalty_clients
  FOR EACH ROW
  EXECUTE FUNCTION notify_generate_wallet_pass();
```

Note: This uses the `pg_net` extension (pre-installed on Supabase) for async HTTP calls. If `net.http_post` is not available, enable the `pg_net` extension first:

```sql
CREATE EXTENSION IF NOT EXISTS pg_net;
```

- [ ] **Step 2: Verify the webhook by creating a test client**

```sql
INSERT INTO loyalty_clients (name, phone, business_id, points_balance, total_points_earned)
VALUES ('Test Webhook', '418-555-9999', (SELECT id FROM loyalty_businesses LIMIT 1), 0, 0);
```

Then check Supabase Storage `reward-images/passes/` for the new pass file (may take a few seconds).

- [ ] **Step 3: Clean up test client**

```sql
DELETE FROM loyalty_clients WHERE phone = '418-555-9999';
```

---

### Task 7: Upload business logos to Supabase Storage

**Files:** None (Storage uploads)

- [ ] **Step 1: Upload existing logos to Storage**

```bash
cd /Users/oli/institutepilation-points

# Upload each business logo
npx supabase storage cp public/logo-dark.png reward-images/logos/institut-epilation.png
npx supabase storage cp public/logos/smith-cafe.png reward-images/logos/smith-cafe.png
npx supabase storage cp public/logos/la-peltrie.png reward-images/logos/la-peltrie.png
```

If `supabase storage cp` is not available, use curl:

```bash
for slug_file in "institut-epilation:public/logo-dark.png" "smith-cafe:public/logos/smith-cafe.png" "la-peltrie:public/logos/la-peltrie.png"; do
  slug="${slug_file%%:*}"
  file="${slug_file#*:}"
  curl -X POST \
    "https://kptphghxhexirezukarr.supabase.co/storage/v1/object/reward-images/logos/${slug}.png" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdHBoZ2h4aGV4aXJlenVrYXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA1NzMsImV4cCI6MjA4OTA5NjU3M30.TW9IZlmUQ1H4dJfWRAJ8fXgqR3YKjin8WJZGVPmOjFg" \
    -H "Content-Type: image/png" \
    --data-binary "@${file}"
done
```

- [ ] **Step 2: Verify logos accessible**

```bash
curl -I "https://kptphghxhexirezukarr.supabase.co/storage/v1/object/public/reward-images/logos/institut-epilation.png"
```

Expected: HTTP 200

---

### Task 8: Add theme_color column to loyalty_businesses

**Files:** None (SQL migration)

The Edge Function reads `theme_color` from the business row. Add this column if it doesn't exist:

- [ ] **Step 1: Run migration SQL**

```sql
ALTER TABLE loyalty_businesses ADD COLUMN IF NOT EXISTS theme_color TEXT DEFAULT '#1a1a2e';

-- Update existing businesses
UPDATE loyalty_businesses SET theme_color = '#32373c' WHERE slug = 'institut-epilation';
UPDATE loyalty_businesses SET theme_color = '#1a1a2e' WHERE slug = 'la-peltrie';
UPDATE loyalty_businesses SET theme_color = '#181818' WHERE slug = 'smith-cafe';
```

- [ ] **Step 2: Verify**

```sql
SELECT slug, theme_color FROM loyalty_businesses;
```

---

### Task 9: Update web app — fallback pass generation in MyQR.jsx

**Files:**
- Modify: `src/pages/MyQR.jsx`
- Modify: `src/services/supabase.js`

- [ ] **Step 1: Simplify generateWalletPass in supabase.js**

In `src/services/supabase.js`, replace the existing `generateWalletPass` function (lines 378-387):

```javascript
export async function generateWalletPass(clientId) {
  try {
    const { data, error } = await supabase.functions.invoke('generate-wallet-pass', {
      body: { client_id: clientId },
    });
    if (error) throw error;
    return data?.url || null;
  } catch (e) {
    console.error('generateWalletPass error:', e);
    return null;
  }
}
```

- [ ] **Step 2: Update MyQR.jsx wallet button with fallback**

In `src/pages/MyQR.jsx`, replace the wallet button (lines 58-68) with:

```jsx
<button
  className="btn btn-primary btn-small"
  style={{ width: 'auto', padding: '12px 24px', background: '#000', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}
  onClick={async () => {
    const passUrl = `https://kptphghxhexirezukarr.supabase.co/storage/v1/object/public/reward-images/passes/${user.id || 'test-pass'}.pkpass`;
    // Check if pass exists, if not generate on-demand
    try {
      const check = await fetch(passUrl, { method: 'HEAD' });
      if (check.ok) {
        window.open(passUrl, '_blank');
      } else {
        const { generateWalletPass } = await import('../services/supabase.js');
        const url = await generateWalletPass(user.id);
        if (url) window.open(url, '_blank');
        else alert('Erreur lors de la génération du pass. Réessayez.');
      }
    } catch {
      window.open(passUrl, '_blank');
    }
  }}
>
  <img src="https://developer.apple.com/assets/elements/icons/wallet/wallet-96x96_2x.png" alt="" style={{ width: 24, height: 24 }} />
  Ajouter au Wallet Apple
</button>
```

- [ ] **Step 3: Test in browser**

Open the web app, navigate to MyQR, click the wallet button. If pass exists → opens directly. If not → generates then opens.

- [ ] **Step 4: Commit**

```bash
cd /Users/oli/institutepilation-points
git add src/pages/MyQR.jsx src/services/supabase.js
git commit -m "feat: add fallback pass generation in MyQR wallet button"
```

---

### Task 10: Add Apple Wallet button to iOS Expo app

**Files:**
- Modify: `/Users/oli/Desktop/LogicSupplies/package.json`
- Modify: `/Users/oli/Desktop/LogicSupplies/src/services/supabase.ts`
- Modify: `/Users/oli/Desktop/LogicSupplies/src/screens/MyQRScreen.tsx`

- [ ] **Step 1: Install react-native-passkit-wallet**

```bash
cd /Users/oli/Desktop/LogicSupplies
npx expo install react-native-passkit-wallet
```

If `react-native-passkit-wallet` doesn't support Expo managed workflow, use `expo-linking` to open the `.pkpass` URL directly (iOS Safari handles `.pkpass` natively and opens the Wallet add dialog):

```bash
# expo-linking is already installed — no additional package needed
```

- [ ] **Step 2: Add generateWalletPass to supabase.ts**

Add at the end of `/Users/oli/Desktop/LogicSupplies/src/services/supabase.ts`:

```typescript
// ========== WALLET PASS ==========

const STORAGE_URL = 'https://kptphghxhexirezukarr.supabase.co/storage/v1/object/public/reward-images';

export async function getWalletPassUrl(clientId: string): Promise<string | null> {
  const directUrl = `${STORAGE_URL}/passes/${clientId}.pkpass`;
  try {
    const check = await fetch(directUrl, { method: 'HEAD' });
    if (check.ok) return directUrl;
  } catch {}

  // Generate on-demand
  try {
    const { data, error } = await supabase.functions.invoke('generate-wallet-pass', {
      body: { client_id: clientId },
    });
    if (error) throw error;
    return data?.url || null;
  } catch (e) {
    console.error('getWalletPassUrl error:', e);
    return null;
  }
}
```

- [ ] **Step 3: Add wallet button to MyQRScreen.tsx**

In `/Users/oli/Desktop/LogicSupplies/src/screens/MyQRScreen.tsx`:

Add import at the top:

```typescript
import { TouchableOpacity, Alert, Linking } from 'react-native';
import { getWalletPassUrl } from '../services/supabase';
```

Remove `TouchableOpacity` from the existing `react-native` import if it's not already there (it's not in the current imports, so just add it).

Update the import line to:

```typescript
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
```

And add `Linking` from `expo-linking`:

```typescript
import * as Linking from 'expo-linking';
```

Then add the wallet button after the `tierBadge` View (before the closing `</ScrollView>`):

```tsx
{/* Add to Apple Wallet */}
<TouchableOpacity
  style={styles.walletButton}
  onPress={async () => {
    const url = await getWalletPassUrl(client.id);
    if (url) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Erreur', 'Impossible de générer le pass. Réessayez.');
    }
  }}
>
  <Ionicons name="wallet" size={20} color="#fff" />
  <Text style={styles.walletButtonText}>Ajouter au Wallet Apple</Text>
</TouchableOpacity>
```

Add to the StyleSheet:

```typescript
walletButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#000',
  paddingHorizontal: 24,
  paddingVertical: 14,
  borderRadius: 12,
  gap: 8,
  marginTop: spacing.xl,
  width: '100%',
},
walletButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
```

- [ ] **Step 4: Test on iOS simulator**

```bash
cd /Users/oli/Desktop/LogicSupplies
npx expo run:ios
```

Navigate to the QR screen, tap "Ajouter au Wallet Apple". On iOS, opening a `.pkpass` URL triggers the native "Add to Wallet" dialog.

- [ ] **Step 5: Commit**

```bash
cd /Users/oli/Desktop/LogicSupplies
git add src/screens/MyQRScreen.tsx src/services/supabase.ts
git commit -m "feat: add Apple Wallet button to iOS app"
```

---

## Summary

| Task | What | Depends on |
|------|------|-----------|
| 1 | Init Supabase project | — |
| 2 | pass-utils.ts (signing, packaging) | 1 |
| 3 | Edge Function handler | 2 |
| 4 | Upload Apple certs as secrets | 1 |
| 5 | Deploy + test Edge Function | 3, 4 |
| 6 | DB webhook for auto-generation | 5 |
| 7 | Upload logos to Storage | — |
| 8 | Add theme_color column | — |
| 9 | Update web app MyQR fallback | 5 |
| 10 | iOS Expo wallet button | 5 |
