"use client"
import { Star, Clock, MapPin, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { AnimatedButton } from "./animated-button"
import { Badge } from "./badge"
import { GlassCard } from "./glass-card"

interface VendorCardProps {
  vendor: {
    id: number
    name: string
    category: string
    rating: number
    description: string
    deliveryTime: string
    deliveryFee: number
    totalOrders: number
    distance?: number
    isFeatured: boolean
    image: string
    pairableWith?: string
  }
  isCompact?: boolean
}

export function VendorCard({ vendor, isCompact = false }: VendorCardProps) {
  return (
    <GlassCard className="group overflow-hidden" hover glow>
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <SafeImage
          src={vendor.image}
          alt={vendor.name}
          width={400}
          height={isCompact ? 150 : 200}
          className={cn(
            "w-full object-cover transition-all duration-700",
            "group-hover:scale-110 group-hover:brightness-110",
            isCompact ? "h-32" : "h-48",
          )}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Floating Badges */}
        {vendor.isFeatured && (
          <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
            Featured
          </Badge>
        )}

        {vendor.pairableWith && (
          <Badge className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg text-xs">
            Pairs with {vendor.pairableWith}
          </Badge>
        )}

        {/* Distance Badge */}
        {vendor.distance && (
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center text-sm bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white">
              <MapPin className="h-3 w-3 mr-1" />
              {vendor.distance < 1000 ? `${vendor.distance}m` : `${(vendor.distance / 1000).toFixed(1)}km`}
            </div>
          </div>
        )}

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      {/* Content */}
      <div className={cn("p-6 backdrop-blur-sm", isCompact && "p-4")}>
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <h3
            className={cn(
              "font-bold group-hover:text-orange-600 transition-colors duration-300",
              isCompact ? "text-lg" : "text-xl",
            )}
          >
            {vendor.name}
          </h3>
          <div className="flex items-center bg-yellow-50/80 backdrop-blur-sm px-2 py-1 rounded-lg border border-yellow-200/50">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="ml-1 text-sm font-semibold text-yellow-700">{vendor.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className={cn("text-gray-600 mb-3 line-clamp-2", isCompact ? "text-sm" : "")}>{vendor.description}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="bg-gray-100/80 text-gray-700 backdrop-blur-sm">
            {vendor.category.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </Badge>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="h-4 w-4 mr-1" />
            {vendor.deliveryTime}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span className="flex items-center">₦{vendor.deliveryFee} delivery</span>
          <span className="flex items-center">{vendor.totalOrders.toLocaleString()}+ orders</span>
        </div>

        {/* Action Button */}
        <AnimatedButton
          variant="primary"
          size={isCompact ? "sm" : "md"}
          className="w-full"
          icon={<ArrowRight className="h-4 w-4" />}
          asChild
        >
          <Link href={`/vendor/${vendor.id}`}>View Menu</Link>
        </AnimatedButton>
      </div>
    </GlassCard>
  )
}
