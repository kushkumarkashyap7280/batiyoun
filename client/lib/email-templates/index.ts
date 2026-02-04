// Export all email templates
export { getWelcomeEmailTemplate } from './welcome';
export { getPasswordResetEmailTemplate } from './password-reset';
export { getOTPEmailTemplate } from './otp';

// Email template types
export interface EmailTemplate {
  html: string;
  text: string;
}

export interface WelcomeEmailOptions {
  userName: string;
  appUrl?: string;
}

export interface PasswordResetEmailOptions {
  userName: string;
  resetUrl: string;
  expiresInMinutes?: number;
}

export interface OTPEmailOptions {
  userName?: string;
  otp: string;
  expiresInMinutes?: number;
}