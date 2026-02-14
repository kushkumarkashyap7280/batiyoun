# Security Policy 🛡️

## 🔒 Our Commitment to Security

Security and privacy are core principles of Batiyoun. We're building a platform where users can communicate with confidence, knowing their data is protected by industry-standard encryption and security practices.

---

## 🐛 Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please report it responsibly.

### How to Report

**DO:**

- ✅ Email security reports to: **kushkumar.officialsoftwaredev@gmail.com**
- ✅ Include detailed steps to reproduce the vulnerability
- ✅ Provide your assessment of the impact and severity
- ✅ Give us reasonable time to fix the issue before public disclosure

**DON'T:**

- ❌ Open a public GitHub issue for security vulnerabilities
- ❌ Exploit the vulnerability beyond proof-of-concept
- ❌ Access or modify other users' data
- ❌ Publicly disclose the vulnerability before we've patched it

### What to Include

- **Title:** Brief description of the vulnerability
- **Description:** Detailed explanation of the issue
- **Steps to Reproduce:** Clear, step-by-step instructions
- **Impact:** What an attacker could do
- **Affected Components:** Client, server, database, etc.
- **Suggested Fix:** If you have ideas (optional)
- **Your Contact:** How we can reach you for follow-up

### Our Response Timeline

- **24 hours:** Initial acknowledgment of your report
- **72 hours:** Assessment and severity classification
- **7-30 days:** Patch development and testing (depending on severity)
- **After fix:** Public disclosure (with credit to you, if desired)

---

## 🏆 Security Hall of Fame

We'll publicly recognize security researchers who responsibly disclose vulnerabilities:

_No reports yet - you could be first!_

---

## 🔐 Security Features

### Current Implementation

#### 1. **Authentication Security**

- ✅ **Password Hashing:** bcrypt with salt (cost factor: 10)
- ✅ **HTTP-Only Cookies:** Prevent XSS attacks
- ✅ **Secure Cookies:** HTTPS-only in production
- ✅ **Session Expiry:** 7-day TTL with automatic renewal
- ✅ **OAuth 2.0:** Google authentication support

#### 2. **API Security**

- ✅ **Input Validation:** Zod schemas on all endpoints
- ✅ **Rate Limiting:** Prevent brute force and DDoS
  - Login: 5 attempts per 15 minutes
  - OTP: 3 requests per hour
  - API: 100 requests per minute
- ✅ **CSRF Protection:** Built into Next.js
- ✅ **CORS:** Restricted to allowed origins

#### 3. **Database Security**

- ✅ **Prepared Statements:** SQL injection prevention (Prisma)
- ✅ **Connection Pooling:** Secure connection management
- ✅ **Environment Variables:** No hardcoded credentials
- ✅ **Encrypted Connections:** TLS for all database traffic

#### 4. **Network Security**

- ✅ **HTTPS/TLS 1.3:** All traffic encrypted in transit
- ✅ **WSS:** Secure WebSocket connections
- ✅ **Content Security Policy (CSP):** XSS mitigation
- ✅ **HSTS:** Force HTTPS connections

### In Development

#### 5. **End-to-End Encryption (E2EE)**

- 🚧 **Algorithm:** AES-256-GCM (symmetric encryption)
- 🚧 **Key Exchange:** ECDH (Elliptic Curve Diffie-Hellman)
- 🚧 **Key Generation:** Web Crypto API (client-side)
- 🚧 **Zero-Knowledge:** Server never sees plaintext messages
- 🚧 **Forward Secrecy:** New keys for each session

**E2EE Flow:**

```
1. User A generates ECDH key pair on client
2. User B generates ECDH key pair on client
3. Both exchange public keys via server
4. Both compute shared secret independently
5. Messages encrypted with shared secret
6. Server only sees encrypted data
```

#### 6. **Advanced Features (Planned)**

- 📋 **Key Rotation:** Automatic periodic key changes
- 📋 **Verified Devices:** Prevent MITM attacks
- 📋 **Safety Numbers:** Cross-verify encryption keys
- 📋 **Disappearing Messages:** Auto-delete after time
- 📋 **Screenshot Protection:** Android/iOS specific
- 📋 **2FA/MFA:** Two-factor authentication

---

## 🔍 Security Best Practices for Users

### Protecting Your Account

