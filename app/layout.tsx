import Link from "next/link"
import "./globals.css"
import { bodyfont, headingfont } from "./fonts"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import Threadify from 'utils/threadify'

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
        className={`antialiased min-h-screen bg-black text-slate-50 ${bodyfont.className}`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <Link href="/" title="Go home"><div id="sqz">
          <Threadify text={'□'} color="red" speed={100} />
          </div>
          <header id="siteTitle" className={`text-xl text-bleedred ${headingfont.className}`}>Square Zero</header>
          </Link>
          <div className="max-w-full mx-auto py-10 px-8 sm:px-32">
            <main>{children}</main>
          </div>
          </ThemeProvider>
          <Analytics />
      </body>
    </html>
  )
}
