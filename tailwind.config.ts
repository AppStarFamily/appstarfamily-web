import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A0F1E',
          card: '#0F1629',
          light: '#141C35',
        },
        gold: {
          DEFAULT: '#C9922A',
          light: '#F0C060',
        },
        cyan: {
          DEFAULT: '#00E5FF',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 24px rgba(201,146,42,0.2)',
        cyan: '0 0 24px rgba(0,229,255,0.15)',
        'cyan-lg': '0 0 48px rgba(0,229,255,0.1)',
      },
    },
  },
  plugins: [],
}
export default config
