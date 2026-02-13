# Environment Variables Guide 🔐

Complete reference for all environment variables used in Batiyoun.

## 📋 Table of Contents

- [Client Environment](#client-environment)
- [Server Environment](#server-environment)
- [Generating Secrets](#generating-secrets)
- [Environment-Specific Configs](#environment-specific-configs)

---

## Client Environment

File: `client/.env`

### Database

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://username:password@host:port/database"

# Example (Vercel Postgres)
DATABASE_URL="postgresql://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb"

# Example (Local)
DATABASE_URL="postgresql://postgres:password@localhost:5432/batiyoun"
```

### Authentication

```env
# NextAuth secret - MUST be different in production
# Generate: openssl rand -base64 32
NEXTAUTH_SECRET="your-ultra-secret-key-here"

# Your app's URL
NEXTAUTH_URL="http://localhost:3000"  # Development
NEXTAUTH_URL="https://batiyoun.vercel.app"  # Production
```

### Google OAuth (Optional)

```env
# Get from: https://console.cloud.google.com/
GOOGLE_CLIENT_ID="123456789-abcdefghijklmnop.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxxxxxxxxxxxxxxxxxxx"
```

**Setup Steps:**
1. Go to Google Cloud Console
2. Create project → Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/google/callback`
   - Production: `https://batiyoun.vercel.app/api/auth/google/callback`

### Cloudinary (File Upload)

```env
# Get from: https://cloudinary.com/console
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-unsigned-preset"

# Server-side only (not exposed to client)
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz"
```

**Setup Steps:**
1. Sign up at Cloudinary
2. Go to Settings → Upload
3. Create unsigned upload preset
4. Copy cloud name and preset name

### Redis (Optional)

```env
# Upstash Redis
REDIS_URL="redis://default:xxxxxxxxxxxxx@xxxxx.upstash.io:6379"

# Local Redis
REDIS_URL="redis://localhost:6379"

# Can be omitted for basic development
```

### Email (Resend)

```env
# Get from: https://resend.com/
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FROM_EMAIL="noreply@batiyoun.com"

# Can use a test API key for development
```

### Server URL

```env
# WebSocket server endpoint
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"  # Development
NEXT_PUBLIC_SOCKET_URL="https://batiyoun-server.railway.app"  # Production
```

### Full Client `.env` Template

```env
# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://user:password@host:5432/database"

# ============================================
# AUTHENTICATION
# ============================================
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# ============================================
# GOOGLE OAUTH (Optional)
# ============================================
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# ============================================
# CLOUDINARY
# ============================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# ============================================
# REDIS (Optional)
# ============================================
REDIS_URL="redis://localhost:6379"

# ============================================
# EMAIL (Optional)
# ============================================
RESEND_API_KEY=""
FROM_EMAIL="noreply@batiyoun.com"

# ============================================
# SERVER
# ============================================
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

---

## Server Environment

File: `server/.env`

### MongoDB

```env
# MongoDB Atlas
MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/batiyoun?retryWrites=true&w=majority"

# Local MongoDB
MONGO_URI="mongodb://localhost:27017/batiyoun"
```

### Redis (Optional)

```env
# Same as client - for session sharing
REDIS_URL="redis://default:xxxxx@xxxxx.upstash.io:6379"
REDIS_URL="redis://localhost:6379"
```

### Server Configuration

```env
# Port for WebSocket server
PORT=4000

# Node environment
NODE_ENV="development"  # or "production"
```

### CORS & Security

```env
# Client URL for CORS
CLIENT_URL="http://localhost:3000"  # Development
CLIENT_URL="https://batiyoun.vercel.app"  # Production

# Allow multiple origins (comma-separated)
ALLOWED_ORIGINS="http://localhost:3000,https://batiyoun.vercel.app"
```

### JWT/Authentication

```env
# Secret for signing JWT tokens
# Generate: openssl rand -base64 32
JWT_SECRET="your-different-secret-from-nextauth"

# Token expiry
JWT_EXPIRES_IN="7d"
```

### Full Server `.env` Template

```env
# ============================================
# DATABASE
# ============================================
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/batiyoun"

# ============================================
# REDIS (Optional)
# ============================================
REDIS_URL="redis://localhost:6379"

# ============================================
# SERVER CONFIG
# ============================================
PORT=4000
NODE_ENV="development"

# ============================================
# CORS
# ============================================
CLIENT_URL="http://localhost:3000"
ALLOWED_ORIGINS="http://localhost:3000"

# ============================================
# JWT
# ============================================
JWT_SECRET="generate-with-openssl-rand-base64-32"
JWT_EXPIRES_IN="7d"

# ============================================
# LOGGING (Optional)
# ============================================
LOG_LEVEL="debug"  # debug, info, warn, error
```

---

## Generating Secrets

### Strong Random Secrets

#### Method 1: OpenSSL (Recommended)

```bash
# Generate 32-byte base64 encoded string
openssl rand -base64 32

# Generate 64-byte hex string
openssl rand -hex 64
```

#### Method 2: Node.js

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### Method 3: Online Generator

- [1Password Password Generator](https://1password.com/password-generator/)
- [Random.org](https://www.random.org/strings/)

**Important:** Never use the same secret for `NEXTAUTH_SECRET` and `JWT_SECRET`!

---

## Environment-Specific Configs

### Development

```env
# Client
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"

# Server
CLIENT_URL="http://localhost:3000"
NODE_ENV="development"
LOG_LEVEL="debug"
```

### Staging

```env
# Client
NEXTAUTH_URL="https://staging.batiyoun.com"
NEXT_PUBLIC_SOCKET_URL="https://staging-server.batiyoun.com"

# Server
CLIENT_URL="https://staging.batiyoun.com"
NODE_ENV="production"
LOG_LEVEL="info"
```

### Production

```env
# Client
NEXTAUTH_URL="https://batiyoun.vercel.app"
NEXT_PUBLIC_SOCKET_URL="https://batiyoun-server.railway.app"

# Server
CLIENT_URL="https://batiyoun.vercel.app"
NODE_ENV="production"
LOG_LEVEL="warn"
```

---

## Variable Prefixes

### Next.js Environment Variables

- **`NEXT_PUBLIC_`** → Exposed to browser (public)
- **No prefix** → Server-side only (private)

```env
# ✅ Accessible in browser
NEXT_PUBLIC_API_URL="https://api.example.com"

# ❌ NOT accessible in browser (secure)
DATABASE_URL="postgresql://..."
API_SECRET="secret-key"
```

### Best Practices

- ✅ **DO** use `NEXT_PUBLIC_` for non-sensitive config
- ❌ **DON'T** put secrets in `NEXT_PUBLIC_` variables
- ✅ **DO** use different secrets per environment
- ✅ **DO** rotate secrets periodically
- ❌ **DON'T** commit `.env` files to git

---

## Validation

### Client (`client/config/env.ts`)

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  NEXT_PUBLIC_SOCKET_URL: z.string().url(),
  // ... more fields
});

export const env = envSchema.parse(process.env);
```

### Server (`server/src/config/env.ts`)

```typescript
import { z } from 'zod';

const envSchema = z.object({
  MONGO_URI: z.string(),
  PORT: z.string().transform(Number),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // ... more fields
});

export const env = envSchema.parse(process.env);
```

---

## Security Checklist

- [ ] All secrets are randomly generated
- [ ] Different secrets for development and production
- [ ] `.env` files are in `.gitignore`
- [ ] No secrets committed to git
- [ ] Environment variables validated at startup
- [ ] Secrets stored securely (Vercel/Railway secrets)
- [ ] Regular secret rotation schedule
- [ ] Minimal use of `NEXT_PUBLIC_` prefix

---

## Troubleshooting

### "Environment variable X is not defined"

**Solution:** Make sure the variable exists in your `.env` file and restart the dev server.

### Changes to `.env` not reflecting

**Solution:** Restart the development server. Next.js doesn't hot-reload env vars.

```bash
# Stop server (Ctrl+C) then
npm run dev
```

### "Invalid DATABASE_URL"

**Solution:** Check format. Should be:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

No spaces, correct encoding for special characters.

### Production deployment issues

**Solution:** Set environment variables in your hosting platform:
- **Vercel:** Settings → Environment Variables
- **Railway:** Variables tab

---

## Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Prisma Connection URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

**Need help?** Open an issue on [GitHub](https://github.com/kushkumarkashyap7280/batiyoun/issues)
