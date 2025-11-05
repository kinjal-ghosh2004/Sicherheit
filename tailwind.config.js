/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{,!(node_modules)/**/}*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1f2937', // gray-800
        'secondary': '#f9fafb', // gray-50
        'accent': '#4b5563', // gray-600
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
