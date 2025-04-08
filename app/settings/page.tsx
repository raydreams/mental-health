"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Moon, Sun, Sparkles, Settings2, Accessibility, Palette, ChevronRight, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Credits data
const credits = [
  {
    category: "Images",
    items: [
      {
        name: "Mental Health Support",
        source: "Unsplash",
        author: "Various photographers",
        link: "https://unsplash.com/s/photos/mental-health",
        description: "Background and hero images"
      }
    ]
  },
  {
    category: "Icons",
    items: [
      {
        name: "Lucide Icons",
        source: "GitHub",
        author: "Luca Burgio",
        link: "https://lucide.dev/",
        description: "Navigation and UI icons"
      }
    ]
  },
  {
    category: "Data Sources",
    items: [
      {
        name: "Mental Health Statistics",
        source: "Statistics Canada",
        author: "Government of Canada",
        link: "https://www.statcan.gc.ca/o1/en/plus/5461-lets-talk-mental-health",
        description: "Mental health statistics and trends"
      }
    ]
  },
  {
    category: "Design and Styling",
    items: [
      {
        name: "BAD Designs",
        source: "Private Company",
        author: "BAD Designs (Rehan M)",
        link: "https:/cometmc.vercel.app",
        description: "Design and styling inspiration."
      }
    ]
  }
]

