"use client"
import { useState } from "react"
import {
  ArrowRight,
  Shield,
  ChevronDown,
  User,
  Store,
} from "lucide-react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { renderCustomerInterface } from "@/components/interface/customer-interface"
import { renderVendorInterface } from "@/components/interface/vendor-interface"

type UserRole = "customer" | "vendor"

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer")

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <SafeImage
                src="/FoodeeHub_Logo-removebg.png"
                alt="FoodeeHub"
                width={140}
                height={50}
                className="h-12 w-auto mx-auto"
              />
            </div>
            <div className="flex items-center space-x-3">
              {/* Role Selector Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 border-2 border-gray-200 hover:border-orange-500 transition-colors"
                  >
                    {selectedRole === "customer" ? <User className="h-4 w-4" /> : <Store className="h-4 w-4" />}
                    <span className="capitalize">{selectedRole}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setSelectedRole("customer")}
                    className={`flex items-center space-x-2 ${selectedRole === "customer" ? "bg-orange-50 text-orange-600" : ""}`}
                  >
                    <User className="h-4 w-4" />
                    <span>Customer</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedRole("vendor")}
                    className={`flex items-center space-x-2 ${selectedRole === "vendor" ? "bg-green-50 text-green-600" : ""}`}
                  >
                    <Store className="h-4 w-4" />
                    <span>Vendor</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="text-gray-600 hover:text-orange-600 transition-colors" asChild>
                <Link href="/admin">Admin</Link>
              </Button>
              <Button
                className={`shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedRole === "customer"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                } text-white`}
                asChild
              >
                <Link href={`/auth/login?role=${selectedRole}`}>Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Content Based on Role */}
      {selectedRole === "customer" ? renderCustomerInterface() : renderVendorInterface()}

      {/* CTA Section - Common for both roles */}
      {selectedRole === "customer" && (
        <section className="py-24 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fillRule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fillOpacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Experience the Future?</h2>
            <p className="text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who are already enjoying multi-vendor ordering and group dining
              experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-50 px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold"
              >
                Start Your First Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-orange-600 hover:bg-gray-50 hover:text-orange-700 px-10 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
              >
                <Shield className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <SafeImage
                src="/FoodeeHub_Logo-removebg.png"
                alt="FoodeeHub"
                width={160}
                height={50}
                className="h-12 w-auto mb-6"
              />
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {selectedRole === "customer"
                  ? "The smart way to order from multiple vendors with group ordering and split billing. Experience the future of food delivery."
                  : "The platform that helps restaurants grow with smart vendor pairing, group orders, and powerful management tools."}
              </p>
              <div className="flex space-x-4 mt-6">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">
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
                      <Link href="/vendor/signup" className="hover:text-green-400 transition-colors">
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
              <h4 className="font-bold text-lg mb-6">Company</h4>
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
