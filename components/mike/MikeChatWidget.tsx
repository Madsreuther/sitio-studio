'use client';

import * as React from 'react';
import { MikeAvatar, type MikeVariant } from './MikeAvatar';

// Mike chat widget. Drop into any surface; pass the matching
// `surface` prop. Handles session creation (with localStorage
// visitor_id), message send, polling for assistant replies,
// escalation banner, and minimised floating-bubble state.
//
// Aesthetic via `variant`:
//   'sitiostudio' — cream / earth (matches the marketing site)
//   'editor'      — cream / earth (matches the customer editor)
//   'admin'       — cyan / dark (preview from the admin if needed)
//
// Mount example for sitiostudio.com (sibling repo):
//   import { MikeChatWidget } from 'https://app.sitiostudio.com/...';
//   <MikeChatWidget surface="sitiostudio_com" variant="sitiostudio" apiBase="https://app.sitiostudio.com" />

const STORAGE_KEY = 'mike_visitor_id';

type Surface = 'sitiostudio_com' | 'customer_editor' | 'customer_site';
type Variant = 'sitiostudio' | 'editor' | 'admin';

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'operator';
  content: string;
  created_at: string;
  metadata?: { confidence?: string; tool_calls?: Array<{ kind: string }> } | null;
};

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readVisitorId(): string {
  if (typeof window === 'undefined') return '';
  let id = window.localStorage.getItem(STORAGE_KEY);
  if (!id) {
    id = uuid();
    window.localStorage.setItem(STORAGE_KEY, id);
  }
  return id;
}

function browserLanguage(): string {
  if (typeof navigator === 'undefined') return 'en';
  const n = navigator.language ?? 'en';
  return n.toLowerCase().split(/[-_]/, 1)[0] || 'en';
}

const VARIANT_STYLES: Record<Variant, { bubble: string; panel: string; header: string; user: string; assistant: string; input: string }> = {
  sitiostudio: {
    bubble:
      'bg-[#1A1814] text-[#F5F1EB] hover:bg-[#3C3830] shadow-[0_16px_32px_-16px_rgba(26,24,20,0.45)]',
    panel: 'bg-[#F5F1EB] text-[#1A1814] border border-[#D9D0BF] shadow-2xl',
    header: 'border-b border-[#D9D0BF] bg-[#FFF8EE]',
    user: 'bg-[#A57C52] text-[#FFF8EE]',
    assistant: 'bg-white text-[#1A1814] border border-[#D9D0BF]',
    input: 'bg-white border border-[#D9D0BF] text-[#1A1814] placeholder:text-[#6B6558]',
  },
  editor: {
    bubble:
      'bg-[#1A1814] text-[#F5F1EB] hover:bg-[#3C3830] shadow-[0_16px_32px_-16px_rgba(26,24,20,0.45)]',
    panel: 'bg-[#F5F1EB] text-[#1A1814] border border-[#D9D0BF] shadow-2xl',
    header: 'border-b border-[#D9D0BF] bg-[#FFF8EE]',
    user: 'bg-[#A57C52] text-[#FFF8EE]',
    assistant: 'bg-white text-[#1A1814] border border-[#D9D0BF]',
    input: 'bg-white border border-[#D9D0BF] text-[#1A1814] placeholder:text-[#6B6558]',
  },
  admin: {
    bubble: 'bg-[#0a1118] text-[#00d4ff] border border-[#00d4ff]/40 hover:bg-[#0f1a2e]',
    panel: 'bg-[#0a1118] text-[#f5f5f5] border border-[#00d4ff]/30 shadow-2xl',
    header: 'border-b border-[#1a2332] bg-[#000]',
    user: 'bg-[#00d4ff]/20 text-[#f5f5f5] border border-[#00d4ff]/40',
    assistant: 'bg-[#0f1a2e] text-[#f5f5f5] border border-[#1a2332]',
    input: 'bg-[#000] border border-[#1a2332] text-[#f5f5f5] placeholder:text-[#6b6558]',
  },
};

const AVATAR_VARIANT: Record<Variant, MikeVariant> = {
  sitiostudio: 'customer',
  editor: 'customer',
  admin: 'admin',
};

// Per-variant persona name. The marketing site (sitiostudio.com)
// uses James as the sales-side voice; editor and admin surfaces
// stay as Mads.
const PERSONA_NAME: Record<Variant, string> = {
  sitiostudio: 'James',
  editor: 'Mads',
  admin: 'Mads',
};

