"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex w-full items-center justify-center rounded-2xl bg-gray-900/80 backdrop-blur-xl p-1.5 text-gray-400 border border-gray-800/50 shadow-2xl relative overflow-hidden",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  "data-state"?: "active" | "inactive"
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, children, ...props }, ref) => {
  const isActive = props["data-state"] === "active"
  
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative flex-1 flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-emerald-400 data-[state=active]:font-medium hover:text-emerald-400/80 hover:bg-emerald-500/5 data-[state=active]:bg-emerald-500/10",
        className
      )}
      {...props}
    >
      <div className="relative inline-flex flex-col items-center justify-center">
        <span>{children}</span>
        <motion.div
          className="absolute -bottom-1.5 h-0.5 bg-emerald-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ 
            width: isActive ? "100%" : 0,
            opacity: isActive ? 1 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
      </div>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
