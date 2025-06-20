"use client"
import { MapPin, Users, ShoppingCart, Star } from "lucide-react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const featuredVendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "Fast Food",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Cold Stone Creamery",
    },
    {
      id: 2,
      name: "Domino's Pizza",
      category: "Pizza",
      rating: 4.3,
      deliveryTime: "30-40 min",
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Yogurt Factory",
    },
    {
      id: 3,
      name: "Mr. Bigg's",
      category: "Local Cuisine",
      rating: 4.2,
      deliveryTime: "20-30 min",
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Pie Express",
    },
  ]

  const popularCombos = [
    { combo: "Pizza + Ice Cream", orders: "2.3k orders this week" },
    { combo: "Jollof + Smoothie", orders: "1.8k orders this week" },
    { combo: "Burger + Dessert", orders: "1.5k orders this week" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={120} height={40} className="h-8 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/vendor/login">Vendor Login</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Order from Multiple Vendors</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">Smart pairing • Group ordering • Split billing</p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <Input placeholder="Enter your delivery address" className="rounded-r-none bg-white text-gray-900" />
              <Button className="rounded-l-none bg-orange-600 hover:bg-orange-700">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Combos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Combos This Week</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {popularCombos.map((combo, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{combo.combo}</h3>
                  <p className="text-gray-600">{combo.orders}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Vendors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVendors.map((vendor) => (
              <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <SafeImage
                    src={vendor.image || "/placeholder.svg"}
                    alt={vendor.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-500">Pairs with {vendor.pairableWith}</Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{vendor.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{vendor.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{vendor.category}</p>
                  <p className="text-gray-500 text-sm">{vendor.deliveryTime}</p>
                  <Button className="w-full mt-4 bg-orange-500 hover:bg-orange-600" asChild>
                    <Link href={`/vendor/${vendor.id}`}>View Menu</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose FoodeeHub?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Vendor Cart</h3>
              <p className="text-gray-600">
                Order from multiple nearby vendors in one go. Smart pairing suggestions based on proximity.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Group Ordering</h3>
              <p className="text-gray-600">
                Start group orders with friends. Everyone pays for their own items with real-time split billing.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Proximity</h3>
              <p className="text-gray-600">
                Only pair vendors within 300m of each other for faster delivery and fresher food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <SafeImage
                src="/images/foodee-logo.png"
                alt="FoodeeHub"
                width={120}
                height={40}
                className="h-8 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-gray-400">
                The smart way to order from multiple vendors with group ordering and split billing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/how-it-works">How it Works</Link>
                </li>
                <li>
                  <Link href="/group-ordering">Group Ordering</Link>
                </li>
                <li>
                  <Link href="/support">Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/vendor/signup">Join as Vendor</Link>
                </li>
                <li>
                  <Link href="/vendor/login">Vendor Login</Link>
                </li>
                <li>
                  <Link href="/vendor/support">Vendor Support</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodeeHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
