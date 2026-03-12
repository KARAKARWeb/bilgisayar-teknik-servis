import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      // Next.js.org exact breakpoints
      sm: '600px',   // Mobile
      md: '768px',   // Tablet
      lg: '960px',   // Desktop small
      xl: '1280px',  // Desktop large
    },
    colors: {
      // Override Tailwind defaults - Next.js.org EXACT
      black: '#171717',  // gray-1000 EXACT (NOT #000000!)
      white: '#ffffff',
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {
      colors: {
        // Next.js.org EXACT colors (LAB → HEX converted)
        blue: {
          DEFAULT: '#0070f3',
          600: '#0070f3',
          700: '#0761d1',
          light: '#3291ff',
        },
        gray: {
          50: '#fafafa',
          100: '#f2f2f2',   // LAB converted EXACT
          200: '#ebebeb',   // LAB converted EXACT
          300: '#e6e6e6',   // LAB converted EXACT
          400: '#eaeaea',   // LAB converted EXACT
          500: '#737373',   // Improved contrast (was #c9c9c9)
          600: '#525252',   // Improved contrast (was #a8a8a8)
          700: '#404040',   // Improved contrast (was #8f8f8f)
          800: '#262626',   // Improved contrast (was #7d7d7d)
          900: '#171717',   // Improved contrast (was #666666)
          1000: '#171717',  // LAB converted EXACT
        },
        green: {
          DEFAULT: '#26c941',
          600: '#26c941',
        },
        red: {
          DEFAULT: '#ee0000',
          600: '#ee0000',
        },
        amber: {
          DEFAULT: '#f5a623',
          600: '#f5a623',
        },
        purple: {
          DEFAULT: '#7928ca',
          600: '#7928ca',
        },
        cyan: {
          DEFAULT: '#50e3c2',
          600: '#50e3c2',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        // Next.js.org exact font sizes
        xs: ['0.75rem', { lineHeight: '1.4' }],      // 12px - Small labels
        sm: ['0.875rem', { lineHeight: '1.5' }],     // 14px - Body small, Navigation
        base: ['1rem', { lineHeight: '1.6' }],       // 16px - Body regular
        lg: ['1.125rem', { lineHeight: '1.7' }],     // 18px - Body large, H5
        xl: ['1.25rem', { lineHeight: '1.4' }],      // 20px - H4
        '2xl': ['1.5rem', { lineHeight: '1.33' }],   // 24px - H3
        '3xl': ['1.875rem', { lineHeight: '1.3' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.2' }],   // 36px
        '5xl': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.04em' }],     // 32px - H2 Desktop
        '6xl': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],      // 56px - H1 Tablet
        '7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],      // 72px - H1 Desktop
        '8xl': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],      // 80px
        '9xl': ['8rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],      // 128px
        // Next.js.org semantic sizes
        'h1-desktop': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],        // 56px
        'h1-tablet': ['3.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],         // 56px
        'h1-mobile': ['2rem', { lineHeight: '1.125', letterSpacing: '-0.04em' }],       // 32px
        'h2-desktop': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.04em' }],       // 32px
        'h2-mobile': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.04em' }],      // 24px
        'h3': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.02em' }],             // 24px
        'h4': ['1.25rem', { lineHeight: '1.4' }],                                       // 20px
        'h5': ['1.125rem', { lineHeight: '1.33' }],                                     // 18px
        'h6': ['1rem', { lineHeight: '1.5' }],                                          // 16px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',  // Next.js.org için eklendi
        bold: '700',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
      },
      borderRadius: {
        sm: '0.375rem',  // 6px - Small buttons (Next.js.org)
        DEFAULT: '0.5rem', // 8px - Medium
        md: '0.5rem',    // 8px - Buttons, inputs
        lg: '0.75rem',   // 12px - Cards
        xl: '1rem',      // 16px - Large elements
        '2xl': '1.5rem', // 24px - XXL
        full: '9999px',  // Full - Pills
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      spacing: {
        '24': '5rem',    // 80px - Hero section padding override
        '128': '32rem',
        '144': '36rem',
      },
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
} satisfies Config;
