"use client"

import { useState } from "react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, Plus, Minus, ShoppingCart, Star, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  vendor: string
}

export default function VendorPage({ params }: { params: { id: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeVendor, setActiveVendor] = useState<"primary" | "secondary">("primary")

  // Mock vendor data
  const vendor = {
    id: params.id,
    name: "Chicken Republic",
    category: "Fast Food",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 500,
    image: "/chickenrep.jpeg",
    description: "Delicious fried chicken and local favorites",
  }

  const pairableVendor = {
    id: "2",
    name: "Cold Stone Creamery",
    category: "Ice Cream",
    rating: 4.3,
    deliveryTime: "20-30 min",
    distance: "250m away",
    image: "/cold-stone.jpeg",
  }

  const menuItems = [
    {
      id: 1,
      name: "Refuel Max",
      description: "Chicken, rice, plantain, coleslaw",
      price: 3500,
      image: "/chickenrep.jpeg",
      category: "Meals",
    },
    {
      id: 2,
      name: "Chicken Royale",
      description: "Spicy fried chicken with sides",
      price: 2800,
      image: "/chickenrep.jpeg",
      category: "Meals",
    },
    {
      id: 3,
      name: "Jollof Rice",
      description: "Nigerian jollof rice with chicken",
      price: 2200,
      image: "/chickenrep.jpeg",
      category: "Rice",
    },
  ]

  const secondaryMenuItems = [
    {
      id: 101,
      name: "Vanilla Ice Cream",
      description: "Premium vanilla ice cream",
      price: 1500,
      image: "/cold-stone.jpeg",
      category: "Ice Cream",
    },
    {
      id: 102,
      name: "Chocolate Sundae",
      description: "Rich chocolate sundae with toppings",
      price: 2000,
      image: "/cold-stone.jpeg",
      category: "Sundae",
    },
  ]

  const addToCart = (item: any, vendorName: string) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prev.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      }
      return [...prev, { ...item, quantity: 1, vendor: vendorName }]
    })
  }

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
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
              <SafeImage src="/FoodeeHub_Logo-removebg.png" alt="FoodeeHub" width={100} height={32} className="h-10 w-auto" />
            </div>
            <Button className="relative bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({getCartItemCount()})
                {getCartItemCount() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{getCartItemCount()}</Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Vendor Info */}
            <Card className="mb-6">
              <div className="relative">
                <SafeImage
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  width={800}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{vendor.name}</h1>
                    <p className="text-gray-600">{vendor.description}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{vendor.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {vendor.deliveryTime}
                  </div>
                  <div>₦{vendor.deliveryFee} delivery fee</div>
                  <Badge variant="secondary">{vendor.category}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Pairable Vendor Suggestion */}
            <Card className="mb-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Nearby Pairable Vendor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <SafeImage
                    src={pairableVendor.image || "/placeholder.svg"}
                    alt={pairableVendor.name}
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{pairableVendor.name}</h3>
                    <p className="text-sm text-gray-600">{pairableVendor.category}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{pairableVendor.deliveryTime}</span>
                      <span>•</span>
                      <span>{pairableVendor.distance}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current ml-1" />
                      <span>{pairableVendor.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    onClick={() => setActiveVendor(activeVendor === "primary" ? "secondary" : "primary")}
                  >
                    Add Items
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Menu Tabs */}
            <Tabs value={activeVendor} onValueChange={(value) => setActiveVendor(value as "primary" | "secondary")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="primary">{vendor.name}</TabsTrigger>
                <TabsTrigger value="secondary">{pairableVendor.name}</TabsTrigger>
              </TabsList>

              <TabsContent value="primary" className="space-y-4">
                {menuItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <SafeImage
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="font-bold text-lg">₦{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {cart.find((cartItem) => cartItem.id === item.id) ? (
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold">
                                {cart.find((cartItem) => cartItem.id === item.id)?.quantity}
                              </span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => addToCart(item, vendor.name)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="secondary" className="space-y-4">
                {secondaryMenuItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <SafeImage
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                          <p className="font-bold text-lg">₦{item.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {cart.find((cartItem) => cartItem.id === item.id) ? (
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="font-semibold">
                                {cart.find((cartItem) => cartItem.id === item.id)?.quantity}
                              </span>
                              <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="bg-orange-500 hover:bg-orange-600"
                              onClick={() => addToCart(item, pairableVendor.name)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.vendor}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span>{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₦{getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Delivery Fee</span>
                        <span>₦{vendor.deliveryFee.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>₦{(getCartTotal() + vendor.deliveryFee).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                        <Link href="/checkout">Proceed to Checkout</Link>
                      </Button>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/group-order/create">Start Group Order</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
