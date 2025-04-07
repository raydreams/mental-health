"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

// Sample data - would be replaced with actual API data in production
const data = [
  { province: "ON", accessScore: 65, utilizationRate: 45 },
  { province: "BC", accessScore: 70, utilizationRate: 50 },
  { province: "AB", accessScore: 62, utilizationRate: 42 },
  { province: "QC", accessScore: 68, utilizationRate: 48 },
  { province: "NS", accessScore: 60, utilizationRate: 40 },
  { province: "MB", accessScore: 58, utilizationRate: 38 },
  { province: "SK", accessScore: 55, utilizationRate: 35 },
  { province: "NB", accessScore: 52, utilizationRate: 32 },
  { province: "NL", accessScore: 50, utilizationRate: 30 },
  { province: "PE", accessScore: 48, utilizationRate: 28 },
]

export default function ProvinceComparisonChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="h-full w-full"
    >
      <ChartContainer
        config={{
          accessScore: {
            label: "Accessibility Score",
            color: "#2E2A5E", // Deep Indigo
          },
          utilizationRate: {
            label: "Utilization Rate",
            color: "#36C2B4", // Teal
          },
        }}
        className="h-full w-full"
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          layout="vertical"
          accessibilityLayer
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E0E0E0" />
          <XAxis
            type="number"
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
            label={{ value: "Score/Rate (%)", position: "insideBottom", offset: -10, style: { fill: "#9CA3AF" } }}
            stroke="#9CA3AF"
          />
          <YAxis dataKey="province" type="category" tickLine={false} axisLine={false} stroke="#9CA3AF" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="accessScore" fill="#2E2A5E" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500} />
          <Bar dataKey="utilizationRate" fill="#36C2B4" radius={[0, 4, 4, 0]} barSize={20} animationDuration={1500} />
        </BarChart>
      </ChartContainer>
    </motion.div>
  )
}

