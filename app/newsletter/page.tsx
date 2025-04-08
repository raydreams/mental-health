"use client"

import { motion } from "framer-motion"
import { Mail, Bell, Shield, Users, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    icon: Bell,
    title: "Stay Updated",
    description: "Receive the latest mental health resources, news, and support information.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your information is secure and we never share your data with third parties.",
  },
  {
    icon: Users,
    title: "Community Access",
    description: "Get exclusive access to community events and support groups.",
  },
]

export default function NewsletterPage() {
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
            <Mail className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Stay Connected
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Subscribe to our newsletter for mental health resources and support
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Benefits Section */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-400">Newsletter Benefits</h2>
              </div>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    variants={item}
                    className={`relative flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-emerald-950/30 ${
                      index !== benefits.length - 1 ? "border-b border-emerald-500/10" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center shrink-0">
                      <benefit.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-400">What You'll Receive</h2>
              </div>
              <ul className="space-y-6">
                {[
                  {
                    title: "Weekly Tips & Resources",
                    description: "Expert-curated mental health tips and resources delivered to your inbox",
                    icon: "💡"
                  },
                  {
                    title: "Support Service Updates",
                    description: "Stay informed about new mental health services and support programs",
                    icon: "🔔"
                  },
                  {
                    title: "Community Events",
                    description: "Get notified about upcoming community events and support groups",
                    icon: "👥"
                  },
                  {
                    title: "Expert Guidance",
                    description: "Receive advice and guidance from mental health professionals",
                    icon: "🎯"
                  }
                ].map((item, index) => (
                  <motion.li
                    key={item.title}
                    variants={item as any}
                    className={`group relative flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:bg-emerald-950/30 ${
                      index !== 3 ? "border-b border-emerald-500/10" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200 shrink-0">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium text-white group-hover:text-emerald-300 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Error Message */}
          <div className="glass p-8 rounded-2xl border border-red-500/30 bg-red-950/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15)_0%,transparent_70%)]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-red-950/60 border border-red-400/30 flex items-center justify-center mb-4 shadow-lg shadow-red-500/20">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold text-red-400 mb-8">Newsletter Temporarily Disabled</h2>
              <div className="space-y-4 w-full">
                <p className="text-gray-300">
                  We apologize, but our newsletter subscription service is currently undergoing maintenance and is temporarily disabled. We're working to improve our systems to better serve you.
                </p>
                <p className="text-gray-300">
                  Please check back later or follow us on our social media channels for updates.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center">
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-400/50 transition-all duration-200"
                  >
                    Follow on Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-400/50 transition-all duration-200"
                  >
                    Follow on Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-950/30 hover:text-red-300 hover:border-red-400/50 transition-all duration-200"
                  >
                    Follow on Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 