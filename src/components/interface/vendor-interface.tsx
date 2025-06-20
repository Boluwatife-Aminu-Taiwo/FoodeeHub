import {
  Users,
  Star,
  ArrowRight,
  Store,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"



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
  const renderVendorInterface = () => (
    
    <>
      {/* Hero Section - Vendor */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%2310b981%22%20fillOpacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-8">
            <Store className="h-4 w-4 mr-2" />
            Join 500+ Successful Vendors
          </div>

          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 bg-clip-text text-transparent mb-8 leading-tight">
            Grow Your Business
            <br />
            <span className="text-green-500">With FoodeeHub</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Smart vendor pairing • Higher order values • Group order benefits
            <br />
            <span className="text-lg text-gray-500">The platform that helps restaurants thrive</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
              asChild
            >
              <Link href="/auth/signup?vendor=true">
                Join as Vendor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 hover:border-green-500 px-8 py-4 rounded-2xl text-lg transition-all duration-300"
              asChild
            >
              <Link href="/auth/login">Vendor Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Vendor Benefits Stats */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Vendors Love Us</h2>
            <p className="text-xl text-gray-600">Real results from our vendor partners</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {vendorBenefits.map((benefit, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/60 backdrop-blur-sm hover:bg-white/80 overflow-hidden"
              >
                <CardContent className="p-8 text-center relative">
                  <div className={`text-5xl font-bold mb-4 ${benefit.color}`}>{benefit.stat}</div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-green-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover:from-green-500/5 group-hover:to-blue-500/5 transition-all duration-500 rounded-lg"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor Features */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-r from-gray-50 to-green-50/30">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Powerful Tools for Your Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage and grow your food business on our platform
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {vendorFeatures.map((feature, index) => (
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

                <h3 className="text-2xl font-bold mb-4 group-hover:text-green-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vendor CTA */}
      <section className="py-24 bg-gradient-to-r from-green-500 to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fillOpacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Boost Your Revenue?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of successful vendors who have increased their revenue by 40% on average with our smart
            pairing system.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-50 px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
              asChild
            >
              <Link href="/auth/signup?vendor=true">
                Start Selling Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-green-600 hover:bg-white hover:text-green-700 px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
              asChild
            >
              <Link href="/auth/login?vendor=true">
                <Store className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )

export  {renderVendorInterface, vendorFeatures, vendorBenefits}