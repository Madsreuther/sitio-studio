import { NextResponse } from 'next/server';
import { getResend, EMAIL_FROM, EMAIL_INBOX } from '@/lib/email/resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  name?: unknown;
  email?: unknown;
  business?: unknown;
  website?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — bots fill this; humans should not
};

// Loose email validation — real verification happens when they reply.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, maxLen: number): string | null {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, maxLen);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;

  // Honeypot: any value in `company` means a bot filled the hidden field.
  // We return a success-looking 200 so scrapers do not learn to vary.
  if (typeof body.company === 'string' && body.company.trim().length > 0) {
    return NextResponse.json({ received: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 180);
  const business = str(body.business, 180);
  const website = str(body.website, 300);
  const message = str(body.message, 5000);

  if (!name || !email || !business || !message) {
    return NextResponse.json(
      { error: 'name, email, business, and message are required' },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'please enter a valid email' }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    // Log-and-accept when the key is absent (dev, preview deploys without the
    // secret) so the form UX stays working. Operators will see the message
    // in Vercel logs.
    console.warn('[api/contact] RESEND_API_KEY unset — logging instead of sending', {
      name, email, business, website, message: message.slice(0, 200),
    });
    return NextResponse.json({ received: true, stubbed: true });
  }

  const subject = `New sitio enquiry — ${business}`;
  const plain = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business}`,
    website ? `Website: ${website}` : null,
    '',
    message,
  ]
    .filter(Boolean)
    .join('\n');
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #1A1814; max-width: 560px;">
      <h2 style="font-family: Georgia, 'Times New Roman', serif; font-size: 22px; margin: 0 0 16px;">
        New enquiry from ${escapeHtml(business)}
      </h2>
      <table style="border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 4px 16px 4px 0; color: #6B6558;">Name</td><td>${escapeHtml(name)}</td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6B6558;">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding: 4px 16px 4px 0; color: #6B6558;">Business</td><td>${escapeHtml(business)}</td></tr>
        ${website ? `<tr><td style="padding: 4px 16px 4px 0; color: #6B6558;">Website</td><td><a href="${escapeHtml(website)}">${escapeHtml(website)}</a></td></tr>` : ''}
      </table>
      <hr style="border: none; border-top: 1px solid #D9D0BF; margin: 20px 0;" />
      <p style="white-space: pre-wrap; font-size: 15px;">${escapeHtml(message)}</p>
    </div>
  `.trim();

  try {
    const { error } = await getResend().emails.send({
      from: EMAIL_FROM,
      to: EMAIL_INBOX,
      replyTo: email,
      subject,
      text: plain,
      html,
    });
    if (error) {
      console.error('[api/contact] resend error', error.message);
      return NextResponse.json({ error: 'mail delivery failed' }, { status: 502 });
    }
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[api/contact] unexpected', (err as Error).message);
    return NextResponse.json({ error: 'unexpected error' }, { status: 500 });
  }
}
