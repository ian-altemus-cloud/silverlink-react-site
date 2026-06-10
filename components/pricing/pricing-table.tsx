'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Billing = 'monthly' | 'annual'

const TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    monthly: '$147',
    annual: '$117',
    sub: '500 AI-handled messages per month',
    features: [
      '24/7 automated message responses',
      'Custom AI voice configuration',
      'Conversation logging to Google Sheets',
      'Booking link soft-close logic',
      'Single location',
      'Direct email and phone support',
    ],
    featured: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    monthly: '$247',
    annual: '$197',
    sub: '1,500 AI-handled messages per month',
    features: [
      'Everything in Starter',
      'Intelligent lead qualification',
      'Up to 3 locations',
      'Monthly performance report',
      'Priority support',
      'Quarterly prompt review',
    ],
    featured: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    monthly: '$447',
    annual: '$357',
    sub: '5,000 AI-handled messages per month',
    features: [
      'Everything in Growth',
      'Up to 5 locations',
      'Custom integrations',
      'Dedicated support line',
      'Quarterly business review',
      'Early feature access',
    ],
    featured: false,
  },
]

export function PricingTable() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-10">
      <div className="mx-auto mb-16 max-w-xl text-center">
        <Reveal>
          <p className="eyebrow eyebrow-center">Pricing</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-5 text-5xl md:text-6xl">
            Simple pricing.{' '}
            <em className="font-light italic text-silver2">Real ROI.</em>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Clients see a 27% improvement in booking conversions. Most see it in
            the first 30 days.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-8 inline-flex border border-border">
            <button
              type="button"
              onClick={() => setBilling('monthly')}
              className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors"
              style={{
                background: billing === 'monthly' ? 'var(--ink)' : 'transparent',
                color: billing === 'monthly' ? 'var(--ivory)' : 'var(--muted2)',
              }}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling('annual')}
              className="px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors"
              style={{
                background: billing === 'annual' ? 'var(--ink)' : 'transparent',
                color: billing === 'annual' ? 'var(--ivory)' : 'var(--muted2)',
              }}
            >
              Annual&nbsp;
              <span className="text-[9px] text-silver2">Save 20%</span>
            </button>
          </div>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-6 font-serif text-base italic text-muted-foreground">
            &ldquo;82% of online clients book with the business that responds
            first.&rdquo;
          </p>
        </Reveal>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {TIERS.map((tier, i) => {
          const price = billing === 'annual' ? tier.annual : tier.monthly
          const period =
            billing === 'annual' ? '/mo billed annually' : '/mo'
          return (
            <Reveal
              key={tier.id}
              delay={i * 80}
              className={`relative p-10 transition-all hover:-translate-y-1 ${
                tier.featured
                  ? 'bg-ink'
                  : 'border border-border bg-card hover:shadow-[0_12px_48px_rgba(13,12,10,0.14)]'
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-silver px-4 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-ink">
                  Most Popular
                </span>
              )}
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  color: tier.featured ? 'rgba(250,247,242,0.35)' : 'var(--muted-warm)',
                }}
              >
                {tier.name}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="font-serif text-6xl font-normal leading-none"
                  style={{ color: tier.featured ? 'var(--silver)' : 'var(--ink)' }}
                >
                  {price}
                </span>
                <span
                  className="text-sm font-light"
                  style={{
                    color: tier.featured
                      ? 'rgba(250,247,242,0.3)'
                      : 'var(--muted-warm)',
                  }}
                >
                  {period}
                </span>
              </div>
              <p
                className="mt-3 text-xs"
                style={{
                  color: tier.featured
                    ? 'rgba(250,247,242,0.3)'
                    : 'var(--muted-warm)',
                }}
              >
                {tier.sub}
              </p>
              <hr
                className="my-6"
                style={{
                  borderColor: tier.featured
                    ? 'rgba(250,247,242,0.08)'
                    : 'var(--border)',
                }}
              />
              <ul className="flex flex-col gap-3">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm leading-snug"
                    style={{
                      color: tier.featured
                        ? 'rgba(250,247,242,0.7)'
                        : 'var(--body)',
                    }}
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      style={{
                        color: tier.featured ? 'var(--silver)' : 'var(--silver2)',
                      }}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-9 block w-full py-4 text-center text-[10px] font-bold uppercase tracking-[0.14em] transition-all hover:-translate-y-px"
                style={
                  tier.featured
                    ? { background: 'var(--silver)', color: 'var(--ink)' }
                    : {
                        background: 'transparent',
                        color: 'var(--ink)',
                        border: '1px solid var(--border)',
                      }
                }
              >
                Book a Free Demo
              </Link>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          <strong>$297 one-time setup fee</strong>, covers full onboarding, AI
          voice configuration, integration, testing, and a 30-day check-in call.
          <br />
          Overage: $0.10 per message over monthly limit. No long-term contracts.
        </p>
      </Reveal>
    </div>
  )
}
