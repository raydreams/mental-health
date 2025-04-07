"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MentalHealthTrendsChart from "@/components/charts/mental-health-trends"
import AgeGroupsChart from "@/components/charts/age-groups"
import ProvinceComparisonChart from "@/components/charts/province-comparison"
import { motion, useReducedMotion, useInView } from "framer-motion"
import { useRef } from "react"

function LearnContent() {
  const prefersReducedMotion = useReducedMotion()
  const keyFindingsRef = useRef(null)
  const isKeyFindingsInView = useInView(keyFindingsRef, { once: true, margin: "-100px" })
  
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

  const sectionTransition = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div 
      className="bg-black text-white"
      variants={!prefersReducedMotion ? container : undefined} 
      initial={!prefersReducedMotion ? "hidden" : undefined} 
      animate={!prefersReducedMotion ? "show" : undefined}
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative flex flex-col min-h-screen">
        {/* Hero Section */}
        <motion.section 
          className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
          variants={!prefersReducedMotion ? item : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-transparent opacity-30" />
          <div className="relative max-w-7xl mx-auto text-center space-y-8">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Understanding Mental Health in Canada
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore data, trends, and insights about mental health across Canada and learn how it compares globally.
            </motion.p>
          </div>
        </motion.section>

        {/* Data Visualization Section */}
        <motion.section 
          className="relative py-24 px-4 sm:px-6 lg:px-8"
          variants={!prefersReducedMotion ? sectionTransition : undefined}
        >
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">Data Insights</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Explore comprehensive data about mental health trends, demographics, and regional comparisons.
              </p>
            </div>

            <div className="relative">
              <Tabs defaultValue="trends" className="w-full">
                <div className="relative mb-8">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-900/80 backdrop-blur-xl p-1.5 rounded-2xl border border-gray-800/50 shadow-2xl relative overflow-hidden">
                    {/* Remove the active indicator since it's now handled in the TabsTrigger component */}
                    <TabsTrigger
                      value="trends"
                      className="relative z-10 data-[state=active]:text-emerald-400 data-[state=active]:font-medium rounded-xl transition-all duration-300 py-4 text-base font-medium hover:text-emerald-400/80 hover:bg-emerald-500/5 data-[state=active]:bg-emerald-500/10"
                    >
                      Trends
                    </TabsTrigger>
                    <TabsTrigger
                      value="demographics"
                      className="relative z-10 data-[state=active]:text-emerald-400 data-[state=active]:font-medium rounded-xl transition-all duration-300 py-4 text-base font-medium hover:text-emerald-400/80 hover:bg-emerald-500/5 data-[state=active]:bg-emerald-500/10"
                    >
                      Demographics
                    </TabsTrigger>
                    <TabsTrigger
                      value="regional"
                      className="relative z-10 data-[state=active]:text-emerald-400 data-[state=active]:font-medium rounded-xl transition-all duration-300 py-4 text-base font-medium hover:text-emerald-400/80 hover:bg-emerald-500/5 data-[state=active]:bg-emerald-500/10"
                    >
                      Regional Data
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="mt-12 space-y-12">
                  <TabsContent value="trends">
                    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-emerald/5 transition-all duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl"></div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-white">Mental Health Trends (2010-2023)</CardTitle>
                        <CardDescription className="text-gray-400">
                          Annual reported cases of anxiety, depression, and other mental health conditions
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="h-[400px] w-full">
                          <MentalHealthTrendsChart />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="demographics">
                    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-emerald/5 transition-all duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl"></div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-white">Mental Health by Age Group</CardTitle>
                        <CardDescription className="text-gray-400">
                          Distribution of mental health conditions across different age groups
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="h-[400px] w-full">
                          <AgeGroupsChart />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="regional">
                    <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-xl hover:shadow-2xl hover:shadow-emerald/5 transition-all duration-500">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl"></div>
                      <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-white">Provincial Comparison</CardTitle>
                        <CardDescription className="text-gray-400">
                          Mental health service accessibility and utilization by province
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="h-[400px] w-full">
                          <ProvinceComparisonChart />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </motion.section>

        {/* Key Findings Section */}
        <motion.section 
          ref={keyFindingsRef}
          className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gray-900/30"
          variants={!prefersReducedMotion ? sectionTransition : undefined}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald/5 to-transparent" />
          <div className="relative max-w-7xl mx-auto space-y-32">
            <div className="text-center space-y-8">
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={isKeyFindingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                Key Findings
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isKeyFindingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Discover the most significant insights from our comprehensive mental health analysis.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }} 
                animate={isKeyFindingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-lg hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 h-full">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400">Rising Prevalence</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Mental health conditions have seen a 28% increase over the past decade, with anxiety and depression
                      being the most commonly reported conditions.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }} 
                animate={isKeyFindingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-lg hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 h-full">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400">Youth Impact</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Young adults (18-25) show the highest rates of mental health challenges, with 1 in 3 reporting symptoms
                      of anxiety or depression.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                className="group"
                initial={{ opacity: 0, y: 20 }} 
                animate={isKeyFindingsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} 
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800/50 shadow-lg hover:shadow-xl hover:shadow-emerald/5 transition-all duration-500 h-full">
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-l-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold mb-4 text-emerald-400">Service Gaps</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Despite increasing need, only 1 in 3 Canadians who experience a mental health problem or illness report
                      that they have sought and received services and treatment.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default function LearnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse text-emerald-400">Loading...</div>
      </div>
    }>
      <LearnContent />
    </Suspense>
  )
}
