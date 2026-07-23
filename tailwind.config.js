/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ayurblue: {
          DEFAULT: '#0080FF',
          light: '#38BDF8',
          dark: '#0066CC',
          glow: 'rgba(0, 128, 255, 0.15)',
        },
        ayurgreen: {
          DEFAULT: '#76BC21',
          light: '#8ED638',
          dark: '#589314',
          glow: 'rgba(118, 188, 33, 0.15)',
        },
        navy: {
          DEFAULT: '#0A192F',
          dark: '#060E1A',
          light: '#112240',
        },
        forest: {
          DEFAULT: '#0A192F',
          dark: '#060E1A',
          light: '#112240',
        },
        sage: {
          DEFAULT: '#76BC21',
          light: '#8ED638',
          dark: '#589314',
          grey: '#64748B',
        },
        terracotta: {
          DEFAULT: '#0080FF',
          light: '#38BDF8',
          dark: '#0066CC',
        },
        cream: {
          DEFAULT: '#F4F8FC',
          dark: '#E2EAF4',
          light: '#FFFFFF',
        },
        charcoal: '#0F172A',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium-sm': '0 2px 8px rgba(15, 61, 46, 0.04)',
        'premium-md': '0 10px 30px rgba(15, 61, 46, 0.06)',
        'premium-lg': '0 20px 40px rgba(15, 61, 46, 0.1)',
      },
      borderRadius: {
        'premium-sm': '8px',
        'premium-md': '16px',
        'premium-lg': '24px',
      },
      keyframes: {
        pulseBadge: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        }
      },
      animation: {
        pulseBadge: 'pulseBadge 2s infinite',
      }
    },
  },
  plugins: [],
}
