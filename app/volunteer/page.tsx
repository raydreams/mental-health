"use client"

import { motion } from "framer-motion"
import { Heart, MapPin, Search, Filter, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

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

const organizations = [
  {
    name: "Canadian Mental Health Association",
    description: "Find volunteer opportunities at CMHA branches across Canada.",
    location: "Nationwide",
    website: "https://cmha.ca/find-help/find-cmha-in-your-area/",
    type: "National Organization",
    services: ["Peer Support", "Crisis Support", "Community Programs", "Education"],
  },
  {
    name: "CMHA York Region",
    description: "Volunteer opportunities in York Region, Ontario.",
    location: "York Region, ON",
    website: "https://cmha-yr.on.ca/get-involved/volunteer/",
    type: "Regional Branch",
    services: ["Youth Programs", "Peer Support", "Community Events"],
  },
  {
    name: "Mood Disorders Society of Canada",
    description: "Volunteer to support mental health awareness and education.",
    location: "Nationwide",
    website: "https://mdsc.ca/volunteer/",
    type: "National Organization",
    services: ["Awareness Programs", "Education", "Support Groups"],
  },
  {
    name: "Jack.org",
    description: "Join Canada's only charity training and empowering young leaders to revolutionize mental health.",
    location: "Nationwide",
    website: "https://jack.org/Get-Involved/Volunteer",
    type: "Youth Organization",
    services: ["Youth Leadership", "Education", "Advocacy"],
  },
  {
    name: "Canadian Association for Suicide Prevention",
    description: "Volunteer to help prevent suicide and support those affected by suicide loss.",
    location: "Nationwide",
    website: "https://suicideprevention.ca/volunteer/",
    type: "National Organization",
    services: ["Crisis Support", "Education", "Advocacy"],
  },
  {
    name: "Anxiety Canada",
    description: "Help spread awareness and support for anxiety and related disorders.",
    location: "Nationwide",
    website: "https://www.anxietycanada.com/volunteer/",
    type: "National Organization",
    services: ["Education", "Support Programs", "Awareness"],
  },
]

export default function VolunteerPage() {
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
            <Heart className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Find Volunteer Opportunities
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Discover mental health volunteer opportunities with organizations across Canada
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="space-y-12">
          {/* Search and Filter Section */}
          <div className="glass p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <input
                  type="text"
                  placeholder="Search organizations..."
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

          {/* Organizations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organizations.map((org) => (
              <motion.div
                key={org.name}
                variants={item}
                className="glass p-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-400/50 transition-colors duration-200 flex flex-col"
              >
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{org.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-emerald-400 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{org.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{org.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-400/30 text-emerald-400 text-xs">
                      {org.type}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-emerald-400">Services:</h4>
                    <ul className="space-y-1">
                      {org.services.map((service) => (
                        <li key={service} className="text-xs text-gray-300 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-emerald-400" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:text-emerald-300 hover:border-emerald-400/50 transition-all duration-200 text-sm py-2"
                    onClick={() => window.open(org.website, '_blank')}
                  >
                    Visit Website
                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {organizations.length === 0 && (
            <div className="glass p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center">
              <p className="text-gray-300">No organizations found matching your criteria.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
} 