# Frequently Asked Questions (FAQ) ❓

Common questions about Batiyoun, answered.

## 📋 Table of Contents

- [General](#general)
- [Features](#features)
- [Technical](#technical)
- [Privacy & Security](#privacy--security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## General

### What is Batiyoun?

Batiyoun is a Progressive Web App (PWA) for private, encrypted messaging. Unlike traditional chat apps, Batiyoun gives you:
- End-to-end encryption (coming soon)
- Offline functionality
- Local data storage
- Full control over your data
- No app store required

### What does "Batiyoun" mean?

"Batiyoun" (बातियौं) is a Hindi/Nepali word meaning "Let's talk" or "conversation." It reflects our mission to enable free, private communication.

### Is Batiyoun free?

Yes! Batiyoun is 100% free and open-source under the MIT license. There are no paid tiers, no ads, and no data selling.

### How is Batiyoun different from WhatsApp/Telegram/Signal?

| Feature | Batiyoun | WhatsApp | Telegram | Signal |
|---------|----------|----------|----------|--------|
| **Open Source** | ✅ Fully | ❌ No | Partially | ✅ Yes |
| **PWA (No install)** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Offline Chats** | ✅ Yes | Limited | Limited | Limited |
| **Data Ownership** | ✅ Local storage | ❌ Server | ❌ Server | ⚠️ Encrypted server |
| **E2E Encryption** | 🚧 Coming | ✅ Yes | Opt-in | ✅ Yes |
| **Self-Hostable** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |

**Key Difference:** Batiyoun focuses on client-side storage and progressive web capabilities, making it installable and usable offline without app stores.

### Is Batiyoun production-ready?

**Not yet.** Batiyoun is in active development (v0.x). Current features:
- ✅ Authentication
- ✅ PWA installation
- ✅ Offline sessions
- 🚧 Real-time messaging (in progress)
- 🚧 End-to-end encryption (in progress)

**Do NOT use for sensitive communications yet.** Wait for v1.0.

---

## Features

### What features are currently available?

**Live Now (v0.2):**
- Google OAuth login
- Email/password registration with OTP
- PWA installation (install as app)
- Offline session persistence
- Automatic updates via Service Worker
- Profile management
- Avatar uploads

**Coming Soon:**
- Real-time messaging
- End-to-end encryption
- Group chats
- File sharing
- Voice/video calls

### Can I use Batiyoun offline?

**Yes!** Batiyoun is designed as an offline-first PWA:
- ✅ View cached messages
- ✅ Compose messages (sent when online)
- ✅ Browse chat history
- ✅ View profile
- ❌ Send/receive new messages (requires connection)

### How do I install Batiyoun as an app?

**Chrome/Edge (Desktop):**
1. Visit [batiyoun.vercel.app](https://batiyoun.vercel.app/)
2. Click the install icon in the address bar
3. Click "Install"

**Chrome (Android):**
1. Visit the site
2. Tap the menu (⋮) → "Add to Home Screen"
3. Tap "Add"

**Safari (iOS):**
1. Visit the site
2. Tap Share button → "Add to Home Screen"
3. Tap "Add"

### Can I use Batiyoun on my phone?

**Yes!** Batiyoun is a PWA and works on:
- ✅ Android (Chrome, Edge, Samsung Internet)
- ✅ iOS/iPadOS (Safari)
- ✅ Desktop (Chrome, Edge, Safari, Firefox)

### Will there be a native app?

**Unlikely.** The whole point is to avoid app stores and their restrictions. PWAs offer:
- No app store approval delays
- Instant updates
- Cross-platform support
- Smaller download size

---

## Technical

### What technology stack does Batiyoun use?

**Frontend:**
- Next.js 15 (React 19)
- TypeScript
- Tailwind CSS
- shadcn/ui

**Backend:**
- Node.js + Express
- Socket.io (WebSockets)
- PostgreSQL (user data)
- MongoDB (messages)
- Redis (cache/sessions)

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

### Can I self-host Batiyoun?

**Yes!** Batiyoun is open-source. Requirements:
- Node.js v20+
- PostgreSQL database
- MongoDB database
- Redis (optional)

See [INSTALLATION.md](./INSTALLATION.md) for setup.

### How do I contribute code?

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Look for `good first issue` labels
3. Fork, code, and submit PR

### Is there an API?

**Yes**, but it's still evolving. Documentation coming soon in [API.md](./API.md).

---

## Privacy & Security

### Is Batiyoun end-to-end encrypted?

**Not yet.** E2E encryption is in development:
- 🚧 ECDH key exchange
- 🚧 AES-256-GCM encryption
- 🚧 Client-side key generation

Messages are currently encrypted in transit (HTTPS/WSS) but not end-to-end.

**Do NOT use for sensitive communications yet.**

### Where is my data stored?

**User Data (email, password, profile):**
- PostgreSQL database (server-side)
- Password hashed with bcrypt

**Messages:**
- MongoDB database (server-side)
- Will be encrypted end-to-end (future)

**Local Cache:**
- IndexedDB in your browser
- Service Worker cache
- Can be cleared anytime

### Can the server read my messages?

**Currently: Yes** (but we don't). Messages are stored in MongoDB.

**Future: No**. With E2E encryption, the server will only see encrypted data. Only the recipient can decrypt.

### What data do you collect?

**We collect:**
- Email address (for login)
- Username
- Display name (optional)
- Avatar (optional)
- Messages you send
- Login sessions

**We do NOT collect:**
- Browsing history
- Device information (beyond what's necessary)
- Location data
- Third-party tracking

### Do you sell user data?

**Absolutely not.** We:
- ❌ Don't sell data
- ❌ Don't show ads
- ❌ Don't share with third parties
- ✅ Are open-source (you can audit the code)

### Can I delete my data?

**Yes.** You can:
- Delete individual messages
- Delete conversations
- Delete your account → deletes all your data

**Note:** Deleted data is removed from live databases. Backups are purged after 90 days.

### How do you handle security vulnerabilities?

Report security issues to **kushkumarkashyap7280@gmail.com** (not GitHub issues).

We'll:
1. Acknowledge within 24 hours
2. Assess severity
3. Patch within 7-30 days
4. Credit you (if desired)

See [SECURITY.md](./SECURITY.md) for details.

---

## Troubleshooting

### I can't log in. What should I do?

**Checklist:**
- ✅ Is your email verified? Check inbox for OTP
- ✅ Correct password? Try "Forgot Password"
- ✅ Browser cookies enabled?
- ✅ Try incognito/private mode
- ✅ Clear browser cache and retry

Still stuck? Report on [GitHub Issues](https://github.com/kushkumarkashyap7280/batiyoun/issues).

### App won't install on my device

**Chrome/Edge:**
- Make sure you're using HTTPS
- Check if already installed (look in apps list)
- Try clearing browser cache

**Safari (iOS):**
- Use "Add to Home Screen" (not automatic)

### Messages not sending

**Check:**
- ✅ Internet connection
- ✅ Server status (check GitHub for incidents)
- ✅ Try refreshing the page
- ✅ Check browser console for errors

### Offline mode not working

**Requirements:**
- Must have visited the site at least once online
- Service Worker must be registered
- Check: DevTools → Application → Service Workers

### How do I clear local data?

**Option 1: In-app (coming soon)**
- Settings → Privacy → Clear Data

**Option 2: Browser**
1. DevTools (F12)
2. Application → Storage
3. Click "Clear site data"

---

## Contributing

### How can I help?

Many ways:
- 🐛 Report bugs
- 💡 Suggest features
- 🧑‍💻 Write code
- 📝 Improve docs
- 🎨 Design UI/UX
- 🌍 Translate
- ⭐ Star on GitHub
- 📣 Spread the word

### I'm not a developer. Can I still contribute?

**Absolutely!** You can:
- Test the app and report issues
- Write documentation
- Create tutorials/videos
- Translate to other languages
- Share on social media
- Provide feedback

### Where do I start?

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
2. Look for issues labeled `good first issue`
3. Join [GitHub Discussions](https://github.com/kushkumarkashyap7280/batiyoun/discussions)

### How do I report a bug?

1. Check if it's already reported
2. Create a [GitHub Issue](https://github.com/kushkumarkashyap7280/batiyoun/issues/new)
3. Include:
   - What you did
   - What happened
   - What you expected
   - Screenshots/errors
   - Browser/OS info

---

## Still Have Questions?

- 💬 **Ask on [GitHub Discussions](https://github.com/kushkumarkashyap7280/batiyoun/discussions)**
- 🐛 **Report bugs on [GitHub Issues](https://github.com/kushkumarkashyap7280/batiyoun/issues)**
- 📧 **Email:** kushkumarkashyap7280@gmail.com

---

**Last Updated:** February 2026
