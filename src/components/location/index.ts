// Barrel exports for clean imports
export { default as LocationSearch } from "./location-search"
export { default as LocationDropdown } from "./location-dropdown"
export { default as LocationItem } from "@/components/location/location-items"
export { default as LocationConfirmation } from "./location-confirmation"

// Re-export types
export type { Location, LocationSearchProps, LocationDropdownProps, LocationItemProps } from "@/types/location"

// Re-export utilities
export { getLocationIcon, formatLocationDisplay } from "@/utils/location-utils"
export { searchLocations, getPopularLocations, findLocationById } from "@/data/nigerian-locations"
