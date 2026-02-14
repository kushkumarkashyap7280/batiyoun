# Batiyoun Roadmap 🗺️

Our vision and development timeline for making Batiyoun the best private messaging PWA.

## 🎯 Vision

**Mission:** Empower users with a secure, privacy-focused messaging platform that puts them in control of their data while being accessible everywhere through progressive web technology.

**Core Principles:**

1. **Privacy First** - End-to-end encryption, no data mining
2. **User Ownership** - Your data, your device, your control
3. **Universal Access** - Works everywhere, no app stores
4. **Open Source** - Transparent, auditable, community-driven
5. **Offline-First** - Always accessible, even without connection

---

## 📅 Development Phases

### ✅ Phase 0: Foundation (Completed)

**Status:** Live at [batiyoun.vercel.app](https://batiyoun.vercel.app/)

- ✅ Monorepo setup (npm workspaces)
- ✅ Next.js 15 + React 19 frontend
- ✅ TypeScript across the stack
- ✅ Tailwind CSS + shadcn/ui
- ✅ Progressive Web App (PWA) setup
- ✅ Service Worker implementation
- ✅ IndexedDB integration groundwork
- ✅ Responsive design (mobile + desktop)

**Released:** January 2026

---

### ✅ Phase 1: Authentication & User Management (Completed)

**Status:** Live in production

**Features:**

- ✅ Email/password registration
- ✅ OTP verification via email
- ✅ Google OAuth integration
- ✅ Session management (Redis)
- ✅ User profiles
- ✅ Avatar uploads (Cloudinary)
- ✅ Username availability check
- ✅ Password hashing (bcrypt)
- ✅ Protected routes & middleware
- ✅ Logout functionality

**Released:** February 2026

---

### 🚧 Phase 2: Real-Time Messaging (In Progress)

**Status:** 60% Complete  
**Target:** March 2026

**Completed:**

- ✅ WebSocket server setup (Socket.io)
- ✅ MongoDB schema design
- ✅ Basic event architecture
- ✅ Redis pub/sub setup

**In Progress:**

- 🔨 1-on-1 chat implementation
- 🔨 Message persistence (MongoDB)
- 🔨 Real-time message delivery
- 🔨 Read receipts
- 🔨 Typing indicators
- 🔨 Message history pagination

**Upcoming:**

- 📋 Message editing
- 📋 Message deletion
- 📋 Search within conversation
- 📋 Link previews

---

### 📋 Phase 3: End-to-End Encryption (Planned)

**Status:** Planning  
**Target:** April-May 2026

**Core Features:**

- 🔐 **ECDH Key Exchange** (Curve25519)
- 🔐 **AES-256-GCM Encryption** for messages
- 🔐 **Client-side key generation** (Web Crypto API)
- 🔐 **Zero-knowledge architecture**
- 🔐 **Forward secrecy** with session keys
- 🔐 **Safety numbers** for key verification

**Implementation Steps:**

1. Crypto library integration
2. Key generation & storage (IndexedDB)
3. Key exchange protocol
4. Message encryption/decryption
5. Key rotation mechanism
6. Safety number verification UI
7. Security audit

**Security Goals:**

- Server cannot read messages
- Perfect forward secrecy
- Resistant to MITM attacks
- Verifiable encryption (safety numbers)

---

### 📋 Phase 4: Advanced Messaging Features (Planned)

**Target:** June-July 2026

**Group Chats:**

- 👥 Create groups (max 256 members initially)
- 👥 Group encryption (multi-cast)
- 👥 Admin roles & permissions
- 👥 Group info & settings
- 👥 Add/remove members
- 👥 Group invites

**Media Sharing:**

- 📷 Image upload & send
- 🎥 Video upload (size limits)
- 📄 Document sharing
- 🎵 Audio messages
- 📍 Location sharing (opt-in)
- 🔗 Link previews

**Message Features:**

- ↩️ Reply to messages
- ⏩ Forward messages
- 📌 Pin important messages
- ⭐ Starred/saved messages
- 🔍 Global message search
- 📊 Message statistics

---

### 📋 Phase 5: Voice & Video Calls (Planned)

**Target:** August-September 2026

**Technologies:**

- WebRTC for P2P connections
- TURN/STUN servers for NAT traversal
- End-to-end encrypted calls

**Features:**

- 📞 1-on-1 voice calls
- 📹 1-on-1 video calls
- 🎙️ Mute/unmute
- 📷 Camera on/off
- 🔊 Speaker/earpiece toggle
- 📱 Call notifications
- 📊 Connection quality indicators

**Future:**

- Group voice calls
- Group video calls (up to 8 participants)
- Screen sharing

---

### 📋 Phase 6: Enhanced Offline & Storage (Planned)

**Target:** October 2026

**Offline Capabilities:**

- 💾 Full message history offline (IndexedDB)
- 💾 Media caching
- 💾 Intelligent sync when online
- 💾 Background sync for queued messages
- 💾 Conflict resolution

**Storage Management:**

- 🗂️ **Visual File Manager**
  - Browse cached messages
  - View storage usage
  - Export conversations
  - Import backups
  - Selective sync (choose what to cache)

**Data Export/Import:**

- 📤 Export chat history (JSON/CSV)
- 📥 Import from other apps
- 🔄 Backup to cloud (encrypted)
- 🗜️ Compress old messages

---

### 📋 Phase 7: Privacy & Security Enhancements (Planned)

**Target:** November 2026

**Features:**

- 🔒 Two-Factor Authentication (2FA)
- 🔒 Biometric authentication (fingerprint, Face ID)
- 🔒 App lock with PIN
- 🔒 Disappearing messages (auto-delete after time)
- 🔒 Screenshot detection & prevention
- 🔒 Incognito keyboard
- 🔒 View-once media
- 🔒 Encrypted voice notes

**Privacy:**

- 🕵️ Last seen privacy controls
- 🕵️ Profile photo privacy
- 🕵️ Who can add me to groups
- 🕵️ Read receipt controls
- 🕵️ Typing indicator controls
- 🕵️ Block users
- 🕵️ Report & spam protection

---

### 📋 Phase 8: Customization & UX (Planned)

**Target:** December 2026

**Themes:**

- 🎨 Dark mode (system-aware)
- 🎨 Light mode
- 🎨 Custom themes
- 🎨 Chat wallpapers
- 🎨 Message bubble styles

**Personalization:**

- 😊 Emoji reactions
- 🎭 Stickers (custom packs)
- 🖼️ Custom notification sounds
- 🔔 Per-chat notification settings
- ⚙️ Advanced settings panel

**Accessibility:**

- ♿ Screen reader support
- ♿ Keyboard navigation
- ♿ Font size controls
- ♿ High contrast mode
- ♿ Voice commands (future)

---

### 📋 Phase 9: Platform & Integration (Planned)

**Target:** Q1 2027

**Multi-Device:**

- 💻 Desktop app (Electron wrapper)
- 📱 Better iPad/tablet experience
- 🔄 Device sync
- 📲 QR code device linking

**Integrations:**

- 🔗 Webhooks for bots
- 🤖 Bot API
- 🔌 Third-party integrations
- 📧 Email bridge (send/receive)

**Developer Tools:**

- 📚 Public API documentation
- 🔧 SDK for custom clients
- 🧪 Test environment
- 📊 Developer dashboard

---

## 🚀 Beyond v1.0

**Long-term Vision:**

- 🌍 **Decentralized Option** - Optional federated protocol
- 🔍 **Self-Sovereign Identity** - Control your identity across platforms
- 🛡️ **Blockchain Verification** - Optional message integrity verification
- 🤖 **AI Features** - Smart replies, message summarization (on-device)
- 🌐 **Translation** - Real-time message translation
- 📞 **VoIP Integration** - Call regular phone numbers
- 💼 **Business Features** - Teams, channels, broadcast lists

---

## 📊 Key Metrics & Goals

### By v1.0 (Mid-2027)

| Metric                   | Goal              |
| ------------------------ | ----------------- |
| **Monthly Active Users** | 10,000+           |
| **GitHub Stars**         | 1,000+            |
| **Contributors**         | 50+               |
| **Test Coverage**        | 80%+              |
| **Security Audit**       | ✅ Passed         |
| **Performance Score**    | 95+ (Lighthouse)  |
| **Bundle Size**          | < 500KB (gzipped) |

---

## 🤝 How You Can Help

### For Developers

- 🧑‍💻 Pick up issues labeled `help wanted`
- 🔌 Build integrations or bots
- 🧪 Write tests
- 📖 Improve documentation
- 🔍 Review code

### For Designers

- 🎨 Design themes
- 🖼️ Create sticker packs
- 📱 Improve UI/UX
- 🌈 Design marketing assets

### For Users

- 🐛 Report bugs
- 💡 Suggest features
- 📣 Spread the word
- ⭐ Star on GitHub
- 💰 Sponsor development

---

## 📢 Stay Updated

- 🐦 Follow on Twitter (coming soon)
- 📧 Subscribe to newsletter (coming soon)
- 💬 Join Discord (coming soon)
- 📱 Follow on GitHub for releases

---

## 💡 Suggest a Feature

Have an idea? We'd love to hear it!

1. Check if it's already in the roadmap
2. Search existing [GitHub Issues](https://github.com/kushkumarkashyap7280/batiyoun/issues)
3. Create a feature request
4. Join the discussion!

---

**This roadmap is subject to change based on community feedback, technical constraints, and real-world usage.**

**Last Updated:** February 13, 2026
