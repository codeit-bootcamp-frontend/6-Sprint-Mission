/** @type {import('tailwindcss').Config} */
const pxToRem = (px, base = 16) => `${px / base}rem`;

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'cool-gray50': '#f9fafb',
        'cool-gray100': '#f3f4f6',
        'cool-gray200': '#e5e7eb',
        'cool-gray400': '#9ca3af',
        'cool-gray500': '#6B7280',
        'cool-gray600': '#4b5563',
        'cool-gray700': '#374151',
        'cool-gray800': '#1f2937',
        'cool-gray900': '#111827',
        'brand-blue': '#3692ff',
        'sky-blue100': '#E6F2FF',
        'sky-blue200': '#cfe5ff',
      },
    },
    screens: {
      sm: { min: '0px', max: '767px' },
      md: { min: '768px', max: '1199px' },
      lg: { min: '1200px' },
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    width: {
      mobile: '343px',
      tablet: '696px',
      desktop: '1200px',
    },
  },
  plugins: [],
};
