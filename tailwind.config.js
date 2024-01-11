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
        'bleedred': 'red',
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
              color: 'red',
            }
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
