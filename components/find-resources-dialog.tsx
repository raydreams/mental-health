"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Globe, Clock, Filter, Languages, Accessibility, DollarSign, Users, Calendar } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Info } from 'lucide-react'

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
    description: "Provides community mental health services and works to promote mental health awareness through advocacy, education, research, and service.",
    languages: ["English", "French", "Mandarin", "Spanish"],
    accessibility: ["Wheelchair accessible", "ASL interpretation available"],
    payment: ["Free", "Sliding scale"],
    waitTime: "2-4 weeks",
    ageGroups: ["Youth", "Adults", "Seniors"],
    serviceDelivery: ["In-person", "Virtual"],
    specializations: ["Anxiety", "Depression", "Bipolar Disorder"]
  },
  {
    id: 2,
    name: "Centre for Addiction and Mental Health (CAMH)",
    address: "1001 Queen Street West, Toronto, ON M6J 1H4",
    phone: "(416) 535-8501",
    website: "https://www.camh.ca",
    type: "Hospital",
    hours: "24/7 Emergency Services",
    description: "Canada's largest mental health teaching hospital and one of the world's leading research centers in its field.",
    languages: ["English", "French", "Multiple other languages"],
    accessibility: ["Wheelchair accessible", "Visual aids", "Hearing aids"],
    payment: ["OHIP covered", "Insurance"],
    waitTime: "Varies by program",
    ageGroups: ["Youth", "Adults", "Seniors"],
    serviceDelivery: ["In-person", "Virtual", "Phone"],
    specializations: ["Addiction", "Mood Disorders", "Schizophrenia", "Youth Mental Health"]
  },
  {
    id: 3,
    name: "Mood Disorders Association of Ontario",
    address: "36 Eglinton Avenue West, Suite 602, Toronto, ON M4R 1A1",
    phone: "(416) 486-8046",
    website: "https://www.mooddisorders.ca",
    type: "Support Group",
    hours: "Monday-Friday: 9:30am-5pm",
    description: "Offers free support programs to people across Ontario, and their families, who are living with depression, anxiety or bipolar disorder.",
    languages: ["English"],
    accessibility: ["Wheelchair accessible"],
    payment: ["Free"],
    waitTime: "None for support groups",
    ageGroups: ["Adults"],
    serviceDelivery: ["In-person", "Virtual"],
    specializations: ["Depression", "Anxiety", "Bipolar Disorder"]
  },
  {
    id: 4,
    name: "Stella's Place",
    address: "18 Camden Street, Toronto, ON M5V 1V1",
    phone: "(416) 461-2345",
    website: "https://stellasplace.ca",
    type: "Youth Services",
    hours: "Monday-Friday: 12pm-8pm",
    description: "A community-based mental health service for young adults (16-29) in Toronto, offering peer support, clinical, employment, wellness and recovery programs.",
    languages: ["English"],
    accessibility: ["Wheelchair accessible", "Sensory-friendly spaces"],
    payment: ["Free"],
    waitTime: "1-2 weeks",
    ageGroups: ["Youth"],
    serviceDelivery: ["In-person", "Virtual", "Phone"],
    specializations: ["Youth Mental Health", "Peer Support", "Employment Support"]
  }
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
  { value: "yt", label: "Yukon" }
]

// Major cities by province
const citiesByProvince = {
  ab: ["Calgary", "Edmonton", "Lethbridge", "Red Deer", "Medicine Hat", "Fort McMurray", "Grande Prairie"],
  bc: ["Vancouver", "Victoria", "Kelowna", "Abbotsford", "Nanaimo", "Kamloops", "Prince George"],
  mb: ["Winnipeg", "Brandon", "Thompson", "Steinbach", "Portage la Prairie"],
  nb: ["Fredericton", "Moncton", "Saint John", "Dieppe", "Miramichi"],
  nl: ["St. John's", "Mount Pearl", "Corner Brook", "Grand Falls-Windsor", "Labrador City"],
  ns: ["Halifax", "Dartmouth", "Sydney", "Truro", "New Glasgow"],
  on: ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London", "Windsor", "Sudbury", "Thunder Bay", "Kingston"],
  pe: ["Charlottetown", "Summerside", "Stratford", "Cornwall"],
  qc: ["Montreal", "Quebec City", "Laval", "Gatineau", "Sherbrooke", "Trois-Rivières", "Saguenay"],
  sk: ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current"],
  nt: ["Yellowknife", "Hay River", "Inuvik", "Fort Smith"],
  nu: ["Iqaluit", "Rankin Inlet", "Arviat", "Baker Lake"],
  yt: ["Whitehorse", "Dawson City", "Watson Lake", "Haines Junction"]
}

