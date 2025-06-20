"use client"
import { useState } from "react"
import type React from "react"

import { useSearchParams } from "next/navigation"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, User, Store, Eye, EyeOff, Mail, Lock, Phone, MapPin, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type UserRole = "customer" | "vendor"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get("role") as UserRole) || "customer"

  const [activeRole, setActiveRole] = useState<UserRole>(initialRole)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const [customerData, setCustomerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    marketingEmails: false,
  })

  const [vendorData, setVendorData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessType: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    businessLicense: "",
  })

  const handleCustomerInputChange = (field: string, value: string | boolean) => {
    setCustomerData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVendorInputChange = (field: string, value: string | boolean) => {
    setVendorData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect based on role
    if (activeRole === "vendor") {
      window.location.href = "/vendor/onboarding"
    } else {
      window.location.href = "/customer/welcome"
    }

    setIsLoading(false)
  }

  const businessTypes = [
    "Restaurant",
    "Fast Food",
    "Cafe",
    "Bakery",
    "Ice Cream Shop",
    "Juice Bar",
    "Food Truck",
    "Catering",
    "Other",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding & Info */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center lg:text-left">
            <SafeImage
              src="/FoodeeHub_Logo-removebg.png"
              alt="FoodeeHub"
              width={120}
              height={45}
              className="h-20 w-auto mx-auto lg:mx-0 mb-8"
            />

            {activeRole === "customer" ? (
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Join FoodeeHub
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Start your journey with multi-vendor ordering and discover amazing food combinations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">1</span>
                    </div>
                    <span className="text-gray-700">Create your account in minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">2</span>
                    </div>
                    <span className="text-gray-700">Discover nearby vendor pairs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">3</span>
                    </div>
                    <span className="text-gray-700">Start ordering and save money</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Grow Your Business
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join 500+ successful restaurants and increase your revenue by 40% on average.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">1</span>
                    </div>
                    <span className="text-gray-700">Register your restaurant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    <span className="text-gray-700">Get approved in 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">3</span>
                    </div>
                    <span className="text-gray-700">Start receiving orders</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-6 pb-8">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/">
                    <ArrowLeft className="h-5 w-5" />
                  </Link>
                </Button>
                <div className="lg:hidden">
                  <SafeImage
                    src="/FoodeeHub_icon-removebg.png"
                    alt="FoodeeHub"
                    width={120}
                    height={40}
                    className="h-12 w-auto"
                  />
                </div>
              </div>

              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
                <p className="text-gray-600 mt-2">Join the FoodeeHub community</p>
              </div>

              {/* Role Selector */}
              <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as UserRole)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-12">
                  <TabsTrigger
                    value="customer"
                    className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                  >
                    <User className="h-4 w-4" />
                    <span>Customer</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="vendor"
                    className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
                  >
                    <Store className="h-4 w-4" />
                    <span>Vendor</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="customer" className="space-y-6 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={customerData.firstName}
                          onChange={(e) => handleCustomerInputChange("firstName", e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={customerData.lastName}
                          onChange={(e) => handleCustomerInputChange("lastName", e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-email"
                          type="email"
                          placeholder="john@example.com"
                          value={customerData.email}
                          onChange={(e) => handleCustomerInputChange("email", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-phone"
                          type="tel"
                          placeholder="+234 801 234 5678"
                          value={customerData.phone}
                          onChange={(e) => handleCustomerInputChange("phone", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={customerData.password}
                          onChange={(e) => handleCustomerInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="customer-confirm-password">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          value={customerData.confirmPassword}
                          onChange={(e) => handleCustomerInputChange("confirmPassword", e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agree-terms-customer"
                          checked={customerData.agreeToTerms}
                          onCheckedChange={(checked) => handleCustomerInputChange("agreeToTerms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="agree-terms-customer" className="text-sm">
                          I agree to the{" "}
                          <Link href="/terms" className="text-orange-600 hover:text-orange-700">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-orange-600 hover:text-orange-700">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="marketing-emails"
                          checked={customerData.marketingEmails}
                          onCheckedChange={(checked) =>
                            handleCustomerInputChange("marketingEmails", checked as boolean)
                          }
                        />
                        <Label htmlFor="marketing-emails" className="text-sm">
                          Send me promotional emails and updates
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                      disabled={isLoading || !customerData.agreeToTerms}
                    >
                      {isLoading ? "Creating Account..." : "Create Customer Account"}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <Link
                        href="/auth/login?role=customer"
                        className="text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        Sign in
                      </Link>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-6 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="businessName"
                          placeholder="Your Restaurant Name"
                          value={vendorData.businessName}
                          onChange={(e) => handleVendorInputChange("businessName", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Owner/Manager Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="ownerName"
                          placeholder="Your full name"
                          value={vendorData.ownerName}
                          onChange={(e) => handleVendorInputChange("ownerName", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-email">Business Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="vendor-email"
                          type="email"
                          placeholder="business@restaurant.com"
                          value={vendorData.email}
                          onChange={(e) => handleVendorInputChange("email", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-phone">Business Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="vendor-phone"
                          type="tel"
                          placeholder="+234 801 234 5678"
                          value={vendorData.phone}
                          onChange={(e) => handleVendorInputChange("phone", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select
                        value={vendorData.businessType}
                        onValueChange={(value) => handleVendorInputChange("businessType", value)}
                      >
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Business Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="address"
                          placeholder="Full business address"
                          value={vendorData.address}
                          onChange={(e) => handleVendorInputChange("address", e.target.value)}
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vendor-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="vendor-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          value={vendorData.password}
                          onChange={(e) => handleVendorInputChange("password", e.target.value)}
                          className="pl-10 pr-10 h-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agree-terms-vendor"
                          checked={vendorData.agreeToTerms}
                          onCheckedChange={(checked) => handleVendorInputChange("agreeToTerms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="agree-terms-vendor" className="text-sm">
                          I agree to the{" "}
                          <Link href="/vendor/terms" className="text-green-600 hover:text-green-700">
                            Vendor Terms
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:text-green-700">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
                      disabled={isLoading || !vendorData.agreeToTerms}
                    >
                      {isLoading ? "Creating Account..." : "Register Restaurant"}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already registered?{" "}
                      <Link
                        href="/auth/login?role=vendor"
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        Sign in to Dashboard
                      </Link>
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Secure Registration</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>

            {activeRole === "vendor" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>Special Offer:</strong> 0% commission for your first month + free onboarding support!
                </p>
              </div>
            )}

            {activeRole === "customer" && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-sm text-orange-800">
                  <strong>Welcome Bonus:</strong> Get ₦500 off your first order of ₦2,000 or more!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
