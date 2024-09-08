/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        login: 'url(\'/src/assets/images/login.webp\')',
        report: 'url(\'/src/assets/images/report.png\')',
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      blue: colors.blue,
      gray: colors.gray,
      t1: 'rgb(31,34,37)',
      t2: 'rgb(51,54,57)',
      t3: 'rgb(118,124,130)',
      placeholder: 'rgba(194, 194, 194, 1)',
      disabled: 'rgba(209, 209, 209, 1)',
      primary: 'rgba(var(--primary-color))',
      success: '#18A058',
      warning: '#F0A020',
      error: '#D03050',
      info: '#2080F0',
    },
  },
  plugins: [],
}