// Health regions by province
const healthRegionsByProvince = {
  ab: ["Alberta Health Services"],
  bc: ["Fraser Health", "Interior Health", "Island Health", "Northern Health", "Vancouver Coastal Health"],
  mb: ["Interlake-Eastern Regional Health", "Northern Health Region", "Prairie Mountain Health", "Southern Health-Santé Sud", "Winnipeg Regional Health Authority"],
  nb: ["Horizon Health Network", "Vitalité Health Network"],
  nl: ["Eastern Health", "Central Health", "Western Health", "Labrador-Grenfell Health"],
  ns: ["Nova Scotia Health Authority", "IWK Health Centre"],
  on: ["Central East", "Central West", "Champlain", "Erie St. Clair", "Hamilton Niagara Haldimand Brant", "Mississauga Halton", "North East", "North Simcoe Muskoka", "North West", "South East", "South West", "Toronto Central", "Waterloo Wellington", "Central"],
  pe: ["Health PEI"],
  qc: ["CISSS de l'Abitibi-Témiscamingue", "CISSS de l'Outaouais", "CISSS de la Côte-Nord", "CISSS de la Gaspésie", "CISSS de la Montérégie-Centre", "CISSS de la Montérégie-Est", "CISSS de la Montérégie-Ouest", "CISSS de Lanaudière", "CISSS des Laurentides", "CISSS du Bas-Saint-Laurent", "CISSS de Chaudière-Appalaches", "CISSS de Laval", "CIUSSS de l'Est-de-l'Île-de-Montréal", "CIUSSS de l'Ouest-de-l'Île-de-Montréal", "CIUSSS du Centre-Ouest-de-l'Île-de-Montréal", "CIUSSS du Centre-Sud-de-l'Île-de-Montréal", "CIUSSS du Nord-de-l'Île-de-Montréal"],
  sk: ["Saskatchewan Health Authority"],
  nt: ["Northwest Territories Health and Social Services Authority"],
  nu: ["Nunavut Department of Health"],
  yt: ["Yukon Health and Social Services"]
}

const resourceTypes = [
  { id: "counseling", label: "Counseling Services" },
  { id: "crisis", label: "Crisis Support" },
  { id: "hospital", label: "Hospitals & Clinics" },
  { id: "support", label: "Support Groups" },
  { id: "youth", label: "Youth Services" },
  { id: "addiction", label: "Addiction Services" },
  { id: "indigenous", label: "Indigenous Services" },
  { id: "lgbtq", label: "LGBTQ+ Support" },
  { id: "senior", label: "Senior Services" }
]

const languages = [
  { id: "english", label: "English" },
  { id: "french", label: "French" },
  { id: "indigenous", label: "Indigenous Languages" },
  { id: "asl", label: "ASL/LSQ" },
  { id: "chinese", label: "Chinese (Mandarin/Cantonese)" },
  { id: "punjabi", label: "Punjabi" },
  { id: "spanish", label: "Spanish" },
  { id: "arabic", label: "Arabic" },
  { id: "tagalog", label: "Tagalog" },
  { id: "other", label: "Other Languages" }
]

const accessibilityOptions = [
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "hearing", label: "Hearing Accommodations" },
  { id: "visual", label: "Visual Accommodations" },
  { id: "sensory", label: "Sensory-Friendly" },
  { id: "parking", label: "Accessible Parking" }
]

