"use client"

import { useState } from "react"
import SafeImage from "@/components/safe-image"
import { BarChart, Users, Store, DollarSign, TrendingUp, MapPin, Settings, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const stats = {
    totalOrders: 1247,
    totalRevenue: 2850000,
    activeVendors: 156,
    totalUsers: 8934,
    groupOrders: 342,
    avgOrderValue: 4250,
  }

  const recentOrders = [
    {
      id: "ORD-1001",
      type: "Group",
      customer: "Sarah Johnson",
      vendors: ["Chicken Republic", "Cold Stone"],
      total: 12500,
      status: "Completed",
      members: 4,
    },
    {
      id: "ORD-1002",
      type: "Single",
      customer: "Mike Chen",
      vendors: ["Dominos Pizza"],
      total: 5600,
      status: "In Progress",
      members: 1,
    },
    {
      id: "ORD-1003",
      type: "Group",
      customer: "Tunde Adebayo",
      vendors: ["Mr. Biggs", "Yogurt Factory"],
      total: 18900,
      status: "Completed",
      members: 6,
    },
  ]

  const vendors = [
    {
      id: 1,
      name: "Chicken Republic",
      category: "Fast Food",
      location: "Victoria Island",
      status: "Active",
      orders: 89,
      revenue: 245000,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "Ice Cream",
      location: "Victoria Island",
      status: "Active",
      orders: 67,
      revenue: 156000,
      rating: 4.3,
    },
    {
      id: 3,
      name: "Dominos Pizza",
      category: "Pizza",
      location: "Lekki",
      status: "Pending",
      orders: 0,
      revenue: 0,
      rating: 0,
    },
  ]

  const categoryPairings = [
    { primary: "Fast Food", secondary: "Ice Cream", orders: 234, enabled: true },
    { primary: "Pizza", secondary: "Dessert", orders: 156, enabled: true },
    { primary: "Local Cuisine", secondary: "Smoothie", orders: 89, enabled: true },
    { primary: "Groceries", secondary: "Groceries", orders: 0, enabled: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={120} height={40} className="h-8 w-auto" />
              <Badge className="bg-red-100 text-red-800">Admin Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                  <p className="text-2xl font-bold">{stats.activeVendors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-indigo-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Group Orders</p>
                  <p className="text-2xl font-bold">{stats.groupOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-teal-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Order</p>
                  <p className="text-2xl font-bold">₦{stats.avgOrderValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Vendors</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <Badge variant={order.type === "Group" ? "default" : "secondary"}>{order.type}</Badge>
                        </TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.vendors.join(", ")}</TableCell>
                        <TableCell>{order.members}</TableCell>
                        <TableCell>₦{order.total.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {vendor.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              vendor.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {vendor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{vendor.orders}</TableCell>
                        <TableCell>₦{vendor.revenue.toLocaleString()}</TableCell>
                        <TableCell>{vendor.rating > 0 ? vendor.rating : "N/A"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {vendor.status === "Pending" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                Approve
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">User management interface coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Category Pairing Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Primary Category</TableHead>
                      <TableHead>Secondary Category</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryPairings.map((pairing, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{pairing.primary}</TableCell>
                        <TableCell>{pairing.secondary}</TableCell>
                        <TableCell>{pairing.orders}</TableCell>
                        <TableCell>
                          <Badge
                            className={pairing.enabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                          >
                            {pairing.enabled ? "Enabled" : "Disabled"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            {pairing.enabled ? "Disable" : "Enable"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Analytics charts and insights coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
