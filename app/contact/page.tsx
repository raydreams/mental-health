"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: Phone,
    label: "Crisis Line",
    value: "1-833-456-4566",
    link: "tel:1-833-456-4566",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@mentalhealthsupport.ca",
    link: "mailto:support@mentalhealthsupport.ca",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Canada",
    link: null,
  },
]

export default function ContactPage() {
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
      className="min-h-screen bg-black text-white pb-32"
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
            <Mail className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Contact Us
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Get in touch with our support team or find emergency resources
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <motion.div variants={item} className="space-y-12">
          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <motion.div
                key={info.label}
                variants={item}
                className="glass p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400/50 transition-colors duration-200"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-emerald-400">{info.label}</h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-lg text-white hover:text-emerald-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-lg text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Form Section - Disabled */}
          <motion.div variants={item} className="max-w-2xl mx-auto">
            <div className="glass p-8 rounded-2xl border border-red-500/30 bg-red-950/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-400/30 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-red-400">Message Form Temporarily Unavailable</h2>
                  <p className="text-sm text-gray-300">
                    Our message form is currently disabled. For immediate assistance, please use our crisis line or email address listed above. We apologize for any inconvenience.
                  </p>
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-400/50 transition-all duration-200"
                      disabled
                    >
                      Send Message
                      <Mail className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Emergency Notice */}
          <motion.div variants={item} className="max-w-2xl mx-auto">
            <div className="glass p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20">
              <h2 className="text-lg font-semibold text-emerald-400 mb-4">In Case of Emergency</h2>
              <p className="text-sm text-gray-300">
                If you or someone you know is in immediate danger or requires urgent medical attention, please call emergency services (911) or visit your nearest emergency department.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
} 