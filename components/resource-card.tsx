"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface ResourceCardProps {
  title: string
  organization: string
  description: string
  link: string
  icon: ReactNode
  delay?: number
}

export default function ResourceCard({ title, organization, description, link, icon, delay = 0 }: ResourceCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay, duration: 0.3 }}
    >
      <Card className="group relative h-full flex flex-col border-none shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-900/50 backdrop-blur-sm overflow-hidden">
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Top Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
        
        {/* Content */}
        <CardContent className="relative flex-grow pt-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 mt-1">
              <div className="bg-emerald-400/10 p-3 rounded-xl group-hover:bg-emerald-400/20 transition-colors duration-300">
                {icon}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-gray-400">{organization}</p>
              <p className="text-gray-300 leading-relaxed">{description}</p>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="relative pt-2 pb-6">
          <Button
            className="w-full bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 border-none shadow-md hover:shadow-lg transition-all duration-300 group/btn"
            asChild
          >
            <Link href={link} target="_blank" rel="noopener noreferrer">
              Visit Resource
              <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

