# 💬 Batiyoun (Talk)

**Batiyoun** is a high-performance, End-to-End Encrypted (E2E) real-time messaging platform designed with a hybrid microservices architecture. It creates a seamless bridge between Serverless scalability and Stateful real-time communication.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active_Development-green.svg)

## 🏗 System Architecture

Batiyoun uses a **Polyglot Persistence** pattern to optimize for both transactional integrity and high-write throughput.

- **Authentication & User Management:** Handled by **Next.js** (Serverless) + **PostgreSQL** (ACID Compliance).
- **Real-Time Messaging Engine:** Handled by a custom **Node.js/Socket.io** Server (Stateful) + **MongoDB** (High Write Speed).
- **Validation:** Shared Typescript/Zod package (`@batiyoun/common`) ensuring strict contract adherence between services.

### The Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Client** | Next.js 14 (App Router) | Server-Side Rendering & UI |
| **Auth DB** | PostgreSQL (Prisma ORM) | Users, Relations, Auth |
| **Realtime Server** | Node.js + Express + Socket.io | WebSocket Management |
| **Chat DB** | MongoDB (Mongoose) | Message Persistence |
| **Validation** | Zod | Runtime Schema Validation |
| **DevOps** | Docker, Turborepo | Containerization & Orchestration |

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- Docker (Optional, for Redis/Mongo)
- PostgreSQL URI
- MongoDB URI

### Installation

1. **Clone the Monorepo**
   ```bash
   git clone https://github.com/kushkumarkashyap7280/batiyoun.git
   cd batiyoun
   ```

2. **Install Dependencies (Root)**
   We use npm workspaces to manage the monorepo.
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in both `client/` and `server/` directories.

   **Client (.env)**
   ```bash
   DATABASE_URL="postgresql://..."
   NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
   ```

   **Server (.env)**
   ```bash
   MONGO_URI="mongodb+srv://..."
   PORT=4000
   CLIENT_URL="http://localhost:3000"
   ```

4. **Run Development Mode**
   Start both the Next.js client and Node.js server simultaneously.
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```
.
├── client/          # Next.js Application (Frontend + Auth API)
│   ├── features/    # Feature-Driven Logic (Auth, Chat)
│   └── lib/         # Prisma Client (Postgres)
├── server/          # Node.js WebSocket Server
│   ├── src/
│   │   ├── config/  # DB Connections & Env Validation
│   │   ├── models/  # Mongoose Schemas (MongoDB)
│   │   └── controllers/ # Socket Logic
└── common/          # Shared Zod Schemas & TypeScript Types
```

## 🔐 Security Features (In Progress)

- **Zero-Knowledge Architecture:** Messages are encrypted on the client before transmission.
- **ECDH Key Exchange:** Secure shared secret generation.
- **Stateless Handoff:** JWT-based authentication flow between Next.js and Socket Server.

## 🤝 Contribution

This is an open-source educational project. Feel free to open issues or PRs.

---

Built with ❤️ by Kush Kumar