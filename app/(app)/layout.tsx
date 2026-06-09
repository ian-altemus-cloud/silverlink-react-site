import type { ReactNode } from 'react'

// Minimal top bar for the authenticated / auth-flow area. Unlike the marketing
// SiteNav, this is a clean ivory bar with just the brand and an optional slot.
import { Logo } from '@/components/logo'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-ivory">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center px-6 md:px-10">
          <Logo variant="dark" />
        </div>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
