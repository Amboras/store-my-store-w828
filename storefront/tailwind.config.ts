import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        // Named palette
        olive: 'hsl(82 16% 32%)',
        stone: 'hsl(36 10% 56%)',
        parchment: 'hsl(38 28% 96%)',
        charcoal: 'hsl(24 12% 10%)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display sizes — large editorial headlines
        'display-xl': ['5.5rem', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        'display': ['4rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'h1': ['2.75rem', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'h2': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        'h3': ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'h4': ['1.125rem', { lineHeight: '1.45' }],
        // Aesop-style body copy
        'body-lg': ['1.0625rem', { lineHeight: '1.75' }],
        'body': ['0.9375rem', { lineHeight: '1.7' }],
        'caption': ['0.8125rem', { lineHeight: '1.6' }],
        'label': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      maxWidth: {
        'content': '1360px',
        'narrow': '640px',
        'prose': '68ch',
      },
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
        'section-xs': '2.5rem',
      },
      letterSpacing: {
        'widest-xl': '0.2em',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.16,1,0.3,1)',
        'slide-out-right': 'slide-out-right 0.3s ease-in',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
