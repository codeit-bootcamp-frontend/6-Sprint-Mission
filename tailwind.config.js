/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/**/*.{js,ts,jsx,tsx,mdx}",
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./entities/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      gray: "#DFDFDF",
      blue: "#3692FF",
      white: "#ffffff",
    },
    screens: {
      sm: "375px",
      md: "744px",
      lg: "1200px",
    },
    extend: {
      backgroundImage: {
        "input-placeholder": "url('/icons/input-placeholder.svg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), "prettier-plugin-tailwindcss"],
};
