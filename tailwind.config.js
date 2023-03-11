/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        "tw-primary": "#0D1117",
        "tw-secondary": "#010409",
        /*   primary: "#0D1117",
        secondary: "#010409", */
      },
    },
  },
  plugins: [],
};
