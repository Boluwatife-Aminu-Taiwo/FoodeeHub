"use client"
import { useState, useRef } from "react"
import type React from "react"

import { Search, Navigation, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { LocationSearchProps, Location } from "@/types/location"
import { useLocationSearch } from "@/hooks/use-location-search"
import { formatLocationDisplay } from "@/utils/location-utils"
import LocationDropdown from "./location-dropdown"

export default function LocationSearch({
  placeholder = "Enter your delivery address",
  onLocationSelect,
  className = "",
  disabled = false,
  value = null,
}: LocationSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { searchTerm, setSearchTerm, filteredLocations, isDetectingLocation, detectCurrentLocation } =
    useLocationSearch()

  const handleLocationSelect = (location: Location) => {
    setSearchTerm(formatLocationDisplay(location))
    setIsOpen(false)
    onLocationSelect?.(location)
  }

  const handleDetectLocation = async () => {
    const location = await detectCurrentLocation()
    if (location) {
      handleLocationSelect(location)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputMouseEnter = () => {
    if (!disabled) {
      setIsOpen(true)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} style={{ zIndex: 50 }}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onMouseEnter={handleInputMouseEnter}
          disabled={disabled}
          className="pl-12 pr-16 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-500 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDetectLocation}
            disabled={isDetectingLocation || disabled}
            className="h-10 w-10 rounded-xl hover:bg-orange-100 transition-colors disabled:opacity-50"
            title="Detect current location"
          >
            <Navigation className={`h-5 w-5 text-gray-500 ${isDetectingLocation ? "animate-spin" : ""}`} />
          </Button>

          <Button
            type="button"
            disabled={disabled}
            className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg disabled:opacity-50"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <LocationDropdown
          isOpen={isOpen}
          locations={filteredLocations}
          searchTerm={searchTerm}
          onLocationSelect={handleLocationSelect}
          onClose={handleClose}
        />
      </div>
    </div>
  )
}
