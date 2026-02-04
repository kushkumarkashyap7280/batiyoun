# Google OAuth Setup Guide for Batiyoun

This comprehensive guide will help you set up Google OAuth authentication for your Batiyoun application with PKCE security.

## 🚀 Quick Start

1. Set up Google Cloud Console credentials
2. Configure environment variables
3. Test the OAuth flow
4. Deploy to production

---

## 1. Google Cloud Console Setup

### Step 1: Create Google Cloud Project

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `Batiyoun` 
4. Click "Create"

### Step 2: Enable Required APIs

1. Go to "APIs & Services" → "Library"
2. Search and enable:
   - **Google+ API**
   - **Google Identity and Access Management (IAM) API**

### Step 3: Configure OAuth Consent Screen

1. Navigate to "APIs & Services" → "OAuth consent screen"
2. Select **"External"** user type → Click "Create"
3. Fill in App Information:
   ```
   App name: Batiyoun
   User support email: your-email@domain.com
   App logo: (optional - upload your app logo)
   ```
4. App domain (optional but recommended):
   ```
   Application home page: https://batiyoun.com
   Application privacy policy: https://batiyoun.com/privacy
   Application terms of service: https://batiyoun.com/terms
   ```
5. Authorized domains:
   ```
   batiyoun.com
   localhost (for development)
   ```
6. Developer contact information:
   ```
   Email addresses: your-email@domain.com
   ```

### Step 4: Configure OAuth Scopes

1. Click "Add or Remove Scopes"
2. Select the following scopes:
   - `openid`
   - `email`
   - `profile`
3. Click "Update" → "Save and Continue"

### Step 5: Create OAuth 2.0 Client ID

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Configure application:
   ```
   Application type: Web application
   Name: Batiyoun Web Client
   ```
4. Add Authorized redirect URIs:
   ```
   Development: http://localhost:3000/api/auth/google/callback
   Production: https://yourdomain.com/api/auth/google/callback
   ```
5. Click "Create"
6. **Save your credentials** (Client ID and Client Secret)

---

## 2. Environment Configuration

Create or update your `.env` file in the client directory:

```env
# Database Configuration
DATABASE_URL="your_postgres_connection_string"

# Redis Configuration  
UPSTASH_REDIS_REST_URL="your_redis_url"
UPSTASH_REDIS_REST_TOKEN="your_redis_token"

# Email Configuration
RESEND_API_KEY="your_resend_api_key"
RESEND_FROM_EMAIL="Batiyoun <noreply@yourdomain.com>"

# Google OAuth Configuration
GOOGLE_CLIENT_ID="your_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_client_secret"

# Application URL
NEXTAUTH_URL="http://localhost:3000"  # Change for production
NODE_ENV="development"
```

### Environment Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_CLIENT_ID` | OAuth 2.0 client ID from Google Cloud Console | `123456789.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | OAuth 2.0 client secret from Google Cloud Console | `GOCSPX-abcd1234...` |
| `NEXTAUTH_URL` | Base URL of your application | `https://batiyoun.com` |

---

## 3. Implementation Overview

### Security Features ✨

Our implementation includes enterprise-grade security:

- **🛡️ PKCE (Proof Key for Code Exchange)**: Prevents authorization code interception
- **🔒 State Parameter**: Protects against CSRF attacks
- **🍪 Secure Cookies**: HttpOnly cookies prevent XSS attacks
- **✅ Email Verification**: Only verified Google accounts allowed
- **🔑 JWT Security**: Proper token generation and validation
- **📱 Mobile-Safe**: PWA-compatible OAuth flow

### OAuth Flow Diagram

```
User → [Click Google Login] → Generate PKCE + State → Google OAuth
                                    ↓
Database ← Create/Login User ← Exchange Code + Verify ← Google Callback
                                    ↓
User Dashboard ← Set JWT Cookie ← Generate Token ← User Data
```

### File Structure

