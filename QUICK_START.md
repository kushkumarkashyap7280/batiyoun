# Batiyoun Quick Reference 🚀

Essential commands and information for developers.

## ⚡ Quick Commands

### Setup

```bash
# Clone and install
git clone https://github.com/kushkumarkashyap7280/batiyoun.git
cd batiyoun
npm install

# Set up environment
cp client/sample.env client/.env
cp server/sample.env server/.env
# Edit .env files with your credentials

# Initialize database
cd client && npx prisma migrate dev && npx prisma generate && cd ..

# Start development
npm run dev
```

### Development

```bash
npm run dev              # Start both client & server
npm run dev:client       # Start only client (port 3000)
npm run dev:server       # Start only server (port 4000)

npm run build            # Build all packages
npm run build:client     # Build only client
npm run build:server     # Build only server

npm run lint             # Lint all packages
npm run lint:fix         # Fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format with Prettier
```

### Database

```bash
npm run prisma:studio    # Open Prisma Studio
npm run prisma:generate  # Generate Prisma Client
npm run prisma:migrate   # Create migration

cd client
npx prisma migrate dev --name description
npx prisma db push       # Push schema changes
npx prisma db pull       # Pull schema from DB
npx prisma format        # Format schema file
```

### Workspace Commands

```bash
# Run command in specific workspace
npm run dev -w client
npm run build -w server

# Install dependency in workspace
npm install package-name -w client
npm install -D dev-package -w server
```

## 📁 Project Structure

```
batiyoun/
├── client/              Next.js PWA (port 3000)
├── server/              WebSocket server (port 4000)
├── docs/                Documentation
└── .github/             GitHub templates & workflows
```

## 🔑 Key Files

| File                          | Purpose                      |
| ----------------------------- | ---------------------------- |
| `client/.env`                 | Client environment variables |
| `server/.env`                 | Server environment variables |
| `client/prisma/schema.prisma` | Database schema              |
| `client/app/layout.tsx`       | Root layout                  |
| `server/src/index.ts`         | WebSocket server entry       |
| `client/types/types.ts`       | Shared TypeScript types      |
| `client/utils/errors.ts`      | Error handling utilities     |

## 🌐 URLs

| Service       | Development           | Production                          |
| ------------- | --------------------- | ----------------------------------- |
| Client        | http://localhost:3000 | https://batiyoun.vercel.app         |
| Server        | http://localhost:4000 | https://batiyoun-server.railway.app |
| Prisma Studio | http://localhost:5555 | N/A                                 |

## 🔧 Environment Variables (Quick Reference)

### Client (.env)

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
CLOUDINARY_CLOUD_NAME="..."
```

### Server (.env)

```env
MONGO_URI="mongodb://..."
PORT=4000
CLIENT_URL="http://localhost:3000"
JWT_SECRET="different-from-nextauth-secret"
NODE_ENV="development"
```

## 🐛 Troubleshooting

| Issue                      | Solution                             |
| -------------------------- | ------------------------------------ |
| Port 3000 in use           | `lsof -ti:3000 \| xargs kill -9`     |
| Prisma not generated       | `npx prisma generate` in client/     |
| Database connection failed | Check DATABASE_URL in .env           |
| Module not found           | `rm -rf node_modules && npm install` |

## 📚 Documentation

- **Full Setup:** [docs/INSTALLATION.md](./docs/INSTALLATION.md)
- **Architecture:** [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **Contributing:** [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)
- **Security:** [docs/SECURITY.md](./docs/SECURITY.md)
- **FAQ:** [docs/FAQ.md](./docs/FAQ.md)
- **Roadmap:** [docs/ROADMAP.md](./docs/ROADMAP.md)

## 🛠️ Tech Stack

### Frontend

- Next.js 15, React 19, TypeScript
- Tailwind CSS, shadcn/ui
- Zustand, Workbox

### Backend

- Node.js, Express, Socket.io
- PostgreSQL (Prisma), MongoDB, Redis

### DevOps

- Vercel (client), Railway (server)
- GitHub Actions (CI/CD)

## 🎯 Useful Links

- **Live Demo:** https://batiyoun.vercel.app
- **GitHub:** https://github.com/kushkumarkashyap7280/batiyoun
- **Issues:** https://github.com/kushkumarkashyap7280/batiyoun/issues
- **Discussions:** https://github.com/kushkumarkashyap7280/batiyoun/discussions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📞 Support

- 💬 GitHub Discussions
- 🐛 GitHub Issues
- 📧 kushkumar.officialsoftwaredev@gmail.com

---

**Pro Tip:** Bookmark this file for quick reference! 📌
