/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens:{sm:'480px',
      md:'768px',
      lg:'976px',
      xl:'1440px'
    },
    extend: {
      colors:{
        primary: '#1D4ED8', // Blue 600
        secondary: '#64748B', // Gray 500
        accent: '#10B981', // Green 500
        muted: '#6B7280', // Neutral Gray 400
        background: '#F3F4F6', // Gray 100
        warning: '#F59E0B', // Amber 500
        danger: '#EF4444', // Red 500
        info: '#3B82F6', // Blue 500
        dark: '#111827', // Gray 900
        light: '#F9FAFB', // Gray 50
        DEFAULT: '#6A7B8C'
      }
    },
  },
  plugins: [],
}

