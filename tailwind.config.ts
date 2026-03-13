import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        dark: {
          base: '#0a0a0a',
          surface: '#111111',
          elevated: '#1a1a1a',
          border: '#262626',
        },
      },
      keyframes: {
        'drift-1': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(30px, -20px)' },
          '50%': { transform: 'translate(-20px, 15px)' },
          '75%': { transform: 'translate(15px, 25px)' },
        },
        'drift-2': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-25px, 15px)' },
          '50%': { transform: 'translate(20px, -25px)' },
          '75%': { transform: 'translate(-15px, -10px)' },
        },
        'drift-3': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(20px, 20px)' },
          '50%': { transform: 'translate(-30px, -10px)' },
          '75%': { transform: 'translate(10px, -20px)' },
        },
      },
      animation: {
        'drift-1': 'drift-1 20s ease-in-out infinite',
        'drift-2': 'drift-2 25s ease-in-out infinite',
        'drift-3': 'drift-3 30s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
