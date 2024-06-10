/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pageComponents/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: { min: "0px", max: "375px" },
      md: { min: "376px", max: "744px" },
      lg: { min: "1920px" },
    },
  },
  plugins: [],
};
