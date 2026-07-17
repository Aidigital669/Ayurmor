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
        forest: {
          DEFAULT: '#0F3D2E',
          dark: '#0A291E',
          light: '#1B5643',
        },
        sage: {
          DEFAULT: '#5A8B73',
          light: '#A3C4B4',
          dark: '#3E6652',
          grey: '#5F6B63',
        },
        terracotta: {
          DEFAULT: '#D99B78',
          light: '#EBC3AC',
          dark: '#B06E47',
        },
        cream: {
          DEFAULT: '#FBF9F5',
          dark: '#F3EFE9',
          light: '#FFFFFF',
        },
        charcoal: '#1E2421',
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
