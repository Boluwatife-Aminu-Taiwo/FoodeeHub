"use client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GradientTextProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary" | "success"
}

export function GradientText({ children, className, variant = "primary" }: GradientTextProps) {
  const variants = {
    primary: "from-orange-600 via-red-600 to-pink-600",
    secondary: "from-blue-600 via-purple-600 to-indigo-600",
    success: "from-green-600 via-emerald-600 to-teal-600",
  }

  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent font-bold",
        "animate-gradient-x",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
