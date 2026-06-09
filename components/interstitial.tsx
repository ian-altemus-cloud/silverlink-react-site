interface InterstitialProps {
  label: string
}

export function Interstitial({ label }: InterstitialProps) {
  return (
    <div className="flex items-center justify-center gap-8 border-y border-border bg-cream px-6 py-12">
      <span className="hidden h-px flex-1 bg-border sm:block" />
      <span className="font-serif text-xl font-normal italic text-muted-warm">
        {label}
      </span>
      <span className="hidden h-px flex-1 bg-border sm:block" />
    </div>
  )
}
