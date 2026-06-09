import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ConnectedCard } from '@/components/app/connected-card'

export const metadata: Metadata = {
  title: 'Instagram Connected — SilverLink AI',
  robots: 'noindex, nofollow',
}

export default function ConnectedPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <Suspense fallback={null}>
        <ConnectedCard />
      </Suspense>
    </div>
  )
}
