import { createClient } from "npm:@supabase/supabase-js@2";
import {
  buildPassJson,
  getTier,
  packagePass,
  placeholderPng,
} from "./pass-utils.ts";

const PASS_TYPE_ID = "pass.pass.com.logicsupplies.loyalty";
const TEAM_ID = "D8SXYV7QXP";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { client_id } = await req.json();
    if (!client_id) {
      return new Response(
        JSON.stringify({ error: "client_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Init Supabase with service role
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch client with business join
    const { data: client, error: clientErr } = await supabase
      .from("loyalty_clients")
      .select("*, loyalty_businesses(name, slug, theme_color)")
      .eq("id", client_id)
      .single();

    if (clientErr || !client) {
      return new Response(
        JSON.stringify({ error: "Client not found", details: clientErr?.message }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const business = client.loyalty_businesses;
    const slug = business?.slug || "default";
    const businessName = business?.name || "Business";
    const themeColor = business?.theme_color || "#1a1a2e";

    // Fetch business logo from Storage (fallback to placeholder)
    let logoBytes: Uint8Array;
    const { data: logoData, error: logoErr } = await supabase.storage
      .from("reward-images")
      .download(`logos/${slug}.png`);

    if (logoErr || !logoData) {
      console.warn(`Logo not found for ${slug}, using placeholder`);
      logoBytes = placeholderPng();
    } else {
      logoBytes = new Uint8Array(await logoData.arrayBuffer());
    }

    // Build pass.json
    const tier = getTier(client.total_points || 0);
    const passJson = buildPassJson({
      clientId: client_id,
      clientName: client.name || "Client",
      businessName,
      points: client.total_points || 0,
      tier,
      themeColor,
      passTypeIdentifier: PASS_TYPE_ID,
      teamIdentifier: TEAM_ID,
    });

    const passJsonBytes = new TextEncoder().encode(JSON.stringify(passJson));

    // All pass files — same logo for all image slots (Apple will scale)
    const files: Record<string, Uint8Array> = {
      "pass.json": passJsonBytes,
      "icon.png": logoBytes,
      "icon@2x.png": logoBytes,
      "logo.png": logoBytes,
      "logo@2x.png": logoBytes,
    };

    // Read Apple certs from env
    const certPem = Deno.env.get("APPLE_PASS_CERT");
    const keyPem = Deno.env.get("APPLE_PASS_KEY");
    const wwdrPem = Deno.env.get("APPLE_WWDR_CERT");

    if (!certPem || !keyPem || !wwdrPem) {
      return new Response(
        JSON.stringify({ error: "Apple certificate environment variables not set" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Package and sign
    const pkpassBytes = await packagePass(files, certPem, keyPem, wwdrPem);

    // Upload to Storage (upsert)
    const storagePath = `passes/${client_id}.pkpass`;
    const { error: uploadErr } = await supabase.storage
      .from("reward-images")
      .upload(storagePath, pkpassBytes, {
        contentType: "application/vnd.apple.pkpass",
        upsert: true,
      });

    if (uploadErr) {
      return new Response(
        JSON.stringify({ error: "Failed to upload pass", details: uploadErr.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("reward-images")
      .getPublicUrl(storagePath);

    return new Response(
      JSON.stringify({ url: urlData.publicUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("generate-wallet-pass error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: (err as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
