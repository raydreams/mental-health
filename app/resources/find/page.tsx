"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Phone, Globe, Clock, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const resources = [
  {
    name: "Crisis Services Canada",
    description: "24/7 suicide prevention and support services across Canada.",
    phone: "1-833-456-4566",
    website: "https://www.crisisservicescanada.ca",
    location: "Nationwide",
    hours: "24/7",
    type: "Crisis Support",
    services: ["Crisis Intervention", "Suicide Prevention", "Mental Health Support"],
  },
  {
    name: "Kids Help Phone",
    description: "Canada's only 24/7 national support service for young people.",
    phone: "1-800-668-6868",
    website: "https://kidshelpphone.ca",
    location: "Nationwide",
    hours: "24/7",
    type: "Youth Support",
    services: ["Crisis Support", "Counselling", "Information & Resources"],
  },
  {
    name: "Hope for Wellness Helpline",
    description: "Mental health counselling and crisis intervention for Indigenous peoples.",
    phone: "1-855-242-3310",
    website: "https://www.hopeforwellness.ca",
    location: "Nationwide",
    hours: "24/7",
    type: "Indigenous Support",
    services: ["Cultural Support", "Crisis Intervention", "Counselling"],
  },
  {
    name: "Trans Lifeline",
    description: "Peer support phone service run by trans people for trans and questioning peers.",
    phone: "1-877-330-6366",
    website: "https://translifeline.org",
    location: "Nationwide",
    hours: "24/7",
    type: "LGBTQ+ Support",
    services: ["Peer Support", "Crisis Intervention", "Resource Navigation"],
  },
]

const provinces = [
  "All Provinces",
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
  "Northwest Territories",
  "Nunavut"
]

export default function FindResourcesPage() {
  const [selectedProvince, setSelectedProvince] = useState("All Provinces")
  const [searchQuery, setSearchQuery] = useState("")

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
            <MapPin className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Find Mental Health Resources
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Connect with mental health support services and resources across Canada
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <motion.div variants={item} className="space-y-12">
          {/* Search and Filter Section */}
          <div className="glass p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/20 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors duration-200 appearance-none"
                >
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <motion.div
                key={resource.name}
                variants={item}
                className="glass p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400/50 transition-colors duration-200 flex flex-col min-h-[320px]"
              >
                <div className="flex-1 space-y-4 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white line-clamp-1">{resource.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-emerald-400 mt-1">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">{resource.location}</span>
                      <span className="text-gray-500 shrink-0">•</span>
                      <Clock className="w-4 h-4 shrink-0" />
                      <span className="truncate">{resource.hours}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-2">{resource.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-400 text-xs shrink-0">
                      {resource.type}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-emerald-400">Services:</h4>
                    <ul className="space-y-1">
                      {resource.services.map((service) => (
                        <li key={service} className="text-xs text-gray-300 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                          <span className="line-clamp-1">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="pt-4 space-y-3 border-t border-emerald-500/20">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300 hover:border-emerald-400/50 transition-all duration-200 text-sm py-2"
                    onClick={() => window.open(resource.website, '_blank')}
                  >
                    Visit Website
                    <Globe className="w-3.5 h-3.5 ml-2 shrink-0" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300 hover:border-emerald-400/50 transition-all duration-200 text-sm py-2"
                    onClick={() => window.open(`tel:${resource.phone}`, '_blank')}
                  >
                    <span className="truncate">{resource.phone}</span>
                    <Phone className="w-3.5 h-3.5 ml-2 shrink-0" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {resources.length === 0 && (
            <div className="glass p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center">
              <p className="text-gray-300">No resources found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
