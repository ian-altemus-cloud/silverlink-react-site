'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Logo } from '@/components/logo'
import {
  FieldLabel,
  FormAlert,
  TextField,
} from '@/components/app/form-fields'
import { INSTAGRAM_CONNECT_URL, signIn } from '@/lib/silverlink'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email.trim(), password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md border border-border bg-card p-8 md:p-10">
      <div className="mb-8 flex justify-center">
        <Logo variant="dark" />
      </div>

      {/* New client primary action */}
      <h1 className="text-balance text-3xl">Get Started</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Connect your Instagram Business account to activate your AI
        receptionist.
      </p>
      <a
        href={INSTAGRAM_CONNECT_URL}
        className="mt-5 flex w-full items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory transition-transform hover:-translate-y-px"
      >
        Get Started
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </a>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
        You will be redirected to Instagram to approve the connection. We only
        request permission to read and respond to DMs.
      </p>

      {/* Divider */}
      <div className="my-7 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Already a client?
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Existing client login */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <FormAlert>{error}</FormAlert>}
        <div>
          <FieldLabel htmlFor="login-email">Email</FieldLabel>
          <TextField
            id="login-email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <FieldLabel htmlFor="login-password">Password</FieldLabel>
          <TextField
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center border border-input px-6 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-cream disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