const paymentOptions = [
  { id: "free", label: "Free Services" },
  { id: "sliding", label: "Sliding Scale" },
  { id: "insurance", label: "Insurance Accepted" },
  { id: "ohip", label: "OHIP Covered" },
  { id: "private", label: "Private Pay" }
]

const ageGroups = [
  { id: "children", label: "Children (0-12)" },
  { id: "youth", label: "Youth (13-24)" },
  { id: "adults", label: "Adults (25-64)" },
  { id: "seniors", label: "Seniors (65+)" }
]

const serviceDelivery = [
  { id: "inperson", label: "In-Person" },
  { id: "virtual", label: "Virtual/Online" },
  { id: "phone", label: "Phone" },
  { id: "mobile", label: "Mobile/Outreach" }
]

const specializations = [
  { id: "anxiety", label: "Anxiety" },
  { id: "depression", label: "Depression" },
  { id: "trauma", label: "Trauma & PTSD" },
  { id: "bipolar", label: "Bipolar Disorder" },
  { id: "schizophrenia", label: "Schizophrenia" },
  { id: "eating", label: "Eating Disorders" },
  { id: "ocd", label: "OCD" },
  { id: "addiction", label: "Addiction" },
  { id: "grief", label: "Grief & Loss" },
  { id: "family", label: "Family Issues" },
  { id: "perinatal", label: "Perinatal Mental Health" }
]

