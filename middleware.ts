import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected =
    pathname.startsWith('/empire/dashboard') || pathname.startsWith('/reports')

  if (isProtected) {
    const sessionCookie = request.cookies.get('empire_session')?.value
    if (sessionCookie !== 'empire-authenticated') {
      return NextResponse.redirect(new URL('/empire/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/empire/dashboard/:path*', '/reports/:path*'],
}
