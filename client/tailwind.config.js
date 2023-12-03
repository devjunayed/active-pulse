/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ap-green": "#9eff00",
        "ap-orange": "#ffd300",
      },
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
      }, 
    },
  },
  plugins: [require("daisyui")],
};
