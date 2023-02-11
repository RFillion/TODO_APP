/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'rossanova-l': ['Rossanova-Light', 'sans-serif'],
        'rossanova-r': ['Rossanova-Regular', 'sans-serif'],
        'rossanova-bd': ['Rossanova-Bold', 'sans-serif'],
        'rossanova-bk': ['Rossanova-Black', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
