import type { Metadata } from 'next'
import { LoginForm } from '@/components/app/login-form'

export const metadata: Metadata = {
  title: 'Login — SilverLink AI',
  description:
    'Sign in to your SilverLink AI dashboard or connect your Instagram Business account to get started.',
  robots: 'noindex, nofollow',
}

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <LoginForm />
    </div>
  )
}
