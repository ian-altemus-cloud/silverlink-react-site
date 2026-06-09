import type { Metadata } from 'next'
import { Dashboard } from '@/components/app/dashboard'

export const metadata: Metadata = {
  title: 'Dashboard — SilverLink AI',
  description: 'Manage your Instagram conversations and AI receptionist.',
  robots: 'noindex, nofollow',
}

export default function DashboardPage() {
  return <Dashboard />
}
