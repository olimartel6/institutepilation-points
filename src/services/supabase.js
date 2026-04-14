import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';

// EmailJS config
const EMAILJS_SERVICE = 'service_ki114yp';
const EMAILJS_TEMPLATE = 'template_d1sass7';
const EMAILJS_KEY = 'AmhgSuo-3agTp4Eii';

const supabaseUrl = 'https://kptphghxhexirezukarr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwdHBoZ2h4aGV4aXJlenVrYXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1MjA1NzMsImV4cCI6MjA4OTA5NjU3M30.TW9IZlmUQ1H4dJfWRAJ8fXgqR3YKjin8WJZGVPmOjFg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ========== BUSINESS ==========

export async function getBusiness(slug) {
  const { data, error } = await supabase
    .from('loyalty_businesses')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

// ========== CLIENTS ==========

export async function getClientByPhone(businessId, phone) {
  const { data } = await supabase
    .from('loyalty_clients')
    .select('*')
    .eq('business_id', businessId)
    .eq('phone', phone)
    .single();
  return data;
}

export async function getClientById(clientId) {
  const { data } = await supabase
    .from('loyalty_clients')
    .select('*')
    .eq('id', clientId)
    .single();
  return data;
}

export async function createLoyaltyClient(businessId, phone, name, referralCode, referredBy, birthday, email) {
  const { data, error } = await supabase
    .from('loyalty_clients')
    .insert({
      business_id: businessId,
      phone,
      name,
      email: email || null,
      referral_code: referralCode,
      referred_by: referredBy || null,
      points_balance: 0,
      total_points_earned: 0,
      visit_count: 0,
      birthday: birthday || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllClients(businessId) {
  const { data, error } = await supabase
    .from('loyalty_clients')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateClientPoints(clientId, newBalance) {
  const { error } = await supabase
    .from('loyalty_clients')
    .update({ points_balance: newBalance })
    .eq('id', clientId);
  if (error) throw error;
}

// ========== TRANSACTIONS ==========

export async function addTransaction(businessId, clientId, type, points, description, amountSpent) {
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .insert({
      business_id: businessId,
      client_id: clientId,
      type,
      points,
      description,
      amount_spent: amountSpent || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllTransactions(businessId) {
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false })
    .limit(500);
  if (error) throw error;
  return data || [];
}

export async function getClientTransactions(clientId) {
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('*')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
    .limit(20);
  if (error) throw error;
  return data || [];
}

// ========== REWARDS / REDEMPTIONS ==========

function generateRedemptionCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'RDM-';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function createRedemption(businessId, clientId, rewardName, pointsSpent) {
  const client = await getClientById(clientId);
  if (!client || client.points_balance < pointsSpent) throw new Error('Not enough points');

  await updateClientPoints(clientId, client.points_balance - pointsSpent);

  const redemptionCode = generateRedemptionCode();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString(); // 30 min

  const { data, error } = await supabase
    .from('loyalty_redemptions')
    .insert({
      business_id: businessId,
      client_id: clientId,
      reward_name: rewardName,
      points_spent: pointsSpent,
      status: 'pending',
      redemption_code: redemptionCode,
      expires_at: expiresAt,
    })
    .select()
    .single();
  if (error) throw error;

  await addTransaction(businessId, clientId, 'redemption', -pointsSpent, `Échange: ${rewardName}`);

  return data;
}

export async function getPendingRedemptions(businessId) {
  const { data, error } = await supabase
    .from('loyalty_redemptions')
    .select('*, loyalty_clients(name, phone)')
    .eq('business_id', businessId)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function updateRedemptionStatus(redemptionId, status) {
  const { error } = await supabase
    .from('loyalty_redemptions')
    .update({ status })
    .eq('id', redemptionId);
  if (error) throw error;
}

// ========== VALIDATE REDEMPTION CODE (admin scanner) ==========

export async function validateRedemptionCode(code) {
  const { data, error } = await supabase
    .from('loyalty_redemptions')
    .select('*, loyalty_clients(name, phone)')
    .eq('redemption_code', code)
    .eq('status', 'pending')
    .single();
  if (error || !data) return null;
  // Check expiry
  if (data.expires_at && new Date(data.expires_at) < new Date()) return null;
  return data;
}

export async function confirmRedemption(redemptionId) {
  const { error } = await supabase
    .from('loyalty_redemptions')
    .update({ status: 'approved' })
    .eq('id', redemptionId);
  if (error) throw error;
}

// ========== ADMIN: ADD POINTS ==========

export async function adminAddPoints(businessId, clientId, points, description, amountSpent, businessName) {
  const client = await getClientById(clientId);
  if (!client) throw new Error('Client not found');

  const newVisitCount = (client.visit_count || 0) + 1;
  let bonusPoints = 0;
  let bonusDesc = '';

  // Birthday bonus (auto-credit 100 pts)
  if (client.birthday) {
    const today = new Date();
    const bday = new Date(client.birthday);
    if (today.getMonth() === bday.getMonth() && today.getDate() === bday.getDate()) {
      // Check if already credited today
      const { data: todayTx } = await supabase
        .from('loyalty_transactions')
        .select('id')
        .eq('client_id', clientId)
        .eq('type', 'visit')
        .eq('description', 'Bonus anniversaire')
        .gte('created_at', today.toISOString().split('T')[0])
        .limit(1);
      if (!todayTx || todayTx.length === 0) {
        bonusPoints += 100;
        bonusDesc = 'Bonus anniversaire';
        sendSMS('birthday', client.phone, businessName || '', { clientName: client.name, businessId, clientId });
      }
    }
  }

  // Surprise reward every 10th visit
  if (newVisitCount % 10 === 0) {
    bonusPoints += 50;
    bonusDesc = bonusDesc ? bonusDesc + ' + Surprise 10e visite' : 'Surprise 10e visite!';
  }

  const totalPoints = points + bonusPoints;

  await supabase
    .from('loyalty_clients')
    .update({
      points_balance: client.points_balance + totalPoints,
      total_points_earned: (client.total_points_earned || 0) + totalPoints,
      visit_count: newVisitCount,
      last_visit: new Date().toISOString(),
    })
    .eq('id', clientId);

  await addTransaction(businessId, clientId, 'purchase', points, description, amountSpent);

  if (bonusPoints > 0) {
    await addTransaction(businessId, clientId, 'visit', bonusPoints, bonusDesc);
  }

  // Notifications: points earned
  if (client.phone && businessName) {
    sendSMS('points_earned', client.phone, businessName, { clientName: client.name, points: totalPoints, businessId, clientId });
  }
  if (client.email && businessName) {
    sendEmail('points_earned', client.email, businessName, { clientName: client.name, points: totalPoints, businessId, clientId });
  }

  return { bonusPoints, bonusDesc, newVisitCount };
}

// ========== AUDIT: Verify balance from ledger ==========

export async function verifyBalance(clientId) {
  const { data, error } = await supabase
    .from('loyalty_transactions')
    .select('points')
    .eq('client_id', clientId);
  if (error) return null;
  return (data || []).reduce((sum, t) => sum + t.points, 0);
}

// ========== SMS ==========

function formatPhone(phone) {
  if (!phone) return '';
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  // If starts with 1 and 11 digits = already has country code
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
  // If 10 digits = add +1
  if (digits.length === 10) return '+1' + digits;
  // If already has +, return as-is
  if (phone.startsWith('+')) return phone;
  return '+1' + digits;
}

export async function sendSMS(type, to, businessName, opts = {}) {
  try {
    const { data, error } = await supabase.functions.invoke('send-sms', {
      body: {
        type,
        to: formatPhone(to),
        business_name: businessName,
        client_name: opts.clientName,
        points: opts.points,
        reward_name: opts.rewardName,
        custom_message: opts.customMessage,
        business_id: opts.businessId,
        client_id: opts.clientId,
      },
    });
    return data?.sent || false;
  } catch {
    return false;
  }
}

function buildEmailContent(type, businessName, opts = {}) {
  const name = opts.clientName?.split(' ')[0] || 'Client';
  const biz = businessName;
  const accent = '#C9A96E';

  const wrap = (content) => `<div style="font-family:system-ui,-apple-system,sans-serif;max-width:480px;margin:0 auto;background:#FAFAF8;border-radius:16px;overflow:hidden"><div style="background:linear-gradient(135deg,#32373c,#1a1d21);padding:32px 24px;text-align:center"><h1 style="color:white;font-size:22px;margin:0">${biz}</h1><p style="color:${accent};font-size:13px;margin:8px 0 0;text-transform:uppercase;letter-spacing:2px">Programme Fidélité</p></div><div style="padding:32px 24px">${content}</div><div style="padding:16px 24px;text-align:center;font-size:11px;color:#9CA3AF;border-top:1px solid #E8E6E1">Envoyé par LogicSupplies</div></div>`;

  switch (type) {
    case 'verify_code':
      return {
        subject: `${opts.code} — Votre code de vérification`,
        html: wrap(`<h2 style="font-size:20px;color:#212529;margin:0 0 12px;text-align:center">Code de vérification</h2><p style="color:#6c757d;line-height:1.6;margin:0 0 24px;text-align:center">Entrez ce code dans l'application pour vous connecter :</p><div style="background:#32373c;border-radius:16px;padding:28px;text-align:center;margin:0 0 24px"><div style="font-size:48px;font-weight:800;color:white;letter-spacing:16px;font-family:monospace">${opts.code}</div></div><p style="color:#9CA3AF;font-size:12px;text-align:center">Ce code expire dans 10 minutes.</p>`),
      };
    case 'welcome':
      return {
        subject: `Bienvenue chez ${biz}!`,
        html: wrap(`<h2 style="font-size:20px;color:#212529;margin:0 0 12px">Bienvenue, ${name}!</h2><p style="color:#6c757d;line-height:1.6;margin:0 0 24px">Votre compte fidélité est maintenant actif. Accumulez des points à chaque visite!</p><div style="background:white;border-radius:12px;padding:20px;text-align:center;border:1px solid #E8E6E1"><div style="font-size:48px;font-weight:800;color:#32373c">0</div><div style="font-size:12px;color:#9CA3AF;text-transform:uppercase;letter-spacing:2px;margin-top:4px">Points</div></div>`),
      };
    case 'points_earned':
      return {
        subject: `+${opts.points} points chez ${biz}!`,
        html: wrap(`<h2 style="font-size:20px;color:#212529;margin:0 0 12px">Bravo, ${name}!</h2><div style="background:linear-gradient(135deg,${accent},#B08D4F);border-radius:12px;padding:24px;text-align:center;margin:0 0 16px"><div style="font-size:42px;font-weight:800;color:white">+${opts.points}</div><div style="font-size:13px;color:rgba(255,255,255,0.8);margin-top:4px">points gagnés</div></div><p style="color:#6c757d;line-height:1.6;margin:0">Continuez à accumuler pour débloquer des récompenses!</p>`),
      };
    case 'birthday':
      return {
        subject: `Joyeux anniversaire, ${name}!`,
        html: wrap(`<div style="text-align:center;margin-bottom:16px;font-size:64px">🎂</div><h2 style="font-size:22px;color:#212529;margin:0 0 12px;text-align:center">Joyeux anniversaire!</h2><div style="background:linear-gradient(135deg,#FFD700,#FFA500);border-radius:12px;padding:24px;text-align:center;margin:0 0 16px"><div style="font-size:42px;font-weight:800;color:#1a1a2e">+100</div><div style="font-size:13px;color:rgba(0,0,0,0.6);margin-top:4px">points bonus cadeau</div></div>`),
      };
    case 'win_back':
      return {
        subject: `${name}, on s'ennuie de vous!`,
        html: wrap(`<h2 style="font-size:20px;color:#212529;margin:0 0 12px">Ça fait un moment, ${name}!</h2><p style="color:#6c757d;line-height:1.6;margin:0 0 20px">${biz} vous offre des points bonus à votre prochaine visite!</p><div style="background:${accent};color:white;border-radius:12px;padding:16px;text-align:center;font-weight:700;font-size:16px">Points bonus à votre prochaine visite!</div>`),
      };
    default:
      return { subject: `Message de ${biz}`, html: wrap(`<p>${opts.customMessage || ''}</p>`) };
  }
}

export async function sendEmail(type, to, businessName, opts = {}) {
  try {
    const { subject, html } = buildEmailContent(type, businessName, opts);
    console.log('Sending email via EmailJS:', { to, subject, service: EMAILJS_SERVICE, template: EMAILJS_TEMPLATE });
    const result = await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
      to_email: to,
      subject: subject,
      html_content: html,
    }, EMAILJS_KEY);
    console.log('EmailJS result:', result);
    return result.status === 200;
  } catch (e) {
    console.error('EmailJS error:', e?.text || e?.message || e);
    throw e;
  }
}

// ========== OFFERS ==========

export async function getActiveOffers(businessId) {
  const { data, error } = await supabase
    .from('loyalty_offers')
    .select('*')
    .eq('business_id', businessId)
    .eq('active', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createOffer(businessId, title, description, imageUrl, validUntil, maxClaims) {
  const { data, error } = await supabase
    .from('loyalty_offers')
    .insert({
      business_id: businessId,
      title,
      description,
      image_url: imageUrl || null,
      valid_until: validUntil || null,
      max_claims: maxClaims || null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteOffer(offerId) {
  const { error } = await supabase
    .from('loyalty_offers')
    .update({ active: false })
    .eq('id', offerId);
  if (error) throw error;
}

export async function claimOffer(offerId, clientId) {
  // Check if already claimed
  const { data: existing } = await supabase
    .from('loyalty_offer_claims')
    .select('id')
    .eq('offer_id', offerId)
    .eq('client_id', clientId)
    .limit(1);
  if (existing && existing.length > 0) throw new Error('Offre déjà réclamée');

  const claimCode = 'OFR-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');

  const { data, error } = await supabase
    .from('loyalty_offer_claims')
    .insert({ offer_id: offerId, client_id: clientId, claim_code: claimCode })
    .select()
    .single();
  if (error) throw error;

  // Increment claims count
  await supabase.rpc('increment_offer_claims', { offer_id_param: offerId }).catch(() => {
    // Fallback if RPC doesn't exist
    supabase.from('loyalty_offers').update({ claims_count: supabase.raw('claims_count + 1') }).eq('id', offerId);
  });

  return data;
}

export async function getClientClaims(clientId) {
  const { data, error } = await supabase
    .from('loyalty_offer_claims')
    .select('*, loyalty_offers(title, description, image_url)')
    .eq('client_id', clientId)
    .eq('status', 'claimed')
    .order('claimed_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function validateOfferClaim(claimCode) {
  const { data } = await supabase
    .from('loyalty_offer_claims')
    .select('*, loyalty_offers(title, description, business_id), loyalty_clients(name)')
    .eq('claim_code', claimCode)
    .eq('status', 'claimed')
    .single();
  return data || null;
}

export async function confirmOfferClaim(claimId) {
  const { error } = await supabase
    .from('loyalty_offer_claims')
    .update({ status: 'used', used_at: new Date().toISOString() })
    .eq('id', claimId);
  if (error) throw error;
}

// ========== REFERRALS ==========

export async function getReferrals(clientId) {
  const { data, error } = await supabase
    .from('loyalty_clients')
    .select('name, created_at')
    .eq('referred_by', clientId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

// ========== HELPERS ==========

export function generateReferralCode(name) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 6);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `${clean}${rand}`;
}
