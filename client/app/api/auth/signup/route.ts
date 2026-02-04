import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { isOTPVerified, clearOTPData } from '@/lib/otp';
import { sendWelcomeEmail } from '@/lib/resend';
import  prisma  from '@/lib/prisma';

// Request validation schema
const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = signupSchema.safeParse(body);
    
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

    const { email, password, name, username } = validationResult.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if OTP is verified
    const otpVerified = await isOTPVerified(normalizedEmail);
    if (!otpVerified) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email not verified. Please verify your email with OTP first.' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalizedEmail },
          { username: username.toLowerCase() }
        ]
      }
    });

    if (existingUser) {
      const field = existingUser.email === normalizedEmail ? 'email' : 'username';
      return NextResponse.json(
        { 
          success: false, 
          message: `This ${field} is already taken` 
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        displayName: name,
        username: username.toLowerCase(),
        publicKey: '', // Will be generated later when user first logs in
        isVerified: true, // Mark as verified since OTP was verified
      },
      select: {
        id: true,
        email: true,
        displayName: true,
        username: true,
        createdAt: true,
      }
    });

    // Clear OTP data
    await clearOTPData(normalizedEmail);

    // Send welcome email
    try {
      await sendWelcomeEmail({
        to: normalizedEmail,
        userName: name,
      });
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the signup if welcome email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.displayName,
          username: user.username,
          createdAt: user.createdAt,
        }
      },
    }, { status: 201 });

  } catch (error) {
    console.error('Error in signup API:', error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      // Check for unique constraint violation
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Email or username already exists' 
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}
