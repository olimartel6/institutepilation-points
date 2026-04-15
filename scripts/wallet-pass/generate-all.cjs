const { generatePass } = require('./generate.cjs');
const { execSync } = require('child_process');

const SUPABASE_URL = 'https://kptphghxhexirezukarr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdHBoZ2h4aGV4aXJlenVrYXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA1NzMsImV4cCI6MjA4OTA5NjU3M30.TW9IZlmUQ1H4dJfWRAJ8fXgqR3YKjin8WJZGVPmOjFg';

async function main() {
  // Fetch all clients
  const resp = await fetch(`${SUPABASE_URL}/rest/v1/loyalty_clients?select=*,loyalty_businesses(name,slug)`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` },
  });
  const clients = await resp.json();
  console.log(`Found ${clients.length} clients`);

  for (const client of clients) {
    const bizName = client.loyalty_businesses?.name || 'Commerce';
    const color = '#a97f61'; // default
    const tier = (client.total_points_earned || 0) >= 5000 ? 'Platine' :
                 (client.total_points_earned || 0) >= 2000 ? 'Or' :
                 (client.total_points_earned || 0) >= 500 ? 'Argent' : 'Bronze';

    console.log(`Generating pass for ${client.name || client.phone} (${client.id})...`);
    const passFile = generatePass({
      clientId: client.id,
      clientName: client.name || 'Client',
      businessName: bizName,
      points: client.points_balance || 0,
      tier,
      color,
    });

    // Upload to Supabase Storage
    const passData = require('fs').readFileSync(passFile);
    const uploadResp = await fetch(`${SUPABASE_URL}/storage/v1/object/reward-images/passes/${client.id}.pkpass`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/vnd.apple.pkpass',
      },
      body: passData,
    });

    if (uploadResp.ok) {
      console.log(`  ✓ Uploaded: passes/${client.id}.pkpass`);
    } else {
      // Try upsert
      const upsertResp = await fetch(`${SUPABASE_URL}/storage/v1/object/reward-images/passes/${client.id}.pkpass`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/vnd.apple.pkpass',
        },
        body: passData,
      });
      console.log(`  ${upsertResp.ok ? '✓' : '✗'} Upserted: passes/${client.id}.pkpass`);
    }

    // Cleanup local file
    require('fs').unlinkSync(passFile);
  }

  console.log('\nDone! All passes generated and uploaded.');
}

main().catch(console.error);
