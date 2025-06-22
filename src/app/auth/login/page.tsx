"use client"
import { useState } from "react"
import type React from "react"

import { useSearchParams } from "next/navigation"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, User, Store, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

type UserRole = "customer" | "vendor"

export default function LoginPage() {
  const searchParams = useSearchParams()
  const initialRole = (searchParams.get("role") as UserRole) || "customer"

  const [activeRole, setActiveRole] = useState<UserRole>(initialRole)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect based on role
    if (activeRole === "vendor") {
      window.location.href = "/vendor/dashboard"
    } else {
      window.location.href = "/vendors"
    }

    setIsLoading(false)
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider} as ${activeRole}`)
    // Implement social login logic
  }

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
                  Welcome Back!
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Continue your food journey with multi-vendor ordering and group dining experiences.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Order from multiple vendors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Start group orders with friends</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Smart vendor pairing suggestions</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Grow Your Business
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Access your vendor dashboard and manage your restaurant with powerful tools.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Manage orders and inventory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Benefit from group orders</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">✓</span>
                    </div>
                    <span className="text-gray-700">Smart pairing with nearby vendors</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Login Form */}
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
                <CardTitle className="text-2xl font-bold text-gray-900">Sign In</CardTitle>
                <p className="text-gray-600 mt-2">Choose your account type to continue</p>
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
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customer-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="customer-email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
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
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-customer"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="remember-customer" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link href="/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In as Customer"}
                    </Button>
                  </form>

                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" onClick={() => handleSocialLogin("google")} className="h-12">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button variant="outline" onClick={() => handleSocialLogin("facebook")} className="h-12">
                        <svg className="h-4 w-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Facebook
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <Link
                        href="/auth/signup?role=customer"
                        className="text-orange-600 hover:text-orange-700 font-semibold"
                      >
                        Sign up as Customer
                      </Link>
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="vendor" className="space-y-6 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vendor-email">Business Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="vendor-email"
                          type="email"
                          placeholder="Enter your business email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
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
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember-vendor"
                          checked={formData.rememberMe}
                          onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                        />
                        <Label htmlFor="remember-vendor" className="text-sm">
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/auth/forgot-password?role=vendor"
                        className="text-sm text-green-600 hover:text-green-700"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In as Vendor"}
                    </Button>
                  </form>

                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" onClick={() => handleSocialLogin("google-business")} className="h-12">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google Business
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      New to FoodeeHub?{" "}
                      <Link
                        href="/auth/signup?role=vendor"
                        className="text-green-600 hover:text-green-700 font-semibold"
                      >
                        Register your Restaurant
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
                <span>Secure Login</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>256-bit SSL</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
            </div>

            {activeRole === "vendor" && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  <strong>New Vendor?</strong> Get approved in 24 hours and start earning with 0% commission for your
                  first month!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
