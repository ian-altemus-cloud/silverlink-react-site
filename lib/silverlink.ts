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
  if (!response.ok) throw new Error('Unable to authorize dashboard access.')
  const data = await response.json()
  return data.key as string
}

// ─── Instagram OAuth ───
// The original static site sends new clients to the SilverLink API to start the
// Instagram Business connection flow.
export const INSTAGRAM_CONNECT_URL = `${API_BASE}/auth/login`

// ─── Cognito session ───
const SESSION_KEY = 'sl_session'

export interface AuthSession {
  idToken: string
  email: string
  instagramAccountId: string | null
}

interface CognitoJwtPayload {
  email?: string
  'custom:instagram_account_id'?: string
  [key: string]: unknown
}

function decodeJwt(token: string): CognitoJwtPayload {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json) as CognitoJwtPayload
  } catch {
    return {}
  }
}

/**
 * Authenticate an existing client against AWS Cognito (USER_PASSWORD_AUTH),
 * mirroring the original static site. Returns a normalized session.
 */
export async function signIn(
  email: string,
  password: string,
): Promise<AuthSession> {
  const response = await fetch(COGNITO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
    },
    body: JSON.stringify({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: COGNITO_CLIENT_ID,
      AuthParameters: { USERNAME: email, PASSWORD: password },
    }),
  })

  const data = await response.json()
  if (!response.ok || !data?.AuthenticationResult?.IdToken) {
    throw new Error(data?.message || 'Incorrect email or password.')
  }

  const idToken = data.AuthenticationResult.IdToken as string
  const payload = decodeJwt(idToken)
  const session: AuthSession = {
    idToken,
    email: payload.email ?? email,
    instagramAccountId: payload['custom:instagram_account_id'] ?? null,
  }
  saveSession(session)
  return session
}

export function saveSession(session: AuthSession) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(SESSION_KEY)
}

export interface AccountInfo {
  username?: string
}

export async function fetchAccount(
  instagramAccountId: string,
): Promise<AccountInfo> {
  const key = await getDashboardKey()
  const resp = await fetch(
    `${API_BASE}/api/account?instagram_account_id=${encodeURIComponent(instagramAccountId)}`,
    { headers: { 'X-API-Key': key } },
  )
  if (!resp.ok) throw new Error('Unable to load account.')
  return (await resp.json()) as AccountInfo
}

export async function fetchMessages(
  instagramAccountId: string,
): Promise<{ messages: ChatMessage[]; userMap: Record<string, string> }> {
  const key = await getDashboardKey()
  const resp = await fetch(
    `${API_BASE}/api/messages?instagram_account_id=${encodeURIComponent(instagramAccountId)}`,
    { headers: { 'X-API-Key': key } },
  )
  if (!resp.ok) throw new Error('Unable to load messages.')
  const data = await resp.json()
  const messages: ChatMessage[] = data.messages || []

  const uniqueIds = [
    ...new Set(messages.map((m) => m.sender_id).filter(Boolean)),
  ] as string[]

  let userMap: Record<string, string> = {}
  if (uniqueIds.length) {
    try {
      const resolveResp = await fetch(
        `${API_BASE}/api/resolve-users?instagram_account_id=${encodeURIComponent(
          instagramAccountId,
        )}&user_ids=${uniqueIds.join(',')}`,
        { headers: { 'X-API-Key': key } },
      )
      const resolveData = await resolveResp.json()
      userMap = resolveData.users || {}
    } catch {
      userMap = {}
    }
  }

  return { messages, userMap }
}

export async function sendTestMessage(params: {
  recipientId: string
  message: string
  instagramAccountId: string
}): Promise<void> {
  const key = await getDashboardKey()
  const resp = await fetch(`${API_BASE}/api/send-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': key },
    body: JSON.stringify({
      recipient_id: params.recipientId,
      message_text: params.message,
      instagram_account_id: params.instagramAccountId,
    }),
  })
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}))
    throw new Error(data.error || 'Send failed.')
  }
}

export interface OnboardingPayload {
  instagram_account_id: string | null
  business_name: string
  website: string
  business_type: string
  tone: string
  emoji_usage: string
  booking_system: string
  booking_link: string
  cancellation_policy: string
  escalation_contact: string
}

export async function submitOnboarding(
  payload: OnboardingPayload,
): Promise<void> {
  const resp = await fetch(`${API_BASE}/api/tenant/onboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!resp.ok) {
    throw new Error(
      'Something went wrong. Please try again or contact info@silverlinkai.com.',
    )
  }
}
