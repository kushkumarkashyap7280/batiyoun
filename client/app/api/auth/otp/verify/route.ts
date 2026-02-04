import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyOTP } from '@/lib/otp';

// Request validation schema
const verifyOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits').regex(/^\d+$/, 'OTP must contain only numbers'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = verifyOTPSchema.safeParse(body);
    
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

    const { email, otp } = validationResult.data;

    // Verify OTP
    const verificationResult = await verifyOTP(email, otp);
    
    if (!verificationResult.success) {
      const statusCode = verificationResult.waitTime ? 429 : 400;
      
      return NextResponse.json(
        { 
          success: false, 
          message: verificationResult.message,
          remainingAttempts: verificationResult.remainingAttempts,
          waitTime: verificationResult.waitTime 
        },
        { status: statusCode }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      data: {
        email,
        status: verificationResult.data.status,
        verified: true,
      },
    });

  } catch (error) {
    console.error('Error in verify OTP API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}