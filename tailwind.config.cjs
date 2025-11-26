/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*{js,jsx,ts,tsx}",
  "./public/index.html",
  "./node_modules/flyonui/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        text: "var(--text-color)",
      },
    },
  },
  plugins: [
    require("flyonui")
  ],
}
