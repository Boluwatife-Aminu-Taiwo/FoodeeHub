"use client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedBadgeProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "success" | "warning"
  icon?: ReactNode
}

export function AnimatedBadge({ children, className, variant = "primary", icon }: AnimatedBadgeProps) {
  const variants = {
    primary: "bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white",
    secondary: "bg-gradient-to-r from-gray-500/90 to-gray-600/90 text-white",
    success: "bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white",
    warning: "bg-gradient-to-r from-yellow-500/90 to-orange-500/90 text-white",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
        "backdrop-blur-sm border border-white/20 shadow-lg",
        "transform transition-all duration-300 hover:scale-105 hover:shadow-xl",
        "animate-fade-in-up",
        variants[variant],
        className,
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </div>
  )
}
