import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false }, { status: 400 })
    }

    const correct = process.env.REPORTS_PASSWORD ?? 'ReportsAccess2026'

    if (password.trim() !== correct.trim()) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('asf_reports_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })
    return response
  } catch {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
