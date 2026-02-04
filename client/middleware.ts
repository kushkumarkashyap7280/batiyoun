import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, shouldRefreshToken, refreshToken } from "@/lib/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const response = NextResponse.next();

  // Skip middleware for public routes
  if (isPublicRoute(req.nextUrl.pathname)) {
    return response;
  }

  if (!token) {
    // Redirect to login if no token and accessing protected route
    if (isProtectedRoute(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return response;
  }

  try {
    // Verify the current token
    const payload = await verifyToken(token);

    // TODO: Check tokenVersion against database when we add that field
    // const user = await prisma.user.findUnique({
    //   where: { id: payload.userId },
    //   select: { tokenVersion: true }
    // });
    // if (payload.tokenVersion !== user?.tokenVersion) {
    //   throw new Error('Token version mismatch');
    // }

    // Check if token needs refresh (sliding session logic)
    if (shouldRefreshToken(payload)) {
      const newToken = await refreshToken(payload);
      
      // Set the new cookie silently
      response.cookies.set("session_token", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });
      
      console.log("🔄 Session Auto-Renewed for User:", payload.userId);
    }

    // Add user info to headers for API routes
    response.headers.set('x-user-id', payload.userId);
    response.headers.set('x-user-email', payload.email);
    response.headers.set('x-user-username', payload.username);

    return response;

  } catch (err) {
    console.error('Middleware token verification failed:', err);
    
    // Token is invalid or expired -> Clear it
    response.cookies.delete("session_token");
    
    if (isProtectedRoute(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    
    return response;
  }
}

function isPublicRoute(pathname: string): boolean {
  const publicRoutes = [
    '/login',
    '/signup',
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/otp',
    '/_next',
    '/favicon.ico',
    '/manifest.json',
  ];
  
  return publicRoutes.some(route => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/chats',
    '/profile',
    '/spaces',
    '/admin',
  ];
  
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json).*)',
  ],
};