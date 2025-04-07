"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, Brain, HeartHandshake, TrendingUp, Users, Lightbulb, Target, Clock, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react"
import StatisticCard from "@/components/statistic-card"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { fetchMentalHealthData } from "@/lib/api"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#10B981',
      bodyColor: '#ffffff',
      borderColor: '#10B981',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      backdropBlur: true,
      callbacks: {
        label: function(context: { parsed: { y: number } }) {
          return `Cases: ${context.parsed.y}`;
        }
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(255, 255, 255, 0.05)',
      },
      ticks: {
        color: '#ffffff',
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#ffffff',
      },
    },
  },
}

export default function Home() {
  const prefersReducedMotion = useReducedMotion()
  const [mentalHealthData, setMentalHealthData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchMentalHealthData()
        setMentalHealthData(data)
      } catch (error) {
        console.error('Error loading mental health data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

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

  const chartData = mentalHealthData ? {
    labels: mentalHealthData.trends.map((t: any) => t.year),
    datasets: [
      {
        label: 'Mental Health Cases',
        data: mentalHealthData.trends.map((t: any) => t.cases),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#10B981',
        pointBorderColor: '#059669',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  } : null

  return (
    <motion.div 
      className="min-h-screen bg-black text-white" 
      variants={!prefersReducedMotion ? container : undefined} 
      initial={!prefersReducedMotion ? "hidden" : undefined} 
      animate={!prefersReducedMotion ? "show" : undefined}
    >
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/unsplash.jpeg"
            alt="Mental health support illustration"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            variants={!prefersReducedMotion ? item : undefined}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8 gradient-text">
              Mental Health Support & Advocacy
            </h1>
            <p className="text-xl sm:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Empowering change through awareness and action for mental health in Canada.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                className="bg-emerald hover:bg-emerald-dark text-white px-12 py-8 rounded-2xl text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
                asChild
              >
                <Link href="/take-action">Take Action</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-white px-12 py-8 rounded-2xl text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
                asChild
              >
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            variants={!prefersReducedMotion ? item : undefined}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 gradient-text">
              Impact in Numbers
            </h2>
            <p className="text-xl text-gray-300">
              Understanding the scope of mental health in Canada
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 auto-rows-fr">
            <div className="h-full">
              <StatisticCard
                title={`${mentalHealthData?.prevalence || 20}%`}
                description="Canadians experience a mental illness in any given year"
                icon={<Brain className="h-8 w-8 text-emerald" />}
                delay={0.1}
                trend="up"
                isNumber={true}
                end={mentalHealthData?.prevalence || 20}
                duration={2}
                typingSpeed={30}
                tooltip="Based on Statistics Canada's Canadian Community Health Survey"
                source="Statistics Canada"
                lastUpdated={new Date().toLocaleDateString()}
              />
            </div>
            <div className="h-full">
              <StatisticCard
                title={`$${mentalHealthData?.economicImpact || 51}B`}
                description="Annual economic impact of mental illness in Canada"
                icon={<BarChart2 className="h-8 w-8 text-emerald" />}
                delay={0.2}
                trend="down"
                isNumber={true}
                end={mentalHealthData?.economicImpact || 51}
                duration={2}
                typingSpeed={30}
                tooltip="Economic burden includes healthcare costs and lost productivity"
                source="Statistics Canada"
                lastUpdated={new Date().toLocaleDateString()}
              />
            </div>
            <div className="h-full">
              <StatisticCard
                title={`${mentalHealthData?.earlyOnset || 75}%`}
                description="Of mental health problems begin before age 24"
                icon={<HeartHandshake className="h-8 w-8 text-emerald" />}
                delay={0.3}
                trend="up"
                isNumber={true}
                end={mentalHealthData?.earlyOnset || 75}
                duration={2}
                typingSpeed={30}
                tooltip="Early intervention is crucial for better outcomes"
                source="WHO Global Health Observatory"
                lastUpdated={new Date().toLocaleDateString()}
              />
            </div>
            <div className="h-full">
              <StatisticCard
                title="24/7"
                description="Support available through Kids Help Phone"
                icon={<Users className="h-8 w-8 text-emerald" />}
                delay={0.4}
                trend="up"
                typingSpeed={30}
                tooltip="Free, confidential support for young people"
                source="Kids Help Phone"
                lastUpdated={new Date().toLocaleDateString()}
              />
            </div>
          </div>

          {chartData && (
            <motion.div 
              className="glass rounded-3xl p-8 shadow-2xl"
              variants={!prefersReducedMotion ? item : undefined}
            >
              <div className="h-[500px] w-full">
                <Line data={chartData} options={options} />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Government Action Plan Section */}
      <section className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            variants={!prefersReducedMotion ? item : undefined}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 gradient-text">
              Government Action Plan
            </h2>
            <p className="text-xl text-gray-300">
              What should the government do to better support mental health in Canada?
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <motion.div 
              className="glass p-8 rounded-2xl shadow-xl card-hover"
              variants={!prefersReducedMotion ? item : undefined}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Lightbulb className="h-12 w-12 text-emerald mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Innovation</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Invest in digital mental health solutions and telehealth services to improve accessibility.
              </p>
              <Link href="/take-action" className="inline-flex items-center text-emerald hover:text-emerald-dark transition-colors duration-200 text-lg">
                Learn more <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div 
              className="glass p-8 rounded-2xl shadow-xl card-hover"
              variants={!prefersReducedMotion ? item : undefined}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Target className="h-12 w-12 text-emerald mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Prevention</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Implement early intervention programs and mental health education in schools.
              </p>
              <Link href="/take-action" className="inline-flex items-center text-emerald hover:text-emerald-dark transition-colors duration-200 text-lg">
                Learn more <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            <motion.div 
              className="glass p-8 rounded-2xl shadow-xl card-hover"
              variants={!prefersReducedMotion ? item : undefined}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Clock className="h-12 w-12 text-emerald mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Access</h3>
              <p className="text-gray-300 mb-6 text-lg">
                Reduce wait times and improve access to mental health services across Canada.
              </p>
              <Link href="/take-action" className="inline-flex items-center text-emerald hover:text-emerald-dark transition-colors duration-200 text-lg">
                Learn more <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="relative overflow-hidden rounded-3xl"
            variants={!prefersReducedMotion ? item : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald to-emerald-dark" />
            <div className="relative p-16 text-white">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-4xl font-bold mb-6">Join Our Advocacy Efforts</h3>
                <p className="text-xl mb-10">
                  Together, we can make a difference in mental health support across Canada.
                </p>
                <Button 
                  className="bg-white text-emerald hover:bg-white/90 px-10 py-7 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
                  asChild
                >
                  <Link href="/take-action">Get Involved</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-black relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent" />
        <div className="relative w-full px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            variants={!prefersReducedMotion ? item : undefined}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 gradient-text">
              Make Your Voice Heard
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              Join us in advocating for better mental health support in Canada. Your voice matters.
            </p>
            <Button 
              className="bg-emerald hover:bg-emerald-dark text-white px-12 py-8 rounded-2xl text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0" 
              asChild
            >
              <Link href="/take-action">Take Action Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}

