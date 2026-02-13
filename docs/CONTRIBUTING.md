# Contributing to Batiyoun 🤝

First off, thank you for considering contributing to Batiyoun! It's people like you that make Batiyoun such a great tool for private, secure communication.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Project Structure](#project-structure)

---

## Code of Conduct

This project and everyone participating in it is governed by respect, inclusivity, and collaboration. By participating, you are expected to uphold this code.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Welcome newcomers and help them learn
- ✅ Focus on what is best for the community
- ✅ Show empathy towards other community members
- ❌ Don't use inappropriate language or imagery
- ❌ Don't troll, insult, or make derogatory comments

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

When creating a bug report, include:
- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)
- **Error messages** or logs

**Template:**
```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g., Ubuntu 22.04]
 - Browser: [e.g., Chrome 120]
 - Node Version: [e.g., 20.10.0]
```

### 💡 Suggesting Features

We love feature ideas! Before suggesting, check if someone else has already proposed it.

**Include:**
- **Use case** - Why is this feature needed?
- **Proposed solution** - How should it work?
- **Alternatives** - What other solutions did you consider?
- **Additional context** - Mockups, examples, etc.

### 🧑‍💻 Contributing Code

#### First Time Contributors

Look for issues labeled:
- `good first issue` - Great for newcomers
- `help wanted` - We need community help
- `documentation` - Improve our docs

#### Development Process

1. **Fork the repository**
2. **Create a feature branch** from `main`
3. **Make your changes**
4. **Write/update tests** (when applicable)
5. **Update documentation**
6. **Submit a pull request**

---

## Development Setup

### Prerequisites

- Node.js v20+
- PostgreSQL database
- MongoDB instance
- Redis (optional for development)
- Git

### Step-by-Step Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/batiyoun.git
   cd batiyoun
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Client
   cp client/sample.env client/.env
   # Edit client/.env with your credentials

   # Server
   cp server/sample.env server/.env
   # Edit server/.env with your credentials
   ```

4. **Database Setup**
   ```bash
   cd client
   npx prisma migrate dev
   npx prisma generate
   cd ..
   ```

5. **Start Development**
   ```bash
   npm run dev
   ```

   This starts:
   - Client at `http://localhost:3000`
   - Server at `http://localhost:4000`

### Monorepo Structure

Batiyoun uses **npm workspaces** for monorepo management:

```
batiyoun/
├── client/      # Next.js PWA
└── server/      # Node.js WebSocket Server
```

### Useful Commands

```bash
# Install dependencies for all workspaces
npm install

# Run dev servers (client + server)
npm run dev

# Build all packages
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

---

## Pull Request Process

### Before Submitting

- ✅ Test your changes locally
- ✅ Update documentation if needed
- ✅ Add tests for new features
- ✅ Ensure all tests pass
- ✅ Follow our coding standards
- ✅ Update the README if you changed functionality

### PR Guidelines

1. **Create a descriptive title**
   - ✅ `feat: Add end-to-end encryption for messages`
   - ✅ `fix: Resolve offline sync issue`
   - ❌ `Update code`
   - ❌ `Changes`

2. **Fill out the PR template**
   - What does this PR do?
   - Related issue number(s)
   - Screenshots/videos (if UI changes)
   - Checklist of completion

3. **Keep PRs focused**
   - One feature/fix per PR
   - Don't mix refactoring with new features
   - Split large changes into multiple PRs

4. **Link related issues**
   - Use `Fixes #123` or `Closes #456`

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Related Issues
Fixes #123

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests
```

---

## Coding Standards

### TypeScript

- **Use TypeScript** for all new code
- **Explicit types** over implicit
- **No `any`** unless absolutely necessary
- **Interfaces over types** for object shapes

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  username: string;
}

// ❌ Avoid
const user: any = { ... };
```

### React/Next.js

- **Functional components** only
- **Use hooks** appropriately
- **Server Components by default** (Next.js App Router)
- **Client Components** only when needed (`'use client'`)

```typescript
// ✅ Good - Server Component
export default function Page() {
  return <div>Content</div>;
}

// ✅ Good - Client Component (when needed)
'use client';
export default function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Naming Conventions

- **Components:** PascalCase (`UserProfile.tsx`)
- **Functions/Variables:** camelCase (`getUserData`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Files:** kebab-case for non-components (`api-client.ts`)

### Code Organization

- **One component per file**
- **Group related files** in folders
- **Use barrel exports** (`index.ts`) for cleaner imports
- **Keep functions small** and focused

### Styling

- **Use Tailwind CSS**
- **shadcn/ui components** for UI elements
- **Consistent spacing** using Tailwind's scale
- **Mobile-first** approach

```tsx
// ✅ Good
<div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6">
  <Card className="w-full md:w-1/2">Content</Card>
</div>
```

---

## Commit Message Guidelines

We follow **Conventional Commits** for clear, structured commit history.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style (formatting, no logic change)
- `refactor` - Code refactoring
- `test` - Adding/updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements

### Examples

```bash
feat(auth): add Google OAuth login

Implemented Google OAuth integration using NextAuth.js.
Users can now sign in with their Google accounts.

Closes #42

---

fix(chat): resolve message ordering issue

Messages were displayed in reverse chronological order.
Fixed by sorting by timestamp ascending.

Fixes #78

---

docs(readme): update installation instructions

Added PostgreSQL setup steps and environment variable examples.
```

### Best Practices

- ✅ Use present tense ("add" not "added")
- ✅ Use imperative mood ("move" not "moves")
- ✅ Don't capitalize first letter
- ✅ No period at the end
- ✅ Keep subject under 50 characters
- ✅ Separate subject from body with blank line

---

## Project Structure

### Client (`client/`)

```
client/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth routes (grouped)
│   ├── (main)/            # Main app routes (grouped)
│   └── api/               # API routes
├── components/            # React components
│   ├── auth-components/   # Auth-related
│   ├── ui/                # shadcn/ui components
│   └── ...
├── lib/                   # Utilities & clients
├── prisma/                # Database schema
└── public/                # Static assets
```

### Server (`server/`)

```
server/
└── src/
    ├── config/            # Configuration files
    ├── controllers/       # Business logic
    ├── models/            # Database models
    ├── routes/            # API routes
    ├── services/          # External services
    ├── middlewares/       # Express middlewares
    └── utils/             # Helper functions
```

### Common (`common/`)

```
common/
├── types.ts               # Shared TypeScript types
├── errors.ts              # Common error classes
└── index.ts               # Barrel export
```

---

## Questions?

- 💬 **GitHub Discussions:** Ask questions, share ideas
- 🐛 **GitHub Issues:** Report bugs, request features
- 📧 **Email:** kushkumarkashyap7280@gmail.com

---

## Recognition

Contributors will be:
- 🌟 Listed in our README
- 🏆 Recognized in release notes
- 💖 Forever appreciated by the community

---

**Thank you for contributing to Batiyoun! Your efforts help make secure, private messaging accessible to everyone.** 🎉

