/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': "url('/src/assets/images/login.webp')",
        'report': "url('/src/assets/images/report.png')",
      }
    },
    colors: {
      white: colors.white,
      black: colors.black,
      blue: colors.blue,
      gray: colors.gray,
      't3': '#303133',
      't2': '#606266',
      't1': '#909399',
      'placeholder': '#A8ABB2',
      'disabled': '#c0c4cc',
      'primary': '#0064C8',
      'success': '#47B3AA',
      'warning': '#F0A020',
      'error': '#ef4444',
      'info': '#2080F0'
    }
  },
  plugins: [],
}