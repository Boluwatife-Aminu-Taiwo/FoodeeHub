"use client"
import { useState, useRef, useEffect } from "react"
import { MapPin, Search, Navigation } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Location {
  id: string
  name: string
  state: string
  lga?: string
  type: "state" | "city" | "area"
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationSearchProps {
  placeholder?: string
  onLocationSelect?: (location: Location) => void
  className?: string
}

// Nigerian locations database
const nigerianLocations: Location[] = [
  // Lagos State
  { id: "lagos-state", name: "Lagos State", state: "Lagos", type: "state" },
  { id: "lagos-island", name: "Lagos Island", state: "Lagos", type: "city", coordinates: { lat: 6.4541, lng: 3.3947 } },
  {
    id: "victoria-island",
    name: "Victoria Island",
    state: "Lagos",
    type: "area",
    coordinates: { lat: 6.4281, lng: 3.4219 },
  },
  { id: "ikoyi", name: "Ikoyi", state: "Lagos", type: "area", coordinates: { lat: 6.4474, lng: 3.4316 } },
  { id: "lekki", name: "Lekki", state: "Lagos", type: "area", coordinates: { lat: 6.4698, lng: 3.5852 } },
  { id: "ikeja", name: "Ikeja", state: "Lagos", type: "city", coordinates: { lat: 6.6018, lng: 3.3515 } },
  { id: "surulere", name: "Surulere", state: "Lagos", type: "area", coordinates: { lat: 6.4969, lng: 3.3481 } },
  { id: "yaba", name: "Yaba", state: "Lagos", type: "area", coordinates: { lat: 6.5158, lng: 3.3707 } },
  { id: "maryland", name: "Maryland", state: "Lagos", type: "area", coordinates: { lat: 6.5698, lng: 3.3659 } },
  { id: "gbagada", name: "Gbagada", state: "Lagos", type: "area", coordinates: { lat: 6.5447, lng: 3.3895 } },
  { id: "ajah", name: "Ajah", state: "Lagos", type: "area", coordinates: { lat: 6.4667, lng: 3.6 } },
  { id: "festac", name: "Festac Town", state: "Lagos", type: "area", coordinates: { lat: 6.4667, lng: 3.2833 } },

  // Abuja (FCT)
  { id: "fct", name: "Federal Capital Territory", state: "FCT", type: "state" },
  { id: "abuja", name: "Abuja", state: "FCT", type: "city", coordinates: { lat: 9.0765, lng: 7.3986 } },
  { id: "wuse", name: "Wuse", state: "FCT", type: "area", coordinates: { lat: 9.0579, lng: 7.4951 } },
  { id: "garki", name: "Garki", state: "FCT", type: "area", coordinates: { lat: 9.0333, lng: 7.4833 } },
  { id: "maitama", name: "Maitama", state: "FCT", type: "area", coordinates: { lat: 9.0833, lng: 7.5 } },
  { id: "asokoro", name: "Asokoro", state: "FCT", type: "area", coordinates: { lat: 9.0333, lng: 7.5167 } },
  { id: "gwarinpa", name: "Gwarinpa", state: "FCT", type: "area", coordinates: { lat: 9.1167, lng: 7.4167 } },

  // Rivers State
  { id: "rivers-state", name: "Rivers State", state: "Rivers", type: "state" },
  {
    id: "port-harcourt",
    name: "Port Harcourt",
    state: "Rivers",
    type: "city",
    coordinates: { lat: 4.8156, lng: 7.0498 },
  },
  { id: "gra-ph", name: "GRA Port Harcourt", state: "Rivers", type: "area", coordinates: { lat: 4.8, lng: 7.0167 } },
  { id: "trans-amadi", name: "Trans Amadi", state: "Rivers", type: "area", coordinates: { lat: 4.7833, lng: 7.0333 } },

  // Kano State
  { id: "kano-state", name: "Kano State", state: "Kano", type: "state" },
  { id: "kano-city", name: "Kano", state: "Kano", type: "city", coordinates: { lat: 12.0022, lng: 8.592 } },
  { id: "sabon-gari", name: "Sabon Gari", state: "Kano", type: "area", coordinates: { lat: 12.0, lng: 8.5167 } },

  // Oyo State
  { id: "oyo-state", name: "Oyo State", state: "Oyo", type: "state" },
  { id: "ibadan", name: "Ibadan", state: "Oyo", type: "city", coordinates: { lat: 7.3775, lng: 3.947 } },
  { id: "bodija", name: "Bodija", state: "Oyo", type: "area", coordinates: { lat: 7.4333, lng: 3.9 } },
  { id: "ui", name: "University of Ibadan", state: "Oyo", type: "area", coordinates: { lat: 7.45, lng: 3.9 } },

  // Kaduna State
  { id: "kaduna-state", name: "Kaduna State", state: "Kaduna", type: "state" },
  { id: "kaduna-city", name: "Kaduna", state: "Kaduna", type: "city", coordinates: { lat: 10.5222, lng: 7.4383 } },

  // Enugu State
  { id: "enugu-state", name: "Enugu State", state: "Enugu", type: "state" },
  { id: "enugu-city", name: "Enugu", state: "Enugu", type: "city", coordinates: { lat: 6.5244, lng: 7.5086 } },

  // Delta State
  { id: "delta-state", name: "Delta State", state: "Delta", type: "state" },
  { id: "warri", name: "Warri", state: "Delta", type: "city", coordinates: { lat: 5.5167, lng: 5.75 } },
  { id: "asaba", name: "Asaba", state: "Delta", type: "city", coordinates: { lat: 6.2084, lng: 6.7333 } },

  // Anambra State
  { id: "anambra-state", name: "Anambra State", state: "Anambra", type: "state" },
  { id: "awka", name: "Awka", state: "Anambra", type: "city", coordinates: { lat: 6.212, lng: 7.074 } },
  { id: "onitsha", name: "Onitsha", state: "Anambra", type: "city", coordinates: { lat: 6.1667, lng: 6.7833 } },

  // Cross River State
  { id: "cross-river-state", name: "Cross River State", state: "Cross River", type: "state" },
  { id: "calabar", name: "Calabar", state: "Cross River", type: "city", coordinates: { lat: 4.9517, lng: 8.322 } },
]

export default function LocationSearch({
  placeholder = "Enter your delivery address",
  onLocationSelect,
  className,
}: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([])
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Filter locations based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      // Show popular locations when no search term
      const popularLocations = nigerianLocations.filter((location) =>
        ["victoria-island", "lekki", "ikeja", "yaba", "abuja", "port-harcourt", "ibadan"].includes(location.id),
      )
      setFilteredLocations(popularLocations)
    } else {
      const filtered = nigerianLocations
        .filter(
          (location) =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            location.state.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 8) // Limit to 8 results
      setFilteredLocations(filtered)
    }
  }, [searchTerm])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
    setSearchTerm(location.name + (location.state !== location.name ? `, ${location.state}` : ""))
    setIsOpen(false)
    onLocationSelect?.(location)
  }

  const detectCurrentLocation = () => {
    setIsDetectingLocation(true)

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords

          // Find closest location (simplified - in real app, use proper geocoding)
          const closestLocation =
            nigerianLocations.find(
              (loc) =>
                loc.coordinates &&
                Math.abs(loc.coordinates.lat - latitude) < 0.1 &&
                Math.abs(loc.coordinates.lng - longitude) < 0.1,
            ) || nigerianLocations.find((loc) => loc.id === "lagos-island") // Fallback

          if (closestLocation) {
            handleLocationSelect(closestLocation)
          }
          setIsDetectingLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsDetectingLocation(false)
        },
      )
    } else {
      setIsDetectingLocation(false)
    }
  }

  const getLocationIcon = (type: string) => {
    switch (type) {
      case "state":
        return "🏛️"
      case "city":
        return "🏙️"
      case "area":
        return "📍"
      default:
        return "📍"
    }
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="h-5 w-5 text-gray-400" />
        </div>

        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onMouseEnter={() => setIsOpen(true)}
          className="pl-12 pr-16 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-500 bg-white/80 backdrop-blur-sm shadow-lg transition-all duration-300"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={detectCurrentLocation}
            disabled={isDetectingLocation}
            className="h-10 w-10 rounded-xl hover:bg-orange-100 transition-colors"
            title="Detect current location"
          >
            <Navigation className={`h-5 w-5 text-gray-500 ${isDetectingLocation ? "animate-spin" : ""}`} />
          </Button>

          <Button
            type="button"
            className="h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto"
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{searchTerm ? "Search Results" : "Popular Locations"}</h3>
              <span className="text-sm text-gray-500">
                {filteredLocations.length} location{filteredLocations.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Location List */}
          <div className="py-2">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-200 flex items-center space-x-3 group"
                >
                  <div className="text-xl">{getLocationIcon(location.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {location.name}
                      </p>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full capitalize">
                        {location.type}
                      </span>
                    </div>
                    {location.state !== location.name && (
                      <p className="text-sm text-gray-500">{location.state} State</p>
                    )}
                    {location.lga && <p className="text-xs text-gray-400">{location.lga} LGA</p>}
                  </div>
                  <div className="text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MapPin className="h-4 w-4" />
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <p className="text-gray-500 font-medium">No locations found</p>
                <p className="text-sm text-gray-400 mt-1">Try searching for a city, state, or area in Nigeria</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {searchTerm && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-gray-500 text-center">
                Can't find your location? We're expanding to more areas soon!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
