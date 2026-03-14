import { createHash } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    // TEMP DEBUG — remove after confirming env var is correct
    const envPwd = process.env.EMPIRE_PASSWORD ?? ''
    console.log('[empire-auth] EMPIRE_PASSWORD first 3 chars:', JSON.stringify(envPwd.slice(0, 3)))
    console.log('[empire-auth] EMPIRE_PASSWORD length:', envPwd.length)
    console.log('[empire-auth] submitted password length:', password?.length ?? 0)

    if (!password || password !== process.env.EMPIRE_PASSWORD) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const secret = process.env.EMPIRE_SECRET ?? ''
    const hash = createHash('sha256').update(secret).digest('hex')

    const response = NextResponse.json({ success: true })
    response.cookies.set('empire_session', hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
