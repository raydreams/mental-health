"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function GovernmentRecommendations() {
  const recommendations = [
    {
      title: "Increase Funding",
      description:
        "Allocate at least 10% of healthcare budgets specifically to mental health services, up from the current average of 7%.",
      rationale:
        "Current funding levels are insufficient to meet growing demand, resulting in long wait times and service gaps.",
    },
    {
      title: "Integrate Services",
      description:
        "Fully integrate mental health services into primary care settings across all provinces and territories.",
      rationale: "Integration improves early detection, reduces stigma, and makes mental healthcare more accessible.",
    },
    {
      title: "Expand Digital Services",
      description: "Develop and fund comprehensive digital mental health platforms with virtual care options.",
      rationale: "Digital services can reach remote communities and provide support outside traditional hours.",
    },
    {
      title: "Youth-Focused Programs",
      description:
        "Create dedicated mental health programs in all educational institutions from K-12 through post-secondary.",
      rationale: "Early intervention is crucial as 75% of mental health issues begin before age 24.",
    },
    {
      title: "Workforce Development",
      description:
        "Fund training programs to increase the number of mental health professionals, particularly in underserved areas.",
      rationale:
        "Canada faces a shortage of qualified mental health providers, especially in rural and Indigenous communities.",
    },
  ]

  return (
    <div className="space-y-6">
      {recommendations.map((rec, index) => (
        <motion.div
          key={index}
          className="border-b border-gray-200 dark:border-gray-800 pb-6 last:border-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-4">
            <div className="bg-[#F5F6FA] dark:bg-gray-800 p-2 rounded-full mt-1 flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-[#36C2B4]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2E2A5E] dark:text-[#36C2B4] mb-2">{rec.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{rec.description}</p>
              <div className="bg-[#F5F6FA] dark:bg-gray-800 p-4 rounded-lg mt-2 border-l-4 border-[#36C2B4]">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Evidence:</span> {rec.rationale}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

