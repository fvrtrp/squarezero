import Link from "next/link"
import "./globals.css"
import { spacemono } from "./fonts"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Square zero",
  description: "Fiction, ballads, blog",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen bg-slate-950 text-slate-50 ${spacemono.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="max-w-2xl mx-auto py-10 px-4">
            <main>{children}</main>
          </div>
          </ThemeProvider>
          <Analytics />
      </body>
    </html>
  )
}
