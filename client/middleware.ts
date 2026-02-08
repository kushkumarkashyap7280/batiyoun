import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; 
import { env } from "@/config/env";
import { type TokenPayload , tokenPayloadSchema } from "@batiyoun/common";



export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)

  const publicRoutes = [
    '/',
    '/home',
    '/login',
    '/signup',
    '/api/auth/login',
    '/api/auth/logout',
    '/api/auth/signup',
    '/api/auth/google',
    '/api/auth/request-otp',
    '/api/auth/verify-otp',
    '/api/auth/check-username',
    '/api/auth/complete-signup',
    '/api/auth/verify-me',
    '/api/user',
  ]

  const adminRoutes = [
    '/api/admin',
  ]

  const access_token = request.cookies.get('access_token')
  let decoded: TokenPayload | null = null

  if (access_token) {
    try {
      const secret = new TextEncoder().encode(env.ACCESS_TOKEN_SECRET)
      const { payload } = await jwtVerify(access_token.value, secret)
      decoded = tokenPayloadSchema.parse(payload)
      requestHeaders.set('x-user-id', decoded.id)
      requestHeaders.set('x-user-email', decoded.email)
      requestHeaders.set('x-user-username', decoded.username)
      requestHeaders.set('x-user-admin', String(decoded.isAdmin))
    } catch {
      decoded = null
    }
  }

  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
  
  if (isPublicRoute) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  if (!decoded) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      )
    }
    const url = request.nextUrl.clone()
    url.pathname = '/'
    const response = NextResponse.redirect(url)
    response.cookies.delete('access_token')
    return response
  }

  const isAdminRoute = adminRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))
  
  if (isAdminRoute && !decoded.isAdmin) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon|icon|apple-icon|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}