export function MikeChatWidget({
  surface,
  variant = 'sitiostudio',
  apiBase = '',
  draftId = null,
  customerEmail = null,
  greeting,
}: {
  surface: Surface;
  variant?: Variant;
  apiBase?: string;
  draftId?: string | null;
  customerEmail?: string | null;
  greeting?: string;
}) {
  const styles = VARIANT_STYLES[variant];
  const personaName = PERSONA_NAME[variant];
  const effectiveGreeting =
    greeting ?? `Hi, I'm ${personaName}. How can I help?`;
  const [open, setOpen] = React.useState(false);
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [escalated, setEscalated] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  const ensureSession = React.useCallback(async () => {
    if (sessionId) return sessionId;
    const visitor_id = readVisitorId();
    const language = browserLanguage();
    const r = await fetch(`${apiBase}/api/chat/sessions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        surface,
        visitor_id,
        draft_id: draftId,
        customer_email: customerEmail,
        language,
      }),
    });
    const body = await r.json();
    if (!r.ok) throw new Error(body.error ?? 'session create failed');
    setSessionId(body.session_id);
    setMessages([
      {
        id: 'greeting',
        role: 'assistant',
        content: effectiveGreeting,
        created_at: new Date().toISOString(),
      },
    ]);
    return body.session_id as string;
  }, [apiBase, customerEmail, draftId, effectiveGreeting, sessionId, surface]);

  React.useEffect(() => {
    if (!open) return;
    void ensureSession().catch(() => {});
  }, [open, ensureSession]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, sending]);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput('');
    try {
      const sid = await ensureSession();
      setMessages((m) => [
        ...m,
        {
          id: 'pending-' + Date.now(),
          role: 'user',
          content: text,
          created_at: new Date().toISOString(),
        },
      ]);
      const r = await fetch(`${apiBase}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sid, text }),
      });
      const body = await r.json();
      if (!r.ok) throw new Error(body.error ?? 'send failed');
      setMessages((m) => [
        ...m,
        {
          id: body.message_id ?? 'assist-' + Date.now(),
          role: 'assistant',
          content: body.text ?? '(no response)',
          created_at: new Date().toISOString(),
          metadata: { confidence: body.confidence, tool_calls: body.tool_calls },
        },
      ]);
      const wasEscalated =
        body.escalated === true ||
        (Array.isArray(body.tool_calls) &&
          body.tool_calls.some((t: { kind: string }) => t.kind === 'escalate'));
      if (wasEscalated) setEscalated(true);
    } catch (err) {
      setMessages((m) => [
        ...m,
        {
          id: 'err-' + Date.now(),
          role: 'system',
          content: '⚠ ' + (err as Error).message,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setSending(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${styles.bubble}`}
        aria-label="Open chat"
      >
        <MikeAvatar size={28} state="idle" variant={AVATAR_VARIANT[variant]} />
        <span>Chat with {personaName}</span>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-2rem)] rounded-2xl flex flex-col overflow-hidden ${styles.panel}`}
    >
      <header
        className={`flex items-center justify-between gap-2 px-4 py-3 ${styles.header}`}
      >
        <div className="flex items-center gap-2">
          <MikeAvatar size={32} state={sending ? 'typing' : 'idle'} variant={AVATAR_VARIANT[variant]} />
          <div className="leading-tight">
            <div className="text-sm font-semibold">{personaName} from sitio</div>
            <div className="text-[11px] opacity-70">
              {escalated ? 'Reply within 24h' : 'Usually replies in seconds'}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Minimise chat"
          className="text-sm opacity-70 hover:opacity-100"
        >
          ×
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.length === 0 && (
          <div className="text-xs opacity-60 text-center pt-12">
            Ask anything — pricing, timeline, what's included, or your specific draft.
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
              m.role === 'user'
                ? `ml-auto ${styles.user}`
                : m.role === 'system'
                  ? 'mx-auto text-xs opacity-70'
                  : styles.assistant
            }`}
          >
            {m.content}
          </div>
        ))}
        {sending && (
          <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${styles.assistant}`}>
            <span className="inline-flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse" />
              <span
                className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse"
                style={{ animationDelay: '0.15s' }}
              />
              <span
                className="w-1.5 h-1.5 rounded-full bg-current opacity-60 animate-pulse"
                style={{ animationDelay: '0.3s' }}
              />
            </span>
          </div>
        )}
      </div>

      {escalated && (
        <div className="px-4 py-2 text-xs border-t border-current/10 opacity-80">
          {personaName} will follow up by email within 24 hours.
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
        className="p-3 border-t border-current/10 flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          className={`flex-1 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-current/20 ${styles.input}`}
          disabled={sending}
        />
        <button
          type="submit"
          disabled={sending || !input.trim()}
          className={`px-3 py-2 rounded-md text-sm font-medium transition disabled:opacity-40 ${styles.bubble}`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
