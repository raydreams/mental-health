"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

// Sample data - would be replaced with actual API data in production
const data = [
  { ageGroup: "12-17", anxiety: 20, depression: 15, other: 8 },
  { ageGroup: "18-25", anxiety: 33, depression: 30, other: 12 },
  { ageGroup: "26-40", anxiety: 28, depression: 25, other: 10 },
  { ageGroup: "41-60", anxiety: 22, depression: 20, other: 9 },
  { ageGroup: "61+", anxiety: 15, depression: 12, other: 7 },
]

export default function AgeGroupsChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full w-full"
    >
      <ChartContainer
        config={{
          anxiety: {
            label: "Anxiety",
            color: "#2E2A5E", // Deep Indigo
          },
          depression: {
            label: "Depression",
            color: "#36C2B4", // Teal
          },
          other: {
            label: "Other Conditions",
            color: "#9747FF", // Purple
          },
        }}
        className="h-full w-full"
      >
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
          <XAxis dataKey="ageGroup" tickLine={false} axisLine={false} stroke="#9CA3AF" />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#9CA3AF"
            label={{
              value: "Percentage of Age Group (%)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#9CA3AF" },
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="anxiety" fill="#2E2A5E" radius={[4, 4, 0, 0]} barSize={30} animationDuration={1500} />
          <Bar dataKey="depression" fill="#36C2B4" radius={[4, 4, 0, 0]} barSize={30} animationDuration={1500} />
          <Bar dataKey="other" fill="#9747FF" radius={[4, 4, 0, 0]} barSize={30} animationDuration={1500} />
        </BarChart>
      </ChartContainer>
    </motion.div>
  )
}

