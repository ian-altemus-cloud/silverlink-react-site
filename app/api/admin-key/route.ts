import { NextResponse } from 'next/server'

export async function GET() {
  const key = process.env.ADMIN_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'Admin key is not configured.' },
      { status: 500 },
    )
  }
  return NextResponse.json({ key })
}
