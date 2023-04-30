/** @type {import('tailwindcss').Config} */
const fontFamily = require("./styles/fonts");

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./assets/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily,
      colors: {
        black: "#1D1C1C",
      },
    },
  },
  plugins: [],
};
