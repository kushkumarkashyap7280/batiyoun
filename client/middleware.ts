// middleware.ts - ONLY PROTECT API ROUTES
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; 
import { env } from "@/config/env";
import { type TokenPayload , tokenPayloadSchema } from "@batiyoun/common";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, assets, and service workers
  if (
    pathname.startsWith("/_next") || 
    pathname.startsWith("/api/auth") || 
    pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|woff2)$/) ||
    pathname === "/manifest.json" ||
    pathname === "/sw.js" ||
    pathname.startsWith("/workbox-")
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers)

  // Public API routes (no token needed)
  const publicApiRoutes = [
    '/api/auth/',
    '/api/user',
  ]

  const adminRoutes = [
    '/api/admin',
  ]

  const access_token = request.cookies.get('access_token')
  const refresh_token = request.cookies.get('refresh_token')
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
  }else if(pathname === '/api/auth/verify-me' && refresh_token){ 

    // 
     return NextResponse.next();

  }

  // ⚠️ ONLY PROTECT API ROUTES - Let client-side layouts handle page protection
  if (!pathname.startsWith('/api')) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  // Check if it's a public API route
  const isPublicApiRoute = publicApiRoutes.some(route => pathname.startsWith(route))
  
  if (isPublicApiRoute) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    })
  }

  // Protect private API routes
  if (!decoded) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  // Protect admin API routes
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  
  if (isAdminRoute && !decoded.isAdmin) {
    return NextResponse.json(
      { success: false, message: "Forbidden - Admin only" },
      { status: 403 }
    )
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