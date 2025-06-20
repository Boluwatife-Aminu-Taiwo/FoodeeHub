import { type NextRequest, NextResponse } from "next/server"

// Mock function to simulate database query for nearby vendors
async function getNearbyVendors(lat: number, lng: number, category: string, maxDistance = 300) {
  // This would typically query your database using PostGIS or similar
  // For now, we'll return mock data

  const mockVendors = [
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "ice_cream",
      latitude: 6.4285,
      longitude: 3.4225,
      distance: 250,
      rating: 4.3,
      deliveryTime: "20-30 min",
      image: "/placeholder.svg?height=150&width=200",
    },
    {
      id: 5,
      name: "Yogurt Factory",
      category: "dessert",
      latitude: 6.4702,
      longitude: 3.5858,
      distance: 280,
      rating: 4.4,
      deliveryTime: "25-35 min",
      image: "/placeholder.svg?height=150&width=200",
    },
  ]

  // Filter out vendors with same category and within distance
  return mockVendors.filter((vendor) => vendor.category !== category && vendor.distance <= maxDistance)
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = Number.parseFloat(searchParams.get("lat") || "0")
    const lng = Number.parseFloat(searchParams.get("lng") || "0")
    const category = searchParams.get("category") || ""
    const maxDistance = Number.parseInt(searchParams.get("maxDistance") || "300")

    if (!lat || !lng || !category) {
      return NextResponse.json({ error: "Missing required parameters: lat, lng, category" }, { status: 400 })
    }

    const nearbyVendors = await getNearbyVendors(lat, lng, category, maxDistance)

    return NextResponse.json({
      vendors: nearbyVendors,
      count: nearbyVendors.length,
    })
  } catch (error) {
    console.error("Error fetching nearby vendors:", error)
    return NextResponse.json({ error: "Failed to fetch nearby vendors" }, { status: 500 })
  }
}
