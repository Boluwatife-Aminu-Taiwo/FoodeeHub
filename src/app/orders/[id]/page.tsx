"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Star, CheckCircle, Truck, ChefHat, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  customizations?: any
  vendor: string
}

interface OrderStatus {
  status: "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered"
  timestamp: string
  message: string
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Mock order data - in real app, this would come from API
  useEffect(() => {
    const mockOrder = {
      id: params.id,
      status: "preparing",
      items: [
        {
          id: 1,
          name: "Refuel Max",
          quantity: 2,
          price: 3500,
          vendor: "Chicken Republic",
          customizations: { size: "large", addons: ["Extra Sauce"] },
        },
        {
          id: 101,
          name: "Vanilla Ice Cream",
          quantity: 1,
          price: 1500,
          vendor: "Cold Stone Creamery",
        },
      ],
      total: 8500,
      deliveryFee: 800,
      discount: 850,
      deliveryAddress: {
        street: "15 Admiralty Way",
        area: "Lekki Phase 1",
        city: "Lagos",
        phone: "+234 901 234 5678",
      },
      estimatedDelivery: "6:45 PM",
      placedAt: "2024-01-15T17:15:00Z",
      driver: {
        name: "Ahmed Musa",
        phone: "+234 802 345 6789",
        rating: 4.8,
        vehicle: "Honda CG 125 - ABC 123 XY",
      },
      timeline: [
        { status: "confirmed", timestamp: "2024-01-15T17:15:00Z", message: "Order confirmed" },
        { status: "preparing", timestamp: "2024-01-15T17:20:00Z", message: "Restaurant is preparing your food" },
      ],
    }

    setTimeout(() => {
      setOrder(mockOrder)
      setLoading(false)
    }, 1000)
  }, [params.id])

  const getStatusProgress = (status: string) => {
    const statusMap = {
      confirmed: 20,
      preparing: 40,
      ready: 60,
      out_for_delivery: 80,
      delivered: 100,
    }
    return statusMap[status as keyof typeof statusMap] || 0
  }

  const getStatusIcon = (status: string) => {
    const iconMap = {
      confirmed: CheckCircle,
      preparing: ChefHat,
      ready: Package,
      out_for_delivery: Truck,
      delivered: CheckCircle,
    }
    const Icon = iconMap[status as keyof typeof iconMap] || CheckCircle
    return <Icon className="h-5 w-5" />
  }

  const getStatusColor = (status: string) => {
    const colorMap = {
      confirmed: "text-blue-600",
      preparing: "text-orange-600",
      ready: "text-purple-600",
      out_for_delivery: "text-green-600",
      delivered: "text-green-600",
    }
    return colorMap[status as keyof typeof colorMap] || "text-gray-600"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <h1 className="text-xl font-bold mb-2">Order Not Found</h1>
            <p className="text-gray-600 mb-4">We couldn't find an order with ID: {params.id}</p>
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={100} height={32} className="h-6 w-auto" />
            </div>
            <h1 className="text-lg font-semibold">Order #{order.id}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Status */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <div className={`mr-3 ${getStatusColor(order.status)}`}>{getStatusIcon(order.status)}</div>
                <span className="capitalize">{order.status.replace("_", " ")}</span>
              </CardTitle>
              <Badge variant="secondary">ETA: {order.estimatedDelivery}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={getStatusProgress(order.status)} className="h-2" />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                {[
                  { key: "confirmed", label: "Confirmed" },
                  { key: "preparing", label: "Preparing" },
                  { key: "ready", label: "Ready" },
                  { key: "out_for_delivery", label: "On the way" },
                  { key: "delivered", label: "Delivered" },
                ].map((step, index) => (
                  <div key={step.key} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                        getStatusProgress(order.status) >= (index + 1) * 20
                          ? "bg-orange-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {getStatusProgress(order.status) >= (index + 1) * 20 ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className="text-xs font-medium">{step.label}</span>
                  </div>
                ))}
              </div>

              {order.status === "preparing" && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <p className="text-orange-700 font-medium">Your food is being prepared</p>
                  <p className="text-orange-600 text-sm">
                    The restaurant is working on your order. Estimated prep time: 15-20 minutes
                  </p>
                </div>
              )}

              {order.status === "out_for_delivery" && order.driver && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-700">Your driver is on the way!</p>
                      <p className="text-green-600 text-sm">
                        {order.driver.name} • {order.driver.vehicle}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-green-600 ml-1">{order.driver.rating}</span>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <a href={`tel:${order.driver.phone}`}>
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: OrderItem) => (
                    <div key={`${item.id}-${item.vendor}`} className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-orange-600">{item.quantity}x</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.vendor}</p>
                        {item.customizations && (
                          <div className="text-xs text-gray-400 mt-1">
                            {item.customizations.size && `Size: ${item.customizations.size}`}
                            {item.customizations.addons && ` • Add-ons: ${item.customizations.addons.join(", ")}`}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.timeline.map((event: OrderStatus, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(event.status)} bg-current bg-opacity-10`}
                      >
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium capitalize">{event.status.replace("_", " ")}</p>
                        <p className="text-sm text-gray-600">{event.message}</p>
                        <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-medium">{order.deliveryAddress.street}</p>
                  <p className="text-gray-600">{order.deliveryAddress.area}</p>
                  <p className="text-gray-600">{order.deliveryAddress.city}</p>
                  <div className="flex items-center pt-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{order.deliveryAddress.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{(order.total - order.deliveryFee + order.discount).toLocaleString()}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₦{order.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee</span>
                    <span>₦{order.deliveryFee.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₦{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Order Again</Link>
              </Button>
              <Button variant="outline" className="w-full">
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
