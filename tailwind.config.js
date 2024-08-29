/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#9cb8cc",
        "secondary-color": "#78798f",
        "third-color": "#ecf4f6"
      }
    },
  },
  plugins: [],
}