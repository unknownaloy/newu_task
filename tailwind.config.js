/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1EEFF",
        accent: "#4D0050",
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
