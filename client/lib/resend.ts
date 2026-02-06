import { Resend } from "resend";
import { env } from "@/config/env";
import { OtpType } from "@batiyoun/common";



export const resend = new Resend(env.RESEND_API_KEY);

export const emailConfig = {
  fromEmail: env.RESEND_FROM_EMAIL,
};




const templates: Record<OtpType, (otp: string) => { subject: string; html: string; text: string }> = {
  "SIGNUP": (otp) => ({
    subject: "Verify your Batiyoun account",
    html: `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h2>Verify your email</h2>
        <p>Use the code below to complete your sign up:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; color: #3b82f6;">${otp}</h1>
        <p style="color: #666; font-size: 12px;">This code expires in 10 minutes.</p>
      </div>
    `,
    text: `Your verification code is ${otp}. It expires in 10 minutes.`,
  }),
  "RESET_PASSWORD": (otp) => ({
    subject: "Reset your Password",
    html: `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h2>Reset Password</h2>
        <p>You requested a password reset. Use this code:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; color: #ef4444;">${otp}</h1>
        <p style="color: #666; font-size: 12px;">If you didn't request this, ignore this email.</p>
      </div>
    `,
    text: `Your password reset code is ${otp}.`,
  }),
  "FORGOT_PASSWORD": (otp) => ({
    subject: "Forgot Password OTP",
    html: `
      <div style="font-family: sans-serif; padding: 20px; text-align: center;">
        <h2>Forgot Password</h2>
        <p>Use this OTP to reset your password:</p>
        <h1 style="font-size: 32px; letter-spacing: 5px; color: #f59e0b;">${otp}</h1>
        <p style="color: #666; font-size: 12px;">This code expires in 10 minutes.</p>
      </div>
    `,
    text: `Your forgot password OTP is ${otp}. It expires in 10 minutes.`,
  }), 
};
/**
 * Send an OTP email.
 * @param otp - the OTP code to send
 * @param to - destination email
 * @param type - 'SIGNUP' | 'RESET_PASSWORD' | 'FORGOT_PASSWORD'
 * @returns success flag and message if failed showing error details
 */
export async function sendOtpEmail(
  otp: string,
  to: string,
  type: OtpType,
): Promise<{ success: boolean; message?: string; }> {
  const tpl = templates[type](otp);

  try {
    await resend.emails.send({
      from: emailConfig.fromEmail,
      to,
      subject: tpl.subject,
      html: tpl.html,
      text: tpl.text,
    });
    return { success: true, message: "OTP email sent successfully." };
  } catch (err: any) {
    return { success: false , message: `Failed to send OTP email: ${err.message || "Unknown error"}` };
  }
}


