import { NextRequest, NextResponse } from 'next/server'

async function sha256hex(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/empire/dashboard')) {
    const sessionCookie = request.cookies.get('empire_session')?.value
    const secret = process.env.EMPIRE_SECRET ?? ''
    const expectedHash = await sha256hex(secret)

    if (sessionCookie !== expectedHash) {
      return NextResponse.redirect(new URL('/empire/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/empire/dashboard/:path*'],
}
