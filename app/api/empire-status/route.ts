import { NextResponse } from 'next/server'
import https from 'https'

export const dynamic = 'force-dynamic'

const STATUS_URL = 'https://100.103.172.60:7823/empire-status?token=733aca2e27413d1ce72ab711fd890a83abb9fe56e17575fa835cd55ae61a3609'

const agent = new https.Agent({ rejectUnauthorized: false })

export async function GET() {
  try {
    const res = await fetch(STATUS_URL, {
      // @ts-ignore — Node.js https agent to bypass self-signed cert
      agent,
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
