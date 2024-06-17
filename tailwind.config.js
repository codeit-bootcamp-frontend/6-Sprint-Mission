/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#3692ff",
        error: "#f74747",
        gray: {
          50: "#f7f7f8",
          100: "#e8ebed",
          200: "#e5e7eb",
          400: "#9ea4a8",
          500: "#72787f",
          600: "#454c53",
          700: "#374151",
          800: "#26282b",
          900: "#1b1d1f",
        },
        coolgray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          800: "#1f2937",
        },
        btn: {
          1: "#3692ff",
          2: "#1967d6",
          3: "#1251aa",
          4: "#9ca3af",
        },
        bannerbg: "#cfe5ff",
        loginbg: "#e6f2ff",
        footer: "#111322",
        footercodeit: "#676767",
        borderbottom: "#e5e7eb",
        fontcolor: "#6b7280",
      },
    },
  },
  variants: {},
  plugins: [],
};
