/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slideup: {
          "0%": { height: "0%" },
        },
        "slow-pulse": {
          "0%, 100%": { opacity: "80%" },
          "50%": { opacity: "100%" },
        },
      },
      animation: {
        slideup: "slideup 1s ease-in-out 1",
        "slow-pulse": "slow-pulse 1.25s linear infinite",
      },
    },
  },
  plugins: [],
};
