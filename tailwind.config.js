/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class", // 🌙 Dark mode class ile kontrol edilecek (html'de class='dark' varsa aktif olur)
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Google Font eklemek istersen
      },
    },
  },
  plugins: [],
};
