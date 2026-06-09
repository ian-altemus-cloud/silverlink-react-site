export type OnboardingFieldKey =
  | 'business_name'
  | 'website'
  | 'business_type'
  | 'tone'
  | 'emoji_usage'
  | 'booking_system'
  | 'booking_link'
  | 'cancellation_policy'
  | 'escalation_contact'

export interface OnboardingOption {
  value: string
  label: string
  /** When chosen, reveal a custom free-text field instead of auto-advancing. */
  custom?: boolean
}

interface BaseStep {
  eyebrow: string
  title: string
  description: string
}

export interface InputStep extends BaseStep {
  kind: 'input'
  fields: {
    key: OnboardingFieldKey
    type: 'text' | 'url'
    placeholder: string
    required?: boolean
  }[]
}

export interface ChoiceStep extends BaseStep {
  kind: 'choice'
  key: OnboardingFieldKey
  options: OnboardingOption[]
  /** Whether selecting an option should auto-advance to the next step. */
  autoAdvance: boolean
  /** Free-text placeholder shown when a `custom` option is selected. */
  customPlaceholder?: string
}

export type OnboardingStep = InputStep | ChoiceStep

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    kind: 'input',
    eyebrow: 'Your Business',
    title: 'Tell us about your business.',
    description:
      'This is how your AI receptionist will introduce your business to clients.',
    fields: [
      {
        key: 'business_name',
        type: 'text',
        placeholder: 'Business name',
        required: true,
      },
      {
        key: 'website',
        type: 'url',
        placeholder: 'Website URL (e.g. yourbusiness.com)',
        required: true,
      },
    ],
  },
  {
    kind: 'choice',
    eyebrow: 'Your Business',
    title: 'What type of business do you run?',
    description:
      'This helps us configure your AI receptionist for your industry.',
    key: 'business_type',
    autoAdvance: true,
    options: [
      { value: 'beauty', label: 'Beauty' },
      { value: 'wellness', label: 'Wellness' },
      { value: 'coaching', label: 'Coaching' },
      { value: 'health', label: 'Health' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    kind: 'choice',
    eyebrow: 'Brand Voice',
    title: "How would you describe your brand's tone?",
    description: 'This shapes how your AI receptionist speaks to your clients.',
    key: 'tone',
    autoAdvance: true,
    options: [
      { value: 'warm', label: 'Warm' },
      { value: 'luxe', label: 'Luxe' },
      { value: 'practical', label: 'Practical' },
      { value: 'playful', label: 'Playful' },
    ],
  },
  {
    kind: 'choice',
    eyebrow: 'Brand Voice',
    title: 'How should your AI receptionist use emojis?',
    description: 'Keep it consistent with your brand personality.',
    key: 'emoji_usage',
    autoAdvance: true,
    options: [
      { value: 'none', label: 'None' },
      { value: 'subtle', label: 'Subtle. One per message.' },
      { value: 'expressive', label: 'Expressive. Sprinkled naturally.' },
    ],
  },
  {
    kind: 'choice',
    eyebrow: 'Booking',
    title: 'What booking system do you use?',
    description:
      'This determines how your AI receptionist handles availability checks.',
    key: 'booking_system',
    autoAdvance: true,
    options: [
      { value: 'zenoti', label: 'Zenoti' },
      { value: 'booksy', label: 'Booksy' },
      { value: 'fresha', label: 'Fresha' },
      { value: 'square', label: 'Square' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    kind: 'input',
    eyebrow: 'Booking',
    title: 'What is your booking link?',
    description:
      'Your AI receptionist will share this when clients are ready to book.',
    fields: [
      {
        key: 'booking_link',
        type: 'url',
        placeholder: 'https://booking.yourbusiness.com',
        required: true,
      },
    ],
  },
  {
    kind: 'choice',
    eyebrow: 'Policies',
    title: 'What is your cancellation policy?',
    description:
      'Your AI receptionist will communicate this clearly when clients are close to booking.',
    key: 'cancellation_policy',
    autoAdvance: false,
    customPlaceholder: 'Describe your cancellation policy…',
    options: [
      { value: '24 hours notice required', label: '24 hours notice' },
      { value: '48 hours notice required', label: '48 hours notice' },
      { value: '72 hours notice required', label: '72 hours notice' },
      { value: 'custom', label: 'Custom', custom: true },
    ],
  },
  {
    kind: 'input',
    eyebrow: 'Support',
    title: 'Where should your AI receptionist direct complex requests?',
    description:
      'A phone number or email your team monitors. Your AI receptionist uses this when a client needs a real person.',
    fields: [
      {
        key: 'escalation_contact',
        type: 'text',
        placeholder: 'info@yourbusiness.com or +1 (555) 000-0000',
        required: true,
      },
    ],
  },
]
