const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
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
  darkMode: "class",
  plugins: [nextui()]
}