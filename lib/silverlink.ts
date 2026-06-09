// SilverLink AI — external service configuration.
// These mirror the original static site's integration with AWS Cognito and the
// SilverLink API. Values can be overridden via NEXT_PUBLIC_* env vars.

export const COGNITO_CLIENT_ID =
  process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? '7330g8oifj1ankuqu36p6qi7he'
export const COGNITO_REGION =
  process.env.NEXT_PUBLIC_COGNITO_REGION ?? 'us-east-1'
export const COGNITO_URL = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? 'https://api.silverlinkai.com'

export interface ChatMessage {
  sender_id?: string
  role: string
  content: string
}

export async function getDashboardKey(): Promise<string> {
  const response = await fetch('/api/dashboard-key')
  const data = await response.json()
  return data.key as string
}
