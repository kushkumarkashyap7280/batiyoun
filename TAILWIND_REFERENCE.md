# Batiyoun Design System - Tailwind Utility Reference

## Quick Class Usage Guide

### Background Colors (Light/Dark Aware)
```jsx
// Light mode backgrounds
bg-ceramic-50          // Page background (#FAFAF8)
bg-ceramic-100         // Slightly warmer
bg-ceramic-200         // Light grey

// Dark mode backgrounds (use with dark:)
dark:bg-obsidian-50    // Dark page background (#1C2332)
dark:bg-obsidian-100   // Lighter cards in dark mode
dark:bg-obsidian-200   // Even lighter for depth

// Semantic (automatically switches with theme)
bg-background          // Dynamic - uses --background var
bg-card                // For card backgrounds
bg-primary             // Teal accent color
```

### Text Colors
```jsx
// Light mode foreground
text-ceramic-700       // Dark text (#4A453C)
text-ceramic-600       // Medium grey
text-ceramic-500       // Lighter grey

// Dark mode foreground
dark:text-obsidian-800 // Light text in dark mode
dark:text-obsidian-600 // Medium grey
dark:text-obsidian-500 // Lighter

// Semantic
text-foreground        // Automatically adjusts
text-muted-foreground  // Disabled/secondary text
text-accent            // Teal text (use sparingly)
```

### Secure/Teal Accents
```jsx
// When you want to emphasize "Secure"
bg-secure-600          // Solid teal (#0D9488)
text-secure-600        // Teal text
border-secure-600      // Teal borders
ring-secure-600        // Focus ring (teal)

// Variations
bg-secure-50           // Very light teal (backgrounds)
bg-secure-100          // Light teal
bg-secure-400          // Lighter teal
bg-secure-700          // Darker teal (hover states)
```

### Typography Classes
```jsx
// Headings use Plus Jakarta Sans
font-heading           // Plus Jakarta Sans
font-bold              // With weight
text-6xl               // Extra large (Hero)
text-5xl               // Large (Section titles)
text-2xl               // Medium (Card titles)
text-lg                // Body large
text-base              // Body normal (default)
text-sm                // Small text

// Code/Keys use JetBrains Mono
font-mono              // JetBrains Mono
text-xs                // Small mono (0x3F... hashes)
```

### Spacing (Tailwind Standard)
```jsx
p-4                    // Padding 16px
p-6                    // Padding 24px
p-8                    // Padding 32px
gap-4                  // Gap 16px
gap-6                  // Gap 24px
mt-8                   // Margin-top 32px
mb-12                  // Margin-bottom 48px
```

### Border & Ring Utilities
```jsx
border                 // 1px border
border-ceramic-200     // Light border (light mode)
dark:border-obsidian-200  // Dark border (dark mode)
border-secure-600      // Teal border (highlights)

rounded-lg             // Large rounded (20px)
rounded-2xl            // Extra large (24px)

ring-2                 // Focus ring width
ring-secure-600        // Teal focus ring
ring-offset-2          // Offset from element
```

### Shadows
```jsx
shadow-sm              // Minimal shadow
shadow                 // Default shadow
shadow-lg              // Large shadow
shadow-secure          // Teal glow (for security elements)
shadow-secure-lg       // Larger teal glow
```

### Effects & Filters
```jsx
backdrop-blur-sm       // Blur: 4px
backdrop-blur-xs       // Blur: 2px (subtle)
opacity-50             // 50% opacity
opacity-75             // 75% opacity
```

### Animations (Custom)
```jsx
animate-pop-in         // Scale + fade in (0.3s)
animate-fade-slide-up  // Fade + slide up (0.5s)
animate-pulse-secure   // Teal pulse (2s infinite)
```

### Hover/Focus States
```jsx
// Button hover
hover:bg-secure-700    // Darker teal on hover
hover:shadow-lg        // Lift shadow on hover

// Focus states (auto teal)
focus:ring-2
focus:ring-secure-600
focus:ring-offset-2

// Dark mode specific
dark:hover:bg-obsidian-200
dark:focus:ring-secure-600
```

