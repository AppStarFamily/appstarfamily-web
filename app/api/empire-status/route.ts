import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const statusUrl = process.env.EMPIRE_STATUS_URL
  const statusToken = process.env.EMPIRE_STATUS_TOKEN

  if (!statusUrl) {
    return NextResponse.json({ error: 'EMPIRE_STATUS_URL not configured' }, { status: 500 })
  }

  try {
    const res = await fetch(statusUrl, {
      headers: {
        'X-Empire-Token': statusToken ?? '',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}`, agents: {}, crons: {}, lessons: [] },
        { status: 200 }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { error: message, agents: {}, crons: {}, lessons: [] },
      { status: 200 }
    )
  }
}
