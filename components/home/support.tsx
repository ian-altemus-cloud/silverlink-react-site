import { Reveal } from '@/components/reveal'
import { Mail, Phone, Zap } from 'lucide-react'

const ITEMS = [
  {
    icon: Mail,
    title: 'Direct email support',
    text: 'info@silverlinkai.com — we respond same day',
  },
  {
    icon: Phone,
    title: 'Phone support',
    text: 'Real people, same day response',
  },
  {
    icon: Zap,
    title: 'Dedicated onboarding',
    text: 'Live within 72 hours of signup',
  },
]

export function Support() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Support</p>
            </Reveal>
            <Reveal delay={60}>
              <h2 className="mt-5 max-w-md text-balance text-4xl md:text-5xl">
                We don&apos;t hand you a login and disappear.
              </h2>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <p className="leading-relaxed text-muted-foreground">
                Every client gets a dedicated onboarding call, a custom setup
                built for their business, and direct access to our support team.
                If something isn&apos;t working, you reach someone who knows the
                system — not a ticket queue.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-col gap-7">
              {ITEMS.map((item, i) => {
                const Icon = item.icon
                return (
                  <Reveal
                    key={item.title}
                    delay={i * 80}
                    className="flex items-start gap-5"
                  >
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-border">
                      <Icon
                        className="h-[18px] w-[18px] text-charcoal"
                        strokeWidth={1.4}
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-ink">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
