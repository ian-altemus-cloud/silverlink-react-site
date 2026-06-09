import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: "You're all set — SilverLink AI",
  robots: 'noindex, nofollow',
}

export default function OnboardingCompletePage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="mx-auto w-full max-w-lg border border-border bg-card p-10 text-center md:p-12">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-cream">
          <Sparkles
            className="h-6 w-6 text-charcoal"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </span>
        <h1 className="text-balance text-3xl md:text-4xl">You&apos;re all set.</h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-body">
          We are configuring your AI receptionist for your business. You will be
          live within 24 hours. We will reach out if we have any questions.
        </p>
        <p className="mt-6 text-sm text-muted-foreground">
          Questions?{' '}
          <a
            href="mailto:info@silverlinkai.com"
            className="text-charcoal underline underline-offset-4"
          >
            info@silverlinkai.com
          </a>
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex items-center justify-center border border-input px-7 py-3 text-[11px] font-medium uppercase tracking-[0.12em] text-ink transition-colors hover:bg-cream"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
