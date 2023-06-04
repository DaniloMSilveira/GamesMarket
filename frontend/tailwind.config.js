/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '156': '40rem',
      }
    },
  },
  plugins: [],
}

