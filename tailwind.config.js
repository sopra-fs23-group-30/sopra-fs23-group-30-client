/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "/node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    keyframes: {
      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      animation: {
        wiggle: "wiggle 0.4s ease-in-out infinite",
      },
    },
    fontSize: {
      xs: "0.6rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    colors: {
      primary: "#11103E",
      secondary: "#312FCB",
      grey: "#a8a29e",
    },
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      aspectRatio: {
        "8/3": "8 / 3",
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require("flowbite/plugin"),
    require("tailwindcss-animate"),
  ],
};
