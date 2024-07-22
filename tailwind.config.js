/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    fontFamily: {
      display: ['Pretendard', 'sans-serif'],
      body: ['Pretendard', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      primary: {
        100: '#3692FF',
        200: '#1967D6',
        300: '#1251AA',
      },
      secondary: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
      error: {
        red: '#F74747',
      },
    },
    extend: {
      borderRadius: {
        none: '0',
        sm: '8px',
        DEFAULT: '12px',
        lg: '16px',
        full: '999px',
      },
    },
  },
  plugins: [],
};
