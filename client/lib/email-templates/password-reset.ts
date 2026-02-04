/**
 * Email template for password reset
 */
export function getPasswordResetEmailTemplate({ 
  userName, 
  resetUrl,
  expiresInMinutes = 60 
}: { 
  userName: string; 
  resetUrl: string;
  expiresInMinutes?: number;
}) {
  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset your Batiyoun password</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9fafb;
            }
            .container {
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .content {
              padding: 40px 30px;
            }
            .content h2 {
              color: #374151;
              font-size: 24px;
              margin: 0 0 20px 0;
            }
            .content p {
              color: #6b7280;
              margin: 16px 0;
            }
            .button {
              display: inline-block;
              background: #f5576c;
              color: white !important;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 24px 0;
              transition: background-color 0.2s;
            }
            .button:hover {
              background: #e53e3e;
            }
            .cta-section {
              text-align: center;
              padding: 20px 0;
              border: 2px dashed #e5e7eb;
              border-radius: 8px;
              margin: 24px 0;
              background: #fef9f9;
            }
            .warning {
              background: #fef3cd;
              border: 2px solid #f59e0b;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .warning-title {
              color: #d97706;
              font-weight: 600;
              margin: 0 0 12px 0;
              display: flex;
              align-items: center;
            }
            .warning ul {
              margin: 0;
              padding-left: 20px;
            }
            .warning li {
              color: #92400e;
              margin: 6px 0;
            }
            .token-info {
              background: #f8f9fa;
              border: 1px solid #e5e7eb;
              border-radius: 6px;
              padding: 16px;
              font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
              font-size: 14px;
              margin: 16px 0;
              word-break: break-all;
            }
            .footer {
              background: #f9fafb;
              padding: 20px 30px;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            .footer p {
              margin: 8px 0;
            }
            .security-notice {
              background: #eff6ff;
              border: 2px solid #3b82f6;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .security-notice-title {
              color: #1d4ed8;
              font-weight: 600;
              margin: 0 0 12px 0;
              display: flex;
              align-items: center;
            }
            .security-notice p {
              color: #1e40af;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔒 Reset Your Password</h1>
            </div>
            <div class="content">
              <h2>Hi ${userName}!</h2>
              
              <p>
                We received a request to reset the password for your Batiyoun account. 
                If you made this request, click the button below to create a new password:
              </p>

              <div class="cta-section">
                <a href="${resetUrl}" class="button">
                  Reset My Password
                </a>
                <p style="margin-top: 16px; font-size: 14px; color: #6b7280;">
                  This link is valid for ${expiresInMinutes} minutes
                </p>
              </div>

              <div class="warning">
                <div class="warning-title">⚠️ Security Notice</div>
                <ul>
                  <li>This password reset link expires in <strong>${expiresInMinutes} minutes</strong></li>
                  <li>You can only use this link <strong>once</strong></li>
                  <li>The link only works for the account associated with this email</li>
                  <li>If you didn't request this reset, your account is still secure</li>
                </ul>
              </div>

              <p>
                <strong>Trouble clicking the button?</strong> Copy and paste this link into your browser:
              </p>
              
              <div class="token-info">
                ${resetUrl}
              </div>

              <div class="security-notice">
                <div class="security-notice-title">🛡️ Didn't request this?</div>
                <p>
                  If you didn't request a password reset, someone else might have entered your email address by mistake. 
                  Your account is completely secure, and you can safely ignore this email.
                </p>
              </div>

              <p>
                <strong>Questions or concerns?</strong> Contact our security team if you need assistance.
              </p>
              
              <p>
                <strong>Best regards,</strong><br>
                The Batiyoun Security Team
              </p>
            </div>
            <div class="footer">
              <p>
                <strong>This is an automated security email from Batiyoun.</strong>
              </p>
              <p>
                For security reasons, this link will expire in ${expiresInMinutes} minutes and can only be used once.
              </p>
              <p>
                If you're having trouble with the link above, please contact our support team.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Your Batiyoun Password

      Hi ${userName}!

      We received a request to reset your password for your Batiyoun account.

      Reset your password by clicking this link: ${resetUrl}

      SECURITY NOTICE:
      • This link expires in ${expiresInMinutes} minutes
      • You can only use this link once  
      • If you didn't request this reset, your account is still secure

      Didn't request this? If you didn't request a password reset, you can safely ignore this email.

      If you have trouble with the link, contact our support team.

      The Batiyoun Security Team
    `
  };
}