/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./quiz.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#0284c7', // Primary tech blue
          dark: '#0f172a', // Deep slate background
        }
      }
    },
  },
  plugins: [],
}