import type { Metadata } from 'next'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Privacy & Terms — SilverLink AI',
  description: 'SilverLink AI privacy policy and terms of service.',
}

const PRIVACY = [
  {
    h: 'Information We Collect',
    p: "We collect Instagram user IDs provided by Meta, message content, and timestamps transmitted through Instagram Direct Messages via Meta's official Messaging API, solely on behalf of authorized business accounts.",
  },
  {
    h: 'Business Customers vs. End Users',
    p: 'We act as a data processor on behalf of business customers. End users have their message content processed solely to generate real-time responses within that conversation. We do not independently use, sell, or profile end-user data.',
  },
  {
    h: 'How We Use Information',
    p: 'Conversation data is used solely to generate real-time responses within the active conversation. It is not used for AI model training, advertising, or any secondary purpose.',
  },
  {
    h: 'Data Storage and Security',
    p: 'Conversation data is stored securely on Amazon Web Services (AWS) infrastructure within the United States, with encryption at rest and in transit.',
  },
  {
    h: 'Data Retention',
    p: 'Conversation data is automatically deleted after 90 days.',
  },
  {
    h: 'Data Deletion',
    p: 'To request deletion of your data, email privacy@silverlinkai.com with your Instagram username. Requests are processed within 30 days.',
  },
  {
    h: 'Contact',
    p: 'Questions? Reach us at privacy@silverlinkai.com.',
  },
]

const TERMS = [
  {
    h: 'Use of Service',
    p: "SilverLink AI provides AI-powered Instagram Direct Message automation for business clients. You agree to use our services only for lawful purposes and in accordance with Meta's Platform Terms.",
  },
  {
    h: 'Payment and Billing',
    p: 'Subscription fees are billed monthly. All fees are non-refundable except as required by law. We reserve the right to modify pricing with 30 days notice to existing clients.',
  },
  {
    h: 'Termination',
    p: 'Either party may terminate the service agreement with 30 days written notice.',
  },
  {
    h: 'Governing Law',
    p: 'These terms are governed by the laws of the State of California. Any disputes shall be resolved in the courts of Orange County, California.',
  },
  {
    h: 'Contact',
    p: 'Questions? Reach us at info@silverlinkai.com.',
  },
]

function LegalSection({
  id,
  title,
  updated,
  items,
}: {
  id: string
  title: string
  updated: string
  items: { h: string; p: string }[]
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <Reveal>
        <h1 className="text-4xl md:text-5xl">{title}</h1>
      </Reveal>
      <Reveal delay={40}>
        <p className="mt-3 text-xs text-muted-foreground">{updated}</p>
      </Reveal>
      <div className="mt-10 flex flex-col gap-8">
        {items.map((item) => (
          <Reveal key={item.h}>
            <h2 className="font-serif text-xl">{item.h}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">
              {item.p}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export default function LegalPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="mx-auto max-w-3xl px-6">
        <LegalSection
          id="privacy"
          title="Privacy Policy"
          updated="Last updated: April 10, 2026"
          items={PRIVACY}
        />
        <hr className="my-16 border-border" />
        <LegalSection
          id="terms"
          title="Terms of Service"
          updated="Last updated: April 8, 2026"
          items={TERMS}
        />
      </div>
    </section>
  )
}
