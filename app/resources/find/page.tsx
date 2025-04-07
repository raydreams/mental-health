"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { MapPin, Phone, Globe, Clock, Filter, ArrowLeft, Search } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Sample data - would be replaced with API data in production
const resourcesData = [
  {
    id: 1,
    name: "Canadian Mental Health Association - Toronto Branch",
    address: "180 Dundas Street West, Suite 2301, Toronto, ON M5G 1Z8",
    phone: "(416) 789-7957",
    website: "https://toronto.cmha.ca",
    type: "Counseling",
    hours: "Monday-Friday: 9am-5pm",
    description:
      "Provides community mental health services and works to promote mental health awareness through advocacy, education, research, and service.",
  },
  {
    id: 2,
    name: "Centre for Addiction and Mental Health (CAMH)",
    address: "1001 Queen Street West, Toronto, ON M6J 1H4",
    phone: "(416) 535-8501",
    website: "https://www.camh.ca",
    type: "Hospital",
    hours: "24/7 Emergency Services",
    description:
      "Canada's largest mental health teaching hospital and one of the world's leading research centers in its field.",
  },
  {
    id: 3,
    name: "Mood Disorders Association of Ontario",
    address: "36 Eglinton Avenue West, Suite 602, Toronto, ON M4R 1A1",
    phone: "(416) 486-8046",
    website: "https://www.mooddisorders.ca",
    type: "Support Group",
    hours: "Monday-Friday: 9:30am-5pm",
    description:
      "Offers free support programs to people across Ontario, and their families, who are living with depression, anxiety or bipolar disorder.",
  },
  {
    id: 4,
    name: "Stella's Place",
    address: "18 Camden Street, Toronto, ON M5V 1V1",
    phone: "(416) 461-2345",
    website: "https://stellasplace.ca",
    type: "Youth Services",
    hours: "Monday-Friday: 12pm-8pm",
    description:
      "A community-based mental health service for young adults (16-29) in Toronto, offering peer support, clinical, employment, wellness and recovery programs.",
  },
  {
    id: 5,
    name: "Gerstein Crisis Centre",
    address: "100 Charles Street East, Toronto, ON M4Y 1V3",
    phone: "(416) 929-5200",
    website: "https://gersteincentre.org",
    type: "Crisis Support",
    hours: "24/7 Crisis Line",
    description:
      "Provides crisis intervention, peer support, and referrals to adults experiencing mental health crises in Toronto.",
  },
  {
    id: 6,
    name: "Family Service Toronto",
    address: "355 Church Street, Toronto, ON M5B 1Z8",
    phone: "(416) 595-9618",
    website: "https://familyservicetoronto.org",
    type: "Counseling",
    hours: "Monday-Friday: 9am-5pm",
    description:
      "Offers professional counseling, community development, advocacy and public education programs for Torontonians.",
  },
]

const provinces = [
  { value: "ab", label: "Alberta" },
  { value: "bc", label: "British Columbia" },
  { value: "mb", label: "Manitoba" },
  { value: "nb", label: "New Brunswick" },
  { value: "nl", label: "Newfoundland and Labrador" },
  { value: "ns", label: "Nova Scotia" },
  { value: "on", label: "Ontario" },
  { value: "pe", label: "Prince Edward Island" },
  { value: "qc", label: "Quebec" },
  { value: "sk", label: "Saskatchewan" },
  { value: "nt", label: "Northwest Territories" },
  { value: "nu", label: "Nunavut" },
  { value: "yt", label: "Yukon" },
]

const resourceTypes = [
  { id: "counseling", label: "Counseling Services" },
  { id: "crisis", label: "Crisis Support" },
  { id: "hospital", label: "Hospitals & Clinics" },
  { id: "support", label: "Support Groups" },
  { id: "youth", label: "Youth Services" },
  { id: "addiction", label: "Addiction Services" },
  { id: "indigenous", label: "Indigenous Services" },
  { id: "lgbtq", label: "LGBTQ+ Support" },
  { id: "senior", label: "Senior Services" },
]