export default function FindResourcesDialog() {
  const [searchResults, setSearchResults] = useState<typeof resourcesData>([])
  const [isSearched, setIsSearched] = useState(false)
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [healthRegion, setHealthRegion] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string[]>([])
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([])
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([])
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [availableRegions, setAvailableRegions] = useState<string[]>([])

  const handleProvinceChange = (value: string) => {
    setProvince(value)
    setCity("")
    setHealthRegion("")
    setAvailableCities(citiesByProvince[value as keyof typeof citiesByProvince] || [])
    setAvailableRegions(healthRegionsByProvince[value as keyof typeof healthRegionsByProvince] || [])
  }

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
      setSelectedTypes(selectedTypes.filter(id => id !== typeId))
    }
  }

  const handleLanguageChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, id])
    } else {
      setSelectedLanguages(selectedLanguages.filter(langId => langId !== id))
    }
  }

  const handleAccessibilityChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAccessibility([...selectedAccessibility, id])
    } else {
      setSelectedAccessibility(selectedAccessibility.filter(accId => accId !== id))
    }
  }

  const handlePaymentChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPayment([...selectedPayment, id])
    } else {
      setSelectedPayment(selectedPayment.filter(payId => payId !== id))
    }
  }

  const handleAgeGroupChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedAgeGroups([...selectedAgeGroups, id])
    } else {
      setSelectedAgeGroups(selectedAgeGroups.filter(ageId => ageId !== id))
    }
  }

  const handleDeliveryChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedDelivery([...selectedDelivery, id])
    } else {
      setSelectedDelivery(selectedDelivery.filter(delId => delId !== id))
    }
  }

  const handleSpecializationChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecializations([...selectedSpecializations, id])
    } else {
      setSelectedSpecializations(selectedSpecializations.filter(specId => specId !== id))
    }
  }

  const clearAllFilters = () => {
    setSelectedTypes([])
    setSelectedLanguages([])
    setSelectedAccessibility([])
    setSelectedPayment([])
    setSelectedAgeGroups([])
    setSelectedDelivery([])
    setSelectedSpecializations([])
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 border border-emerald-400/20 hover:border-emerald-400/40 shadow-lg hover:shadow-xl hover:shadow-emerald/10 transition-all duration-300">
          Find Resources Near Me
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] max-h-[90vh] overflow-y-auto bg-black border border-emerald-400/20 shadow-2xl shadow-emerald/5">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl font-bold text-emerald-400">
            Find Local Resources
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Search for mental health services and support in your area.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-stone-900/50 p-1 rounded-xl border border-emerald-400/10">
            <TabsTrigger
              value="search"
              className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-400/20 rounded-lg transition-all duration-200"
            >
              Search
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-emerald-400/10 data-[state=active]:text-emerald-400 data-[state=active]:border-emerald-400/20 rounded-lg transition-all duration-200"
            >
              Map View
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="province">Province/Territory</Label>
                <Select value={province} onValueChange={handleProvinceChange}>
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
                <Select value={city} onValueChange={setCity} disabled={!province}>
                  <SelectTrigger id="city">
                    <SelectValue placeholder={province ? "Select city" : "Select province first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="healthRegion">Health Region</Label>
                <Select value={healthRegion} onValueChange={setHealthRegion} disabled={!province}>
                  <SelectTrigger id="healthRegion">
                    <SelectValue placeholder={province ? "Select health region" : "Select province first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRegions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10 hover:border-emerald-400/30 transition-all duration-200"
              >
                {showAdvancedFilters ? "Hide Advanced Filters" : "Show Advanced Filters"}
              </Button>
              
              {showAdvancedFilters && (
                <Button 
                  variant="ghost" 
                  onClick={clearAllFilters}
                  className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-200"
                >
                  Clear All Filters
                </Button>
              )}
            </div>

            {showAdvancedFilters && (
              <div className="space-y-4 border border-emerald-400/20 rounded-lg p-4 bg-stone-900/50 backdrop-blur-sm">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="service-types" className="border-emerald-400/10">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline hover:text-emerald-300 transition-colors duration-200">
                      <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        <span>Service Types</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {resourceTypes.map((type) => (
                          <div key={type.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`type-${type.id}`} 
                              checked={selectedTypes.includes(type.id)}
                              onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`type-${type.id}`} className="text-sm text-gray-300">{type.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="languages">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Languages className="h-5 w-5" />
                        <span>Languages</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {languages.map((lang) => (
                          <div key={lang.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`lang-${lang.id}`} 
                              checked={selectedLanguages.includes(lang.id)}
                              onCheckedChange={(checked) => handleLanguageChange(lang.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`lang-${lang.id}`} className="text-sm text-gray-300">{lang.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accessibility">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Accessibility className="h-5 w-5" />
                        <span>Accessibility</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {accessibilityOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`acc-${option.id}`} 
                              checked={selectedAccessibility.includes(option.id)}
                              onCheckedChange={(checked) => handleAccessibilityChange(option.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`acc-${option.id}`} className="text-sm text-gray-300">{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="payment">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        <span>Payment Options</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {paymentOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`pay-${option.id}`} 
                              checked={selectedPayment.includes(option.id)}
                              onCheckedChange={(checked) => handlePaymentChange(option.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`pay-${option.id}`} className="text-sm text-gray-300">{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="age-groups">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>Age Groups</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {ageGroups.map((group) => (
                          <div key={group.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`age-${group.id}`} 
                              checked={selectedAgeGroups.includes(group.id)}
                              onCheckedChange={(checked) => handleAgeGroupChange(group.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`age-${group.id}`} className="text-sm text-gray-300">{group.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="service-delivery">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Service Delivery</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {serviceDelivery.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`del-${option.id}`} 
                              checked={selectedDelivery.includes(option.id)}
                              onCheckedChange={(checked) => handleDeliveryChange(option.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`del-${option.id}`} className="text-sm text-gray-300">{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="specializations">
                    <AccordionTrigger className="text-emerald-400 hover:no-underline">
                      <div className="flex items-center gap-2">
                        <Info className="h-5 w-5" />
                        <span>Specializations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                        {specializations.map((spec) => (
                          <div key={spec.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`spec-${spec.id}`} 
                              checked={selectedSpecializations.includes(spec.id)}
                              onCheckedChange={(checked) => handleSpecializationChange(spec.id, checked as boolean)}
                              className="data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400"
                            />
                            <Label htmlFor={`spec-${spec.id}`} className="text-sm text-gray-300">{spec.label}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}

            <div className="flex justify-center">
              <Button 
                onClick={handleSearch}
                className="w-full md:w-auto px-8 bg-stone-900 hover:bg-stone-500/50 text-emerald-400 border border-emerald-400/20 hover:border-emerald-400/40 shadow-lg hover:shadow-xl hover:shadow-emerald/10 transition-all duration-300"
              >
                Search
              </Button>
            </div>

            <div className="mt-6">
              <AnimatePresence>
                {isSearched && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">
                      {searchResults.length} resources found
                    </h3>
                    <div className="space-y-4">
                      {searchResults.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-center pt-4">
              <Link 
                href="/resources/find" 
                className="text-emerald-400 font-medium hover:underline"
              >
                Advanced search options
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="map-province">Province/Territory</Label>
                  <Select value={province} onValueChange={handleProvinceChange}>
                    <SelectTrigger id="map-province">
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
                  <Label htmlFor="map-city">City/Town</Label>
                  <Select value={city} onValueChange={setCity} disabled={!province}>
                    <SelectTrigger id="map-city">
                      <SelectValue placeholder={province ? "Select city" : "Select province first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button 
                    onClick={handleSearch}
                    className="w-full bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 border-emerald-400/20 shadow-lg hover:shadow-xl hover:shadow-emerald/10 transition-all duration-300"
                  >
                    Update Map
                  </Button>
                </div>
              </div>

              <div className="bg-stone-900/50 rounded-lg p-4 h-[400px] flex items-center justify-center relative">
                {province ? (
                  <div className="absolute inset-0 p-4">
                    <div className="h-full w-full bg-gray-900/50 rounded-lg shadow-inner p-4 flex flex-col">
                      <div className="text-lg font-semibold mb-2 text-emerald-400">
                        {province && provinces.find(p => p.value === province)?.label} 
                        {city && ` - ${city}`}
                      </div>
                      <div className="flex-1 relative">
                        <div className="absolute inset-0 bg-stone-900/50 rounded-lg">
                          {/* This would be replaced with an actual map component */}
                          <div className="h-full flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        {isSearched ? 
                          `${searchResults.length} resources found in this area` : 
                          "Select search criteria and click 'Update Map' to see resources"
                        }
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-emerald-400">Canada Mental Health Resources</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Select a province and city to view mental health resources on the map.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

interface ResourceCardProps {
  resource: typeof resourcesData[0]
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="border border-emerald-400/20 shadow-lg hover:shadow-xl transition-all overflow-hidden bg-stone-900/50 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
      <CardContent className="p-4">
        <h4 className="text-lg font-semibold text-emerald-400">{resource.name}</h4>
        <div className="flex flex-wrap gap-1 my-1">
          <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
            {resource.type}
          </Badge>
          {resource.waitTime && (
            <Badge variant="outline" className="bg-emerald-400/10 text-emerald-400 border-emerald-400/20">
              Wait: {resource.waitTime}
            </Badge>
          )}
        </div>
        <p className="text-sm text-gray-300 mb-3">{resource.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300">{resource.address}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300">{resource.phone}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <a 
              href={resource.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors duration-200"
            >
              Visit Website
            </a>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-emerald-400 flex-shrink-0" />
            <span className="text-gray-300">{resource.hours}</span>
          </div>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="text-emerald-400 hover:text-emerald-300 p-0 h-auto mt-2 transition-colors duration-200">
              More details
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-gray-900 border border-emerald-400/20 shadow-xl shadow-emerald/5">
            <div className="space-y-2">
              <h5 className="font-medium text-emerald-400">Additional Information</h5>
              
              {resource.languages && resource.languages.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Languages:</span> {resource.languages.join(", ")}
                </div>
              )}
              
              {resource.accessibility && resource.accessibility.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Accessibility:</span> {resource.accessibility.join(", ")}
                </div>
              )}
              
              {resource.payment && resource.payment.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Payment Options:</span> {resource.payment.join(", ")}
                </div>
              )}
              
              {resource.ageGroups && resource.ageGroups.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Age Groups:</span> {resource.ageGroups.join(", ")}
                </div>
              )}
              
              {resource.serviceDelivery && resource.serviceDelivery.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Service Delivery:</span> {resource.serviceDelivery.join(", ")}
                </div>
              )}
              
              {resource.specializations && resource.specializations.length > 0 && (
                <div className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Specializations:</span> {resource.specializations.join(", ")}
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  )
}
