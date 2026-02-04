import { NextRequest, NextResponse } from 'next/server';
import { google, getGoogleUser } from '@/lib/google-oauth';
import { cookies } from 'next/headers';
import { createToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import { generateUsername } from '@/lib/signup-flow';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    
    const cookieStore = await cookies();
    const storedState = cookieStore.get('google_oauth_state')?.value;
    const storedCodeVerifier = cookieStore.get('google_code_verifier')?.value;

    // Verify state parameter (CSRF protection)
    if (!code || !state || !storedState || !storedCodeVerifier) {
      return NextResponse.redirect(
        new URL('/login?error=Invalid OAuth request', request.url)
      );
    }

    if (state !== storedState) {
      return NextResponse.redirect(
        new URL('/login?error=Invalid state parameter', request.url)
      );
    }

    try {
      // Exchange authorization code for tokens using PKCE
      const tokens = await google.validateAuthorizationCode(code, storedCodeVerifier);
      
      // Get user info from Google
      const googleUser = await getGoogleUser(tokens.accessToken());

      // Check if email is verified
      if (!googleUser.verified_email) {
        return NextResponse.redirect(
          new URL('/login?error=Please verify your email with Google first', request.url)
        );
      }

      // Check if user already exists
      let user = await prisma.user.findUnique({
        where: { email: googleUser.email.toLowerCase() },
        select: {
          id: true,
          email: true,
          username: true,
          displayName: true,
          isVerified: true,
          googleId: true,
        }
      });

      if (user) {
        // Update Google ID if not already set
        if (!user.googleId) {
          await prisma.user.update({
            where: { id: user.id },
            data: { googleId: googleUser.id }
          });
        }
      } else {
        // Create new user
        const username = await generateUsername(googleUser.given_name || googleUser.name);
        
        user = await prisma.user.create({
          data: {
            email: googleUser.email.toLowerCase(),
            username,
            displayName: googleUser.name,
            isVerified: true, // Google users are pre-verified
            googleId: googleUser.id,
            avatarUrl: googleUser.picture,
            publicKey: '', // Will be generated later when user first logs in
          },
          select: {
            id: true,
            email: true,
            username: true,
            displayName: true,
            isVerified: true,
            googleId: true,
          }
        });
      }

      // Generate JWT token
      const token = await createToken({
        userId: user.id,
        email: user.email,
        username: user.username,
        tokenVersion: 1,
      });

      // Clear OAuth cookies
      cookieStore.delete('google_oauth_state');
      cookieStore.delete('google_code_verifier');

      // Set auth token in secure cookie (consistent with login route)
      cookieStore.set('session_token', token, {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      });

      // Redirect to main app
      return NextResponse.redirect(new URL('/spaces', request.url));

    } catch (tokenError) {
      console.error('Token exchange error:', tokenError);
      return NextResponse.redirect(
        new URL('/login?error=Failed to authenticate with Google', request.url)
      );
    }

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/login?error=Authentication failed', request.url)
    );
  }
}