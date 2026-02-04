/**
 * Example usage of the Resend email service
 * 
 * This file shows how to use the email functions in your application.
 * You can import and use these functions in your API routes or server actions.
 */

import { 
  sendWelcomeEmail, 
  sendPasswordResetEmail, 
  emailUtils 
} from '@/lib/resend';

// Example: Send welcome email after user registration
export async function handleUserRegistration(email: string, userName: string) {
  // Validate email format
  if (!emailUtils.isValidEmail(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Send welcome email
  const result = await sendWelcomeEmail({
    to: email,
    userName,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
  });

  if (result.success) {
    console.log('Welcome email sent successfully:', result.data);
  } else {
    console.error('Failed to send welcome email:', result.error);
  }

  return result;
}

// Example: Send password reset email
export async function handlePasswordReset(email: string, userName: string, resetToken: string) {
  // Validate email format
  if (!emailUtils.isValidEmail(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Generate reset URL
  const resetUrl = emailUtils.generateResetUrl(resetToken);

  // Send password reset email
  const result = await sendPasswordResetEmail({
    to: email,
    userName,
    resetUrl,
    expiresInMinutes: 60, // Optional: defaults to 60 minutes
  });

  if (result.success) {
    console.log('Password reset email sent successfully:', result.data);
  } else {
    console.error('Failed to send password reset email:', result.error);
  }

  return result;
}

// Example: Test email configuration (for development)
export async function testEmailConfiguration(testEmail: string) {
  return await emailUtils.sendTestEmail(testEmail);
}

/* 
Usage in your API routes:

// In your signup API route
import { handleUserRegistration } from '@/lib/email-examples';

export async function POST(request: Request) {
  // ... user creation logic ...
  
  await handleUserRegistration(user.email, user.name);
  
  return NextResponse.json({ success: true });
}

// In your password reset API route  
import { handlePasswordReset } from '@/lib/email-examples';

export async function POST(request: Request) {
  // ... password reset logic ...
  
  await handlePasswordReset(user.email, user.name, resetToken);
  
  return NextResponse.json({ success: true });
}
*/