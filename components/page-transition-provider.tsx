"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { type ReactNode, createContext, useContext, useEffect, useState, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useMobileDetect } from "@/hooks/use-mobile"

type PageTransitionContextType = {
  previousPath: string | null
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  previousPath: null,
})

export const usePageTransition = () => useContext(PageTransitionContext)

function PageTransitionContent({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const isMobile = useMobileDetect()
  const [isLoading, setIsLoading] = useState(true)

  // Store previous path for scroll management
  useEffect(() => {
    setPreviousPath(pathname)
  }, [pathname, searchParams])

  // Handle initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll to top on page change if user was at the bottom of the previous page
  useEffect(() => {
    if (previousPath && previousPath !== pathname) {
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      if (isAtBottom) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    }
  }, [pathname, previousPath])

  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-emerald-400">Loading...</div>
      </div>
    )
  }

  return (
    <PageTransitionContext.Provider value={{ previousPath }}>
      <div className="min-h-screen w-full bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={isMobile ? undefined : "hidden"}
            animate={isMobile ? undefined : "enter"}
            exit={isMobile ? undefined : "exit"}
            variants={isMobile ? undefined : variants}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-screen w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageTransitionContext.Provider>
  )
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-emerald-400">Loading...</div>
      </div>
    }>
      <PageTransitionContent>
        {children}
      </PageTransitionContent>
    </Suspense>
  )
}

