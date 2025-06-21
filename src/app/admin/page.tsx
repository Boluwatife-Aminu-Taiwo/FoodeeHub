"use client"

import { useState } from "react"
import SafeImage from "@/components/safe-image"
import { Bell, Settings, Filter, Search, Download, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StatsDashboard } from "@/components/admin/stats-dashboard"
import { VendorApprovalCard } from "@/components/admin/vendor-approval-card"
import { FeaturedVendorManager } from "@/components/admin/featured-vendor-manager"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 7,
      name: "New Pizza Place",
      email: "contact@newpizza.com",
      phone: "+2348012345699",
      category: "Pizza",
      description: "Authentic Italian pizza with fresh ingredients",
      address: "Surulere, Lagos",
      appliedDate: "Jan 15, 2024",
      documents: ["business_license.pdf", "food_permit.pdf"],
    },
    {
      id: 8,
      name: "Healthy Bites",
      email: "info@healthybites.com",
      phone: "+2348012345700",
      category: "Healthy Food",
      description: "Fresh salads and healthy meals for conscious eaters",
      address: "Yaba, Lagos",
      appliedDate: "Jan 14, 2024",
      documents: ["business_license.pdf", "health_certificate.pdf"],
    },
  ])

  const [featuredVendors, setFeaturedVendors] = useState([
    {
      id: 1,
      name: "Chicken Republic",
      category: "Fast Food",
      featuredOrder: 1,
      isFeatured: true,
      revenue: 245000,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "Ice Cream",
      featuredOrder: 2,
      isFeatured: true,
      revenue: 156000,
      rating: 4.3,
    },
    {
      id: 3,
      name: "Dominos Pizza",
      category: "Pizza",
      featuredOrder: 3,
      isFeatured: true,
      revenue: 189000,
      rating: 4.2,
    },
    {
      id: 4,
      name: "Mr. Biggs",
      category: "Local Cuisine",
      featuredOrder: 0,
      isFeatured: false,
      revenue: 167000,
      rating: 4.1,
    },
    {
      id: 5,
      name: "Yogurt Factory",
      category: "Dessert",
      featuredOrder: 0,
      isFeatured: false,
      revenue: 98000,
      rating: 4.0,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const handleVendorApproval = async (vendorId: number, reason?: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPendingVendors((prev) => prev.filter((v) => v.id !== vendorId))

    toast({
      title: "Vendor Approved",
      description: "Vendor has been approved and notified.",
    })
  }

  const handleVendorRejection = async (vendorId: number, reason: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPendingVendors((prev) => prev.filter((v) => v.id !== vendorId))

    toast({
      title: "Vendor Rejected",
      description: "Vendor has been rejected and notified.",
    })
  }

  const handleFeaturedUpdate = async (vendorId: number, isFeatured: boolean, order?: number) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setFeaturedVendors((prev) =>
      prev.map((vendor) => (vendor.id === vendorId ? { ...vendor, isFeatured, featuredOrder: order || 0 } : vendor)),
    )
  }

  const filteredPendingVendors = pendingVendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || vendor.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={120} height={40} className="h-8 w-auto" />
              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 shadow-lg">
                Admin Dashboard
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <StatsDashboard />

        {/* Main Content Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="vendor-management" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm">
              <TabsTrigger
                value="vendor-management"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Vendor Management
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Orders
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Users
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Analytics
              </TabsTrigger>
              <TabsTrigger
                value="settings"
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vendor-management" className="space-y-6 mt-6">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-lg shadow-sm p-4 border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search vendors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="pizza">Pizza</SelectItem>
                      <SelectItem value="healthy food">Healthy Food</SelectItem>
                      <SelectItem value="fast food">Fast Food</SelectItem>
                      <SelectItem value="ice cream">Ice Cream</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Pending Approvals */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Pending Approvals ({filteredPendingVendors.length})
                    </h3>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {filteredPendingVendors.map((vendor) => (
                      <VendorApprovalCard
                        key={vendor.id}
                        vendor={vendor}
                        onApprove={handleVendorApproval}
                        onReject={handleVendorRejection}
                      />
                    ))}

                    {filteredPendingVendors.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-200">
                        <div className="text-gray-400 mb-4">
                          <Plus className="h-12 w-12 mx-auto" />
                        </div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">No pending approvals</h4>
                        <p className="text-gray-500">All vendor applications have been processed</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Featured Vendors Management */}
                <div>
                  <FeaturedVendorManager vendors={featuredVendors} onUpdateFeatured={handleFeaturedUpdate} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Order Management</h3>
                <p className="text-gray-500">Advanced order management interface coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-500">User management interface coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500">Advanced analytics and reporting coming soon</p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 mt-6">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-500">System configuration interface coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
