"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, HandHelping, BookmarkIcon, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"
import { useMobileDetect } from "@/hooks/use-mobile"

export default function BottomNavigation() {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobileDetect()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Learn", href: "/learn", icon: BookOpen },
    { name: "Take Action", href: "/take-action", icon: HandHelping },
    { name: "Resources", href: "/resources", icon: BookmarkIcon },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center items-end pb-1 z-50">
      <motion.nav
        className="relative mx-auto w-full max-w-[500px] px-2"
        initial={!prefersReducedMotion ? { y: 100, opacity: 0 } : undefined}
        animate={!prefersReducedMotion ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative">
          {/* Background blur and shadow */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-white/10" />
          
          {/* Navigation items */}
          <div className="relative flex items-center justify-between px-2 py-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative flex flex-col items-center justify-center py-1.5 px-2 text-[10px] sm:text-[11px] font-medium transition-colors duration-300",
                    "group",
                    isActive
                      ? "text-emerald-400"
                      : "text-gray-400 hover:text-emerald-400",
                  )}
                >
                  <div className="relative p-1.5 rounded-xl overflow-hidden">
                    {/* Active/Hover Background */}
                    <motion.div
                      className={cn(
                        "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
                        "bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10",
                        isActive 
                          ? "opacity-100" 
                          : "group-hover:opacity-100"
                      )}
                      layoutId={isMobile ? undefined : "nav-background"}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6
                      }}
                    />
                    
                    {/* Icon */}
                    <div className="relative z-10">
                      <item.icon
                        className={cn(
                          "h-[16px] w-[16px] sm:h-[18px] sm:w-[18px] transition-all duration-300",
                          isActive 
                            ? "text-emerald-400 scale-110" 
                            : "text-gray-400 group-hover:text-emerald-400 group-hover:scale-110"
                        )}
                      />
                    </div>
                  </div>

                  {/* Label */}
                  <span className="relative mt-0.5">
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 bg-emerald-400 rounded-full"
                        layoutId={isMobile ? undefined : "nav-indicator"}
                        initial={false}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6
                        }}
                        style={{
                          width: '50%'
                        }}
                      />
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}

