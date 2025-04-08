"use client"

import { motion } from "framer-motion"
import { HelpCircle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What do you think the government should do to support mental health?",
    answer: "The government should implement comprehensive mental health policies including:\n\n" +
           "• Increased funding for mental health services and programs\n" +
           "• Expanded access to mental health professionals through public healthcare\n" +
           "• Integration of mental health education in schools\n" +
           "• Support for workplace mental health initiatives\n" +
           "• Development of community-based mental health resources\n" +
           "• Research funding for mental health treatment and prevention\n" +
           "• Policies to reduce stigma and promote mental health awareness"
  },
  {
    question: "How can we improve mental health services in Canada?",
    answer: "Improving mental health services in Canada requires:\n\n" +
           "• Reducing wait times for mental health treatment\n" +
           "• Expanding coverage for mental health services under provincial healthcare\n" +
           "• Supporting Indigenous mental health initiatives\n" +
           "• Increasing funding for crisis intervention services\n" +
           "• Developing culturally competent mental health care\n" +
           "• Implementing better coordination between services\n" +
           "• Supporting peer support programs"
  },
  {
    question: "What role should employers play in supporting mental health?",
    answer: "Employers should:\n\n" +
           "• Provide mental health benefits and coverage\n" +
           "• Implement workplace mental health policies\n" +
           "• Offer flexible work arrangements\n" +
           "• Provide access to Employee Assistance Programs (EAPs)\n" +
           "• Create a stigma-free workplace environment\n" +
           "• Train managers to recognize and support mental health needs\n" +
           "• Promote work-life balance"
  },
  {
    question: "How can we better support youth mental health?",
    answer: "Supporting youth mental health requires:\n\n" +
           "• Early intervention programs in schools\n" +
           "• Increased access to youth-specific mental health services\n" +
           "• Digital mental health resources for youth\n" +
           "• Support for parents and caregivers\n" +
           "• Youth peer support programs\n" +
           "• Mental health education in school curricula\n" +
           "• Safe spaces for youth to discuss mental health"
  },
  {
    question: "What can be done to address the mental health crisis?",
    answer: "Addressing the mental health crisis requires:\n\n" +
           "• Immediate expansion of crisis services\n" +
           "• Better coordination between emergency and ongoing care\n" +
           "• Increased funding for community mental health services\n" +
           "• Support for prevention and early intervention\n" +
           "• Addressing social determinants of mental health\n" +
           "• Reducing barriers to accessing care\n" +
           "• Supporting mental health research and innovation"
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

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

  const displayedFaqs = showAll ? faqs : faqs.slice(0, 2)

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
            <HelpCircle className="w-10 h-12 text-emerald-400" />
          </div>
          <div className="space-y-4">
            <div className="px-5 py-3">
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-b from-emerald-200 to-emerald-500 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-sm sm:text-base text-emerald-100/60 max-w-md mx-auto px-4">
              Common questions about mental health support and policy
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-24">
        <motion.div variants={item} className="space-y-4">
          {displayedFaqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-950/30 backdrop-blur-sm border border-gray-800/50 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors duration-200 ${
                  openIndex === index
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5"
                }`}
              >
                <span className="text-left font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-6 py-4 bg-black/20"
                >
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-line">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {!showAll && (
          <motion.div 
            variants={item}
            className="mt-8 text-center"
          >
            <Button
              onClick={() => setShowAll(true)}
              className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-8 py-6 rounded-xl text-lg font-medium transition-all duration-300"
            >
              See More FAQs
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
} 