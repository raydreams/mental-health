"use client"

import { motion, useAnimation, useInView } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCountUp } from "use-count-up"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface StatisticCardProps {
  title: string
  description: string
  icon: React.ReactNode
  delay?: number
  trend?: "up" | "down"
  isNumber?: boolean
  end?: number
  duration?: number
  typingSpeed?: number
  tooltip?: string
  source?: string
  lastUpdated?: string
}

export default function StatisticCard({ 
  title, 
  description, 
  icon, 
  delay = 0, 
  trend,
  isNumber = false,
  end = 0,
  duration = 2,
  typingSpeed = 50,
  tooltip,
  source,
  lastUpdated
}: StatisticCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const controls = useAnimation()
  const [displayedText, setDisplayedText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const { value: countValue } = useCountUp({
    isCounting: isInView && isNumber,
    end,
    duration,
    easing: "easeOutCubic",
  })

  // Extract the number from the title and replace it with the counted value
  const displayTitle = isNumber && countValue !== undefined && countValue !== null
    ? title.replace(/\d+/, countValue.toString())
    : title

  useEffect(() => {
    if (isInView && !isNumber) {
      let currentIndex = 0
      const text = description
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
          setIsTypingComplete(true)
        }
      }, typingSpeed)

      return () => clearInterval(interval)
    }
  }, [isInView, description, isNumber, typingSpeed])

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0 })
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className="relative group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/40 rounded-2xl backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.2 }}
      />
      
      {/* Content */}
      <div className="relative p-8 rounded-2xl border border-white/5 shadow-[0_0_50px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] transition-all duration-500 h-full flex flex-col">
        {/* Icon container */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.3 }}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div 
                  className="p-4 bg-emerald/5 rounded-xl group-hover:bg-emerald/10 transition-colors duration-300 cursor-help"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-emerald">{icon}</div>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-black/90 border-emerald/20 text-white">
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {/* Trend indicator */}
          {trend && (
            <motion.div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                trend === "up" 
                  ? "bg-emerald/10 text-emerald" 
                  : "bg-red-500/10 text-red-500"
              }`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {trend === "up" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </motion.div>
              <span className="text-sm font-medium">
                {trend === "up" ? "Increasing" : "Decreasing"}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Title and description */}
        <div className="space-y-3 flex-1 flex flex-col">
          <motion.h3 
            className="text-3xl font-bold text-white tracking-tight relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.5 }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
          >
            <span className="relative inline-block">
              {displayTitle}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald/10 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2
                }}
                style={{
                  transform: "skewX(-20deg)",
                  opacity: 0.5
                }}
              />
            </span>
          </motion.h3>
          <motion.p 
            className="text-gray-300 leading-relaxed flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.6 }}
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
          >
            {isNumber ? description : displayedText}
          </motion.p>
        </div>

        {/* Source and last updated */}
        {(source || lastUpdated) && (
          <motion.div 
            className="mt-4 pt-4 border-t border-white/5 text-xs text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {source && <p>Source: {source}</p>}
            {lastUpdated && <p>Last updated: {lastUpdated}</p>}
          </motion.div>
        )}

        {/* Hover effect overlay */}
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald/0 via-emerald/0 to-emerald/0 group-hover:from-emerald/5 group-hover:via-emerald/0 group-hover:to-emerald/0 transition-all duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.7 }}
          whileHover={{
            background: "linear-gradient(to bottom right, rgba(16,185,129,0.1), rgba(16,185,129,0), rgba(16,185,129,0))",
          }}
        />
      </div>
    </motion.div>
  )
}

