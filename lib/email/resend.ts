import { Resend } from 'resend';

// Lazy factory — the Resend SDK throws in its constructor when
// RESEND_API_KEY is undefined, which would break next build on any env
// lacking the key. Callers must guard against missing key before calling.
export function getResend(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

export const EMAIL_FROM = 'sitio <hello@sitiostudio.com>';
export const EMAIL_INBOX = 'hello@sitiostudio.com';
