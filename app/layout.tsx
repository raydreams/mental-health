import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransitionProvider } from "@/components/page-transition-provider"
import BackToTop from "@/components/back-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://mental-health-caon.vercel.app'),
  title: "Mental Health Support & Advocacy | Canada",
  description: "Raising awareness and providing support for mental health issues in Canada",
  openGraph: {
    title: "Mental Health Support & Advocacy | Canada",
    description: "Raising awareness and providing support for mental health issues in Canada",
    url: "https://mental-health-caon.vercel.app",
    siteName: "Mental Health Support & Advocacy",
    images: [
      {
        url: "/unsplash.jpeg",
        width: 1200,
        height: 630,
        alt: "Mental health support illustration",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health Support & Advocacy | Canada",
    description: "Raising awareness and providing support for mental health issues in Canada",
    images: ["/unsplash.jpeg"],
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-emerald/20 selection:text-emerald`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PageTransitionProvider>
            <main className="relative min-h-screen overflow-x-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent pointer-events-none" />
              {children}
            </main>
            <BackToTop />
            <BottomNavigation />
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'