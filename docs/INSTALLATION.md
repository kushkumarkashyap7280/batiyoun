# Installation Guide 🚀

Complete step-by-step guide to set up Batiyoun locally for development.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)

---

## Prerequisites

### Required Software

- **Node.js:** v20.0.0 or higher ([Download](https://nodejs.org/))
- **npm:** v10.0.0 or higher (comes with Node.js)
- **Git:** Latest version ([Download](https://git-scm.com/))

Verify installations:

```bash
node --version  # Should be v20+
npm --version   # Should be v10+
git --version
```

### Required Services

You'll need accounts and connection strings for:

1. **PostgreSQL Database**
   - Option A: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) (Free tier available)
   - Option B: [Supabase](https://supabase.com/) (Free tier)
   - Option C: Local PostgreSQL installation

2. **MongoDB Database**
   - Option A: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
   - Option B: Local MongoDB installation

3. **Redis** (Optional for development)
   - Option A: [Upstash](https://upstash.com/) (Free tier available)
   - Option B: Local Redis installation
   - Can skip for basic development

4. **Cloudinary** (For avatar uploads)
   - [Sign up here](https://cloudinary.com/) (Free tier available)

5. **Google OAuth** (Optional)
   - [Google Cloud Console](https://console.cloud.google.com/)

---

## Quick Start

For experienced developers who want to get running fast:

```bash
# 1. Clone and install
git clone https://github.com/kushkumarkashyap7280/batiyoun.git
cd batiyoun
npm install

# 2. Set up environment files
cp client/sample.env client/.env
cp server/sample.env server/.env
# Edit both .env files with your credentials

# 3. Set up database
cd client
npx prisma migrate dev
npx prisma generate
cd ..

# 4. Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Detailed Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/kushkumarkashyap7280/batiyoun.git
cd batiyoun
```

### Step 2: Install Dependencies

Install dependencies for all workspaces:

```bash
npm install
```

This installs packages for:

- Root workspace
- `client/` (Next.js app)
- `server/` (Node.js WebSocket server)

### Step 3: Set Up PostgreSQL

#### Option A: Vercel Postgres (Recommended for Beginners)

1. Go to [Vercel](https://vercel.com/)
2. Sign in with GitHub
3. Create a new project
4. Go to Storage → Create Database → Postgres
5. Copy the `DATABASE_URL` connection string

#### Option B: Local PostgreSQL

1. Install PostgreSQL:

   ```bash
   # Ubuntu/Debian
   sudo apt-get install postgresql postgresql-contrib

   # macOS (with Homebrew)
   brew install postgresql
   brew services start postgresql

   # Windows: Download from postgresql.org
   ```

2. Create a database:

   ```bash
   psql -U postgres
   CREATE DATABASE batiyoun;
   CREATE USER batiyoun_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE batiyoun TO batiyoun_user;
   \q
   ```

3. Your `DATABASE_URL` will be:
   ```
   postgresql://batiyoun_user:your_password@localhost:5432/batiyoun
   ```

### Step 4: Set Up MongoDB

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster (Free M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your password

#### Option B: Local MongoDB

1. Install MongoDB:

   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb

   # macOS
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community

   # Windows: Download from mongodb.com
   ```

2. Your connection string:
   ```
   mongodb://localhost:27017/batiyoun
   ```

### Step 5: Set Up Redis (Optional)

#### Option A: Upstash (Easiest)

1. Go to [Upstash](https://upstash.com/)
2. Create a database
3. Copy the REST URL and token

#### Option B: Local Redis

```bash
# Ubuntu/Debian
sudo apt-get install redis-server
sudo service redis-server start

# macOS
brew install redis
brew services start redis

# Windows: Download from redis.io or use WSL
```

Connection string: `redis://localhost:6379`

### Step 6: Set Up Cloudinary

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Create an upload preset:
   - Settings → Upload → Upload presets
   - Add preset: `unsigned`
   - Signing Mode: `Unsigned`

### Step 7: Set Up Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized redirect URIs: `http://localhost:3000/api/auth/google/callback`
7. Copy Client ID and Client Secret

### Step 8: Configure Environment Variables

#### Client Environment (`client/.env`)

```bash
# Copy the sample file
cp client/sample.env client/.env
```

Edit `client/.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# NextAuth (generate random strings)
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (if using)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-preset"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# Resend (email - optional for now)
RESEND_API_KEY="re_your_key"

# Server URL
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

#### Server Environment (`server/.env`)

```bash
# Copy the sample file
cp server/sample.env server/.env
```

Edit `server/.env`:

```env
# MongoDB
MONGO_URI="mongodb+srv://user:password@cluster.mongodb.net/batiyoun"

# Redis (optional)
REDIS_URL="redis://localhost:6379"

# Server Config
PORT=4000
NODE_ENV="development"

# Client URL (for CORS)
CLIENT_URL="http://localhost:3000"

# JWT Secret (generate random string)
JWT_SECRET="run: openssl rand -base64 32"
```

### Step 9: Initialize Database

Run Prisma migrations:

```bash
cd client
npx prisma migrate dev --name init
npx prisma generate
cd ..
```

This will:

- Create tables in PostgreSQL
- Generate Prisma Client
- Sync your schema

### Step 10: Start Development Servers

From the root directory:

```bash
npm run dev
```

This starts:

- **Client:** [http://localhost:3000](http://localhost:3000)
- **Server:** [http://localhost:4000](http://localhost:4000)

---

## Troubleshooting

### Common Issues

#### 1. "Prisma Client is not generated"

**Solution:**

```bash
cd client
npx prisma generate
cd ..
```

#### 2. "Database connection failed"

**Checklist:**

- ✅ Is your `DATABASE_URL` correct?
- ✅ Is PostgreSQL running?
- ✅ Can you connect with `psql`?
- ✅ Did you whitelist your IP (for cloud databases)?

#### 3. "Port 3000 already in use"

**Solution:**

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

#### 4. "Redis connection failed"

**Solution:** Redis is optional for development. Comment out Redis-related code or:

```bash
# Check if Redis is running
redis-cli ping  # Should return "PONG"

# Start Redis
sudo service redis-server start  # Linux
brew services start redis         # macOS
```

#### 5. "CORS error when connecting to WebSocket"

**Solution:** Make sure `CLIENT_URL` in `server/.env` matches your client URL exactly.

#### 6. Google OAuth not working

**Checklist:**

- ✅ Redirect URI matches exactly: `http://localhost:3000/api/auth/google/callback`
- ✅ Google+ API is enabled
- ✅ Credentials are in `client/.env`

---

## Project Structure

After installation, you should have:

```
batiyoun/
├── client/
│   ├── .env                    # ✅ Created
│   ├── node_modules/           # ✅ Installed
│   ├── prisma/
│   │   └── migrations/         # ✅ Generated
│   └── app/generated/prisma/   # ✅ Prisma Client
├── server/
│   ├── .env                    # ✅ Created
│   └── node_modules/           # ✅ Installed
└── node_modules/               # ✅ Root dependencies
```

---

## Next Steps

Now that you have Batiyoun running locally:

1. 📖 **Read the [Architecture Documentation](./ARCHITECTURE.md)**
2. 🤝 **Check [Contributing Guidelines](./CONTRIBUTING.md)**
3. 🔒 **Review [Security Policy](./SECURITY.md)**
4. 🐛 **Report issues on [GitHub](https://github.com/kushkumarkashyap7280/batiyoun/issues)**
5. 💡 **Join discussions on [GitHub Discussions](https://github.com/kushkumarkashyap7280/batiyoun/discussions)**

---

## Useful Commands

```bash
# Start development (both client and server)
npm run dev

# Start only client
cd client && npm run dev

# Start only server
cd server && npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Database management
cd client
npx prisma studio        # Open Prisma Studio
npx prisma migrate dev   # Create migration
npx prisma db push       # Push schema changes
npx prisma db pull       # Pull schema from DB
```

---

## Getting Help

- 💬 **Questions:** [GitHub Discussions](https://github.com/kushkumarkashyap7280/batiyoun/discussions)
- 🐛 **Bugs:** [GitHub Issues](https://github.com/kushkumarkashyap7280/batiyoun/issues)
- 📧 **Email:** kushkumarkashyap7280@gmail.com

---

**Happy coding! 🎉**
