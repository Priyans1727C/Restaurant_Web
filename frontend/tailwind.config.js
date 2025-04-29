/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B0000',
          light: '#A52A2A',
          dark: '#660000',
        },
        accent: {
          DEFAULT: '#FFBF00',
          light: '#FFD700',
          dark: '#B8860B',
        },
        secondary: {
          DEFAULT: '#228B22',
          light: '#32CD32',
          dark: '#006400',
        },
        ivory: {
          DEFAULT: '#FFFFF0',
          dark: '#F5F5DC',
        },
        charcoal: {
          DEFAULT: '#36454F',
          light: '#708090',
          dark: '#2F4F4F',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}