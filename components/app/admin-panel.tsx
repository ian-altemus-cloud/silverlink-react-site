'use client'
import { useEffect, useState } from 'react'
import {
  fetchTenants,
  activateTenant,
  type TenantRecord,
} from '@/lib/silverlink'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? ''

export function AdminPanel() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [tenants, setTenants] = useState<TenantRecord[]>([])
  const [selected, setSelected] = useState<TenantRecord | null>(null)
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      setError('Incorrect password.')
    }
  }

  useEffect(() => {
    if (!authed) return
    fetchTenants()
      .then(setTenants)
      .catch((e) => setError(e.message))
  }, [authed])

  function selectTenant(tenant: TenantRecord) {
    setSelected(tenant)
    setPrompt(tenant.system_prompt ?? '')
    setError(null)
    setSuccess(null)
  }

  async function handleActivate() {
    if (!selected) return
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      await activateTenant(selected.instagram_account_id, prompt)
      setSuccess(`${selected.username ?? selected.instagram_account_id} is now active.`)
      const updated = await fetchTenants()
      setTenants(updated)
      setSelected(updated.find(t => t.instagram_account_id === selected.instagram_account_id) ?? null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Activation failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm border border-border bg-card p-8">
          <h1 className="mb-6 text-2xl font-semibold text-charcoal">Admin</h1>
          {error && (
            <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="mb-4 w-full rounded border border-border bg-background px-4 py-3 text-sm outline-none focus:border-teal"
          />
          <button
            onClick={handleLogin}
            className="w-full rounded-full bg-teal py-3 text-sm font-semibold text-white"
          >
            Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="mb-8 text-3xl font-semibold text-charcoal">Admin Panel</h1>
      <div className="grid grid-cols-3 gap-6">
        {/* Tenant list */}
        <div className="col-span-1 border border-border bg-card">
          <div className="border-b border-border px-4 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Tenants
          </div>
          {tenants.map((t) => (
            <button
              key={t.instagram_account_id}
              onClick={() => selectTenant(t)}
              className={`w-full border-b border-border px-4 py-3 text-left transition-colors hover:bg-cream ${
                selected?.instagram_account_id === t.instagram_account_id
                  ? 'bg-cream'
                  : ''
              }`}
            >
              <p className="text-sm font-medium text-charcoal">
                {t.username ?? t.instagram_account_id}
              </p>
              <p className="text-xs text-muted-foreground">{t.business_name ?? 'No name'}</p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  t.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {t.status ?? 'unknown'}
              </span>
            </button>
          ))}
        </div>

        {/* Tenant detail */}
        <div className="col-span-2 border border-border bg-card p-6">
          {!selected ? (
            <p className="text-sm text-muted-foreground">Select a tenant to review.</p>
          ) : (
            <>
              <h2 className="mb-4 text-xl font-semibold text-charcoal">
                {selected.username ?? selected.instagram_account_id}
              </h2>

              {/* Onboarding answers */}
              <div className="mb-6 grid grid-cols-2 gap-3 rounded border border-border bg-background p-4 text-sm">
                {[
                  ['Business', selected.business_name],
                  ['Website', selected.website],
                  ['Type', selected.business_type],
                  ['Tone', selected.onboarding_tone],
                  ['Emoji', selected.emoji_usage],
                  ['Booking System', selected.booking_system],
                  ['Booking Link', selected.booking_link],
                  ['Cancellation', selected.cancellation_policy],
                  ['Escalation', selected.escalation_contact],
                  ['Status', selected.status],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="font-medium text-charcoal">{label}: </span>
                    <span className="text-muted-foreground">{value ?? 'Not set'}</span>
                  </div>
                ))}
              </div>

              {/* System prompt editor */}
              <div className="mb-4 flex items-center justify-between">
                <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  System Prompt
                </label>
                <button
                  onClick={handleActivate}
                  disabled={loading || !prompt.trim()}
                  className="rounded-full bg-teal px-8 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                  {loading ? 'Activating...' : 'Approve and Activate'}
                </button>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={16}
                className="mb-4 w-full rounded border border-border bg-background px-4 py-3 font-mono text-sm text-charcoal outline-none focus:border-teal"
              />

              {error && (
                <p className="mb-3 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
              {success && (
                <p className="mb-3 rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </p>
              )}


            </>
          )}
        </div>
      </div>
    </div>
  )
}
