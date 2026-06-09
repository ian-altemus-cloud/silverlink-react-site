'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import {
  FieldLabel,
  FormAlert,
  TextArea,
  TextField,
} from '@/components/app/form-fields'
import {
  clearSession,
  fetchAccount,
  fetchMessages,
  getSession,
  sendTestMessage,
  type AuthSession,
  type ChatMessage,
} from '@/lib/silverlink'

interface RecipientOption {
  id: string
  label: string
}

export function Dashboard() {
  const router = useRouter()
  const [session, setSession] = useState<AuthSession | null>(null)
  const [handle, setHandle] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [userMap, setUserMap] = useState<Record<string, string>>({})
  const [recipients, setRecipients] = useState<RecipientOption[]>([])
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [messagesError, setMessagesError] = useState<string | null>(null)

  const [recipient, setRecipient] = useState('')
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const [sendSuccess, setSendSuccess] = useState<string | null>(null)

  const initialized = useRef(false)

  const loadMessages = useCallback(async (accountId: string) => {
    setLoadingMessages(true)
    setMessagesError(null)
    try {
      const { messages: msgs, userMap: map } = await fetchMessages(accountId)
      setMessages(msgs)
      setUserMap(map)
      const ids = [
        ...new Set(msgs.map((m) => m.sender_id).filter(Boolean)),
      ] as string[]
      setRecipients(ids.map((id) => ({ id, label: map[id] || id })))
    } catch (err) {
      setMessagesError(
        err instanceof Error ? err.message : 'Unable to load messages.',
      )
    } finally {
      setLoadingMessages(false)
    }
  }, [])

  // Guard the route and bootstrap data.
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const current = getSession()
    if (!current) {
      router.replace('/login')
      return
    }
    setSession(current)
    setHandle(current.email)

    if (current.instagramAccountId) {
      const accountId = current.instagramAccountId
      void loadMessages(accountId)
      fetchAccount(accountId)
        .then((acc) => {
          if (acc.username) setHandle(acc.username)
        })
        .catch(() => {
          /* fall back to email */
        })
    } else {
      setLoadingMessages(false)
      setMessagesError(
        'No Instagram account is connected to this login yet. Complete setup to start receiving messages.',
      )
    }
  }, [router, loadMessages])

  function handleSignOut() {
    clearSession()
    router.push('/login')
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    setSendError(null)
    setSendSuccess(null)

    if (!recipient.trim() || !draft.trim()) {
      setSendError('Recipient and message are required.')
      return
    }
    if (!session?.instagramAccountId) {
      setSendError('No Instagram account connected.')
      return
    }

    setSending(true)
    try {
      await sendTestMessage({
        recipientId: recipient.trim(),
        message: draft.trim(),
        instagramAccountId: session.instagramAccountId,
      })
      setSendSuccess('Message sent successfully.')
      setDraft('')
      void loadMessages(session.instagramAccountId)
    } catch (err) {
      setSendError(err instanceof Error ? err.message : 'Send failed.')
    } finally {
      setSending(false)
    }
  }

  const accountId = session?.instagramAccountId ?? ''

  return (
    <div className="flex-1">
      {/* Dashboard sub-header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-10">
          <h1 className="font-serif text-xl font-medium text-ink">
            SilverLink Dashboard
          </h1>
          <div className="flex items-center gap-4">
            {handle && (
              <span className="text-sm text-muted2">
                {handle.startsWith('@') || handle.includes('@')
                  ? handle
                  : `@${handle}`}
              </span>
            )}
            <button
              type="button"
              onClick={handleSignOut}
              className="border border-input px-5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-cream"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:px-10 lg:grid-cols-[1fr_400px]">
        {/* Message history */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl">Message History</h2>
            <button
              type="button"
              onClick={() => accountId && loadMessages(accountId)}
              disabled={!accountId || loadingMessages}
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-ink disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingMessages ? 'animate-spin' : ''}`}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Refresh
            </button>
          </div>

          <div className="border border-border bg-card">
            <div className="grid grid-cols-[140px_72px_1fr] gap-4 border-b border-border px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              <span>Sender</span>
              <span>Role</span>
              <span>Message</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {loadingMessages ? (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">
                  Loading messages…
                </p>
              ) : messagesError ? (
                <p className="px-5 py-10 text-center text-sm text-[#dc2626]">
                  {messagesError}
                </p>
              ) : messages.length === 0 ? (
                <p className="px-5 py-10 text-center text-sm text-muted-foreground">
                  No messages yet.
                </p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={`${m.sender_id ?? 'x'}-${i}`}
                    className="grid grid-cols-[140px_72px_1fr] items-start gap-4 border-b border-[var(--border)] px-5 py-3.5 last:border-b-0"
                  >
                    <span className="truncate text-xs font-medium text-muted2">
                      {userMap[m.sender_id ?? ''] || m.sender_id || '—'}
                    </span>
                    <span
                      className={`w-fit whitespace-nowrap px-2.5 py-1 text-[11px] font-medium ${
                        m.role === 'assistant'
                          ? 'bg-cream text-charcoal'
                          : 'bg-warm text-muted2'
                      }`}
                    >
                      {m.role}
                    </span>
                    <span className="text-sm leading-relaxed text-body">
                      {m.content}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Send message */}
        <section className="border border-border bg-card p-7">
          <h2 className="mb-5 text-xl">Send Message</h2>
          <form onSubmit={handleSend} className="flex flex-col gap-4">
            {sendError && <FormAlert>{sendError}</FormAlert>}
            {sendSuccess && (
              <FormAlert variant="success">{sendSuccess}</FormAlert>
            )}
            <div>
              <FieldLabel htmlFor="send-account">Instagram Account</FieldLabel>
              <TextField
                id="send-account"
                readOnly
                value={handle || accountId}
                className="bg-cream text-muted2"
              />
            </div>
            <div>
              <FieldLabel htmlFor="send-recipient">Recipient</FieldLabel>
              {recipients.length > 0 ? (
                <select
                  id="send-recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full border border-input bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-charcoal"
                >
                  <option value="">Select a recipient</option>
                  {recipients.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              ) : (
                <TextField
                  id="send-recipient"
                  placeholder="Instagram user ID"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              )}
            </div>
            <div>
              <FieldLabel htmlFor="send-message">Message</FieldLabel>
              <TextArea
                id="send-message"
                rows={4}
                placeholder="Type your message…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="flex w-full items-center justify-center bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory transition-transform hover:-translate-y-px disabled:opacity-60"
            >
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
