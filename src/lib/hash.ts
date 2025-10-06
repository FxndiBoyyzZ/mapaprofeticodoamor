/**
 * Hash utilities for user data (PII)
 */

export async function sha256Hash(value: string): Promise<string> {
  if (!value) return "";
  
  // Normalize: lowercase, trim spaces
  const normalized = value.toLowerCase().trim();
  
  // Use Web Crypto API
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export async function hashEmail(email: string): Promise<string> {
  if (!email || !email.includes('@')) return "";
  return sha256Hash(email);
}

export async function hashPhone(phone: string): Promise<string> {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Ensure it has country code (55 for Brazil if not present)
  const withCountryCode = digitsOnly.startsWith('55') ? digitsOnly : `55${digitsOnly}`;
  
  return sha256Hash(withCountryCode);
}
