/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,jsx,js,css}",
  ],
  theme: {
    extend: {
      colors: {
        'tor-red': '#C8102E',
        'tor-blue': '#003087',
      },
      fontFamily:{
        'josefin': ["Josefin Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}