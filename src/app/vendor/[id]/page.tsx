"use client"

import { useState, useEffect } from "react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import {
  ArrowLeft,
  Plus,
  Minus,
  ShoppingCart,
  Star,
  Clock,
  MapPin,
  Heart,
  Share2,
  Filter,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  vendor: string
  vendorId: string
  image: string
  customizations?: string[]
}

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
  rating?: number
  preparationTime?: string
  spicyLevel?: number
  tags?: string[]
}

export default function VendorPage({ params }: { params: { id: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeVendor, setActiveVendor] = useState<"primary" | "secondary">("primary")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [spicyFilter, setSpicyFilter] = useState("any")
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([])
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  // Mock vendor data - in real app, this would come from API
  const vendor = {
    id: params.id,
    name: "Chicken Republic",
    category: "Fast Food",
    rating: 4.5,
    reviewCount: 1247,
    deliveryTime: "25-35 min",
    deliveryFee: 500,
    minimumOrder: 2000,
    image: "/placeholder.svg?height=200&width=400",
    description: "Delicious fried chicken and local favorites served fresh daily",
    address: "23 Ozumba Mbadiwe Avenue, Victoria Island, Lagos",
    phone: "+234 901 234 5678",
    openingHours: "8:00 AM - 11:00 PM",
    tags: ["Fast Food", "Chicken", "Nigerian", "Halal"],
    isOpen: true,
    featured: true,
  }

  const pairableVendor = {
    id: "2",
    name: "Cold Stone Creamery",
    category: "Ice Cream",
    rating: 4.3,
    deliveryTime: "20-30 min",
    distance: "250m away",
    image: "/placeholder.svg?height=150&width=200",
    deliveryFee: 300,
  }

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Refuel Max",
      description: "Crispy fried chicken with jollof rice, plantain, and coleslaw",
      price: 3500,
      image: "/placeholder.svg?height=100&width=100",
      category: "Meals",
      available: true,
      rating: 4.6,
      preparationTime: "15-20 min",
      spicyLevel: 2,
      tags: ["Popular", "Spicy"],
    },
    {
      id: 2,
      name: "Chicken Royale",
      description: "Spicy fried chicken with choice of sides",
      price: 2800,
      image: "/placeholder.svg?height=100&width=100",
      category: "Meals",
      available: true,
      rating: 4.4,
      preparationTime: "12-15 min",
      spicyLevel: 3,
      tags: ["Spicy", "Best Seller"],
    },
    {
      id: 3,
      name: "Jollof Rice",
      description: "Nigerian jollof rice with tender chicken pieces",
      price: 2200,
      image: "/placeholder.svg?height=100&width=100",
      category: "Rice",
      available: true,
      rating: 4.3,
      preparationTime: "10-12 min",
      spicyLevel: 1,
      tags: ["Vegetarian Option"],
    },
    {
      id: 4,
      name: "Chicken Wings (6pcs)",
      description: "Crispy chicken wings with your choice of sauce",
      price: 1800,
      image: "/placeholder.svg?height=100&width=100",
      category: "Sides",
      available: true,
      rating: 4.5,
      preparationTime: "8-10 min",
      spicyLevel: 2,
      tags: ["Shareable"],
    },
    {
      id: 5,
      name: "Meat Pie",
      description: "Flaky pastry filled with seasoned minced meat",
      price: 800,
      image: "/placeholder.svg?height=100&width=100",
      category: "Snacks",
      available: false,
      rating: 4.2,
      preparationTime: "5 min",
      spicyLevel: 0,
      tags: ["Quick Bite"],
    },
  ]

  const secondaryMenuItems: MenuItem[] = [
    {
      id: 101,
      name: "Vanilla Ice Cream",
      description: "Premium vanilla ice cream with mix-ins",
      price: 1500,
      image: "/placeholder.svg?height=100&width=100",
      category: "Ice Cream",
      available: true,
      rating: 4.4,
      preparationTime: "3-5 min",
      tags: ["Cold", "Sweet"],
    },
    {
      id: 102,
      name: "Chocolate Sundae",
      description: "Rich chocolate sundae with whipped cream and toppings",
      price: 2000,
      image: "/placeholder.svg?height=100&width=100",
      category: "Sundae",
      available: true,
      rating: 4.6,
      preparationTime: "5-7 min",
      tags: ["Premium", "Sweet"],
    },
  ]

  const categories = ["all", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  const filteredMenuItems =
    selectedCategory === "all" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("foodeehub-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("foodeehub-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: MenuItem, vendorName: string, vendorId: string, customizations?: any) => {
    if (!item.available) {
      toast({
        title: "Item Unavailable",
        description: "This item is currently out of stock",
        variant: "destructive",
      })
      return
    }

    // Calculate additional price from customizations
    let additionalPrice = 0
    if (customizations?.size === "large") additionalPrice += 500
    if (customizations?.addons) {
      customizations.addons.forEach((addon: string) => {
        if (addon.includes("200")) additionalPrice += 200
        if (addon.includes("300")) additionalPrice += 300
        if (addon.includes("800")) additionalPrice += 800
      })
    }

    const finalPrice = item.price + additionalPrice

    setCart((prev) => {
      const customizationKey = JSON.stringify(customizations || {})
      const existing = prev.find(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.vendorId === vendorId &&
          JSON.stringify(cartItem.customizations || {}) === customizationKey,
      )

      if (existing) {
        const updated = prev.map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.vendorId === vendorId &&
          JSON.stringify(cartItem.customizations || {}) === customizationKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        )
        toast({
          title: "Added to Cart",
          description: `${item.name} quantity updated`,
        })
        return updated
      }

      const newItem = {
        ...item,
        price: finalPrice,
        quantity: 1,
        vendor: vendorName,
        vendorId,
        image: item.image,
        customizations,
      }

      toast({
        title: "Added to Cart",
        description: `${item.name} added to your cart`,
      })

      return [...prev, newItem]
    })
  }

  const updateQuantity = (id: number, vendorId: string, change: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id && item.vendorId === vendorId) {
            const newQuantity = item.quantity + change
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
          }
          return item
        })
        .filter((item) => item.quantity > 0)
    })
  }

  const removeFromCart = (id: number, vendorId: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.vendorId === vendorId)))
    toast({
      title: "Removed from Cart",
      description: "Item removed from your cart",
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalDeliveryFee = () => {
    const vendors = Array.from(new Set(cart.map((item) => item.vendorId)))
    return vendors.length > 0 ? vendor.deliveryFee + (vendors.length > 1 ? pairableVendor.deliveryFee : 0) : 0
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: vendor.name,
          text: `Check out ${vendor.name} on FoodeeHub!`,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link Copied",
          description: "Vendor link copied to clipboard",
        })
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Vendor link copied to clipboard",
      })
    }
  }

  const SpicyLevelIndicator = ({ level }: { level: number }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i <= level ? "bg-red-500" : "bg-gray-200"}`} />
        ))}
      </div>
    )
  }

  // Item Customization Modal
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [customizations, setCustomizations] = useState<Record<string, any>>({})

  const CustomizationModal = () => {
    if (!selectedItem) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Customize {selectedItem.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <SafeImage
              src={selectedItem.image}
              alt={selectedItem.name}
              width={200}
              height={150}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />

            <div className="space-y-4">
              {/* Size Options */}
              <div>
                <Label className="font-medium">Size</Label>
                <RadioGroup
                  value={customizations.size || "regular"}
                  onValueChange={(value) => setCustomizations((prev) => ({ ...prev, size: value }))}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">Regular (+₦0)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="large" id="large" />
                    <Label htmlFor="large">Large (+₦500)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Add-ons */}
              <div>
                <Label className="font-medium">Add-ons</Label>
                <div className="mt-2 space-y-2">
                  {["Extra Sauce (+₦200)", "Extra Cheese (+₦300)", "Extra Meat (+₦800)"].map((addon) => (
                    <div key={addon} className="flex items-center space-x-2">
                      <Checkbox
                        id={addon}
                        checked={customizations.addons?.includes(addon) || false}
                        onCheckedChange={(checked) => {
                          setCustomizations((prev) => ({
                            ...prev,
                            addons: checked
                              ? [...(prev.addons || []), addon]
                              : (prev.addons || []).filter((a :any) => a !== addon),
                          }))
                        }}
                      />
                      <Label htmlFor={addon} className="text-sm">
                        {addon}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <Label htmlFor="instructions" className="font-medium">
                  Special Instructions
                </Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests..."
                  value={customizations.instructions || ""}
                  onChange={(e) => setCustomizations((prev) => ({ ...prev, instructions: e.target.value }))}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setSelectedItem(null)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addToCart(selectedItem, vendor.name, vendor.id, customizations)
                  setSelectedItem(null)
                  setCustomizations({})
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
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

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => setIsWishlisted(!isWishlisted)}>
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
              </Button>

              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>

              <Button className="relative bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/checkout">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getCartItemCount()})
                  {getCartItemCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {getCartItemCount()}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Vendor Info */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative">
                <SafeImage
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  width={800}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  {vendor.featured && <Badge className="bg-orange-500 text-white">Featured</Badge>}
                  <Badge className={vendor.isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                    {vendor.isOpen ? "Open" : "Closed"}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">{vendor.name}</h1>
                    <p className="text-gray-600 mb-3">{vendor.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {vendor.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center ml-4">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{vendor.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({vendor.reviewCount})</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">{vendor.deliveryTime}</div>
                      <div className="text-xs">Delivery</div>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <div>
                      <div className="font-medium">₦{vendor.deliveryFee}</div>
                      <div className="text-xs">Delivery Fee</div>
                    </div>
                  </div>

                  <div className="text-gray-600">
                    <div className="font-medium">₦{vendor.minimumOrder.toLocaleString()}</div>
                    <div className="text-xs">Minimum Order</div>
                  </div>

                  <div className="text-gray-600">
                    <div className="font-medium">{vendor.openingHours}</div>
                    <div className="text-xs">Opening Hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pairable Vendor Suggestion */}
            <Card className="mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Perfect Pairing Nearby
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
                    <h3 className="font-semibold text-lg">{pairableVendor.name}</h3>
                    <p className="text-sm text-gray-600">{pairableVendor.category}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <span>{pairableVendor.deliveryTime}</span>
                      <span>•</span>
                      <span>{pairableVendor.distance}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current ml-1" />
                      <span>{pairableVendor.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">+₦{pairableVendor.deliveryFee} delivery</div>
                    <Button
                      variant="outline"
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                      onClick={() => setActiveVendor(activeVendor === "primary" ? "secondary" : "primary")}
                    >
                      {activeVendor === "secondary" ? "Switch Back" : "Add Dessert"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menu Filter */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Menu</h2>
              <div className="flex items-center space-x-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Items" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search menu items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              {/* Advanced Filters Panel */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Price Range</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
                        className="h-8"
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Spicy Level</Label>
                    <Select value={spicyFilter} onValueChange={setSpicyFilter}>
                      <SelectTrigger className="h-8 mt-1">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any Level</SelectItem>
                        <SelectItem value="0">No Spice</SelectItem>
                        <SelectItem value="1">Mild</SelectItem>
                        <SelectItem value="2">Medium</SelectItem>
                        <SelectItem value="3">Hot</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Dietary</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {["Vegetarian", "Halal", "Gluten-Free"].map((diet) => (
                        <Button
                          key={diet}
                          variant={dietaryFilters.includes(diet) ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            setDietaryFilters((prev) =>
                              prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet],
                            )
                          }}
                          className="h-6 text-xs"
                        >
                          {diet}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Availability</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <Checkbox
                        id="available-only"
                        checked={showAvailableOnly}
                        onCheckedChange={(checked) => {
                          if (typeof checked === "boolean") {
                            setShowAvailableOnly(checked)
                          }
                        }}
                      />
                      <Label htmlFor="available-only" className="text-sm">
                        Available only
                      </Label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Menu Tabs */}
            <Tabs value={activeVendor} onValueChange={(value) => setActiveVendor(value as "primary" | "secondary")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="primary" className="flex items-center space-x-2">
                  <span>{vendor.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {menuItems.length} items
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="secondary" className="flex items-center space-x-2">
                  <span>{pairableVendor.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {secondaryMenuItems.length} items
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="primary" className="space-y-4">
                {filteredMenuItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`transition-all duration-200 ${!item.available ? "opacity-60" : "hover:shadow-md"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <SafeImage
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg"
                          />
                          {!item.available && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium">Out of Stock</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center space-x-2">
                              {item.tags?.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <p className="font-bold text-xl text-orange-600">₦{item.price.toLocaleString()}</p>

                              {item.rating && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                                </div>
                              )}

                              {item.spicyLevel && item.spicyLevel > 0 && (
                                <div className="flex items-center space-x-1">
                                  <span className="text-xs text-gray-500">Spicy:</span>
                                  <SpicyLevelIndicator level={item.spicyLevel} />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {cart.find((cartItem) => cartItem.id === item.id && cartItem.vendorId === vendor.id) ? (
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, vendor.id, -1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="font-semibold min-w-[20px] text-center">
                                    {
                                      cart.find(
                                        (cartItem) => cartItem.id === item.id && cartItem.vendorId === vendor.id,
                                      )?.quantity
                                    }
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, vendor.id, 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                                  onClick={() => setSelectedItem(item)}
                                  disabled={!item.available}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add to Cart
                                </Button>
                              )}
                            </div>
                          </div>

                          {item.preparationTime && (
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Prep time: {item.preparationTime}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="secondary" className="space-y-4">
                {secondaryMenuItems.map((item) => (
                  <Card key={item.id} className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <SafeImage
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <div className="flex items-center space-x-2">
                              {item.tags?.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <p className="font-bold text-xl text-orange-600">₦{item.price.toLocaleString()}</p>

                              {item.rating && (
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="ml-1 text-sm font-medium">{item.rating}</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {cart.find(
                                (cartItem) => cartItem.id === item.id && cartItem.vendorId === pairableVendor.id,
                              ) ? (
                                <div className="flex items-center space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, pairableVendor.id, -1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="font-semibold min-w-[20px] text-center">
                                    {
                                      cart.find(
                                        (cartItem) =>
                                          cartItem.id === item.id && cartItem.vendorId === pairableVendor.id,
                                      )?.quantity
                                    }
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateQuantity(item.id, pairableVendor.id, 1)}
                                    className="h-8 w-8 p-0"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              ) : (
                                <Button
                                  size="sm"
                                  className="bg-orange-500 hover:bg-orange-600"
                                  onClick={() => setSelectedItem(item)}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add to Cart
                                </Button>
                              )}
                            </div>
                          </div>

                          {item.preparationTime && (
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>Prep time: {item.preparationTime}</span>
                            </div>
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
                <CardTitle className="flex items-center justify-between">
                  <span>Your Order</span>
                  {cart.length > 0 && <Badge variant="secondary">{getCartItemCount()} items</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add items from the menu to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="max-h-64 overflow-y-auto space-y-3">
                      {cart.map((item) => (
                        <div
                          key={`${item.id}-${item.vendorId}`}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <SafeImage src={item.image} alt={item.name} width={40} height={40} className="rounded" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.vendor}</p>
                            <p className="text-sm font-semibold text-orange-600">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.vendorId, -1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium min-w-[20px] text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.vendorId, 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>₦{getCartTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Delivery Fee</span>
                        <span>₦{getTotalDeliveryFee().toLocaleString()}</span>
                      </div>
                      {getCartTotal() < vendor.minimumOrder && (
                        <div className="flex justify-between text-sm text-orange-600">
                          <span>Minimum order</span>
                          <span>₦{vendor.minimumOrder.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>₦{(getCartTotal() + getTotalDeliveryFee()).toLocaleString()}</span>
                      </div>
                    </div>

                    {getCartTotal() < vendor.minimumOrder && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="text-sm text-orange-700">
                          Add ₦{(vendor.minimumOrder - getCartTotal()).toLocaleString()} more to reach minimum order
                        </p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50"
                        asChild
                        disabled={getCartTotal() < vendor.minimumOrder}
                      >
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
      {selectedItem && <CustomizationModal />}
    </div>
  )
}
