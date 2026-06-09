import { Reveal } from '@/components/reveal'

export function SoftCloseSplit() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="order-2 flex flex-col justify-center px-6 py-20 md:px-16 lg:order-1 lg:py-28">
        <Reveal>
          <p className="eyebrow">Soft Close Logic</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="mt-5 text-balance text-4xl md:text-5xl">
            Built to convert. From the first &ldquo;Hello.&rdquo;
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
            Most AI assistants just answer questions. SilverLink drives
            decisions. From the moment a client messages, the system begins a
            progressive conversion flow — surfacing availability and building
            trust while the lead is still hot.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-6 max-w-md font-serif text-lg italic leading-relaxed text-charcoal">
            Whether it&apos;s a price check or a scheduling question, SilverLink
            recognizes the buying window and guides. Your booking link appears
            naturally at the exact moment the client is ready to commit.
          </p>
        </Reveal>
      </div>
      <div
        className="order-1 min-h-[360px] bg-cover bg-center lg:order-2 lg:min-h-full"
        style={{ backgroundImage: "url('/images/softclose.png')" }}
        aria-hidden="true"
      />
    </section>
  )
}
