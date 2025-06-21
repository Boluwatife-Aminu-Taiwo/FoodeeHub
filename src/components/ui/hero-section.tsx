"use client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  children: ReactNode
  className?: string
  variant?: "customer" | "vendor"
}

export function HeroSection({ children, className, variant = "customer" }: HeroSectionProps) {
  const gradientClass =
    variant === "customer"
      ? "from-orange-500/20 via-red-500/10 to-pink-500/20"
      : "from-green-500/20 via-blue-500/10 to-purple-500/20"

  return (
    <section className={cn("relative overflow-hidden py-24 lg:py-32", className)}>
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass}`}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23f97316%22%20fillOpacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-r from-green-400/25 to-cyan-400/25 rounded-full blur-lg animate-bounce-slow"></div>
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  )
}
