'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function ConnectedCard() {
  const router = useRouter()
  const params = useSearchParams()
  const username = params.get('username')
  const accountId = params.get('account_id')

  // Persist the account id so the onboarding flow can pick it up.
  useEffect(() => {
    if (accountId) sessionStorage.setItem('ob_account_id', accountId)
  }, [accountId])

  function startOnboarding() {
    router.push('/onboarding')
  }

  return (
    <div className="mx-auto w-full max-w-lg border border-border bg-card p-10 text-center md:p-12">
      <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cream">
        <Check className="h-6 w-6 text-charcoal" strokeWidth={1.5} aria-hidden="true" />
      </span>
      {username && (
        <p className="mb-2 text-sm text-muted-foreground">@{username}</p>
      )}
      <h1 className="text-balance text-3xl md:text-4xl">Instagram connected.</h1>
      <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-body">
        One more step. Tell us about your business so we can configure your AI
        receptionist specifically for you.
      </p>
      <button
        type="button"
        onClick={startOnboarding}
        className="mt-7 flex w-full items-center justify-center gap-2 bg-ink px-6 py-4 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory transition-transform hover:-translate-y-px"
      >
        Complete Setup
        <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
      </button>
      <p className="mt-4 text-xs text-muted-foreground">
        Takes about 3 minutes.
      </p>
    </div>
  )
}
