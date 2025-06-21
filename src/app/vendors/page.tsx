"use client"

import { useState, useEffect } from "react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientText } from "@/components/ui/gradient-text"
import { SearchSection } from "@/components/ui/search-section"
import { VendorCard } from "@/components/ui/vendor-card"
import { LoadingSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { AnimatedBadge } from "@/components/ui/animated-badge"
import LocationSearch from "@/components/location/location-search"
import LocationConfirmation from "@/components/location/location-confirmation"
import type { Location } from "@/types/location"

interface Vendor {
  id: number
  name: string
  category: string
  rating: number
  description: string
  address: string
  deliveryFee: number
  totalOrders: number
  distance?: number
  isFeatured: boolean
  image: string
  deliveryTime: string
  pairableWith?: string
}

interface VendorCategory {
  category: string
  count: number
}

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [featuredVendors, setFeaturedVendors] = useState<Vendor[]>([])
  const [categories, setCategories] = useState<VendorCategory[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - replace with API calls
  const mockVendors: Vendor[] = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "fast_food",
      rating: 4.5,
      description: "Delicious fried chicken and local favorites with premium quality ingredients",
      address: "Victoria Island, Lagos",
      deliveryFee: 500,
      totalOrders: 2340,
      distance: 250,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "25-35 min",
      pairableWith: "Cold Stone Creamery",
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "ice_cream",
      rating: 4.3,
      description: "Premium ice cream and desserts made with the finest ingredients",
      address: "Victoria Island, Lagos",
      deliveryFee: 400,
      totalOrders: 1560,
      distance: 280,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "20-30 min",
      pairableWith: "Chicken Republic",
    },
    {
      id: 3,
      name: "Dominos Pizza",
      category: "pizza",
      rating: 4.2,
      description: "Fresh pizza delivered hot with authentic Italian flavors and premium toppings",
      address: "Lekki Phase 1, Lagos",
      deliveryFee: 600,
      totalOrders: 1890,
      distance: 1200,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "30-40 min",
      pairableWith: "Yogurt Factory",
    },
    {
      id: 4,
      name: "Mr. Biggs",
      category: "local_cuisine",
      rating: 4.1,
      description: "Nigerian fast food and local dishes prepared with traditional recipes",
      address: "Ikeja, Lagos",
      deliveryFee: 450,
      totalOrders: 1670,
      distance: 3500,
      isFeatured: false,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "20-30 min",
      pairableWith: "Pie Express",
    },
    {
      id: 5,
      name: "Yogurt Factory",
      category: "dessert",
      rating: 4.4,
      description: "Fresh yogurt and healthy treats made with natural ingredients",
      address: "Lekki Phase 1, Lagos",
      deliveryFee: 350,
      totalOrders: 980,
      distance: 1250,
      isFeatured: false,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "25-35 min",
      pairableWith: "Dominos Pizza",
    },
    {
      id: 6,
      name: "Pie Express",
      category: "bakery",
      rating: 4.0,
      description: "Fresh pies and baked goods made daily with premium ingredients",
      address: "Ikeja, Lagos",
      deliveryFee: 400,
      totalOrders: 870,
      distance: 3600,
      isFeatured: false,
      image: "/placeholder.svg?height=200&width=300",
      deliveryTime: "15-25 min",
      pairableWith: "Mr. Biggs",
    },
  ]

  const mockCategories: VendorCategory[] = [
    { category: "fast_food", count: 45 },
    { category: "pizza", count: 23 },
    { category: "local_cuisine", count: 34 },
    { category: "ice_cream", count: 18 },
    { category: "dessert", count: 15 },
    { category: "bakery", count: 12 },
  ]

  useEffect(() => {
    // Simulate API loading with enhanced loading experience
    setIsLoading(true)
    setTimeout(() => {
      setVendors(mockVendors)
      setFeaturedVendors(mockVendors.filter((v) => v.isFeatured))
      setCategories(mockCategories)
      setIsLoading(false)
    }, 1500)
  }, [])

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || selectedCategory === "all" || vendor.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedVendors = [...filteredVendors].sort((a, b) => {
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

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <AnimatedButton variant="ghost" size="sm" asChild>
                <Link href="/">
                  <SafeImage
                    src="/images/foodee-logo.png"
                    alt="FoodeeHub"
                    width={100}
                    height={32}
                    className="h-6 w-auto"
                  />
                </Link>
              </AnimatedButton>
            </div>
            <div className="flex items-center space-x-4">
              <AnimatedButton variant="ghost" asChild>
                <Link href="/cart">Cart</Link>
              </AnimatedButton>
              <AnimatedButton asChild>
                <Link href="/auth/login">Sign In</Link>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <GradientText>Find Amazing Food</GradientText>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Discover restaurants and vendors near you</p>

          <div className="max-w-2xl mx-auto space-y-4">
            <LocationSearch
              placeholder="Enter your delivery address"
              onLocationSelect={handleLocationSelect}
              className="transform transition-all duration-300 hover:scale-105"
            />

            {selectedLocation && (
              <div className="animate-fade-in-up">
                <LocationConfirmation location={selectedLocation} onClear={() => setSelectedLocation(null)} />
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Search & Filters */}
        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultsCount={sortedVendors.length}
          categories={categories}
        />

        {/* Featured Vendors Section */}
        {featuredVendors.length > 0 && !searchTerm && !selectedCategory && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                <GradientText>Featured Restaurants</GradientText>
              </h2>
              <AnimatedBadge className="animate-pulse">Handpicked for you</AnimatedBadge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVendors.slice(0, 3).map((vendor, index) => (
                <div key={vendor.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <VendorCard vendor={vendor} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All Vendors Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              <GradientText>{searchTerm || selectedCategory ? "Search Results" : "All Restaurants"}</GradientText>
            </h2>
          </div>

          {isLoading ? (
            <LoadingSkeleton count={6} type={viewMode === "grid" ? "card" : "list"} />
          ) : sortedVendors.length > 0 ? (
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {sortedVendors.map((vendor, index) => (
                <div key={vendor.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <VendorCard vendor={vendor} isCompact={viewMode === "list"} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon="🔍"
              title="No restaurants found"
              description="Try adjusting your search or filters to find what you're looking for."
              actionLabel="Clear Filters"
              onAction={handleClearFilters}
            />
          )}
        </section>
      </div>
    </div>
  )
}
