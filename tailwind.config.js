/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./App.tsx",
    "./index.tsx",
    "./constants.tsx",
    "./services/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#059669",
        dark: "#0A0A0A",
        tint: "#D1FAE5",
      },
    },
  },
  plugins: [],
};
