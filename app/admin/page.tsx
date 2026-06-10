import type { Metadata } from 'next'
import { AdminPanel } from '@/components/app/admin-panel'

export const metadata: Metadata = {
  title: 'Admin — SilverLink AI',
  robots: 'noindex, nofollow',
}

export default function AdminPage() {
  return <AdminPanel />
}