```
client/
├── app/api/auth/google/
│   ├── route.ts                 # OAuth initiation
│   └── callback/
│       └── route.ts             # OAuth callback handler
├── lib/
│   ├── google-oauth.ts          # OAuth configuration
│   └── signup-flow.ts           # Username generation
├── components/auth/
│   ├── login-form.tsx           # Login with Google button
│   └── signup-form.tsx          # Signup with Google button
└── config/
    └── env.ts                   # Environment validation
```

---

## 4. Testing Your Setup

### Development Testing

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test OAuth Flow:**
   - Navigate to `http://localhost:3000/login`
   - Click "Continue with Google"
   - Complete Google OAuth
   - Verify user creation in database

3. **Check Console Logs:**
   ```bash
   # Should see successful OAuth logs
   OAuth initiation successful
   Token exchange successful  
   User created/logged in: user@gmail.com
   ```

### Debugging Common Issues

| Issue | Solution |
|-------|----------|
| "Redirect URI mismatch" | Add exact callback URL to Google Console |
| "Invalid client" | Double-check CLIENT_ID and CLIENT_SECRET |
| "Access blocked" | Configure OAuth consent screen properly |
| "Invalid state parameter" | Check cookie configuration and HTTPS setup |

---

## 5. Production Deployment

### Pre-deployment Checklist

- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Add production redirect URI to Google Console
- [ ] Enable HTTPS (required for OAuth)
- [ ] Configure CORS policies
- [ ] Set up error monitoring
- [ ] Test OAuth flow on staging environment

### Production Environment Variables

```env
# Production Configuration
NEXTAUTH_URL="https://batiyoun.com"
NODE_ENV="production"

# Keep other variables same as development
GOOGLE_CLIENT_ID="your_client_id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your_client_secret"
```

### Security Considerations

1. **HTTPS Only**: OAuth requires HTTPS in production
2. **Secure Cookies**: Automatically enabled in production
3. **Domain Validation**: Ensure redirect URIs match exactly
4. **Rate Limiting**: Implement OAuth request rate limiting
5. **Error Handling**: Don't expose sensitive errors to users

---

## 6. Advanced Configuration

### Custom Username Generation

The system automatically generates unique usernames from Google display names:

```typescript
// Example username generation
"John Doe" → "johndoe" → "johndoe1" (if taken) → "johndoe2" etc.
"김철수" → "user_abc123" (fallback for non-Latin characters)
```

### OAuth Scopes Explained

| Scope | Purpose | Data Access |
|-------|---------|-------------|
| `openid` | OpenID Connect authentication | User identifier |
| `email` | Email address access | Email and verification status |
| `profile` | Basic profile information | Name, picture, locale |

### Database Integration

The OAuth flow automatically:
- Creates new users with Google profile data
- Links existing email accounts to Google
- Updates profile pictures from Google
- Marks accounts as verified

---

## 7. Monitoring & Analytics

### Success Metrics to Track

- OAuth conversion rate
- Authentication success rate  
- User registration via Google vs email
- OAuth error rates and types

### Logging Best Practices

```typescript
// Good logging examples
console.log('OAuth initiated for user:', email);
console.log('Token exchange successful');
console.error('OAuth error:', error.message); // Don't log full error object
```

---

## 8. Support & Troubleshooting

### Common User Issues

1. **"This app isn't verified"** - Normal for new apps, users can click "Advanced"
2. **Account selection** - Users can choose which Google account to use
3. **Permission concerns** - Clearly explain what data you access

### Developer Support

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Arctic Library Documentation](https://arctic.js.org/)
- [PKCE RFC 7636](https://tools.ietf.org/html/rfc7636)

### Getting Help

If you encounter issues:
1. Check the browser console for errors
2. Verify environment variables are set correctly
3. Ensure redirect URIs match exactly
4. Test with a different Google account
5. Check Google Cloud Console for API quotas

---

## 🎉 Congratulations!

You've successfully implemented secure Google OAuth with PKCE for Batiyoun! Your users can now sign in with their Google accounts using enterprise-grade security standards.

**Next Steps:**
- Test thoroughly in development
- Set up production environment
- Monitor OAuth metrics
- Consider adding other OAuth providers (GitHub, Apple, etc.)

---

*This implementation follows OAuth 2.1 security best practices and is production-ready.*
