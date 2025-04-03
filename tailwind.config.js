/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/**/*.module.css',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4154F1',
        secondary: '#012970',
        gray: {
          50: '#EDF1F7',
        },
      },
    },
  },
  plugins: [],
}