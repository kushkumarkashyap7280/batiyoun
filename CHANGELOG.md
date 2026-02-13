# Changelog

All notable changes to Batiyoun will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 🚧 In Progress
- Real-time messaging via WebSocket (Socket.io)
- End-to-end encryption with ECDH + AES-256-GCM
- IndexedDB storage for offline message caching
- Visual file manager for local data
- Public/private key generation and management

---

## [0.2.0] - 2026-02-13

### ✨ Added
- PWA automatic update mechanism via Service Worker
- Update prompt UI component
- Offline session persistence
- Service Worker caching strategies
- Homepage improvements with feature showcase
- Encryption playground demo on landing page
- Tech stack ticker on homepage
- Desktop and mobile layouts (responsive)
- Profile page with avatar upload
- Settings page with multiple tabs (Appearance, Privacy, System, Backup)
- Theme switching (preparation for dark mode)
- Apple touch icon for iOS

### 🔧 Changed
- Improved Service Worker registration flow
- Enhanced PWA manifest with screenshots
- Better error handling for authentication flows
- Optimized bundle size for faster loading
- Updated landing page design

### 🐛 Fixed
- Session timeout issues
- Avatar upload failures in some browsers
- Service Worker registration errors in Safari
- Mobile layout issues on smaller screens

### 📚 Documentation
- Created comprehensive main README
- Added CONTRIBUTING.md guide
- Added ARCHITECTURE.md documentation
- Added SECURITY.md policy
- Added INSTALLATION.md setup guide
- Added ENVIRONMENT.md variable reference
- Added FAQ.md
- Added ROADMAP.md
- Created docs folder structure

---

## [0.1.0] - 2026-02-11

### ✨ Added - Initial Release

**Authentication System:**
- Email/password registration with bcrypt hashing
- Email verification with OTP (6-digit code via Resend)
- Google OAuth 2.0 integration
- Session management with Redis
- HTTP-only cookies for security
- Protected API routes with middleware
- Username availability checker
- User logout functionality

**Progressive Web App:**
- PWA manifest for installability
- Service Worker for offline capability
- App icons (72x72 to 512x512)
- Desktop and mobile install support
- Splash screens
- Themed icons for Android

**User Interface:**
- Landing page with hero section
- Features showcase section
- CTA (Call-to-Action) sections
- Responsive navigation (desktop & mobile)
- Authentication pages (login/signup multi-step)
- Profile view page
- Settings page structure
- Modern UI with Tailwind CSS
- shadcn/ui components integration

**Database & Schema:**
- PostgreSQL setup with Prisma ORM
- User model with relations
- Database migrations
- Prisma Client generation
- MongoDB connection setup (for future messaging)

**Developer Experience:**
- Monorepo structure with npm workspaces
- TypeScript across the stack
- ESLint configuration
- Shared types package (`@batiyoun/common`)
- Environment variable validation with Zod
- Sample .env files
- Code organization and file structure

**Infrastructure:**
- Next.js 15 with App Router
- Node.js WebSocket server setup
- Redis integration (Upstash)
- Cloudinary for file uploads
- Vercel deployment configuration
- Hot module replacement (HMR)

### 🔧 Technical Stack
- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, Socket.io (setup)
- **Databases:** PostgreSQL (Prisma), MongoDB (Mongoose - setup), Redis
- **Auth:** NextAuth.js, bcrypt, JWT
- **File Storage:** Cloudinary
- **Email:** Resend
- **Deployment:** Vercel (client), Railway (server planned)

---

## [0.0.1] - 2026-01-15

### 🎉 Project Initialization
- Repository created
- Basic folder structure
- Next.js project setup
- Node.js server skeleton
- MIT License added
- Initial README

---

## Version Legend

- **[Unreleased]** - Work in progress
- **[X.Y.Z]** - Released versions
  - **X** (Major) - Breaking changes, major new features
  - **Y** (Minor) - New features, backwards compatible
  - **Z** (Patch) - Bug fixes, minor improvements

## Change Categories

- ✨ **Added** - New features
- 🔧 **Changed** - Changes to existing functionality
- 🗑️ **Deprecated** - Soon-to-be removed features
- 🐛 **Fixed** - Bug fixes
- 🔒 **Security** - Security improvements
- 📚 **Documentation** - Documentation changes

---

**Links:**
- [Unreleased]: https://github.com/kushkumarkashyap7280/batiyoun/compare/v0.2.0...HEAD
- [0.2.0]: https://github.com/kushkumarkashyap7280/batiyoun/compare/v0.1.0...v0.2.0
- [0.1.0]: https://github.com/kushkumarkashyap7280/batiyoun/compare/v0.0.1...v0.1.0
- [0.0.1]: https://github.com/kushkumarkashyap7280/batiyoun/releases/tag/v0.0.1
