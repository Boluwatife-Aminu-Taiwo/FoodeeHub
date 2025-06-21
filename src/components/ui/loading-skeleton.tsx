"use client"
import { GlassCard } from "./glass-card"

interface LoadingSkeletonProps {
  count?: number
  type?: "card" | "list"
}

export function LoadingSkeleton({ count = 6, type = "card" }: LoadingSkeletonProps) {
  return (
    <div className={type === "card" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {[...Array(count)].map((_, i) => (
        <GlassCard key={i} className="animate-pulse">
          <div
            className={`bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-t-2xl ${type === "card" ? "h-48" : "h-32"}`}
          ></div>
          <div className="p-6">
            <div className="h-6 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded mb-4"></div>
            <div className="h-4 bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded mb-6"></div>
            <div className="h-12 bg-gradient-to-r from-orange-200/50 to-red-200/50 rounded-xl"></div>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}
