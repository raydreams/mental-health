"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { motion } from "framer-motion"

// Sample data - would be replaced with actual API data in production
const data = [
  { year: 2010, anxiety: 12, depression: 10, other: 5 },
  { year: 2011, anxiety: 13, depression: 11, other: 6 },
  { year: 2012, anxiety: 15, depression: 12, other: 7 },
  { year: 2013, anxiety: 14, depression: 13, other: 7 },
  { year: 2014, anxiety: 16, depression: 15, other: 8 },
  { year: 2015, anxiety: 18, depression: 16, other: 9 },
  { year: 2016, anxiety: 19, depression: 17, other: 10 },
  { year: 2017, anxiety: 21, depression: 19, other: 11 },
  { year: 2018, anxiety: 23, depression: 21, other: 12 },
  { year: 2019, anxiety: 25, depression: 22, other: 13 },
  { year: 2020, anxiety: 30, depression: 27, other: 15 },
  { year: 2021, anxiety: 32, depression: 29, other: 16 },
  { year: 2022, anxiety: 31, depression: 28, other: 17 },
  { year: 2023, anxiety: 33, depression: 30, other: 18 },
]

export default function MentalHealthTrendsChart() {
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
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E0E0" />
          <XAxis dataKey="year" tickLine={false} axisLine={false} stroke="#9CA3AF" />
          <YAxis
            tickLine={false}
            axisLine={false}
            stroke="#9CA3AF"
            label={{
              value: "Percentage of Population (%)",
              angle: -90,
              position: "insideLeft",
              style: { fill: "#9CA3AF" },
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="anxiety"
            stroke="#2E2A5E"
            strokeWidth={3}
            dot={{ r: 4, fill: "#2E2A5E", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#2E2A5E", strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="depression"
            stroke="#36C2B4"
            strokeWidth={3}
            dot={{ r: 4, fill: "#36C2B4", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#36C2B4", strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="other"
            stroke="#9747FF"
            strokeWidth={3}
            dot={{ r: 4, fill: "#9747FF", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#9747FF", strokeWidth: 0 }}
          />
        </LineChart>
      </ChartContainer>
    </motion.div>
  )
}

