"use client"

import { useState, useEffect } from "react"
import { Clock, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface CountdownTimerProps {
  expiresAt: string
  onExpire?: () => void
  className?: string
}

export function CountdownTimer({ expiresAt, onExpire, className }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiresAt).getTime()
      const difference = expiry - now

      if (difference > 0) {
        setTimeLeft(Math.floor(difference / 1000))
        setIsExpired(false)
      } else {
        setTimeLeft(0)
        setIsExpired(true)
        onExpire?.()
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [expiresAt, onExpire])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressValue = () => {
    const totalTime = 30 * 60 // 30 minutes in seconds
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getTimerColor = () => {
    if (isExpired) return "bg-red-100 text-red-800 border-red-200"
    if (timeLeft < 300) return "bg-red-100 text-red-800 border-red-200" // Less than 5 minutes
    if (timeLeft < 600) return "bg-yellow-100 text-yellow-800 border-yellow-200" // Less than 10 minutes
    return "bg-green-100 text-green-800 border-green-200"
  }

  const getProgressColor = () => {
    if (isExpired) return "bg-red-500"
    if (timeLeft < 300) return "bg-red-500"
    if (timeLeft < 600) return "bg-yellow-500"
    return "bg-green-500"
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <Badge className={`text-lg px-4 py-2  ${getTimerColor()}`}>
        {isExpired ? (
          <>
            <AlertTriangle className="h-5 w-5 mr-2" />
            Expired
          </>
        ) : (
          <>
            <Clock className="h-5 w-5 mr-2" />
            { formatTime(timeLeft)}
          </>
        )}
      </Badge>

      {!isExpired && (
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Time remaining  </span> : 
            <span>  {formatTime(timeLeft)}</span>
          </div>
          <div className="relative">
            <Progress value={getProgressValue()} className="h-2" />
            <div
              className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-1000 ${getProgressColor()}`}
              style={{ width: `${getProgressValue()}%` }}
            />
          </div>
        </div>
      )}

      {timeLeft < 300 && !isExpired && (
        <div className="flex items-center space-x-2 text-red-600 text-sm animate-pulse">
          <AlertTriangle className="h-4 w-4" />
          <span>Order closing soon!</span>
        </div>
      )}
    </div>
  )
}