// Constants for local storage keys
const STORAGE_KEYS = {
  REDUCED_MOTION: "reducedMotion",
  THEME: "theme",
} as const

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [activeSection, setActiveSection] = useState("appearance")

  // Load settings from local storage and system preferences
  useEffect(() => {
    setMounted(true)

    // Load reduced motion preference
    const savedReducedMotion = localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION)
    if (savedReducedMotion !== null) {
      setReducedMotion(savedReducedMotion === "true")
    } else {
      // Check system preference if no saved setting
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
      setReducedMotion(mediaQuery.matches)
    }

    // Load theme preference
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME)
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme)
    }

    // Add listener for system reduced motion changes
    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEYS.REDUCED_MOTION) === null) {
        setReducedMotion(e.matches)
      }
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    mediaQuery.addEventListener("change", handleMotionPreferenceChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMotionPreferenceChange)
    }
  }, [theme, setTheme])

  // Handle reduced motion toggle
  const handleReducedMotionToggle = (checked: boolean) => {
    setReducedMotion(checked)
    localStorage.setItem(STORAGE_KEYS.REDUCED_MOTION, checked.toString())
    document.documentElement.classList.toggle("reduce-motion", checked)
  }

  // Handle theme toggle
  const handleThemeToggle = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme)
  }

  if (!mounted) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-black text-white overflow-x-hidden"
      variants={container} 
      initial="hidden" 
      animate="show"
    >
      {/* Hero Section */}
      <div className="relative pt-16 pb-24 flex items-center justify-center bg-gradient-to-b from-emerald-950/30 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="text-center space-y-8 relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-950/60 border border-emerald-400/30 shadow-lg shadow-emerald-500/20 backdrop-blur-sm">
            <Settings2 className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Settings
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Customize your experience and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <motion.div 
            variants={item}
            className="md:col-span-3 sticky top-8 self-start space-y-4"
          >
            <nav className="space-y-1.5 bg-gray-950/30 backdrop-blur-sm rounded-xl p-2.5 border border-gray-800/50">
              <button
                onClick={() => setActiveSection("appearance")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 ${
                  activeSection === "appearance"
                    ? "bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10"
                    : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Palette className="w-5 h-5" />
                  <span className="text-sm font-medium truncate">Appearance</span>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                  activeSection === "appearance" ? "rotate-90" : ""
                }`} />
              </button>
              <button
                onClick={() => setActiveSection("accessibility")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 ${
                  activeSection === "accessibility"
                    ? "bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10"
                    : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Accessibility className="w-5 h-5" />
                  <span className="text-sm font-medium truncate">Accessibility</span>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                  activeSection === "accessibility" ? "rotate-90" : ""
                }`} />
              </button>
              <button
                onClick={() => setActiveSection("credits")}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg transition-all duration-300 ${
                  activeSection === "credits"
                    ? "bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10"
                    : "text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5" />
                  <span className="text-sm font-medium truncate">Credits</span>
                </div>
                <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
                  activeSection === "credits" ? "rotate-90" : ""
                }`} />
              </button>
            </nav>
          </motion.div>

          {/* Content Area */}
          <motion.div 
            variants={item}
            className="md:col-span-9"
          >
            <AnimatePresence mode="wait">
              {activeSection === "appearance" && (
                <motion.div
                  key="appearance"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-xl bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 overflow-hidden"
                >
                  <div className="px-6 py-6 border-b border-gray-800/50 bg-black/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Palette className="w-5 h-5 text-emerald-400" />
                      <h2 className="text-lg font-medium text-emerald-400">Appearance Settings</h2>
                    </div>
                    <p className="text-sm text-gray-400">
                      Customize how the website looks and feels
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group p-5 rounded-lg bg-black/20 border border-gray-800/50 hover:border-emerald-500/30 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 backdrop-blur-sm group-hover:border-emerald-400/50 transition-colors duration-200">
                              {theme === "dark" ? (
                                <Moon className="h-6 w-6 text-emerald-400" />
                              ) : (
                                <Sun className="h-6 w-6 text-emerald-400" />
                              )}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Label htmlFor="dark-mode" className="text-sm font-medium text-gray-200">
                              Dark Mode
                            </Label>
                            <p className="mt-1 text-sm text-gray-400 truncate">
                              Reduce eye strain in low-light environments
                            </p>
                          </div>
                          <Switch
                            id="dark-mode"
                            checked={theme === "dark"}
                            onCheckedChange={handleThemeToggle}
                            disabled={true}
                            className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-700 data-[state=checked]:border-emerald-400"
                          />
                        </div>
                      </div>

                      <div className="group p-5 rounded-lg bg-black/20 border border-gray-800/50 hover:border-emerald-500/30 transition-colors duration-200">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 backdrop-blur-sm group-hover:border-emerald-400/50 transition-colors duration-200">
                              <Sparkles className="h-6 w-6 text-emerald-400" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <Label htmlFor="reduced-motion" className="text-sm font-medium text-gray-200">
                              Reduced Motion
                            </Label>
                            <p className="mt-1 text-sm text-gray-400 truncate">
                              Minimize animations and transitions
                            </p>
                          </div>
                          <Switch
                            id="reduced-motion"
                            checked={reducedMotion}
                            onCheckedChange={handleReducedMotionToggle}
                            className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-700 data-[state=checked]:border-emerald-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "accessibility" && (
                <motion.div
                  key="accessibility"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-xl bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 overflow-hidden"
                >
                  <div className="px-6 py-6 border-b border-gray-800/50 bg-black/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Accessibility className="w-5 h-5 text-emerald-400" />
                      <h2 className="text-lg font-medium text-emerald-400">Accessibility Statement</h2>
                    </div>
                    <p className="text-sm text-gray-400">
                      Our commitment to making this website accessible to all users
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-5 rounded-lg bg-black/20 border border-gray-800/50">
                        <h3 className="text-sm font-medium text-emerald-400 mb-3">Our Commitment</h3>
                        <p className="text-sm text-gray-300 leading-relaxed break-words">
                          We are committed to ensuring digital accessibility for people with disabilities. We are continually
                          improving the user experience for everyone, and applying the relevant accessibility standards.
                        </p>
                      </div>

                      <div className="p-5 rounded-lg bg-black/20 border border-gray-800/50">
                        <h3 className="text-sm font-medium text-emerald-400 mb-3">WCAG Compliance</h3>
                        <p className="text-sm text-gray-300 leading-relaxed break-words">
                          This website aims to conform to level AA of the World Wide Web Consortium (W3C) Web Content Accessibility
                          Guidelines (WCAG) 2.2.
                        </p>
                      </div>

                      <div className="md:col-span-2 p-5 rounded-lg bg-black/20 border border-gray-800/50">
                        <h3 className="text-sm font-medium text-emerald-400 mb-3">Contact Us</h3>
                        <p className="text-sm text-gray-300 leading-relaxed break-words">
                          If you encounter accessibility barriers on our website, please contact us at{" "}
                          <a 
                            href="mailto:accessibility@mentalhealthcanada.org"
                            className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 underline-offset-4 hover:underline"
                          >
                            accessibility@mentalhealthcanada.org
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "credits" && (
                <motion.div
                  key="credits"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="rounded-xl bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 overflow-hidden"
                >
                  <div className="px-6 py-6 border-b border-gray-800/50 bg-black/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Info className="w-5 h-5 text-emerald-400" />
                      <h2 className="text-lg font-medium text-emerald-400">Credits</h2>
                    </div>
                    <p className="text-sm text-gray-400">
                      Resources and assets used in this application
                    </p>
                  </div>
                  <div className="p-8">
                    <div className="space-y-8">
                      {credits.map((category) => (
                        <div key={category.category} className="space-y-4">
                          <h3 className="text-lg font-semibold text-emerald-400">{category.category}</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            {category.items.map((item) => (
                              <div
                                key={item.name}
                                className="p-4 rounded-lg bg-black/20 border border-gray-800/50 hover:border-emerald-500/30 transition-colors duration-200"
                              >
                                <h4 className="font-medium text-white">{item.name}</h4>
                                <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                                <div className="mt-2 text-sm">
                                  <p className="text-gray-500">Source: {item.source}</p>
                                  <p className="text-gray-500">Author: {item.author}</p>
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mt-2 inline-block"
                                  >
                                    View Resource →
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

