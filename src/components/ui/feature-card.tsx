"use client"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
  className?: string
}

export function FeatureCard({ icon: Icon, title, description, gradient, className }: FeatureCardProps) {
  return (
    <div className={cn("group text-center", className)}>
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        <div
          className={cn(
            "relative w-20 h-20 mx-auto rounded-2xl p-0.5",
            "bg-gradient-to-r transition-all duration-500",
            "group-hover:scale-110 group-hover:rotate-3",
            gradient,
          )}
        >
          {/* Inner Container */}
          <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-transparent">
            <Icon className="h-10 w-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
          </div>

          {/* Glow Effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-50",
              "bg-gradient-to-r blur-xl transition-opacity duration-300",
              gradient,
            )}
          ></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">{description}</p>
    </div>
  )
}
