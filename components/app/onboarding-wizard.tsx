'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import {
  FormAlert,
  TextArea,
  TextField,
} from '@/components/app/form-fields'
import {
  ONBOARDING_STEPS,
  type OnboardingFieldKey,
} from '@/lib/onboarding-steps'
import { submitOnboarding } from '@/lib/silverlink'

type FormState = Partial<Record<OnboardingFieldKey, string>>

export function OnboardingWizard() {
  const router = useRouter()
  const totalSteps = ONBOARDING_STEPS.length
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState<FormState>({})
  const [customCancel, setCustomCancel] = useState('')
  const [showCustomCancel, setShowCustomCancel] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [accountId, setAccountId] = useState<string | null>(null)

  useEffect(() => {
    setAccountId(sessionStorage.getItem('ob_account_id'))
  }, [])

  const step = ONBOARDING_STEPS[stepIndex]
  const isLast = stepIndex === totalSteps - 1
  const progress = ((stepIndex + 1) / totalSteps) * 100

  const setValue = (key: OnboardingFieldKey, value: string) =>
    setValues((v) => ({ ...v, [key]: value }))

  function validate(): string | null {
    if (step.kind === 'input') {
      for (const field of step.fields) {
        if (field.required && !values[field.key]?.trim()) {
          return `Please enter your ${field.placeholder.toLowerCase().replace(/\s*\(.*\)/, '')}.`
        }
      }
      return null
    }
    // choice step
    const selected = values[step.key]
    if (!selected) return 'Please make a selection to continue.'
    if (selected === 'custom' && !customCancel.trim()) {
      return 'Please describe your cancellation policy.'
    }
    return null
  }

  function goNext() {
    const err = validate()
    if (err) {
      setError(err)
      return
    }
    setError(null)
    if (isLast) {
      void submit()
      return
    }
    setStepIndex((i) => i + 1)
  }

  function goBack() {
    setError(null)
    setStepIndex((i) => Math.max(0, i - 1))
  }

  function selectChoice(value: string, isCustom?: boolean) {
    if (step.kind !== 'choice') return
    setValue(step.key, value)
    setError(null)
    if (isCustom) {
      setShowCustomCancel(true)
      return
    }
    setShowCustomCancel(false)
    if (step.autoAdvance) {
      // Brief delay so the selection is visible before advancing.
      setTimeout(() => setStepIndex((i) => (i < totalSteps - 1 ? i + 1 : i)), 200)
    }
  }

  async function submit() {
    setSubmitting(true)
    setError(null)
    const cancelVal = values.cancellation_policy
    const cancellation =
      cancelVal === 'custom' ? customCancel.trim() : cancelVal ?? ''
    try {
      await submitOnboarding({
        instagram_account_id: accountId,
        business_name: values.business_name?.trim() ?? '',
        website: values.website?.trim() ?? '',
        business_type: values.business_type ?? '',
        tone: values.tone ?? '',
        emoji_usage: values.emoji_usage ?? '',
        booking_system: values.booking_system ?? '',
        booking_link: values.booking_link?.trim() ?? '',
        cancellation_policy: cancellation,
        escalation_contact: values.escalation_contact?.trim() ?? '',
      })
      sessionStorage.removeItem('ob_account_id')
      router.push('/onboarding/complete')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
      setSubmitting(false)
    }
  }

  // The next button is hidden on auto-advance choice steps (selection advances).
  const showNextButton = useMemo(() => {
    if (step.kind === 'input') return true
    return !step.autoAdvance
  }, [step])

  return (
    <div className="mx-auto w-full max-w-xl border border-border bg-card p-8 md:p-12">
      {/* Progress */}
      <div className="mb-10">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          <span>Setup</span>
          <span>
            Step {stepIndex + 1} of {totalSteps}
          </span>
        </div>
        <div
          className="h-1 w-full overflow-hidden bg-border"
          role="progressbar"
          aria-valuenow={stepIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
        >
          <div
            className="h-full bg-ink transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-silver2">
        {step.eyebrow}
      </p>
      <h1 className="text-balance text-2xl leading-snug md:text-3xl">
        {step.title}
      </h1>
      <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      <div className="mt-7">
        {step.kind === 'input' ? (
          <div className="flex flex-col gap-3.5">
            {step.fields.map((field) => (
              <TextField
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.key] ?? ''}
                onChange={(e) => setValue(field.key, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    goNext()
                  }
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {step.options.map((opt) => {
              const selected = values[step.key] === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => selectChoice(opt.value, opt.custom)}
                  aria-pressed={selected}
                  className={`w-full border px-4 py-3.5 text-left text-sm transition-colors ${
                    selected
                      ? 'border-charcoal bg-cream text-ink'
                      : 'border-input bg-card text-body hover:border-charcoal'
                  }`}
                >
                  {opt.label}
                </button>
              )
            })}
            {showCustomCancel && (
              <TextArea
                className="mt-1 min-h-[100px]"
                placeholder={step.customPlaceholder}
                value={customCancel}
                onChange={(e) => setCustomCancel(e.target.value)}
              />
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex gap-3">
        {stepIndex > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="flex flex-1 items-center justify-center gap-2 border border-input px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-cream"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            Back
          </button>
        )}
        {showNextButton && (
          <button
            type="button"
            onClick={goNext}
            disabled={submitting}
            className="flex flex-[2] items-center justify-center gap-2 bg-ink px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ivory transition-transform hover:-translate-y-px disabled:opacity-60"
          >
            {submitting
              ? 'Configuring your AI receptionist…'
              : isLast
                ? 'Submit'
                : 'Continue'}
            {!submitting && !isLast && (
              <ArrowRight
                className="h-4 w-4"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="mt-4">
          <FormAlert>{error}</FormAlert>
        </div>
      )}
    </div>
  )
}
