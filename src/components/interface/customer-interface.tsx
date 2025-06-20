import {
  MapPin,
  Users,
  ShoppingCart,
  Star,
  ArrowRight,
  Clock,
  Sparkle,
} from "lucide-react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

  const featuredVendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "Fast Food",
      rating: 4.5,
      deliveryTime: "25-35 min",
      image: "/chickenrep.jpeg", //public/chickenrep.jpeg
      pairableWith: "Cold Stone Creamery",
      orders: "2.3k+ orders",
    },
    {
      id: 2,
      name: "Domino's Pizza",
      category: "Pizza",
      rating: 4.3,
      deliveryTime: "30-40 min",
      image: "/chickenrep.jpeg",
      pairableWith: "Yogurt Factory",
      orders: "1.8k+ orders",
    },
    {
      id: 3,
      name: "Mr. Bigg's",
      category: "Local Cuisine",
      rating: 4.2,
      deliveryTime: "20-30 min",
      image: "/chickenrep.jpeg",
      pairableWith: "Pie Express",
      orders: "1.5k+ orders",
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

  const renderCustomerInterface = () => (
    <>
      {/* Hero Section - Customer */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23f97316%22%20fillOpacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8">
            <Sparkle className="h-4 w-4 mr-2" />
            Now with Smart Vendor Pairing
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 bg-clip-text text-transparent mb-8 leading-tight">
            Order from Multiple
            <br />
            <span className="text-orange-500">Vendors</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smart pairing • Group ordering • Split billing
            <br />
            <span className="text-lg text-gray-500">The future of food delivery is here</span>
          </p>

          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Input
                placeholder="Enter your delivery address"
                className="h-14 pl-6 pr-16 text-lg rounded-2xl border-2 border-gray-200 focus:border-orange-500 bg-white/80 backdrop-blur-sm shadow-lg"
              />
              <Button className="absolute right-2 top-2 h-10 w-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 shadow-lg">
                <MapPin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Start Ordering
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-orange-500 px-8 py-4 rounded-2xl text-lg transition-all duration-300"
            >
              How it Works
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Combos */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Combos</h2>
            <p className="text-xl text-gray-600">Trending combinations this week</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {popularCombos.map((combo, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 cursor-pointer overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className="text-4xl mb-4">{combo.emoji}</div>
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                    {combo.savings}
                  </Badge>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors">
                    {combo.combo}
                  </h3>
                  <p className="text-gray-600 mb-4">{combo.orders}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:to-red-500/5 transition-all duration-500 rounded-lg"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vendors */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-orange-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Vendors</h2>
            <p className="text-xl text-gray-600">Discover amazing food from top-rated vendors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <SafeImage
                    src={vendor.image || "/chickenrep.jpeg"}
                    alt={vendor.name}
                    width={400}
                    height={250}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white shadow-lg">
                    Pairs with {vendor.pairableWith}
                  </Badge>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">{vendor.orders}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors">{vendor.name}</h3>
                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm font-semibold">{vendor.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                      {vendor.category}
                    </Badge>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      {vendor.deliveryTime}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href={`/vendor/${vendor.id}`}>
                      View Menu
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose FoodeeHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of food delivery with our innovative features designed for modern lifestyles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {customerFeatures.map((feature, index) => (
              <div key={index} className="group text-center">
                <div
                  className={`relative w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center">
                    <feature.icon className="h-10 w-10 text-gray-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
                  >
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )

export {renderCustomerInterface, featuredVendors, popularCombos, customerFeatures}