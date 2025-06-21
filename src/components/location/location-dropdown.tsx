"use client"
import type { LocationDropdownProps } from "@/types/location"
import { useClickOutside } from "@/hooks/use-click-outside"
import LocationItem from "./location-item"

export default function LocationDropdown({
  isOpen,
  locations,
  searchTerm,
  onLocationSelect,
  onClose,
}: LocationDropdownProps) {
  const dropdownRef = useClickOutside<HTMLDivElement>(onClose)

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[60] overflow-hidden"
      style={{
        maxHeight: "min(384px, calc(100vh - 200px))", // 384px = max-h-96, but constrain to viewport
      }}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{searchTerm ? "Search Results" : "Popular Locations"}</h3>
          <span className="text-sm text-gray-500">
            {locations.length} location{locations.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Scrollable Location List */}
      <div className="overflow-y-auto" style={{ maxHeight: "calc(min(320px, calc(100vh - 280px)))" }}>
        <div className="py-2">
          {locations.length > 0 ? (
            locations.map((location) => (
              <LocationItem key={location.id} location={location} onSelect={onLocationSelect} />
            ))
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-500 font-medium">No locations found</p>
              <p className="text-sm text-gray-400 mt-1">Try searching for a city, state, or area in Nigeria</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {searchTerm && (
        <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl sticky bottom-0">
          <p className="text-xs text-gray-500 text-center">
            Can't find your location? We're expanding to more areas soon!
          </p>
        </div>
      )}
    </div>
  )
}
