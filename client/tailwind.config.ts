import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  theme: {
    extend: {
      // Ceramic & Obsidian Color Palette
      colors: {
        // Semantic colors for light mode (Ceramic)
        ceramic: {
          50: '#FAFAF8',   // Softest bone white
          100: '#F5F3F0',  // Light warm white
          200: '#EDE8E3',  // Subtle contrast
          300: '#E0D5CC',  // Soft grey
          400: '#D1C3B5',  // Warm grey
          500: '#A69A8F',  // Medium grey
          600: '#6B6158',  // Dark grey
          700: '#4A453C',  // Very dark grey
          800: '#3A3530',  // Nearly black
        },
        
        // Semantic colors for dark mode (Obsidian)
        obsidian: {
          50: '#1C2332',   // Dark blue-grey (the new black)
          100: '#252D3A',  // Slightly lighter
          200: '#323D4D',  // Lift for contrast
          300: '#3D495B',  // More lift
          400: '#4A556A',  // Medium tone
          500: '#626E82',  // Lighter than background
          600: '#8A92A5',  // Light grey-blue
          700: '#B0B8CC',  // Very light
          800: '#E5E7EB',  // Nearly white
        },

        // Electric Teal - "Secure & Encrypted"
        secure: {
          50: '#F0FDFC',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',  // Mid teal
          500: '#14B8A6',  // Main teal (#0D9488 equivalent)
          600: '#0D9488',  // The brand teal
          700: '#0F766E',
          800: '#155E75',
          900: '#164E63',
        },

        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },

      // Typography
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-plus-jakarta)'],
        mono: ['var(--font-jetbrains-mono)'],
      },

      // Spacing
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },

      // Border Radius
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'calc(var(--radius-lg) - 2px)',
        sm: 'calc(var(--radius-lg) - 4px)',
      },

      // Animations: Springy & Snappy
      animation: {
        'pop-in': 'pop-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'lock-check': 'lock-check 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-slide-up': 'fade-slide-up 0.5s ease-out',
        'pulse-secure': 'pulse-secure 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        'pop-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(8px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'lock-check': {
          '0%': {
            content: '"🔒"',
          },
          '100%': {
            content: '"✓✓"',
          },
        },
        'fade-slide-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'pulse-secure': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
      },

      // Transitions
      transitionDuration: {
        micro: '150ms',
        snappy: '200ms',
      },

      // Box Shadows - Elegant, not aggressive
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'secure': '0 0 20px -2px rgb(13, 148, 136, 0.15)',
        'secure-lg': '0 0 40px -4px rgb(13, 148, 136, 0.25)',
      },

      // Backdrop blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
