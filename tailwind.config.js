/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1b1d1f",
          800: "#26282b",
          700: "#374151",
          600: "#454c53",
          500: "#72787f",
          400: "#9ea4a8",
          200: "#e5e7eb",
          100: "#e8ebed",
          50: "#f7f7f8",
        },
        coolGray: {
          50: "#F9FAFB",
          100: "#f3f4f6",
          200: "#E5E7EB",
          400: "#9ca3af",
          600: "#4B5563",
        },
        primaryColor: "#3692ff",
        errorColor: "#f74747",
        brandBlue: "#3182f6",
      },
    },
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
  },
  plugins: [],
};
