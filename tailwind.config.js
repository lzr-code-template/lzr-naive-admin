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
      gray: colors.gray,
      't3': '#303133',
      't2': '#606266',
      't1': '#909399',
      'placeholder': '#A8ABB2',
      'disabled': '#c0c4cc',
      'primary': '#409eff',
      'success': '#67c23a',
      'warning': '#e6a23c',
      'error': '#f56c6c',
      'info': '#909399'
    }
  },
  plugins: [],
}