# 🔐 Batiyoun (Secure E2E Chat)

> **"Privacy by Design, not by Policy."**
> A military-grade, end-to-end encrypted messaging platform where the server truly knows nothing.

![Project Status](https://img.shields.io/badge/Status-Development-orange)
![License](https://img.shields.io/badge/License-MIT-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)

## 📖 Overview
Batiyoun is a real-time messaging application built on a **High-Performance Monorepo Architecture**. Unlike standard chat apps, Batiyoun implements true **End-to-End Encryption (E2EE)** using the **Web Crypto API**.

The server acts as a "Zero-Knowledge" relay. It stores encrypted binary blobs but lacks the private keys required to decrypt them. Even if the database is leaked, the messages remain mathematically unreadable.

---

## 🏗️ Architecture

The project is structured as a **TypeScript Monorepo** using npm workspaces.

| Package | Path | Description |
| :--- | :--- | :--- |
| **Client** | `apps/client` | Next.js 14 (App Router) + TailwindCSS. Handles encryption/decryption locally in the browser. |
| **Server** | `apps/server` | Node.js + Express + Socket.io. Handles WebSocket connections and MongoDB storage. |
| **Common** | `packages/common` | Shared Zod Schemas & TypeScript Types. Ensures the API contract is strictly enforced on both ends. |



[Image of System Architecture Diagram]


---

## 🚀 Tech Stack

### Core
* **Runtime:** Node.js (v20+)
* **Language:** TypeScript (Strict Mode)
* **Monorepo Tooling:** NPM Workspaces
* **Validation:** Zod (Shared between frontend/backend)

### Frontend (Client)
* **Framework:** Next.js 14
* **Styling:** TailwindCSS
* **State Management:** React Context + Hooks
* **Cryptography:** Web Crypto API (Native Browser Standard)
    * *ECDH (Elliptic Curve Diffie-Hellman)* for Key Exchange
    * *AES-GCM-256* for Message Encryption

### Backend (Server)
* **Framework:** Express.js
* **Real-time Engine:** Socket.io
* **Database:** MongoDB (Stores Ciphertext only)
* **Tooling:** `tsx` for high-performance development execution

---

## 🔒 The Security Model (How it works)

This is the core differentiator of Batiyoun.

1.  **Key Generation:** On sign-up, the user's browser generates a `Public Key` and `Private Key` (ECDH-P256).
2.  **Key Storage:**
    * **Private Key:** Stored in the browser's **IndexedDB** (Never leaves the device).
    * **Public Key:** Sent to the server so other users can find you.
3.  **The Handshake:** When User A chats with User B, their browsers perform a Diffie-Hellman exchange to derive a shared **Session Key** (AES).
4.  **Encryption:** Messages are encrypted locally using AES-GCM before they ever touch the network.
5.  **Storage:** The MongoDB database stores:
    ```json
    {
      "content": "8f7a9c2b...", // <--- Encrypted Garbage
      "iv": "123456...",        // <--- Random Salt
      "senderId": "user_123"
    }
    ```

---

## 🛠️ Getting Started

Follow these steps to run the complete system locally.

### 1. Prerequisites
* Node.js installed (v18 or higher)
* MongoDB running locally or a generic connection string

### 2. Installation
Install dependencies for the entire monorepo from the root:
```bash
npm install