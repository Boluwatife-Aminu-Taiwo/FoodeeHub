"use client"

import { useState, useEffect } from "react"
import { BarChart, Users, Store, DollarSign, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StatsData {
  totalOrders: number
  totalRevenue: number
  activeVendors: number
  totalUsers: number
  groupOrders: number
  avgOrderValue: number
  trends: {
    orders: number
    revenue: number
    vendors: number
    users: number
  }
}

interface StatsDashboardProps {
  onRefresh?: () => void
}

export function StatsDashboard({ onRefresh }: StatsDashboardProps) {
  const [stats, setStats] = useState<StatsData>({
    totalOrders: 1247,
    totalRevenue: 2850000,
    activeVendors: 156,
    totalUsers: 8934,
    groupOrders: 342,
    avgOrderValue: 4250,
    trends: {
      orders: 12.5,
      revenue: 8.3,
      vendors: 5.2,
      users: 15.7,
    },
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update stats with slight variations
      setStats((prev) => ({
        ...prev,
        totalOrders: prev.totalOrders + Math.floor(Math.random() * 10),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 50000),
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
      }))

      setLastUpdated(new Date())
      onRefresh?.()
    } finally {
      setIsRefreshing(false)
    }
  }

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: BarChart,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: stats.trends.orders,
    },
    {
      title: "Revenue",
      value: `₦${(stats.totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: stats.trends.revenue,
    },
    {
      title: "Active Vendors",
      value: stats.activeVendors.toString(),
      icon: Store,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: stats.trends.vendors,
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: stats.trends.users,
    },
    {
      title: "Group Orders",
      value: stats.groupOrders.toString(),
      icon: Users,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      trend: 18.2,
    },
    {
      title: "Avg Order Value",
      value: `₦${stats.avgOrderValue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-teal-600",
      bgColor: "bg-teal-50",
      trend: 6.8,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-sm text-gray-600">Last updated: {lastUpdated.toLocaleTimeString()}</p>
        </div>
        <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div
                  className={`p-3 rounded-lg ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <Badge
                    className={`text-xs ${stat.trend > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {stat.trend > 0 ? "+" : ""}
                    {stat.trend}%
                  </Badge>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
