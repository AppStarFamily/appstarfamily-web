import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// bcrypt hash of "EmpireAdmin2026" (cost factor 12)
const PASSWORD_HASH = '$2b$12$tO8UnIXzeglzGm/LqNTxBuS8PLiodPukAygb94/HmH0Dzg2T1El.y'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { password } = body

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const match = await bcrypt.compare(password, PASSWORD_HASH)

    if (!match) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('empire_session', 'empire-authenticated', {
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
