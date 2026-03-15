import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Empire dashboard protection
  if (pathname.startsWith('/empire/dashboard')) {
    const sessionCookie = request.cookies.get('empire_session')?.value
    if (sessionCookie !== 'empire-authenticated') {
      return NextResponse.redirect(new URL('/empire/login', request.url))
    }
  }

  // Reports protection (exclude /reports/login itself)
  if (pathname.startsWith('/reports') && !pathname.startsWith('/reports/login')) {
    const reportsCookie = request.cookies.get('asf_reports_auth')?.value
    if (reportsCookie !== 'true') {
      return NextResponse.redirect(new URL('/reports/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/empire/dashboard/:path*', '/reports/:path*'],
}
