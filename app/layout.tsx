import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://silverlinkai.com'),
  title: 'SilverLink AI — A Managed AI Receptionist for Your Instagram.',
  description:
    'SilverLink AI handles your Instagram DMs 24/7 — answering questions, qualifying leads, and turning conversations into confirmed appointments while you focus on your clients.',
  robots: 'index, follow',
  alternates: { canonical: 'https://silverlinkai.com' },
  openGraph: {
    type: 'website',
    url: 'https://silverlinkai.com',
    title: 'SilverLink AI — A Managed AI Receptionist for Your Instagram.',
    description:
      'SilverLink AI handles your Instagram DMs 24/7 — answering questions, qualifying leads, and turning conversations into confirmed appointments.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilverLink AI — A Managed AI Receptionist for Your Instagram.',
    description:
      'AI-powered Instagram DM automation for local service businesses.',
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <Suspense fallback={null}>{children}</Suspense>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
