import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://karztsksjqohxhgxdeje.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthcnp0c2tzanFvaHhoZ3hkZWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODgzMDUsImV4cCI6MjA4OTE2NDMwNX0.SVozYZfnM7ki72frIHMRuppaSglSC2qjAlXa0XvbQDE';

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

export async function createLoyaltyClient(businessId, phone, name, referralCode, referredBy) {
  const { data, error } = await supabase
    .from('loyalty_clients')
    .insert({
      business_id: businessId,
      phone,
      name,
      referral_code: referralCode,
      referred_by: referredBy || null,
      points_balance: 0,
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

export async function createRedemption(businessId, clientId, rewardName, pointsSpent) {
  // Deduct points
  const client = await getClientById(clientId);
  if (!client || client.points_balance < pointsSpent) throw new Error('Not enough points');

  await updateClientPoints(clientId, client.points_balance - pointsSpent);

  // Create redemption record
  const { data, error } = await supabase
    .from('loyalty_redemptions')
    .insert({
      business_id: businessId,
      client_id: clientId,
      reward_name: rewardName,
      points_spent: pointsSpent,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;

  // Also create a transaction
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

// ========== ADMIN: ADD POINTS ==========

export async function adminAddPoints(businessId, clientId, points, description, amountSpent) {
  const client = await getClientById(clientId);
  if (!client) throw new Error('Client not found');

  await updateClientPoints(clientId, client.points_balance + points);
  await addTransaction(businessId, clientId, 'purchase', points, description, amountSpent);
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
