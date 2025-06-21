"use client"
import { MapPin } from "lucide-react"
import type { LocationItemProps } from "@/types/location"
import { getLocationIcon } from "@/utils/location-utils"

export default function LocationItem({ location, onSelect }: LocationItemProps) {
  return (
    <button
      onClick={() => onSelect(location)}
      className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center space-x-3 group"
    >
      <div className="text-xl">{getLocationIcon(location.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">{location.name}</p>
          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">{location.type}</span>
        </div>
        {location.state !== location.name && <p className="text-sm text-gray-500">{location.state} State</p>}
        {location.lga && <p className="text-xs text-gray-400">{location.lga} LGA</p>}
      </div>
      <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <MapPin className="h-4 w-4" />
      </div>
    </button>
  )
}
