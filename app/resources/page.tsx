"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ExternalLink, Phone, MessageSquare, Info } from "lucide-react"
import Link from "next/link"
import ResourceCard from "@/components/resource-card"
import { motion } from "framer-motion"
import FindResourcesDialog from "@/components/find-resources-dialog"

export default function ResourcesPage() {
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
            Mental Health Resources
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Find support services, helplines, and resources for mental health in Canada.
          </p>
        </div>
      </motion.section>

      {/* Emergency Section */}
      <motion.section 
        className="relative px-4 sm:px-6 lg:px-8 mb-16"
        variants={item}
      >
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-sm border-red-500/20 shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent opacity-60" />
            <div className="relative p-8 sm:p-12 flex flex-col sm:flex-row items-start gap-8">
              <div className="bg-red-500/10 p-4 rounded-2xl">
                <Phone className="h-8 w-8 text-red-400" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-red-400 mb-3">Need immediate help?</h2>
                  <p className="text-gray-300 max-w-2xl">
                    If you're in crisis or need immediate support, help is available 24/7. 
                    <br />
                    Trained professionals are ready to listen and provide assistance.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="tel:+18665312600">
                      <Phone className="mr-2 h-4 w-4" />
                      Call +1 (866) 531-2600
                    </Link>
                  </Button>
                  <Button
                    className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="sms:686868?body=CONNECT">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Text <span className="underline underline-offset-4">CONNECT</span> to 686868
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.div variants={item} className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Tabs defaultValue="programs" className="w-full">
          <TabsList className="w-full mb-8">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="tools">Tools & Apps</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                title="BounceBack®"
                organization="Canadian Mental Health Association"
                description="A free skill-building program designed to help adults and youth 15+ manage low mood, mild to moderate depression and anxiety, stress or worry."
                link="https://bouncebackontario.ca/"
                icon={<Info className="h-6 w-6 text-emerald-400" />}
                delay={0.1}
              />

              <ResourceCard
                title="Wellness Together Canada"
                organization="Government of Canada"
                description="Free online mental health and substance use support, resources, and counselling with qualified health professionals."
                link="https://wellnesstogether.ca/en-CA"
                icon={<Info className="h-6 w-6 text-emerald-400" />}
                delay={0.2}
              />

              <ResourceCard
                title="Mindfulness-Based Stress Reduction"
                organization="Various Providers"
                description="An 8-week evidence-based program that offers secular, intensive mindfulness training to assist people with stress, anxiety, depression and pain."
                link="https://www.mindfulnessstudies.com/"
                icon={<Info className="h-6 w-6 text-emerald-400" />}
                delay={0.3}
              />

              <ResourceCard
                title="Mood Disorders Society of Canada"
                organization="MDSC"
                description="Provides education, advocacy and support for people living with mood disorders and their families."
                link="https://mdsc.ca/"
                icon={<Info className="h-6 w-6 text-emerald-400" />}
                delay={0.4}
              />
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                title="Kids Help Phone"
                organization="Kids Help Phone"
                description="24/7 e-mental health services for young people in Canada. Call, text, or message for support from professional counsellors."
                link="https://kidshelpphone.ca/"
                icon={<Phone className="h-6 w-6 text-emerald-400" />}
                delay={0.1}
              />

              <ResourceCard
                title="Crisis Services Canada"
                organization="Crisis Services Canada"
                description="Suicide prevention and support services available 24/7 via phone, text, or chat."
                link="https://www.crisisservicescanada.ca/"
                icon={<Phone className="h-6 w-6 text-emerald-400" />}
                delay={0.2}
              />

              <ResourceCard
                title="Hope for Wellness Helpline"
                organization="Indigenous Services Canada"
                description="Mental health counselling and crisis intervention for Indigenous peoples across Canada."
                link="https://www.hopeforwellness.ca/"
                icon={<Phone className="h-6 w-6 text-emerald-400" />}
                delay={0.3}
              />

              <ResourceCard
                title="Togetherall"
                organization="Various Partners"
                description="A safe, online community where people support each other anonymously to improve mental health and wellbeing."
                link="https://togetherall.com/en-ca/"
                icon={<MessageSquare className="h-6 w-6 text-emerald-400" />}
                delay={0.4}
              />
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ResourceCard
                title="Mindshift"
                organization="Anxiety Canada"
                description="A free app designed to help teens and young adults cope with anxiety, using strategies based on Cognitive Behavioral Therapy."
                link="https://www.anxietycanada.com/resources/mindshift-cbt/"
                icon={<ExternalLink className="h-6 w-6 text-emerald-400" />}
                delay={0.1}
              />

              <ResourceCard
                title="Headspace"
                organization="Headspace Inc."
                description="Meditation and mindfulness app with guided sessions for stress, anxiety, sleep, and more."
                link="https://www.headspace.com/"
                icon={<ExternalLink className="h-6 w-6 text-emerald-400" />}
                delay={0.2}
              />

              <ResourceCard
                title="Woebot"
                organization="Woebot Health"
                description="An AI chatbot that uses cognitive-behavioral therapy techniques to help with mental health."
                link="https://woebothealth.com/"
                icon={<ExternalLink className="h-6 w-6 text-emerald-400" />}
                delay={0.3}
              />

              <ResourceCard
                title="Calm"
                organization="Calm.com"
                description="App for meditation, sleep stories, breathing programs, and relaxing music."
                link="https://www.calm.com/"
                icon={<ExternalLink className="h-6 w-6 text-emerald-400" />}
                delay={0.4}
              />
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Find Local Resources Section */}
      <motion.section className="relative mt-20 px-4 sm:px-6 lg:px-8" variants={item}>
        <div className="max-w-7xl mx-auto">
          <Card className="bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 backdrop-blur-sm border-emerald-400/20 shadow-xl hover:shadow-2xl hover:shadow-emerald/10 transition-all duration-500 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-400/20 via-transparent to-transparent opacity-60" />
            <div className="relative p-8 sm:p-12">
              <div className="max-w-3xl">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl font-bold text-white">Find Local Resources</CardTitle>
                  <CardDescription className="text-gray-400 text-lg mt-2">
                    Mental health services available in your community
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-300 mb-8">
                    Many mental health services are provided at the provincial, territorial, or municipal level. Use the
                    tool below to find resources specific to your location.
                  </p>
                  <FindResourcesDialog />
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>
    </motion.div>
  )
}

