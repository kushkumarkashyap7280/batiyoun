import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { storeOTP } from '@/lib/otp';
import { sendOTPEmail } from '@/lib/resend';

// Request validation schema
const sendOTPSchema = z.object({
  email: z.string().email('Invalid email address'),
  userName: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = sendOTPSchema.safeParse(body);
    
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

    const { email, userName } = validationResult.data;

    // Generate and store OTP
    const otpResult = await storeOTP(email);
    
    if (!otpResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: otpResult.message,
          waitTime: otpResult.waitTime 
        },
        { status: otpResult.waitTime ? 429 : 400 }
      );
    }

    // Send OTP via email
    const emailResult = await sendOTPEmail({
      to: email,
      userName,
      otp: otpResult.data.otp,
      expiresInMinutes: 5,
    });

    if (!emailResult.success) {
      console.error('Failed to send OTP email:', emailResult.error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to send verification email. Please try again.' 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
      data: {
        email,
        expiresAt: otpResult.data.expiresAt,
        expiresInMinutes: 5,
      },
    });

  } catch (error) {
    console.error('Error in send OTP API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Get OTP status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email parameter is required' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailValidation = z.string().email().safeParse(email);
    if (!emailValidation.success) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Import getOTPStatus function
    const { getOTPStatus } = await import('@/lib/otp');
    const status = await getOTPStatus(email);

    return NextResponse.json({
      success: true,
      data: status,
    });

  } catch (error) {
    console.error('Error in get OTP status API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}