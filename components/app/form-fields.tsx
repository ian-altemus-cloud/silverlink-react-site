'use client'

import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'

const baseFieldClass =
  'w-full border border-input bg-card px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted-foreground focus:border-charcoal'

export const FieldLabel = ({
  htmlFor,
  children,
}: {
  htmlFor: string
  children: React.ReactNode
}) => (
  <label
    htmlFor={htmlFor}
    className="mb-2 block text-[11px] font-medium uppercase tracking-[0.1em] text-charcoal"
  >
    {children}
  </label>
)

export const TextField = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function TextField({ className, ...props }, ref) {
  return (
    <input ref={ref} className={`${baseFieldClass} ${className ?? ''}`} {...props} />
  )
})

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function TextArea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`${baseFieldClass} resize-y leading-relaxed ${className ?? ''}`}
      {...props}
    />
  )
})

export function FormAlert({
  variant = 'error',
  children,
}: {
  variant?: 'error' | 'success'
  children: React.ReactNode
}) {
  const styles =
    variant === 'success'
      ? 'border-[#bbf7d0] bg-[#f0fdf4] text-[#16a34a]'
      : 'border-[#fecaca] bg-[#fef2f2] text-[#dc2626]'
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={`border px-4 py-3 text-sm ${styles}`}
    >
      {children}
    </div>
  )
}
