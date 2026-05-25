import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const protectedPaths = ['/dashboard', '/shorts', '/posting']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))
  const isLoggedIn = !!req.auth

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === '/login' && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
