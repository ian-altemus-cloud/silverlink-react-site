import { NextResponse } from 'next/server'

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? 'https://api.silverlinkai.com'

// Proxies an Instagram token request to the SilverLink API using the
// server-side dashboard key, mirroring the original static site's /api/ig-token.
export async function POST(request: Request) {
  const key =
    process.env.DASHBOARD_API_KEY ?? process.env.SILVERLINK_DASHBOARD_KEY

  if (!key) {
    return NextResponse.json(
      { error: 'Dashboard key is not configured.' },
      { status: 500 },
    )
  }

  let body: { instagram_account_id?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const resp = await fetch(`${API_BASE}/api/ig-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': key },
    body: JSON.stringify({ instagram_account_id: body.instagram_account_id }),
  })

  const data = await resp.json().catch(() => ({}))
  return NextResponse.json(data, { status: resp.status })
}
