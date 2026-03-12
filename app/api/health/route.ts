import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json({
    resend_key_set: !!process.env.RESEND_API_KEY,
    resend_key_length: process.env.RESEND_API_KEY?.length ?? 0,
    resend_key_prefix: process.env.RESEND_API_KEY?.slice(0, 6) ?? 'none',
    node_env: process.env.NODE_ENV,
  })
}
