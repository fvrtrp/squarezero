import localFont from "next/font/local"

export const bodyfont = localFont({
  src: [
    {
      path: "../fonts/roboto-mono-latin-200-normal.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/roboto-mono-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
})

export const headingfont = localFont({
  src: "../fonts/abril-fatface-latin-400-normal.woff2",
  weight: "400",
  display: "swap",
  fallback: ["Palatino", "Georgia", "serif"],
})
