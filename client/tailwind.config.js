/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // Ensure this matches the paths of your React components
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          100: '#d4b29d',  // Lighter brown
          200: '#a87853',
          300: '#7f5b36',
          400: '#6a4725',
          500: '#5a3c1e',
          600: '#4a3317',  // Slightly darker
          700: '#3b2a10',
          800: '#2c200a',
          900: '#1e1705',  // Deepest brown
        },
      },
    },
  },
  plugins: [],
};
