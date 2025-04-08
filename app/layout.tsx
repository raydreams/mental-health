import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import BottomNavigation from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransitionProvider } from "@/components/page-transition-provider"
import BackToTop from "@/components/back-to-top"
import Footer from "@/components/footer"
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-black font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransitionProvider>
            <div className="relative min-h-screen flex flex-col">
              <main className="flex-1 pb-8">
                {children}
              </main>
              <Footer />
            </div>
            <BottomNavigation />
          </PageTransitionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'