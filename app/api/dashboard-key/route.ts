import { NextResponse } from 'next/server'

// Returns the dashboard API key used to authorize calls to the SilverLink API.
// The key is kept server-side and never shipped in the client bundle.
export async function GET() {
  const key =
    process.env.DASHBOARD_API_KEY ?? process.env.SILVERLINK_DASHBOARD_KEY

  if (!key) {
    return NextResponse.json(
      { error: 'Dashboard key is not configured.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ key })
}