### Flexbox & Grid
```jsx
flex                   // display: flex
flex-col               // flex-direction: column
gap-4                  // gap: 16px
justify-center         // justify-content: center
items-center           // align-items: center

grid                   // display: grid
grid-cols-2            // 2 columns
md:grid-cols-3         // 3 columns on medium+
gap-6                  // grid-gap: 24px
```

### Responsive Prefixes
```jsx
sm:text-lg             // Small screens (640px+)
md:text-2xl            // Medium screens (768px+)
lg:text-4xl            // Large screens (1024px+)
xl:text-6xl            // Extra large (1280px+)

// Dark mode
dark:bg-obsidian-50
dark:text-obsidian-800
dark:border-obsidian-200
```

## Real-World Examples

### Hero Section
```jsx
<section className="min-h-screen flex items-center bg-ceramic-50 dark:bg-obsidian-50">
  <h1 className="font-heading font-bold text-6xl text-ceramic-800 dark:text-obsidian-800">
    Privacy is a Human Right.
  </h1>
  <p className="text-lg text-ceramic-600 dark:text-obsidian-600">
    Chat freely.
  </p>
</section>
```

### Primary Button
```jsx
<button className="px-8 py-4 bg-secure-600 text-white rounded-lg font-semibold hover:bg-secure-700 transition-all hover:shadow-secure-lg">
  Start Chatting
</button>
```

### Secondary Button (Outline)
```jsx
<button className="px-8 py-4 border-2 border-secure-600 text-secure-600 dark:text-secure-400 rounded-lg font-semibold hover:bg-secure-50 dark:hover:bg-obsidian-100 transition-colors">
  View Source
</button>
```

### Card Component
```jsx
<div className="bg-white dark:bg-obsidian-100 rounded-2xl p-8 border border-ceramic-200 dark:border-obsidian-300 hover:shadow-lg transition-shadow">
  <h3 className="font-heading font-bold text-xl text-ceramic-800 dark:text-obsidian-800">
    Feature Title
  </h3>
  <p className="text-ceramic-700 dark:text-obsidian-700">
    Feature description
  </p>
</div>
```

### Input Field
```jsx
<input
  type="text"
  placeholder="Enter your message..."
  className="w-full px-4 py-3 bg-ceramic-100 dark:bg-obsidian-100 border border-ceramic-200 dark:border-obsidian-300 rounded-lg text-ceramic-800 dark:text-obsidian-800 placeholder-ceramic-500 dark:placeholder-obsidian-500 focus:outline-none focus:ring-2 focus:ring-secure-600 focus:ring-offset-2 dark:focus:ring-offset-obsidian-50 transition-all"
/>
```

### Teal Accent (Use Sparingly!)
```jsx
// Security indicator
<div className="flex items-center gap-2 text-secure-600">
  <Lock className="w-4 h-4" />
  <span className="font-mono text-sm">Encrypted</span>
</div>

// Icon with teal
<Shield className="w-12 h-12 text-secure-600" />
```

## Do's & Don'ts

### ✅ DO:
- Use semantic classes first (`text-foreground`, `bg-background`)
- Use dark: prefix for dark mode styles
- Keep teal accents for security/trust elements only
- Use shadows for depth, not color
- Keep animations under 500ms

### ❌ DON'T:
- Use `bg-blue-500` (use `bg-secure-600` instead)
- Mix light/dark specific colors in same class
- Over-animate (one animation per element)
- Use pure black (`#000000`) or pure white (`#FFFFFF`)
- Make teal the dominant color (it's an accent)

## Animation Timings

```jsx
// Pop in effect (message bubbles)
animate-pop-in         // 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)

// Fade and slide on scroll
animate-fade-slide-up  // 0.5s ease-out

// Pulsing security indicator
animate-pulse-secure   // 2s infinite
```

## Accessibility

```jsx
// Always include focus rings
focus:ring-2
focus:ring-secure-600

// Sufficient contrast
text-ceramic-800 on bg-ceramic-50       // ✅ 15:1 ratio
text-obsidian-800 on bg-obsidian-50     // ✅ 12:1 ratio

// Don't use color alone to convey meaning
// Always pair with text or icons
<Lock className="w-4 h-4 text-secure-600" /> Encrypted
```

---

**Tip**: Copy-paste the real-world examples and modify for your use case!
