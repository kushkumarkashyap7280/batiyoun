import { NextRequest, NextResponse } from 'next/server';
import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '@/lib/google-oauth';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    // Generate PKCE code verifier and state for security
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    // Create authorization URL with PKCE
    const url = google.createAuthorizationURL(state, codeVerifier, [
      'openid',
      'profile',
      'email'
    ]);

    // Store state and code verifier in secure httpOnly cookies
    const cookieStore = await cookies();
    
    // Set cookies with secure attributes
    cookieStore.set('google_oauth_state', state, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10, // 10 minutes
      sameSite: 'lax',
    });

    cookieStore.set('google_code_verifier', codeVerifier, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10, // 10 minutes  
      sameSite: 'lax',
    });

    // Redirect to Google OAuth
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Google OAuth initiation error:', error);
    return NextResponse.redirect(
      new URL('/login?error=Failed to initiate Google login', request.url)
    );
  }
}