"use client"
import { useState } from "react"
import {
  ArrowRight,
  Shield,
  ChevronDown,
  User,
  Store,
  Users,
  Star,
  Sparkles,
  ShoppingCart,
  MapPin,
} from "lucide-react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import LocationSearch from "@/components/location/location-search"
import LocationConfirmation from "@/components/location/location-confirmation"
import { HeroSection } from "@/components/ui/hero-section"
import { AnimatedBadge } from "@/components/ui/animated-badge"
import { GradientText } from "@/components/ui/gradient-text"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FeatureCard } from "@/components/ui/feature-card"
import { ComboCard } from "@/components/ui/combo-card"
import { VendorCard } from "@/components/ui/vendor-card"
import { GlassCard } from "@/components/ui/glass-card"
import type { Location } from "@/types/location"


type UserRole = "customer" | "vendor"



export default function HomePage() {

  const [selectedRole, setSelectedRole] = useState<UserRole>("customer")
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const featuredVendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "fast_food",
      rating: 4.5,
      description: "Delicious fried chicken and local favorites with premium quality ingredients",
      deliveryTime: "25-35 min",
      deliveryFee: 500,
      totalOrders: 2340,
      distance: 250,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Cold Stone Creamery",
    },
    {
      id: 2,
      name: "Domino's Pizza",
      category: "pizza",
      rating: 4.3,
      description: "Fresh pizza delivered hot with authentic Italian flavors and premium toppings",
      deliveryTime: "30-40 min",
      deliveryFee: 600,
      totalOrders: 1890,
      distance: 1200,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Yogurt Factory",
    },
    {
      id: 3,
      name: "Mr. Bigg's",
      category: "local_cuisine",
      rating: 4.2,
      description: "Nigerian fast food and local dishes prepared with traditional recipes",
      deliveryTime: "20-30 min",
      deliveryFee: 450,
      totalOrders: 1670,
      distance: 3500,
      isFeatured: true,
      image: "/placeholder.svg?height=200&width=300",
      pairableWith: "Pie Express",
    },
  ]

  const popularCombos = [
    {
      combo: "Pizza + Ice Cream",
      orders: "2.3k orders this week",
      emoji: "🍕🍦",
      savings: "Save ₦200",
    },
    {
      combo: "Jollof + Smoothie",
      orders: "1.8k orders this week",
      emoji: "🍛🥤",
      savings: "Save ₦150",
    },
    {
      combo: "Burger + Dessert",
      orders: "1.5k orders this week",
      emoji: "🍔🧁",
      savings: "Save ₦180",
    },
  ]

  const customerFeatures = [
    {
      icon: ShoppingCart,
      title: "Multi-Vendor Cart",
      description:
        "Order from multiple nearby vendors in one seamless experience. Smart pairing suggestions based on proximity.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      title: "Group Ordering",
      description: "Start group orders with friends. Everyone pays for their own items with real-time split billing.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: MapPin,
      title: "Smart Proximity",
      description: "Only pair vendors within 300m of each other for faster delivery and fresher food.",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

    const vendorFeatures = [
    {
      icon: Store,
      title: "Easy Store Management",
      description: "Manage your menu, orders, and inventory with our intuitive vendor dashboard.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Group Order Benefits",
      description: "Benefit from group orders with higher order values and increased customer satisfaction.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Star,
      title: "Smart Pairing System",
      description: "Get paired with complementary vendors nearby to increase your order volume.",
      gradient: "from-purple-500 to-pink-500",
    },
  ]

  const vendorBenefits = [
    {
      title: "Increased Revenue",
      description: "Average 40% increase in order value through multi-vendor pairing",
      stat: "40%",
      color: "text-green-600",
    },
    {
      title: "More Customers",
      description: "Reach customers who might not have found you otherwise",
      stat: "2.5x",
      color: "text-blue-600",
    },
    {
      title: "Group Orders",
      description: "Benefit from larger group orders with higher margins",
      stat: "₦8,500",
      color: "text-purple-600",
    },
  ]

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location)
  }
  const renderCustomerInterface = () => (
    <>
      {/* Hero Section - Customer */}
      <HeroSection variant="customer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedBadge icon={<Sparkles className="h-4 w-4" />} className="mb-8">
            Now with Smart Vendor Pairing
          </AnimatedBadge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">Order from Multiple</span>
            <br />
            <GradientText variant="primary" className="text-responsive-3xl">
              Vendors
            </GradientText>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smart pairing • Group ordering • Split billing
            <br />
            <span className="text-lg text-gray-500">The future of food delivery is here</span>
          </p>

          <div className="max-w-lg mx-auto mb-8">
            <LocationSearch placeholder="Enter your delivery address" onLocationSelect={handleLocationSelect} />
          </div>

          {selectedLocation && (
            <div className="max-w-lg mx-auto mb-8 animate-fade-in-up">
              <LocationConfirmation location={selectedLocation} onClear={() => setSelectedLocation(null)} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              size="lg"
              disabled={!selectedLocation}
              icon={<ArrowRight className="h-5 w-5" />}
              className="px-8 py-4 text-lg"
              asChild
            >
              <Link href={selectedLocation ? "/vendors" : "#"}>
                {selectedLocation ? "Start Ordering" : "Select Location First"}
              </Link>
            </AnimatedButton>
            <AnimatedButton variant="outline" size="lg" className="px-8 py-4 text-lg">
              How it Works
            </AnimatedButton>
          </div>
        </div>
      </HeroSection>

      {/* Popular Combos */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <GradientText>Popular Combos</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Trending combinations this week</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularCombos.map((combo, index) => (
              <ComboCard key={index} combo={combo} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-red-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <GradientText>Featured Vendors</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Discover amazing food from top-rated vendors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <GradientText>Why Choose FoodeeHub?</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of food delivery with our innovative features designed for modern lifestyles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {customerFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  )

  const renderVendorInterface = () => (
    <>
      {/* Hero Section - Vendor */}
      <HeroSection variant="vendor">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedBadge icon={<Store className="h-4 w-4" />} variant="success" className="mb-8">
            Join 500+ Successful Vendors
          </AnimatedBadge>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">Grow Your Business</span>
            <br />
            <GradientText variant="success" className="text-responsive-3xl">
              With FoodeeHub
            </GradientText>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smart vendor pairing • Higher order values • Group order benefits
            <br />
            <span className="text-lg text-gray-500">The platform that helps restaurants thrive</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              size="lg"
              variant="primary"
              icon={<ArrowRight className="h-5 w-5" />}
              className="px-8 py-4 text-lg bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              asChild
            >
              <Link href="/auth/signup?role=vendor">Join as Vendor</Link>
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-green-500 text-green-500 hover:bg-green-500"
              asChild
            >
              <Link href="/auth/login?role=vendor">Vendor Login</Link>
            </AnimatedButton>
          </div>
        </div>
      </HeroSection>

      {/* Vendor Benefits Stats */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              <GradientText variant="success">Why Vendors Love Us</GradientText>
            </h2>
            <p className="text-xl text-gray-600">Real results from our vendor partners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vendorBenefits.map((benefit, index) => (
              <GlassCard key={index} className="group text-center p-8" hover glow>
                <div
                  className={`text-5xl font-bold mb-4 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  {benefit.stat}
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 mb-4">{benefit.description}</p>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover:from-green-500/5 group-hover:to-blue-500/5 transition-all duration-500 rounded-2xl"></div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <GradientText variant="success">Powerful Tools for Your Success</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage and grow your food business on our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {vendorFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fillOpacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Boost Your Revenue?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of successful vendors who have increased their revenue by 40% on average with our smart
            pairing system.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <AnimatedButton
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold"
              icon={<ArrowRight className="h-5 w-5" />}
              asChild
            >
              <Link href="/auth/signup?role=vendor">Start Selling Today</Link>
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 text-lg font-semibold"
              icon={<Store className="h-5 w-5" />}
              iconPosition="left"
              asChild
            >
              <Link href="/vendor/dashboard">View Dashboard</Link>
            </AnimatedButton>
          </div>
        </div>
      </section>
    </>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <SafeImage
                src="/FoodeeHub_Logo-removebg.png"
                alt="FoodeeHub"
                width={140}
                height={45}
                className="h-10 w-auto"
              />
            </div>
            <div className="flex items-center space-x-3">
              {/* Enhanced Role Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {selectedRole === "customer" ?                   
                    <AnimatedButton variant="outline" className="flex items-center space-x-3 py-1">
                      {selectedRole === "customer" ? <User className="h-3 w-4" /> : <Store className="h-3 w-4" />}
                      <span className="capitalize">{selectedRole}</span>
                      <ChevronDown className="h-3 w-4" />
                    </AnimatedButton> : 
                    <AnimatedButton variant="green" className="flex items-center space-x-3 py-1">
                      {selectedRole === "vendor" ? <Store className="h-3 w-4" /> : <User className="h-3 w-4" />}
                      <span className="capitalize">{selectedRole}</span>
                      <ChevronDown className="h-3 w-4" />
                    </AnimatedButton>
                  }
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 backdrop-blur-xl bg-white/90 border border-white/20">
                  <DropdownMenuItem
                    onClick={() => setSelectedRole("customer")}
                    className={`flex items-center space-x-2 ${selectedRole === "customer" ? "bg-orange-50 text-orange-600" : ""}`}
                  >
                    <User className="h-3 w-4" />
                    <span>Customer</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedRole("vendor")}
                    className={`flex items-center space-x-2 ${selectedRole === "vendor" ? "bg-green-50 text-green-600" : ""}`}
                  >
                    <Store className="h-3 w-4" />
                    <span>Vendor</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {selectedRole === "customer" ? 
              <AnimatedButton variant="ghost" asChild>
                <Link href="/admin">Admin</Link>
              </AnimatedButton> :
              <AnimatedButton variant="ghostGreen" asChild>
                <Link href="/admin">Admin</Link>
              </AnimatedButton>
              }


              <AnimatedButton
                className={
                  selectedRole === "customer"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                }
                asChild
              >
                <Link href={`/auth/login?role=${selectedRole}`}>Sign In</Link>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content Based on Role */}
      {selectedRole === "customer" ? renderCustomerInterface() : renderVendorInterface()}

      {/* CTA Section - Common for both roles */}
     {selectedRole === "customer" && (
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fillOpacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already enjoying multi-vendor ordering and group dining
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <AnimatedButton
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold"
                icon={<ArrowRight className="h-5 w-5" />}
              >
                <Link href= "/vendors">
                  Start Your First Order
                </Link>
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-10 py-4 text-lg font-semibold"
                icon={<Shield className="h-5 w-5" />}
                iconPosition="left"
              >
                Learn More
              </AnimatedButton>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <SafeImage
                src="/FoodeeHub_Logo-removebg.png"
                alt="FoodeeHub"
                width={160}
                height={50}
                className="h-10 w-auto mb-6 brightness-0 invert"
              />
              <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-6">
                {selectedRole === "customer"
                  ? "The smart way to order from multiple vendors with group ordering and split billing. Experience the future of food delivery."
                  : "The platform that helps restaurants grow with smart vendor pairing, group orders, and powerful management tools."}
              </p>
              <div className="flex space-x-4">
                {["f", "t", "in"].map((platform, index) => (
                  <div
                    key={platform}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-all duration-300 cursor-pointer transform hover:scale-110"
                  >
                    <span className="text-sm font-bold">{platform}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">
                {selectedRole === "customer" ? "For Customers" : "For Vendors"}
              </h4>
              <ul className="space-y-4 text-gray-400">
                {selectedRole === "customer" ? (
                  <>
                    <li>
                      <Link href="/how-it-works" className="hover:text-orange-400 transition-colors">
                        How it Works
                      </Link>
                    </li>
                    <li>
                      <Link href="/group-ordering" className="hover:text-orange-400 transition-colors">
                        Group Ordering
                      </Link>
                    </li>
                    <li>
                      <Link href="/support" className="hover:text-orange-400 transition-colors">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/pricing" className="hover:text-orange-400 transition-colors">
                        Pricing
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/auth/signup?role=vendor" className="hover:text-green-400 transition-colors">
                        Join as Vendor
                      </Link>
                    </li>
                    <li>
                      <Link href="/vendor/dashboard" className="hover:text-green-400 transition-colors">
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/vendor/support" className="hover:text-green-400 transition-colors">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/vendor/analytics" className="hover:text-green-400 transition-colors">
                        Analytics
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-orange-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-orange-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-400 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/api-docs" className="hover:text-orange-400 transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">&copy; 2024 FoodeeHub. All rights reserved.</p>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
