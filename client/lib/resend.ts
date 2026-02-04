import { env } from '@/config/env';
import { 
  getWelcomeEmailTemplate, 
  getPasswordResetEmailTemplate,
  getOTPEmailTemplate,
  type WelcomeEmailOptions,
  type PasswordResetEmailOptions,
  type OTPEmailOptions
} from './email-templates';

export interface SendEmailProps {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send email using Resend API directly
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailProps) {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.RESEND_FROM_EMAIL,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail({
  to,
  ...options
}: {
  to: string;
} & WelcomeEmailOptions) {
  const template = getWelcomeEmailTemplate(options);
  
  return sendEmail({
    to,
    subject: 'Welcome to Batiyoun! 🎉',
    html: template.html,
    text: template.text,
  });
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail({
  to,
  ...options
}: {
  to: string;
} & PasswordResetEmailOptions) {
  const template = getPasswordResetEmailTemplate(options);
  
  return sendEmail({
    to,
    subject: '🔒 Reset your Batiyoun password',
    html: template.html,
    text: template.text,
  });
}

/**
 * Send OTP verification email
 */
export async function sendOTPEmail({
  to,
  ...options
}: {
  to: string;
} & OTPEmailOptions) {
  const template = getOTPEmailTemplate(options);
  
  return sendEmail({
    to,
    subject: '🔐 Your Batiyoun Verification Code',
    html: template.html,
    text: template.text,
  });
}

// Export types for convenience
export type { WelcomeEmailOptions, PasswordResetEmailOptions, OTPEmailOptions };

/**
 * Utility functions for common email operations
 */
export const emailUtils = {
  /**
   * Validate email address format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Generate a password reset URL
   */
  generateResetUrl: (token: string, baseUrl?: string): string => {
    const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return `${base}/auth/reset-password?token=${encodeURIComponent(token)}`;
  },

  /**
   * Send test email (for development/testing)
   */
  sendTestEmail: async (to: string): Promise<any> => {
    return sendEmail({
      to,
      subject: 'Test Email from Batiyoun',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from Batiyoun to verify email configuration.</p>
        <p>Sent at: ${new Date().toISOString()}</p>
      `,
      text: `Test Email from Batiyoun. Sent at: ${new Date().toISOString()}`,
    });
  },
};