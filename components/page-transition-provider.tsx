"use client"

import { usePathname, useSearchParams } from "next/navigation"
import { type ReactNode, createContext, useContext, useEffect, useState, Suspense } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useMobileDetect } from "@/hooks/use-mobile"
import { Brain, BarChart2, HeartHandshake, Users } from "lucide-react"

type PageTransitionContextType = {
  previousPath: string | null
}

const PageTransitionContext = createContext<PageTransitionContextType>({
  previousPath: null,
})

export const usePageTransition = () => useContext(PageTransitionContext)

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section Skeleton */}
      <div className="relative pt-16 pb-24 flex items-center justify-center bg-gradient-to-b from-emerald-950/30 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-400/30 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
            <div className="w-10 h-12 bg-emerald-400/20 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <div className="h-16 w-96 bg-emerald-400/20 rounded animate-pulse mx-auto" />
            </div>
            <div className="h-6 w-64 bg-emerald-400/20 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>

      {/* Statistics Section Skeleton */}
      <div className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="h-12 w-64 bg-emerald-400/20 rounded animate-pulse mx-auto mb-6" />
            <div className="h-6 w-48 bg-emerald-400/20 rounded animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass p-6 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-emerald-400/20 rounded animate-pulse" />
                  <div className="h-6 w-24 bg-emerald-400/20 rounded animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-emerald-400/20 rounded animate-pulse mb-2" />
                <div className="h-4 w-48 bg-emerald-400/20 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Chart Skeleton */}
          <div className="glass rounded-3xl p-8 shadow-2xl">
            <div className="h-[500px] w-full bg-emerald-400/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Action Plan Section Skeleton */}
      <div className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <div className="h-12 w-64 bg-emerald-400/20 rounded animate-pulse mx-auto mb-6" />
            <div className="h-6 w-48 bg-emerald-400/20 rounded animate-pulse mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass p-8 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-400/20 rounded animate-pulse mb-6" />
                <div className="h-8 w-32 bg-emerald-400/20 rounded animate-pulse mb-4" />
                <div className="h-20 w-full bg-emerald-400/20 rounded animate-pulse mb-6" />
                <div className="h-6 w-24 bg-emerald-400/20 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

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
    return <LoadingSkeleton />
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
    <Suspense fallback={<LoadingSkeleton />}>
      <PageTransitionContent>
        {children}
      </PageTransitionContent>
    </Suspense>
  )
}

