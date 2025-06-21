import type { Location } from "@/types/location"

export const nigerianLocations: Location[] = [
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

export const popularLocationIds = [
  "victoria-island",
  "lekki",
  "ikeja",
  "yaba",
  "abuja",
  "port-harcourt",
  "ibadan",
  "kano-city",
]

export const getPopularLocations = (): Location[] => {
  return nigerianLocations.filter((location) => popularLocationIds.includes(location.id))
}

export const searchLocations = (searchTerm: string, limit = 8): Location[] => {
  if (!searchTerm.trim()) {
    return getPopularLocations()
  }

  return nigerianLocations
    .filter(
      (location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.state.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, limit)
}

export const findLocationById = (id: string): Location | undefined => {
  return nigerianLocations.find((location) => location.id === id)
}

export const findNearestLocation = (lat: number, lng: number): Location | null => {
  const locationsWithCoords = nigerianLocations.filter((loc) => loc.coordinates)

  if (locationsWithCoords.length === 0) {
    return nigerianLocations.find((loc) => loc.id === "lagos-island") || null
  }

  let nearest = locationsWithCoords[0]
  let minDistance = Number.MAX_VALUE

  for (const location of locationsWithCoords) {
    if (!location.coordinates) continue

    const distance = Math.sqrt(
      Math.pow(location.coordinates.lat - lat, 2) + Math.pow(location.coordinates.lng - lng, 2),
    )

    if (distance < minDistance) {
      minDistance = distance
      nearest = location
    }
  }

  return nearest
}
