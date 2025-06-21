import type { Location } from "@/types/location"

export const getLocationIcon = (type: string): string => {
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

export const formatLocationDisplay = (location: Location): string => {
  return location.name + (location.state !== location.name ? `, ${location.state}` : "")
}

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      },
    )
  })
}
