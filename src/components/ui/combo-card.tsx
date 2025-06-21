"use client"
import { GlassCard } from "./glass-card"
import { AnimatedBadge } from "./animated-badge"

interface ComboCardProps {
  combo: {
    combo: string
    orders: string
    emoji: string
    savings: string
  }
}

export function ComboCard({ combo }: ComboCardProps) {
  return (
    <GlassCard className="group text-center p-8 cursor-pointer" hover glow>
      {/* Animated Emoji */}
      <div className="text-6xl mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        {combo.emoji}
      </div>

      {/* Savings Badge */}
      <div className="mb-6">
        <AnimatedBadge variant="success" className="animate-bounce-slow">
          {combo.savings}
        </AnimatedBadge>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors duration-500">
        {combo.combo}
      </h3>

      {/* Stats */}
      <p className="text-gray-600 mb-4 font-medium">{combo.orders}</p>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 rounded-2xl"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-4 right-4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
      </div>
    </GlassCard>
  )
}
