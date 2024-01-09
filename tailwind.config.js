/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        'hackergreen': '#92ff07',
      },
      typography: {
        DEFAULT: {
          css: {
            p: {
              color: '#ccc',
              '&:hover': {
                // color: '#2c5282',
              },
            },
            li: {
              color: '#666aaa',
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
