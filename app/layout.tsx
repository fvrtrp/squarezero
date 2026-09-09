import Link from "next/link"
import type { Metadata } from "next"
import "./globals.css"
import { bodyfont, headingfont } from "./fonts"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import Threadify from "utils/threadify"
import { SITE_AUTHOR, SITE_AUTHOR_AKA, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site"

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · blog`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_AUTHOR,
  authors: [{ name: SITE_AUTHOR }, { name: SITE_AUTHOR_AKA }],
  keywords: ["square zero", "squarezero", "fevertrip", "suraj", "short stories", "fiction", "blog"],
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <Link href="/" title="Go home">
            <div id="sqz" aria-hidden="true">
              <Threadify text={"□"} color="red" speed={100} />
            </div>
            <header id="siteTitle" className={`text-xl text-bleedred ${headingfont.className}`}>
              {SITE_NAME}
            </header>
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