1. **Use a Strong Password**
   - At least 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Unique to Batiyoun (don't reuse passwords)
   - Consider using a password manager

2. **Enable Two-Factor Authentication** (coming soon)
   - Adds an extra layer of security
   - Required for password recovery

3. **Verify Your Email**
   - Ensures account recovery options
   - Prevents unauthorized access

4. **Keep Your Device Secure**
   - Lock screen with PIN/biometrics
   - Keep OS and browser updated
   - Don't root/jailbreak your device

5. **Be Cautious of Phishing**
   - We'll never ask for your password via email
   - Always check the URL: `batiyoun.vercel.app`
   - Be suspicious of unsolicited login links

### Protecting Your Privacy

1. **Think Before You Send**
   - Once sent, you can't unsend (yet)
   - Assume messages could be screenshot

2. **Verify Who You're Talking To**
   - Check usernames carefully
   - Use safety numbers (coming soon)

3. **Manage Your Data**
   - Regularly clear old conversations
   - Use disappearing messages (coming soon)

4. **Report Suspicious Activity**
   - Contact us if you notice unusual account activity
   - Report abusive users

---

## 🛠️ Our Security Practices

### Development

- ✅ **Security-First Design:** Security considered from day one
- ✅ **Code Reviews:** All code reviewed before merging
- ✅ **Dependency Scanning:** Automated vulnerability checks
- ✅ **Static Analysis:** ESLint security rules
- ✅ **Type Safety:** TypeScript for compile-time checks

### Infrastructure

- ✅ **Least Privilege:** Services only get necessary permissions
- ✅ **Secrets Management:** Environment variables, no hardcoded secrets
- ✅ **Regular Updates:** Dependencies kept up-to-date
- ✅ **Monitoring:** Error tracking and anomaly detection
- ✅ **Backups:** Regular automated backups (database)

### Compliance & Auditing

- 📋 **Regular Security Audits** (Planned)
- 📋 **Penetration Testing** (Planned)
- 📋 **GDPR Compliance** (For EU users)
- 📋 **Data Retention Policies**
- 📋 **Transparency Reports** (Planned)

---

## 🔐 Encryption Details

### Current (Transport Layer)

- **HTTPS:** TLS 1.3 with modern cipher suites
- **WebSocket:** WSS (WebSocket Secure)

### Planned (Application Layer)

**Message Encryption:**

```
Algorithm: AES-256-GCM
Key Size: 256 bits
IV Size: 96 bits (12 bytes)
Tag Size: 128 bits (16 bytes)
```

**Key Exchange:**

```
Algorithm: ECDH (Elliptic Curve Diffie-Hellman)
Curve: Curve25519 (X25519)
Key Size: 256 bits
```

**Key Derivation:**

```
Algorithm: HKDF (HMAC-based KDF)
Hash: SHA-256
Salt: Random 256-bit value
```

---

## 📜 Data Retention

### What We Store

- **User Profile:** Email, username, display name, avatar URL
- **Authentication:** Hashed password, OAuth provider ID
- **Messages:** Encrypted content, metadata, timestamps
- **Sessions:** Active login sessions (7-day TTL)
- **Logs:** Error logs, access logs (30-day retention)

### What We DON'T Store

- ❌ Plaintext passwords
- ❌ Message decryption keys (when E2EE is live)
- ❌ Deleted messages (after deletion)
- ❌ Private keys (client-side only)

### Data Deletion

Users can request data deletion:

1. Account deletion deletes all user data within 30 days
2. Message deletion is immediate
3. Backups are purged after 90 days

---

## 🚨 Incident Response

In case of a security breach:

1. **Detection:** Monitoring systems alert our team
2. **Assessment:** Evaluate scope and severity
3. **Containment:** Isolate affected systems
4. **Notification:** Inform affected users within 72 hours
5. **Remediation:** Patch vulnerabilities
6. **Review:** Post-mortem analysis
7. **Disclosure:** Public incident report

---

## 📞 Contact

- 🔒 **Security Issues:** kushkumar.officialsoftwaredev@gmail.com
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/kushkumarkashyap7280/batiyoun/issues)
- 💬 **General Questions:** [GitHub Discussions](https://github.com/kushkumarkashyap7280/batiyoun/discussions)

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Signal Protocol](https://signal.org/docs/) (Inspiration for our E2EE)

---

**Last Updated:** February 13, 2026

Thank you for helping keep Batiyoun secure! 🙏
