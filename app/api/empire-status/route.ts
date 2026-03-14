import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const STATUS_URL = 'https://learn-maui-roommate-license.trycloudflare.com/empire-status'
const STATUS_TOKEN = '733aca2e27413d1ce72ab711fd890a83abb9fe56e17575fa835cd55ae61a3609'

export async function GET() {
  try {
    const res = await fetch(STATUS_URL, {
      headers: {
        'X-Empire-Token': STATUS_TOKEN,
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
