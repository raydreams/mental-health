"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { type ReactNode, createContext, useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useMobileDetect } from "@/hooks/use-mobile"

type PageTransitionContextType = {
  previousPath: string | null
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  previousPath: null,
})

export const usePageTransition = () => useContext(PageTransitionContext)

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [previousPath, setPreviousPath] = useState<string | null>(null)
  const isMobile = useMobileDetect()

  // Store previous path for scroll management
  useEffect(() => {
    setPreviousPath(pathname)
  }, [pathname, searchParams])

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

  return (
    <PageTransitionContext.Provider value={{ previousPath }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={isMobile ? { hidden: {}, enter: {}, exit: {} } : variants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className=""
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </PageTransitionContext.Provider>
  )
}

