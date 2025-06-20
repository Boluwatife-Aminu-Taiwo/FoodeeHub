"use client"

import { useState } from "react"
import SafeImage from "@/components/safe-image"
import { Bell, Package, DollarSign, Clock, CheckCircle, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface Order {
  id: string
  type: "single" | "group"
  customer: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: "new" | "accepted" | "preparing" | "ready" | "completed"
  orderTime: string
  groupInfo?: {
    groupId: string
    totalMembers: number
    hostName: string
  }
}

export default function VendorDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      type: "single",
      customer: "John Doe",
      items: [
        { name: "Refuel Max", quantity: 1, price: 3500 },
        { name: "Chicken Royale", quantity: 2, price: 2800 },
      ],
      total: 9100,
      status: "new",
      orderTime: "2:30 PM",
    },
    {
      id: "ORD-002",
      type: "group",
      customer: "Sarah Johnson",
      items: [
        { name: "Jollof Rice", quantity: 3, price: 2200 },
        { name: "Refuel Max", quantity: 1, price: 3500 },
      ],
      total: 10100,
      status: "accepted",
      orderTime: "2:15 PM",
      groupInfo: {
        groupId: "GO-ABC123",
        totalMembers: 4,
        hostName: "Sarah Johnson",
      },
    },
  ])

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "accepted":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-orange-100 text-orange-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const todayStats = {
    totalOrders: 23,
    revenue: 125000,
    avgOrderValue: 5435,
    groupOrders: 8,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={120} height={40} className="h-8 w-auto" />
              <Badge variant="secondary">Vendor Dashboard</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="online-status">Store Status</Label>
                <Switch id="online-status" checked={isOnline} onCheckedChange={setIsOnline} />
                <span className={`text-sm font-medium ${isOnline ? "text-green-600" : "text-red-600"}`}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </div>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Orders</p>
                  <p className="text-2xl font-bold">{todayStats.totalOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Today's Revenue</p>
                  <p className="text-2xl font-bold">₦{todayStats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                  <p className="text-2xl font-bold">₦{todayStats.avgOrderValue.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Group Orders</p>
                  <p className="text-2xl font-bold">{todayStats.groupOrders}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger value="active">Active Orders</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Orders</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {orders
                  .filter((order) => order.status !== "completed")
                  .map((order) => (
                    <Card key={order.id} className="border-l-4 border-l-orange-500">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                              {order.type === "group" && <Badge variant="secondary">Group Order</Badge>}
                            </div>
                            <p className="text-gray-600">Customer: {order.customer}</p>
                            <p className="text-sm text-gray-500">Ordered at {order.orderTime}</p>
                            {order.groupInfo && (
                              <p className="text-sm text-purple-600">
                                Group: {order.groupInfo.groupId} • {order.groupInfo.totalMembers} members • Host:{" "}
                                {order.groupInfo.hostName}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">₦{order.total.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Items:</h4>
                          <div className="space-y-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.quantity}x {item.name}
                                </span>
                                <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          {order.status === "new" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => updateOrderStatus(order.id, "accepted")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateOrderStatus(order.id, "completed")}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}

                          {order.status === "accepted" && (
                            <Button
                              size="sm"
                              className="bg-orange-600 hover:bg-orange-700"
                              onClick={() => updateOrderStatus(order.id, "preparing")}
                            >
                              Start Preparing
                            </Button>
                          )}

                          {order.status === "preparing" && (
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                              onClick={() => updateOrderStatus(order.id, "ready")}
                            >
                              Mark Ready
                            </Button>
                          )}

                          {order.status === "ready" && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateOrderStatus(order.id, "completed")}
                            >
                              Mark Completed
                            </Button>
                          )}

                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </TabsContent>

              <TabsContent value="completed">
                <p className="text-center text-gray-500 py-8">No completed orders to show</p>
              </TabsContent>

              <TabsContent value="all">
                <p className="text-center text-gray-500 py-8">All orders view</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
