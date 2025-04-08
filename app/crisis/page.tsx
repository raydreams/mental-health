"use client"

import { motion } from "framer-motion"
import { Phone, MessageSquare, MapPin, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

const emergencyContacts = [
  {
    icon: Phone,
    title: "Emergency Services",
    number: "911",
    description: "For immediate emergency assistance",
    available: "24/7",
  },
  {
    icon: MessageSquare,
    title: "Crisis Services Canada",
    number: "1-833-456-4566",
    description: "National crisis support line",
    available: "24/7",
  },
  {
    icon: MessageSquare,
    title: "Kids Help Phone",
    number: "1-800-668-6868",
    description: "Support for young people",
    available: "24/7",
  },
]

const supportResources = [
  {
    icon: MapPin,
    title: "Find Local Support",
    description: "Locate mental health services and support groups in your area",
    link: "/support",
  },
  {
    icon: Clock,
    title: "Immediate Help",
    description: "Access crisis intervention and emergency mental health services",
    link: "/help",
  },
  {
    icon: AlertTriangle,
    title: "Warning Signs",
    description: "Learn about common warning signs and how to help someone in crisis",
    link: "/warning-signs",
  },
]

export default function CrisisPage() {
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
            <AlertTriangle className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Immediate Support
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              If you're in crisis, help is available 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="space-y-12">
          {/* Emergency Alert */}
          <div className="glass p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-semibold text-emerald-400">Emergency Support Available</h2>
            </div>
            <p className="text-gray-300">
              If you're experiencing thoughts of suicide or self-harm, please know that help is available 24/7. Call emergency services (911) immediately or contact one of our crisis support lines below.
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {emergencyContacts.map((contact) => (
              <motion.div
                key={contact.title}
                variants={item}
                className="glass p-8 rounded-2xl hover:border-emerald-500/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                    <contact.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{contact.title}</h3>
                    <p className="text-sm text-emerald-400">{contact.available}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <a
                    href={`tel:${contact.number}`}
                    className="block text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                  >
                    {contact.number}
                  </a>
                  <p className="text-gray-300">{contact.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support Resources */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-8">Additional Support Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {supportResources.map((resource) => (
                <motion.div
                  key={resource.title}
                  variants={item}
                  className="glass p-6 rounded-xl hover:border-emerald-500/30 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                      <resource.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{resource.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300"
                  >
                    Learn More
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Safety Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">If You're in Crisis</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Call emergency services (911) immediately
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Contact a crisis support line
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Reach out to a trusted friend or family member
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Go to the nearest emergency room
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">If Someone You Know is in Crisis</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Stay with them and listen without judgment
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Call emergency services if they're in immediate danger
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Help them connect with professional support
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2" />
                    Take care of yourself and seek support if needed
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 