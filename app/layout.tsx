import Link from "next/link"
import type { Metadata } from 'next'
import "./globals.css"
import { bodyfont, headingfont } from "./fonts"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import Threadify from 'utils/threadify'

export const metadata: Metadata = {
  title: 'Square zero - blog',
  description: "Take a look at square zero's blog - by fevertrip. I blog short stories, my dreams, fiction, non-fiction, ballads, journal my ideas etc. here.",
  keywords: ['square zero', 'squarezero', 'sqzero', 'sqz', 'squarezero blog', 'sqzero blog', 'sqz blog', 'fevertrip', 'fvrtrp', 'fever trip', 'fiction', 'ballad'],
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
