import type { Metadata } from 'next'
import { Hero } from '@/components/home/hero'
import { StatStrip } from '@/components/home/stat-strip'
import { ProblemSplit } from '@/components/home/problem-split'
import { Interstitial } from '@/components/interstitial'
import { Features } from '@/components/home/features'
import { QuoteSection } from '@/components/quote-section'
import { SoftCloseSplit } from '@/components/home/soft-close-split'
import { Markets } from '@/components/home/markets'
import { Support } from '@/components/home/support'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'SilverLink AI — A Managed AI Receptionist for Your Instagram.',
  description:
    'SilverLink AI handles your Instagram DMs 24/7 — answering questions, qualifying leads, and turning conversations into confirmed appointments.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatStrip />
      <ProblemSplit />
      <Interstitial label="Built to Convert" />
      <Features />
      <QuoteSection
        quote="SilverLink responded to my clients faster than I ever could. My bookings went up and I stopped worrying about my DMs."
        author="Elena"
        detail="Owner, Secretive Nail Bar · Newport Beach"
      />
      <SoftCloseSplit />
      <Markets />
      <Support />
      <CtaBand
        title="Ready to stop missing bookings?"
        subtitle="Most clients are live within 72 hours. Book a free demo and we'll show you exactly how it works for your business."
      />
    </>
  )
}