export default function FindResourcesPage() {
  const [searchResults, setSearchResults] = useState<typeof resourcesData>([])
  const [isSearched, setIsSearched] = useState(false)
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [distance, setDistance] = useState([25])
  const [keyword, setKeyword] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    // For now, we'll just return the sample data
    setSearchResults(resourcesData)
    setIsSearched(true)
  }

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
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

  return (
    <motion.div className="space-y-8 py-8" variants={container} initial="hidden" animate="show">
      <motion.div variants={item} className="flex items-center gap-2">
        <Link href="/resources" className="text-[#2E2A5E] dark:text-[#36C2B4] hover:underline flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Resources
        </Link>
      </motion.div>

      <motion.section variants={item}>
        <h1 className="text-3xl font-bold text-[#2E2A5E] dark:text-white mb-4">Find Mental Health Resources</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Search for mental health services and support in your area with advanced filtering options.
        </p>
      </motion.section>

      <motion.div variants={item}>
        <Card className="border-none shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#36C2B4] to-[#2E2A5E]"></div>
          <CardContent className="p-6">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-[#F5F6FA] dark:bg-gray-800 p-1 rounded-xl">
                <TabsTrigger
                  value="search"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[#2E2A5E] dark:data-[state=active]:text-[#36C2B4] rounded-lg"
                >
                  List View
                </TabsTrigger>
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[#2E2A5E] dark:data-[state=active]:text-[#36C2B4] rounded-lg"
                >
                  Map View
                </TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="province">Province/Territory</Label>
                    <Select value={province} onValueChange={setProvince}>
                      <SelectTrigger id="province">
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map((province) => (
                          <SelectItem key={province.value} value={province.value}>
                            {province.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City/Town</Label>
                    <Input
                      id="city"
                      placeholder="Enter city or town"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="distance">Distance (km): {distance[0]}</Label>
                    <Slider
                      id="distance"
                      min={5}
                      max={100}
                      step={5}
                      value={distance}
                      onValueChange={setDistance}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyword">Keyword Search</Label>
                    <div className="relative">
                      <Input
                        id="keyword"
                        placeholder="e.g., depression, anxiety"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Filter className="h-5 w-5 text-[#2E2A5E] dark:text-[#36C2B4]" />
                    <h3 className="text-sm font-medium">Filter by service type:</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {resourceTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={type.id}
                          checked={selectedTypes.includes(type.id)}
                          onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                          className="data-[state=checked]:bg-[#36C2B4] data-[state=checked]:border-[#36C2B4]"
                        />
                        <Label htmlFor={type.id} className="text-sm">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleSearch}
                    className="px-8 bg-gradient-to-r from-[#36C2B4] to-[#2E2A5E] hover:from-[#2E2A5E] hover:to-[#36C2B4] text-white border-none shadow-md hover:shadow-lg transition-all"
                  >
                    Search Resources
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="map" className="mt-6">
                <div className="bg-[#F5F6FA] dark:bg-gray-800 rounded-lg p-4 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-[#36C2B4] mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-[#2E2A5E] dark:text-white">Interactive Map</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      In a production environment, this would display an interactive map showing the locations of mental
                      health resources in your area.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {isSearched && (
        <motion.section variants={item} className="mt-8">
          <h2 className="text-2xl font-bold text-[#2E2A5E] dark:text-white mb-4">Search Results</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Found {searchResults.length} resources matching your criteria
          </p>

          <div className="grid grid-cols-1 gap-4">
            {searchResults.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ResourceCard resource={resource} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  )
}

interface ResourceCardProps {
  resource: (typeof resourcesData)[0]
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#36C2B4] to-[#2E2A5E]"></div>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[#2E2A5E] dark:text-white mb-1">{resource.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{resource.type}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{resource.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#36C2B4] mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300  mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{resource.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#36C2B4] flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{resource.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[#36C2B4] flex-shrink-0" />
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#2E2A5E] dark:text-[#36C2B4] hover:underline"
                >
                  Visit Website
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#36C2B4] flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{resource.hours}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="bg-gradient-to-r from-[#36C2B4] to-[#2E2A5E] hover:from-[#2E2A5E] hover:to-[#36C2B4] text-white border-none shadow-md hover:shadow-lg transition-all"
              asChild
            >
              <a href={`tel:${resource.phone.replace(/[^0-9]/g, "")}`}>
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>

            <Button
              variant="outline"
              className="border-[#2E2A5E] text-[#2E2A5E] hover:bg-[#2E2A5E] hover:text-white dark:border-[#36C2B4] dark:text-[#36C2B4] dark:hover:bg-[#36C2B4] dark:hover:text-black"
              asChild
            >
              <a href={resource.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" />
                Website
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
