/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          900: '#111213', // almost black
          800: '#181a1b', // carbon black/grey
          700: '#232526', // dark grey
          600: '#2c2f31', // mid grey
          500: '#393d3f', // lighter grey
        },
        // override default background and text
        background: '#181a1b',
        foreground: '#000',
      },
    },
  },
  plugins: [],
}
