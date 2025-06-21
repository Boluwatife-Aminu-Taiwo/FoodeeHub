import { type NextRequest, NextResponse } from "next/server"

interface VendorSearchParams {
  search?: string
  category?: string
  lat?: string
  lng?: string
  maxDistance?: string
  limit?: string
  offset?: string
  sortBy?: string
}

// Mock function to simulate database query
async function searchVendors(params: VendorSearchParams) {
  const mockVendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "fast_food",
      rating: 4.5,
      description: "Delicious fried chicken and local favorites",
      address: "Victoria Island, Lagos",
      deliveryFee: 500,
      totalOrders: 2340,
      distance: 250,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "25-35 min",
      latitude: 6.4281,
      longitude: 3.4219,
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "ice_cream",
      rating: 4.3,
      description: "Premium ice cream and desserts",
      address: "Victoria Island, Lagos",
      deliveryFee: 400,
      totalOrders: 1560,
      distance: 280,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "20-30 min",
      latitude: 6.4285,
      longitude: 3.4225,
    },
    // Add more mock vendors...
  ]

  // Apply filters
  let filteredVendors = mockVendors

  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredVendors = filteredVendors.filter(
      (vendor) =>
        vendor.name.toLowerCase().includes(searchTerm) ||
        vendor.description.toLowerCase().includes(searchTerm) ||
        vendor.category.toLowerCase().includes(searchTerm),
    )
  }

  if (params.category) {
    filteredVendors = filteredVendors.filter((vendor) => vendor.category === params.category)
  }

  // Apply sorting
  const sortBy = params.sortBy || "featured"
  filteredVendors.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "distance":
        return (a.distance || 0) - (b.distance || 0)
      case "delivery_fee":
        return a.deliveryFee - b.deliveryFee
      case "popular":
        return b.totalOrders - a.totalOrders
      default: // featured
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return b.rating - a.rating
    }
  })

  // Apply pagination
  const limit = Number.parseInt(params.limit || "20")
  const offset = Number.parseInt(params.offset || "0")
  const paginatedVendors = filteredVendors.slice(offset, offset + limit)

  return {
    vendors: paginatedVendors,
    total: filteredVendors.length,
    hasMore: offset + limit < filteredVendors.length,
  }
}

async function getFeaturedVendors() {
  const mockFeaturedVendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "fast_food",
      rating: 4.5,
      description: "Delicious fried chicken and local favorites",
      address: "Victoria Island, Lagos",
      deliveryFee: 500,
      totalOrders: 2340,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "25-35 min",
      featuredOrder: 1,
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "ice_cream",
      rating: 4.3,
      description: "Premium ice cream and desserts",
      address: "Victoria Island, Lagos",
      deliveryFee: 400,
      totalOrders: 1560,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "20-30 min",
      featuredOrder: 2,
    },
    {
      id: 3,
      name: "Dominos Pizza",
      category: "pizza",
      rating: 4.2,
      description: "Fresh pizza delivered hot",
      address: "Lekki Phase 1, Lagos",
      deliveryFee: 600,
      totalOrders: 1890,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "30-40 min",
      featuredOrder: 3,
    },
  ]

  return mockFeaturedVendors.sort((a, b) => a.featuredOrder - b.featuredOrder)
}

async function getVendorCategories() {
  return [
    { category: "fast_food", count: 45 },
    { category: "pizza", count: 23 },
    { category: "local_cuisine", count: 34 },
    { category: "ice_cream", count: 18 },
    { category: "dessert", count: 15 },
    { category: "bakery", count: 12 },
  ]
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const endpoint = searchParams.get("endpoint")

    if (endpoint === "featured") {
      const featuredVendors = await getFeaturedVendors()
      return NextResponse.json({ vendors: featuredVendors })
    }

    if (endpoint === "categories") {
      const categories = await getVendorCategories()
      return NextResponse.json({ categories })
    }

    // Default: search vendors
    const params: VendorSearchParams = {
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      lat: searchParams.get("lat") || "",
      lng: searchParams.get("lng") || "",
      maxDistance: searchParams.get("maxDistance") || "5000",
      limit: searchParams.get("limit") || "20",
      offset: searchParams.get("offset") || "0",
      sortBy: searchParams.get("sortBy") || "featured",
    }

    const result = await searchVendors(params)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching vendors:", error)
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}
