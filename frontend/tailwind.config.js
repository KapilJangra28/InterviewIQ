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
        },
        brand: {
          bg: '#F8F9FC',
          card: '#FFFFFF',
          dark: '#171923',
          muted: '#737987',
          border: '#E8EAED',
          borderLight: '#F1F3F5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(102, 85, 217, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(102, 85, 217, 0.16)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(102, 85, 217, 0.04)',
        'card-hover': '0 12px 30px rgba(102, 85, 217, 0.12)',
        'button': '0 4px 14px 0 rgba(102, 85, 217, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
