/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0047FF',
        'brand-green': '#BCFF65',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Archivo Black"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
