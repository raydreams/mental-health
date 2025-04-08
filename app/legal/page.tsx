"use client"

import { motion } from "framer-motion"
import { Scale, Shield, Cookie } from "lucide-react"

const legalSections = [
  {
    icon: Scale,
    title: "Terms of Service",
    content: [
      {
        heading: "1. Acceptance of Terms",
        text: "By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.",
      },
      {
        heading: "2. Use License",
        text: "Permission is granted to temporarily access the materials (information or software) on Mental Health Canada's website for personal, non-commercial transitory viewing only.",
      },
      {
        heading: "3. Disclaimer",
        text: "The materials on Mental Health Canada's website are provided on an 'as is' basis. Mental Health Canada makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Privacy Policy",
    content: [
      {
        heading: "1. Information We Collect",
        text: "We collect information that you provide directly to us, including but not limited to your name, email address, and any other information you choose to provide.",
      },
      {
        heading: "2. How We Use Your Information",
        text: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to protect our rights and interests.",
      },
      {
        heading: "3. Information Sharing",
        text: "We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our website and conducting our business.",
      },
    ],
  },
  {
    icon: Cookie,
    title: "Cookies & Local Storage",
    content: [
      {
        heading: "1. Cookies",
        text: "We use cookies to enhance your experience on our website. Cookies are small text files that are stored on your device when you visit our website.",
      },
      {
        heading: "2. Local Storage",
        text: "We use local storage to store certain preferences and settings on your device. This information helps us provide a better user experience.",
      },
      {
        heading: "3. Managing Your Preferences",
        text: "You can control your cookie and local storage preferences through your browser settings. Please note that disabling certain features may affect the functionality of our website.",
      },
    ],
  },
]

export default function LegalPage() {
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
            <Scale className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Legal Information
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Important information about our terms, privacy, and data usage
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="space-y-12">
          {legalSections.map((section) => (
            <div key={section.title} className="glass p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-400">{section.title}</h2>
              </div>
              <div className="space-y-6">
                {section.content.map((item) => (
                  <div key={item.heading} className="space-y-2">
                    <h3 className="text-lg font-medium text-white">{item.heading}</h3>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
} 