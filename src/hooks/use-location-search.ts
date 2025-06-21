"use client"
import { useState, useEffect, useCallback } from "react"
import type { Location } from "@/types/location"
import { searchLocations, findNearestLocation } from "@/data/nigerian-locations"
import { getCurrentPosition } from "@/utils/location-utils"

export const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)

  // Filter locations based on search term
  useEffect(() => {
    const locations = searchLocations(searchTerm)
    setFilteredLocations(locations)
  }, [searchTerm])

  const detectCurrentLocation = useCallback(async (): Promise<Location | null> => {
    setIsDetectingLocation(true)

    try {
      const position = await getCurrentPosition()
      const { latitude, longitude } = position.coords
      const nearestLocation = findNearestLocation(latitude, longitude)
      return nearestLocation
    } catch (error) {
      console.error("Error getting location:", error)
      return null
    } finally {
      setIsDetectingLocation(false)
    }
  }, [])

  return {
    searchTerm,
    setSearchTerm,
    filteredLocations,
    isDetectingLocation,
    detectCurrentLocation,
  }
}
