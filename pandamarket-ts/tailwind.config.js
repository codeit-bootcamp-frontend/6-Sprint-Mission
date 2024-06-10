/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { min: "375px", max: "767px" },
      md: { min: "768px", max: "1023px" },
      lg: "1024px",
    },
    extend: {
      colors: {
        "gray-900": "#111827",
        "gray-800": "#1f2937",
        "gray-700": "#374151",
        "gray-600": "#4b5563",
        "gray-500": "#6b7280",
        "gray-400": "#9ca3af",
        "gray-200": "#e5e7eb",
        "gray-100": "#f3f4f6",
        "gray-50": "#f9fafb",
        blue: "#3692ff",
        red: "#f74747",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        "20px": "20px",
        "14px": "14px",
        "16px": "16px",
      },
    },
  },
  plugins: [],
};
