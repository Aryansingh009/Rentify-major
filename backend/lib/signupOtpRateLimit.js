/**
 * In-memory rate limits for signup OTP verify & resend (per server instance).
 * For multi-instance production, use Redis or similar.
 */

const verifyBuckets = new Map();
const resendBuckets = new Map();

const VERIFY_WINDOW_MS = 15 * 60 * 1000;
const VERIFY_MAX = 10;
const RESEND_WINDOW_MS = 60 * 60 * 1000;
const RESEND_MAX = 8;

function getBucket(map, key, windowMs) {
  const now = Date.now();
  let b = map.get(key);
  if (!b || now - b.windowStart > windowMs) {
    b = { count: 0, windowStart: now };
  }
  return { b, now, windowMs };
}

/** Call before processing a signup OTP verification attempt (per IP + email). */
export function consumeSignupOtpVerify(ip, email) {
  const key = `${ip || 'unknown'}:${(email || '').toLowerCase()}`;
  const { b, now, windowMs } = getBucket(verifyBuckets, key, VERIFY_WINDOW_MS);
  if (b.count >= VERIFY_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((b.windowStart + windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }
  b.count += 1;
  verifyBuckets.set(key, b);
  return { ok: true };
}

/** Call before sending a resend verification email (per IP). */
export function consumeSignupOtpResend(ip) {
  const key = ip || 'unknown';
  const { b, now, windowMs } = getBucket(resendBuckets, key, RESEND_WINDOW_MS);
  if (b.count >= RESEND_MAX) {
    const retryAfterSec = Math.max(1, Math.ceil((b.windowStart + windowMs - now) / 1000));
    return { ok: false, retryAfterSec };
  }
  b.count += 1;
  resendBuckets.set(key, b);
  return { ok: true };
}
