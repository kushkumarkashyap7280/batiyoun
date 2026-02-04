/**
 * Email template for OTP verification
 */
export function getOTPEmailTemplate({ 
  userName,
  otp,
  expiresInMinutes = 5 
}: { 
  userName?: string;
  otp: string;
  expiresInMinutes?: number;
}) {
  const greeting = userName ? `Hi ${userName}!` : 'Hi there!';
  
  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Your Batiyoun Verification Code</title>
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
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
              text-align: center;
            }
            .content h2 {
              color: #374151;
              font-size: 24px;
              margin: 0 0 20px 0;
              text-align: left;
            }
            .content p {
              color: #6b7280;
              margin: 16px 0;
              text-align: left;
            }
            .otp-container {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border: 2px solid #38bdf8;
              border-radius: 12px;
              padding: 30px;
              margin: 30px 0;
              text-align: center;
            }
            .otp-code {
              font-size: 36px;
              font-weight: 800;
              color: #0c4a6e;
              letter-spacing: 8px;
              font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
              margin: 10px 0;
              text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
            }
            .otp-label {
              color: #0369a1;
              font-weight: 600;
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 10px;
            }
            .expiry-notice {
              background: #fef3cd;
              border: 2px solid #f59e0b;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              text-align: center;
            }
            .expiry-notice .time {
              font-weight: 700;
              color: #d97706;
              font-size: 18px;
            }
            .security-tips {
              background: #f8fafc;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
              text-align: left;
            }
            .security-tips h3 {
              color: #374151;
              margin: 0 0 12px 0;
              font-size: 16px;
            }
            .security-tips ul {
              margin: 0;
              padding-left: 20px;
              color: #6b7280;
            }
            .security-tips li {
              margin: 6px 0;
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
            .attempts-warning {
              background: #fef2f2;
              border: 2px solid #f87171;
              border-radius: 8px;
              padding: 16px;
              margin: 20px 0;
              text-align: center;
            }
            .attempts-warning .warning-text {
              color: #dc2626;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Verification Code</h1>
            </div>
            <div class="content">
              <h2>${greeting}</h2>
              
              <p>
                Welcome to Batiyoun! To complete your account setup, please use the verification code below:
              </p>

              <div class="otp-container">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otp}</div>
              </div>

              <div class="expiry-notice">
                ⏰ This code expires in <span class="time">${expiresInMinutes} minutes</span>
              </div>

              <div class="attempts-warning">
                <div class="warning-text">⚠️ Important Security Notice</div>
                <p style="margin: 8px 0; color: #dc2626;">
                  You have <strong>3 attempts</strong> to enter the correct code. 
                  After 3 failed attempts, your account will be temporarily blocked for 15 minutes.
                </p>
              </div>

              <div class="security-tips">
                <h3>🛡️ Security Tips:</h3>
                <ul>
                  <li>Never share this code with anyone</li>
                  <li>Batiyoun will never ask for your verification code via phone or email</li>
                  <li>If you didn't request this code, please ignore this email</li>
                  <li>This code can only be used once</li>
                </ul>
              </div>

              <p>
                If you're having trouble with verification, contact our support team for assistance.
              </p>
              
              <p>
                <strong>Welcome to the Batiyoun community!</strong><br>
                The Batiyoun Team
              </p>
            </div>
            <div class="footer">
              <p>
                <strong>This is an automated message from Batiyoun.</strong>
              </p>
              <p>
                This verification code was requested for account registration. 
                If you didn't request this, please ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Your Batiyoun Verification Code

      ${greeting}

      Welcome to Batiyoun! To complete your account setup, please use this verification code:

      CODE: ${otp}

      ⏰ This code expires in ${expiresInMinutes} minutes

      ⚠️ SECURITY NOTICE:
      • You have 3 attempts to enter the correct code
      • After 3 failed attempts, your account will be blocked for 15 minutes
      • Never share this code with anyone
      • This code can only be used once

      If you didn't request this code, please ignore this email.

      Welcome to the Batiyoun community!
      The Batiyoun Team
    `
  };
}