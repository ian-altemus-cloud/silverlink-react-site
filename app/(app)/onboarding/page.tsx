import type { Metadata } from 'next'
import { OnboardingWizard } from '@/components/app/onboarding-wizard'

export const metadata: Metadata = {
  title: 'Setup — SilverLink AI',
  description: 'Configure your AI receptionist in a few quick steps.',
  robots: 'noindex, nofollow',
}

export default function OnboardingPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16">
      <OnboardingWizard />
    </div>
  )
}
