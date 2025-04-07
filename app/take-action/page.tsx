"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, CheckCircle, FileText, Mail, Share2, User, Users } from "lucide-react"
import Link from "next/link"
import GovernmentRecommendations from "@/components/government-recommendations"
import { motion } from "framer-motion"

export default function TakeActionPage() {
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
      className="min-h-screen bg-black text-white pb-24"
      variants={container} 
      initial="hidden" 
      animate="show"
    >
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Hero Section */}
      <motion.section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
        variants={item}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-transparent opacity-30" />
        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-600">
            Take Action for Mental Health
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Join us in advocating for better mental health support and policies across Canada. Your voice matters.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={item} className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="government" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="government">Government Action</TabsTrigger>
            <TabsTrigger value="individual">Individual Steps</TabsTrigger>
            <TabsTrigger value="community">Community Initiatives</TabsTrigger>
          </TabsList>

          <TabsContent value="government" className="space-y-8">
            <Card className="bg-gray-950/30 backdrop-blur-sm border-gray-800/50 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl" />
              <CardHeader className="relative border-b border-gray-800/50 bg-black/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-400/20">
                    <FileText className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-emerald-400">Government Action Priorities</CardTitle>
                    <CardDescription className="text-gray-400">
                      Key areas where policy changes can transform mental health care in Canada
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="grid gap-6">
                  {[
                    {
                      title: "Universal Mental Health Coverage",
                      description: "Expand public healthcare to include comprehensive mental health services.",
                      icon: "🏥",
                      points: [
                        "Include psychotherapy in provincial health plans",
                        "Cover prescription mental health medications",
                        "Integrate mental health into primary care",
                        "Establish mental health parity in insurance"
                      ],
                      cta: "Learn about coverage advocacy",
                      delay: 0.1
                    },
                    {
                      title: "Youth Mental Health Programs",
                      description: "Implement nationwide early intervention and support programs for youth.",
                      icon: "🎓",
                      points: [
                        "Mandatory mental health education in schools",
                        "School-based counseling services",
                        "Youth crisis intervention programs",
                        "Parent and teacher mental health training"
                      ],
                      cta: "Support youth initiatives",
                      delay: 0.2
                    },
                    {
                      title: "Workplace Mental Health Reform",
                      description: "Strengthen workplace mental health standards and support systems.",
                      icon: "💼",
                      points: [
                        "Mandatory mental health leave policies",
                        "Workplace wellness program requirements",
                        "Mental health training for managers",
                        "Work-life balance regulations"
                      ],
                      cta: "Workplace advocacy guide",
                      delay: 0.3
                    },
                    {
                      title: "Crisis Response System",
                      description: "Transform emergency response for mental health crises.",
                      icon: "🚨",
                      points: [
                        "24/7 mental health crisis teams",
                        "Non-police crisis response units",
                        "Mobile crisis intervention",
                        "Crisis center funding expansion"
                      ],
                      cta: "Support crisis reform",
                      delay: 0.4
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-emerald-950/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-400/20 text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-emerald-400 mb-2">{item.title}</h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                            <ul className="grid gap-3 mb-4">
                              {item.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-3">
                                  <div className="bg-emerald-950/60 p-1 rounded-full border border-emerald-400/20 mt-1">
                                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-300 leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            <button className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-950/40 hover:border-emerald-400/40 transition-all duration-300">
                              {item.cta}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="individual" className="space-y-8">
            <Card className="bg-gray-950/30 backdrop-blur-sm border-gray-800/50 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl" />
              <CardHeader className="relative border-b border-gray-800/50 bg-black/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-400/20">
                    <User className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-emerald-400">Individual Advocacy Steps</CardTitle>
                    <CardDescription className="text-gray-400">
                      Take meaningful action to support mental health initiatives
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="grid gap-6">
                  {[
                    {
                      title: "Contact Representatives",
                      description: "Reach out to your local MP and provincial representatives to express your concerns about mental health support.",
                      icon: "✉️",
                      points: [
                        "Find your local MP contact information",
                        "Draft a compelling message about mental health needs",
                        "Share personal experiences and community impact",
                        "Follow up on responses and maintain dialogue"
                      ],
                      cta: "Find Your MP",
                      link: "https://www.ourcommons.ca/Members/en/search",
                      delay: 0.1
                    },
                    {
                      title: "Share Your Story",
                      description: "Personal stories can be powerful tools for change. Consider sharing your experiences with mental health.",
                      icon: "📝",
                      points: [
                        "Write about your mental health journey",
                        "Share on social media with #MentalHealthMatters",
                        "Participate in awareness campaigns",
                        "Connect with mental health organizations"
                      ],
                      cta: "Sharing Guidelines",
                      link: "https://www.camh.ca/en/get-involved/awareness-campaigns/mental-health-week/storytelling-guidelines",
                      delay: 0.2
                    },
                    {
                      title: "Sign Petitions",
                      description: "Support ongoing petitions for mental health policy changes and funding increases.",
                      icon: "📋",
                      points: [
                        "Find relevant mental health petitions",
                        "Share petitions with your network",
                        "Create petitions for local initiatives",
                        "Track petition progress and outcomes"
                      ],
                      cta: "Current Petitions",
                      link: "https://petitions.ourcommons.ca/en/Home/Index",
                      delay: 0.3
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-emerald-950/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-400/20 text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-emerald-400 mb-2">{item.title}</h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                            <ul className="grid gap-3 mb-4">
                              {item.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-3">
                                  <div className="bg-emerald-950/60 p-1 rounded-full border border-emerald-400/20 mt-1">
                                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-300 leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={item.link}
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-950/40 hover:border-emerald-400/40 transition-all duration-300"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.cta}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-8">
            <Card className="bg-gray-950/30 backdrop-blur-sm border-gray-800/50 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-t-xl" />
              <CardHeader className="relative border-b border-gray-800/50 bg-black/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-emerald-950/60 p-2 rounded-lg border border-emerald-400/20">
                    <Users className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-emerald-400">Community Initiatives</CardTitle>
                    <CardDescription className="text-gray-400">
                      Join or start local efforts to improve mental health support
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-6">
                <div className="grid gap-6">
                  {[
                    {
                      title: "Fundraising Events",
                      description: "Many mental health organizations need help from the community with events and campaigns.",
                      icon: "🎉",
                      points: [
                        "Organize community fundraisers",
                        "Participate in awareness walks",
                        "Host charity events",
                        "Support local mental health organizations"
                      ],
                      link: "https://cmha.ca/how-you-can-help/hold-a-fundraising-event/",
                      linkText: "Find fundraising opportunities",
                      delay: 0.1
                    },
                    {
                      title: "Awareness Events",
                      description: "Participate in or organize mental health awareness events in your community.",
                      icon: "📢",
                      points: [
                        "Mental Health Week activities",
                        "Community workshops",
                        "Youth mental health programs",
                        "Support group facilitation"
                      ],
                      link: "https://mentalhealthweek.ca/",
                      linkText: "Mental Health Week resources",
                      delay: 0.2
                    },
                    {
                      title: "Find Help",
                      description: "Find help for yourself or a loved one in your community.",
                      icon: "🤝",
                      points: [
                        "Local mental health services",
                        "Crisis support centers",
                        "Counseling resources",
                        "Peer support programs"
                      ],
                      link: "https://cmha.ca/find-help/",
                      linkText: "Find help",
                      delay: 0.3
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: item.delay }}
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-emerald-950/30 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      <div className="relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-400/20 text-2xl">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xl font-semibold text-emerald-400 mb-2">{item.title}</h3>
                            <p className="text-gray-400 mb-4 leading-relaxed">{item.description}</p>
                            <ul className="grid gap-3 mb-4">
                              {item.points.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start gap-3">
                                  <div className="bg-emerald-950/60 p-1 rounded-full border border-emerald-400/20 mt-1">
                                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-gray-300 leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href={item.link}
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-950/40 hover:border-emerald-400/40 transition-all duration-300"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.linkText}
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* CTA Section */}
      <motion.section className="relative mt-20 px-4 sm:px-6 lg:px-8" variants={item}>
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 backdrop-blur-sm border-emerald-400/20 shadow-xl hover:shadow-2xl hover:shadow-emerald/10 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent opacity-60" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Join to volunteer with the Canadian Mental Health Association
                  <br></br>
                  and make a change on mental health initiatives.
                </p>
                
                {/* Warning Box */}
                <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-300">
                        This is a volunteer network and not a paid position.
                        <br></br>
                        This is also only available to those in York Region/South Simcoe Branch.
                      </p>
                      <p className="text-gray-300">
                        Find more information about the branch{" "}
                        <Link 
                          href="https://cmha.ca/find-help/find-cmha-in-your-area/" 
                          className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          here
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>

                <Link 
                  href="https://cmha-yr.on.ca/get-involved/volunteer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-8 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-black font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                    Join the Network
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>
    </motion.div>
  )
}

