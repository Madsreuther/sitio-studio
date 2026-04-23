'use client';

import * as React from 'react';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState<string | null>(null);

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-md border border-[var(--color-rule)] bg-[var(--color-cream-deep)] p-8 md:p-10 text-center"
      >
        <h2 className="font-[var(--font-serif)] text-[30px] md:text-[36px] leading-[1.1] tracking-[-0.01em] text-[var(--color-ink)]">
          Thank you.
        </h2>
        <p className="mt-4 text-[16px] leading-[1.7] text-[var(--color-ink-soft)] max-w-[48ch] mx-auto">
          We received your note and will reply within 24 hours. In the
          meantime, look out for an email from
          hello@sitiostudio.com — sometimes it lands in promotions.
        </p>
      </div>
    );
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus('submitting');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = (await r.json().catch(() => ({}))) as { error?: string };
      if (!r.ok) throw new Error(body.error ?? `contact ${r.status}`);
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError((err as Error).message);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid grid-cols-1 gap-5 rounded-md border border-[var(--color-rule)] bg-[var(--color-cream)] p-6 md:p-10"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Business name" name="business" required />
        <Field
          label="Current website (optional)"
          name="website"
          placeholder="https://"
          type="url"
        />
      </div>
      <FieldTextarea
        label="Tell us about your business"
        name="message"
        rows={6}
        required
        placeholder="What do you do? What is not working about your current site? (A few lines is plenty.)"
      />

      {/* honeypot — bots fill this, humans do not see it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      {error ? (
        <p className="text-[14px] text-red-700 bg-red-50 border border-red-200 rounded-md px-4 py-3">
          Something went wrong: {error}. Email us directly at{' '}
          <a className="underline" href="mailto:hello@sitiostudio.com">
            hello@sitiostudio.com
          </a>{' '}
          and we&apos;ll pick it up.
        </p>
      ) : null}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.6] max-w-[40ch]">
          By submitting, you agree we may reply by email. No mailing list, no
          tracking pixel, no noise.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center h-12 px-7 rounded-full bg-[var(--color-ink)] text-[var(--color-cream)] text-[15px] font-medium hover:bg-[var(--color-ink-soft)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-2">
        {label}
        {required ? <span className="text-[var(--color-earth)]"> *</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-12 px-4 bg-[var(--color-cream-deep)]/70 border border-[var(--color-rule)] rounded-md text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]/60 focus:border-[var(--color-ink)] focus:bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]/10 transition-colors"
      />
    </label>
  );
}

function FieldTextarea({
  label,
  name,
  rows = 4,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] uppercase tracking-[0.18em] text-[var(--color-ink-muted)] mb-2">
        {label}
        {required ? <span className="text-[var(--color-earth)]"> *</span> : null}
      </span>
      <textarea
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-[var(--color-cream-deep)]/70 border border-[var(--color-rule)] rounded-md text-[15px] leading-[1.65] text-[var(--color-ink)] placeholder:text-[var(--color-ink-muted)]/60 focus:border-[var(--color-ink)] focus:bg-[var(--color-cream)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ink)]/10 transition-colors resize-y"
      />
    </label>
  );
}
