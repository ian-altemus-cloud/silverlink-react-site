import type { Metadata } from 'next'
import { PricingTable } from '@/components/pricing/pricing-table'
import { FaqAccordion } from '@/components/pricing/faq-accordion'
import { CtaBand } from '@/components/cta-band'

export const metadata: Metadata = {
  title: 'Pricing — SilverLink AI',
  description:
    'Simple pricing, real ROI. Clients see a 27% improvement in booking conversions, most within the first 30 days.',
}

export default function PricingPage() {
  return (
    <>
      <section className="pt-36 pb-24 md:pt-44 md:pb-32">
        <PricingTable />
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <FaqAccordion />
        </div>
      </section>

      <CtaBand
        title="Questions we didn't answer?"
        subtitle="Book a 20-minute demo. We'll walk through exactly how SilverLink works for your specific business."
      />
    </>
  )
}
