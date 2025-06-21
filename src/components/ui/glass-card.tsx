"use client"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function GlassCard({ children, className, hover = true, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative backdrop-blur-xl bg-white/10 border border-white/20",
        "rounded-2xl shadow-2xl",
        "transition-all duration-500 ease-out",
        hover && "hover:bg-white/20 hover:border-white/30 hover:shadow-3xl hover:-translate-y-2",
        glow && "hover:shadow-orange-500/25",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className,
      )}
    >
      {children}
    </div>
  )
}
