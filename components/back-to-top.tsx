"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-20 right-4 z-50 p-3 rounded-2xl shadow-2xl",
            "bg-black/80 text-[#10B981] border border-white/5",
            "hover:bg-[#10B981] hover:text-white hover:shadow-lg hover:shadow-[#10B981]/20",
            "focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 focus:ring-offset-black",
            "transition-all duration-300 ease-in-out",
            "backdrop-blur-2xl"
          )}
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4 drop-shadow-lg drop-shadow-[#10B981]/20" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

