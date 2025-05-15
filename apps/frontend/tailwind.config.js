/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6"
      },
    },
  },
  plugins: [],
}