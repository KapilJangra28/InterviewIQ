/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F4F2FF',
          100: '#EBE6FF',
          200: '#D7CEFD',
          300: '#A99AF5', // accent
          400: '#8975F0',
          500: '#6655D9', // main brand primary
          600: '#5542C6',
          700: '#4632AF',
          800: '#39288E',
          900: '#2F2173',
        },
        accent: {
          light: '#C7BDFA',
          DEFAULT: '#A99AF5',
          dark: '#8D7CEB',
          cyan: '#38BDF8',
          cyanDark: '#0284C7',
        },
        brand: {
          bg: '#0A0C14',
          card: '#161B2E',
          surface: '#111625',
          dark: '#0A0C14',
          muted: '#94A3B8',
          border: 'rgba(255, 255, 255, 0.1)',
          borderLight: 'rgba(255, 255, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(102, 85, 217, 0.15)',
        'glass-hover': '0 12px 40px 0 rgba(102, 85, 217, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 16px 40px rgba(102, 85, 217, 0.2)',
        'button': '0 4px 14px 0 rgba(102, 85, 217, 0.45)',
        'glow-purple': '0 0 25px rgba(102, 85, 217, 0.4)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
