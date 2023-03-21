/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    screens: {
      sm: '480px',
      md: '780px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        denimDark: '#071F3D',
        denimLight: '#202142',
        denimBlue: '#1253A3'
      }
    },
    fontFamily: {
      cyber: ["Press Start 2P", "VT323"],
    }
  },
  plugins: [],
}
