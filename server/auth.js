import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env if present (simple zero-dependency env loader)
const ENV_FILE = path.resolve(__dirname, '../.env');
if (fs.existsSync(ENV_FILE)) {
  try {
    const lines = fs.readFileSync(ENV_FILE, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/(^['"]|['"]$)/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (err) {
    console.error('[AUTH] Error loading .env', err);
  }
}

// Configured credentials - read strictly on server
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'admin@loop-fashion.fr').toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'LoopVintageAdmin2026!';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory active session store
// Map<token, { email, role, expiresAt, createdAt }>
const activeSessions = new Map();

// Rate limiting for login attempts
// Map<ip, { attempts, lockUntil }>
const loginAttempts = new Map();

// Timing-safe string comparison
function safeCompare(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function authenticateAdmin(email, password, clientIp = '127.0.0.1') {
  // Check rate limit
  const now = Date.now();
  const attempt = loginAttempts.get(clientIp);
  if (attempt && attempt.lockUntil && attempt.lockUntil > now) {
    const remainingSec = Math.ceil((attempt.lockUntil - now) / 1000);
    return {
      success: false,
      error: `Trop de tentatives infructueuses. Veuillez patienter ${remainingSec} secondes.`
    };
  }

  // Validate credentials
  const cleanEmail = (email || '').trim().toLowerCase();
  const emailMatches = safeCompare(cleanEmail, ADMIN_EMAIL);
  const passwordMatches = safeCompare(password || '', ADMIN_PASSWORD);

  if (!emailMatches || !passwordMatches) {
    const cur = attempt ? attempt.attempts + 1 : 1;
    let lockUntil = null;
    if (cur >= 5) {
      lockUntil = now + 15 * 60 * 1000; // Lock 15 minutes
    }
    loginAttempts.set(clientIp, { attempts: cur, lockUntil });

    return {
      success: false,
      error: 'Identifiants administrateur incorrects.'
    };
  }

  // Clear failed attempts on success
  loginAttempts.delete(clientIp);

  // Generate cryptographically secure session token
  const token = crypto.randomBytes(32).toString('hex');
  const sessionData = {
    email: ADMIN_EMAIL,
    role: 'superadmin',
    createdAt: new Date().toISOString(),
    expiresAt: now + SESSION_TTL_MS
  };

  activeSessions.set(token, sessionData);

  return {
    success: true,
    token,
    user: {
      email: ADMIN_EMAIL,
      role: 'superadmin',
      name: 'Direction LOOP FASHION Paris'
    }
  };
}

export function verifySessionToken(token) {
  if (!token || typeof token !== 'string') return null;
  const session = activeSessions.get(token);
  if (!session) return null;

  if (Date.now() > session.expiresAt) {
    activeSessions.delete(token);
    return null;
  }

  return session;
}

export function revokeSessionToken(token) {
  if (!token) return false;
  return activeSessions.delete(token);
}

// Helper to extract bearer token from headers
export function extractBearerToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length === 2 && parts[0].toLowerCase() === 'bearer') {
    return parts[1];
  }
  return null;
}
