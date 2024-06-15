import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'TopBannerImage': "url('/images/home/hero-image.png')",
        'BottomBannerImage': "url('/images/home/bottom-banner-image.png')",
      },
      colors: {
        primary: {
          700: '#1251aa',
          600: '#1967d6',
          500: '#3182f6',
          400: '#3692ff',
          300: '#cfe5ff',
          200: '#e6f2ff',
        },
        error: '#f74747',
        gray: {
          900: '#111827',
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
          400: '#9ca3af',
          200: '#e5e7eb',
          100: '#f3f4f6',
          50: '#f3f4f6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
