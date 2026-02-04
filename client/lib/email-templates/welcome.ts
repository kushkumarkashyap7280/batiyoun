/**
 * Email template for welcoming new users
 */
export function getWelcomeEmailTemplate({ 
  userName, 
  appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000' 
}: { 
  userName: string; 
  appUrl?: string;
}) {
  return {
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Batiyoun</title>
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
            .features {
              background: #f8fafc;
              border-radius: 8px;
              padding: 20px;
              margin: 24px 0;
            }
            .features ul {
              margin: 0;
              padding-left: 20px;
            }
            .features li {
              color: #4b5563;
              margin: 8px 0;
            }
            .button {
              display: inline-block;
              background: #667eea;
              color: white !important;
              padding: 14px 32px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: 600;
              margin: 24px 0;
              transition: background-color 0.2s;
            }
            .button:hover {
              background: #5a67d8;
            }
            .cta-section {
              text-align: center;
              padding: 20px 0;
            }
            .footer {
              background: #f9fafb;
              padding: 20px 30px;
              text-align: center;
              color: #6b7280;
              font-size: 14px;
            }
            .footer p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Batiyoun! 🎉</h1>
            </div>
            <div class="content">
              <h2>Hi ${userName}!</h2>
              <p>
                We're absolutely thrilled to have you join the Batiyoun community! You're now part of a 
                dynamic platform that connects people through meaningful conversations and collaborative spaces.
              </p>
              
              <div class="features">
                <p><strong>Here's what you can do to get started:</strong></p>
                <ul>
                  <li>🔧 Complete your profile to let others know more about you</li>
                  <li>🏠 Join spaces that align with your interests</li>
                  <li>💬 Start meaningful conversations with other members</li>
                  <li>🚀 Create your own spaces for topics you're passionate about</li>
                  <li>📱 Access Batiyoun from any device, anywhere</li>
                </ul>
              </div>

              <div class="cta-section">
                <a href="${appUrl}" class="button">
                  Get Started Now
                </a>
              </div>

              <p>
                If you have any questions or need help getting started, our support team is here to help. 
                We're committed to making your Batiyoun experience exceptional.
              </p>
              
              <p>
                <strong>Welcome aboard, and happy connecting!</strong><br>
                The Batiyoun Team
              </p>
            </div>
            <div class="footer">
              <p>
                This email was sent to you because you recently created a Batiyoun account. 
                If you didn't sign up for Batiyoun, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to Batiyoun, ${userName}!

      We're excited to have you on board. Here's what you can do to get started:

      • Complete your profile to let others know more about you
      • Join spaces that align with your interests  
      • Start meaningful conversations with other members
      • Create your own spaces for topics you're passionate about
      • Access Batiyoun from any device, anywhere

      Get started now: ${appUrl}

      If you have any questions, our support team is here to help.

      Welcome aboard!
      The Batiyoun Team

      If you didn't sign up for Batiyoun, you can safely ignore this email.
    `
  };
}