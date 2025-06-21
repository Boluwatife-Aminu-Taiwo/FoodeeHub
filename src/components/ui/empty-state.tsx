"use client"
import { AnimatedButton } from "./animated-button"

interface EmptyStateProps {
  icon: string
  title: string
  description: string
  actionLabel: string
  onAction: () => void
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <div className="text-8xl mb-8 animate-bounce-slow">{icon}</div>
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">{description}</p>
      <AnimatedButton onClick={onAction} variant="primary" size="lg">
        {actionLabel}
      </AnimatedButton>
    </div>
  )
}
