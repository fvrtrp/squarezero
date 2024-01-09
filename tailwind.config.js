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
            },
            li: {
              color: '#666aaa',
            },
            strong: {
              color: '#92ff07',
            }
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
