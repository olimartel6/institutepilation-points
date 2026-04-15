# Auto Wallet Pass Generator — Design Spec

## Goal

Automatically generate Apple Wallet passes (.pkpass) when a new loyalty client signs up, and provide "Add to Wallet" buttons in both the web app and iOS Expo app.

## Scope

- Apple Wallet only (no Google Wallet)
- Static passes: branding + QR code (no live point updates)
- Multi-tenant: works for any business in the system
- Auto-trigger on new client signup
- Manual trigger via button in apps

## Architecture

### 1. Supabase Edge Function: `generate-wallet-pass`

Port the existing `scripts/wallet-pass/generate.cjs` logic to a Deno-based Supabase Edge Function.

**Input:**
```json
{
  "client_id": "uuid",
  "business_slug": "smith-cafe"
}
```

**Process:**
1. Fetch client from `loyalty_clients` (name, points_balance, total_points_earned)
2. Fetch business from `loyalty_businesses` (name, slug, theme color)
3. Fetch business logo from Supabase Storage (`logos/{slug}.png`)
4. Calculate tier from total_points_earned (Bronze/Argent/Or/Platine)
5. Build pass.json (storeCard type) with:
   - Background color from business theme
   - Logo resized to Apple specs (icon 29/58px, logo 160x50/320x100)
   - QR barcode containing client_id
   - Fields: name, tier, status, business name
6. Create manifest.json (SHA1 hashes of all files)
7. Sign with Apple certificates (stored as Supabase secrets)
8. Zip into .pkpass
9. Upload to Supabase Storage: `reward-images/passes/{client_id}.pkpass` (upsert)
10. Return public URL

**Output:**
```json
{
  "url": "https://kptphghxhexirezukarr.supabase.co/storage/v1/object/public/reward-images/passes/{client_id}.pkpass"
}
```

**Secrets required (already have the certs locally):**
- `APPLE_PASS_CERT` — PEM certificate
- `APPLE_PASS_KEY` — PEM private key
- `APPLE_WWDR_CERT` — Apple WWDR intermediate certificate

**Dependencies:**
- Image resizing: use sharp (available in Deno via npm specifier)
- Zip: use JSZip
- OpenSSL signing: use node-forge (pure JS, no native binary needed in Deno)
- Supabase client: `@supabase/supabase-js`

### 2. Database Webhook (Auto-trigger)

Supabase Database Webhook on `loyalty_clients` table:
- Event: `INSERT`
- Target: Edge Function `generate-wallet-pass`
- Payload: `{ client_id: record.id, business_slug: record.business_id }` (resolve slug via join or pass business_id, function looks it up)

This means every new client automatically gets a wallet pass generated and stored.

### 3. Web App — Existing Button Enhancement

**File:** `src/pages/MyQR.jsx`

Current state: Apple Wallet button already exists, points to pre-generated `.pkpass` on Storage.

Changes needed:
- If the pass doesn't exist yet (new signup, edge function still processing), show a "Generating..." state
- Add a fallback: if pass URL returns 404, call `generateWalletPass()` from supabase.js to trigger on-demand generation
- Keep the existing UX otherwise

### 4. iOS Expo App — Add to Wallet Button

**File:** `src/screens/MyQRScreen.tsx` (in `/Users/oli/Desktop/LogicSupplies/`)

Add an "Add to Apple Wallet" button below the QR code display.

**Implementation:**
- Use `expo-passkit` or `react-native-passkit-wallet` to handle .pkpass files natively
- On button press:
  1. Call the Edge Function via Supabase client to get/generate the pass URL
  2. Download the .pkpass file
  3. Present the native Apple Wallet "Add Pass" dialog
- Button style: Apple's official "Add to Apple Wallet" badge (black pill button with wallet icon)

**Package:** `react-native-passkit-wallet` — handles downloading .pkpass and presenting the native iOS add-pass sheet.

### 5. Business Logo Storage

Currently logos are hardcoded paths in `generate.cjs`. For multi-tenant auto-generation:
- Logos must be in Supabase Storage: `logos/{slug}.png`
- Edge Function fetches logo from Storage dynamically
- When a new business is onboarded, logo is uploaded to Storage as part of setup

## Data Flow

```
New client signs up
  → INSERT into loyalty_clients
  → DB webhook fires
  → Edge Function generate-wallet-pass
  → Fetches client + business data
  → Generates .pkpass (signed)
  → Uploads to Storage
  → Pass ready at known URL

User taps "Add to Wallet"
  → Web: opens Storage URL directly (browser downloads .pkpass, iOS auto-opens Wallet)
  → iOS app: downloads .pkpass → native PassKit dialog
```

## File Changes Summary

| File | Action |
|------|--------|
| `supabase/functions/generate-wallet-pass/index.ts` | **New** — Edge Function |
| `src/pages/MyQR.jsx` | **Edit** — fallback if pass not ready |
| `src/services/supabase.js` | **Edit** — update generateWalletPass() |
| `/Users/oli/Desktop/LogicSupplies/src/screens/MyQRScreen.tsx` | **Edit** — add wallet button |
| `/Users/oli/Desktop/LogicSupplies/package.json` | **Edit** — add react-native-passkit-wallet |
| Supabase Dashboard | **Config** — add secrets, create DB webhook |

## Out of Scope

- Google Wallet
- Dynamic pass updates (push notifications when points change)
- Pass personalization beyond name/tier/QR
- Batch regeneration (keep existing generate-all.cjs for manual use)
