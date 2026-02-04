import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { compare } from 'bcryptjs';
import { createToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

// Request validation schema
const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = loginSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid request data',
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const { identifier, password } = validationResult.data;
    const normalizedIdentifier = identifier.toLowerCase().trim();

    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedIdentifier },
          { username: normalizedIdentifier }
        ]
      },
      select: {
        id: true,
        email: true,
        username: true,
        displayName: true,
        password: true,
        isVerified: true,
        // Add tokenVersion field to schema later
      }
    });

    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please verify your email first' 
        },
        { status: 401 }
      );
    }

    // Verify password
    if (!user.password || !(await compare(password, user.password))) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid credentials' 
        },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      tokenVersion: 1, // Will get this from DB once we add the field
    });

    // Create the response
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          displayName: user.displayName,
        },
        token,
      },
    }, { status: 200 });

    // Set HTTP-only cookie for server-side usage
    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;

  } catch (error) {
    console.error('Error in login API:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
