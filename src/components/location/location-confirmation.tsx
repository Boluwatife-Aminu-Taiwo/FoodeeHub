"use client"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LocationConfirmationProps } from "@/types/location"

export default function LocationConfirmation({ location, onClear, className = "" }: LocationConfirmationProps) {
  return (
    <div className={`bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 ${className}`}>
      <div className="text-green-600">
        <MapPin className="h-5 w-5" />
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium text-green-800">Delivering to {location.name}</p>
        <p className="text-sm text-green-600">{location.state} State</p>
      </div>
      <Button variant="ghost" size="sm" onClick={onClear} className="text-green-600 hover:text-green-700">
        Change
      </Button>
    </div>
  )
}
