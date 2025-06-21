"use client"
import type { ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  loading?: boolean
  icon?: ReactNode
  iconPosition?: "left" | "right"
  asChild?: boolean
}

export function AnimatedButton({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  iconPosition = "right",
  disabled,
  ...props
}: AnimatedButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl",
    secondary:
      "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent",
    ghost: "text-gray-600 hover:text-orange-600 hover:bg-orange-50 bg-transparent",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center font-medium rounded-xl",
        "transition-all duration-300 ease-out",
        "transform hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-4 focus:ring-orange-500/25",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
        "overflow-hidden group",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

      {/* Content */}
      <span className="relative flex items-center space-x-2">
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        )}
        {icon && iconPosition === "left" && !loading && icon}
        <span>{children}</span>
        {icon && iconPosition === "right" && !loading && icon}
      </span>
    </button>
  )
}
