"use client"

import { motion } from "framer-motion"
import { Users, Target, Heart, Globe } from "lucide-react"

const team = [
  {
    name: "Mental Health Support Team",
    role: "Core Team",
    description: "Dedicated professionals working to improve mental health support in Canada.",
    icon: Users,
  },
  {
    name: "Our Mission",
    role: "Purpose",
    description: "To provide accessible, comprehensive mental health resources and support for all Canadians.",
    icon: Target,
  },
  {
    name: "Our Values",
    role: "Principles",
    description: "Compassion, accessibility, innovation, and community-driven support.",
    icon: Heart,
  },
  {
    name: "Our Impact",
    role: "Reach",
    description: "Serving communities across Canada with mental health resources and support.",
    icon: Globe,
  },
]

export default function AboutPage() {
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
            <Users className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                About Us
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Learn about our mission to support mental health in Canada
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="space-y-16">
          {/* Introduction */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Our Story</h2>
            <p className="text-gray-300 leading-relaxed">
              Mental Health Support was founded with a clear mission: to make mental health resources and support accessible to all Canadians. We believe that everyone deserves access to quality mental health information and support, regardless of their location or circumstances.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={item}
                className="glass p-8 rounded-2xl hover:border-emerald-500/30 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-400/30 flex items-center justify-center">
                    <member.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-sm text-emerald-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{member.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Vision Section */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed">
              We envision a Canada where mental health support is as accessible as physical health care, where stigma is eliminated, and where everyone feels empowered to seek help when they need it. Through our platform, we're working to make this vision a reality by providing comprehensive resources, support, and advocacy for mental health.
            </p>
          </div>

          {/* Impact Section */}
          <div className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-emerald-400 mb-6">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">24/7</div>
                <p className="text-gray-300">Access to Resources</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                <p className="text-gray-300">Free Support</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">All</div>
                <p className="text-gray-300">Provinces & Territories</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
} 