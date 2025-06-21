"use client"

import { useState } from "react"
import { Star, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

interface FeaturedVendor {
  id: number
  name: string
  category: string
  featuredOrder: number
  isFeatured: boolean
  revenue: number
  rating: number
}

interface FeaturedVendorManagerProps {
  vendors: FeaturedVendor[]
  onUpdateFeatured: (vendorId: number, isFeatured: boolean, order?: number) => void
}

export function FeaturedVendorManager({ vendors, onUpdateFeatured }: FeaturedVendorManagerProps) {
  const [localVendors, setLocalVendors] = useState(vendors)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  const featuredVendors = localVendors.filter((v) => v.isFeatured).sort((a, b) => a.featuredOrder - b.featuredOrder)
  const nonFeaturedVendors = localVendors.filter((v) => !v.isFeatured)

  const handleToggleFeatured = async (vendorId: number, isFeatured: boolean) => {
    setIsUpdating(vendorId)
    try {
      let newOrder = 0
      if (isFeatured) {
        newOrder = Math.max(...featuredVendors.map((v) => v.featuredOrder), 0) + 1
      }

      await onUpdateFeatured(vendorId, isFeatured, newOrder)

      setLocalVendors((prev) =>
        prev.map((vendor) =>
          vendor.id === vendorId ? { ...vendor, isFeatured, featuredOrder: isFeatured ? newOrder : 0 } : vendor,
        ),
      )

      toast({
        title: isFeatured ? "Vendor Featured" : "Vendor Unfeatured",
        description: `${localVendors.find((v) => v.id === vendorId)?.name} has been ${isFeatured ? "added to" : "removed from"} featured vendors.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  const moveVendor = async (vendorId: number, direction: "up" | "down") => {
    const currentVendor = featuredVendors.find((v) => v.id === vendorId)
    if (!currentVendor) return

    const currentIndex = featuredVendors.findIndex((v) => v.id === vendorId)
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= featuredVendors.length) return

    const targetVendor = featuredVendors[targetIndex]

    setIsUpdating(vendorId)
    try {
      // Swap orders
      await onUpdateFeatured(currentVendor.id, true, targetVendor.featuredOrder)
      await onUpdateFeatured(targetVendor.id, true, currentVendor.featuredOrder)

      setLocalVendors((prev) =>
        prev.map((vendor) => {
          if (vendor.id === currentVendor.id) {
            return { ...vendor, featuredOrder: targetVendor.featuredOrder }
          }
          if (vendor.id === targetVendor.id) {
            return { ...vendor, featuredOrder: currentVendor.featuredOrder }
          }
          return vendor
        }),
      )

      toast({
        title: "Order Updated",
        description: `Featured vendor order has been updated.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Featured Vendors */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-orange-500" />
            Featured Vendors ({featuredVendors.length}/6)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {featuredVendors.map((vendor, index) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 border-orange-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 text-white rounded-full text-sm font-bold">
                    {vendor.featuredOrder}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                    <p className="text-sm text-gray-600">
                      {vendor.category} • ₦{vendor.revenue.toLocaleString()} revenue
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-orange-100 text-orange-800">Featured</Badge>
                  <div className="flex flex-col space-y-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveVendor(vendor.id, "up")}
                      disabled={index === 0 || isUpdating === vendor.id}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => moveVendor(vendor.id, "down")}
                      disabled={index === featuredVendors.length - 1 || isUpdating === vendor.id}
                      className="h-6 w-6 p-0"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                  <Switch
                    checked={true}
                    onCheckedChange={() => handleToggleFeatured(vendor.id, false)}
                    disabled={isUpdating === vendor.id}
                  />
                </div>
              </div>
            ))}
            {featuredVendors.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Star className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No featured vendors yet</p>
                <p className="text-sm">Toggle vendors below to feature them</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Available Vendors */}
      <Card>
        <CardHeader>
          <CardTitle>Available Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nonFeaturedVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                  <p className="text-sm text-gray-600">
                    {vendor.category} • ⭐ {vendor.rating} • ₦{vendor.revenue.toLocaleString()} revenue
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Not Featured</Badge>
                  <Switch
                    checked={false}
                    onCheckedChange={() => handleToggleFeatured(vendor.id, true)}
                    disabled={isUpdating === vendor.id || featuredVendors.length >= 6}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
