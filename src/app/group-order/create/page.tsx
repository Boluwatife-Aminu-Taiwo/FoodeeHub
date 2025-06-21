"use client"

import { useState, useEffect } from "react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, Users, Share2, CheckCircle, AlertTriangle, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CountdownTimer } from "@/components/group-order/countdown-timer"
import { MemberCard } from "@/components/group-order/member-card"
import { ShareModal } from "@/components/group-order/share-modal"
import { toast } from "@/components/ui/use-toast"

interface GroupMember {
  id: string
  name: string
  items: Array<{
    name: string
    quantity: number
    price: number
    vendor: string
  }>
  total: number
  paid: boolean
  joinedAt: string
  isHost?: boolean
}

export default function CreateGroupOrderPage() {
  const [groupOrderId] = useState("GO-" + Math.random().toString(36).substr(2, 9).toUpperCase())
  const [expiresAt] = useState(new Date(Date.now() + 25 * 60 * 1000).toISOString())
  const [isExpired, setIsExpired] = useState(false)
  const [members, setMembers] = useState<GroupMember[]>([
    {
      id: "1",
      name: "You",
      items: [
        { name: "Refuel Max", quantity: 1, price: 3500, vendor: "Chicken Republic" },
        { name: "Vanilla Ice Cream", quantity: 1, price: 1500, vendor: "Cold Stone Creamery" },
      ],
      total: 5000,
      paid: false,
      joinedAt: new Date().toISOString(),
      isHost: true,
    },
  ])

  const shareLink = `https://foodeehub.com/group-order/join/${groupOrderId}`
  const maxMembers = 5
  const deliveryFee = 500

  // Simulate new members joining
  useEffect(() => {
    const interval = setInterval(() => {
      if (members.length < maxMembers && Math.random() > 0.7) {
        const newMember: GroupMember = {
          id: Math.random().toString(),
          name: `Friend ${members.length}`,
          items: [{ name: "Chicken Burger", quantity: 1, price: 2500, vendor: "Chicken Republic" }],
          total: 2500,
          paid: false,
          joinedAt: new Date().toISOString(),
        }
        setMembers((prev) => [...prev, newMember])

        toast({
          title: "New member joined!",
          description: `${newMember.name} has joined your group order`,
        })
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [members.length, maxMembers])

  const handlePayment = (memberId: string) => {
    setMembers((prev) => prev.map((member) => (member.id === memberId ? { ...member, paid: true } : member)))

    toast({
      title: "Payment successful!",
      description: "Your payment has been processed",
    })
  }

  const handleOrderExpiry = () => {
    setIsExpired(true)
    toast({
      title: "Group order expired",
      description: "The time limit for this group order has been reached",
      variant: "destructive",
    })
  }

  const getTotalOrder = () => {
    return members.reduce((total, member) => total + member.total, 0)
  }

  const getPaidMembers = () => {
    return members.filter((member) => member.paid).length
  }

  const getDeliveryFeePerPerson = () => {
    return Math.round(deliveryFee / members.length)
  }

  const canCompleteOrder = () => {
    return getPaidMembers() === members.length && members.length > 1
  }

  const handleCompleteOrder = () => {
    if (canCompleteOrder()) {
      toast({
        title: "Order completed!",
        description: "Your group order has been sent to the vendors",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild className="hover:bg-orange-100">
                <Link href="/vendor/1">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={100} height={32} className="h-6 w-auto" />
            </div>
            <div className="flex items-center space-x-4">
              <CountdownTimer expiresAt={expiresAt} onExpire={handleOrderExpiry} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Group Order Header */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <CardHeader className="relative z-10 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold flex items-center">
                  <Crown className="h-8 w-8 mr-3 text-yellow-300" />
                  Group Order Active!
                </CardTitle>
                <p className="text-orange-100 mt-2 text-lg">Order ID: {groupOrderId}</p>
              </div>
              <div className="text-right">
                <p className="text-orange-100">Vendors</p>
                <p className="font-semibold text-xl">Chicken Republic + Cold Stone</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 pb-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Share with Friends</h4>
                  <ShareModal groupCode={groupOrderId} shareLink={shareLink}>
                    <Button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share Group Order
                    </Button>
                  </ShareModal>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <div className="text-4xl font-bold mb-2">
                    {members.length}/{maxMembers}
                  </div>
                  <p className="text-orange-100 mb-4">Members joined</p>
                  <Progress value={(members.length / maxMembers) * 100} className="h-3 bg-white/20" />
                  {members.length === maxMembers && (
                    <Badge className="mt-3 bg-green-500 text-white">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Group Full!
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Members List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                <CardTitle className="flex items-center text-xl">
                  <Users className="h-10 w-6 mr-3 text-orange-500" />
                  Group Members ({members.length})
                  <Badge className="ml-3 bg-orange-100 text-orange-800">
                    {getPaidMembers()}/{members.length} Paid
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} onPayment={handlePayment} canPay={member.id === "1"} />
                ))}

                {/* Waiting for more members */}
                {members.length < maxMembers && !isExpired && (
                  <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
                    <CardContent className="p-8 text-center">
                      <div className="animate-pulse">
                        <Users className="h-16 w-16 text-orange-300 mx-auto mb-4" />
                      </div>
                      <p className="text-orange-600 font-medium">Waiting for friends to join...</p>
                      <p className="text-sm text-orange-500 mt-2">
                        {maxMembers - members.length} more spot{maxMembers - members.length !== 1 ? "s" : ""} available
                      </p>
                    </CardContent>
                  </Card>
                )}

                {isExpired && (
                  <Card className="border-2 border-red-200 bg-red-50">
                    <CardContent className="p-6 text-center">
                      <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <h4 className="font-semibold text-red-800 mb-2">Group Order Expired</h4>
                      <p className="text-red-600 text-sm">
                        The time limit has been reached. You can still complete the order with current members.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold text-lg">₦{getTotalOrder().toLocaleString()}</span>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-700 font-medium">Delivery Fee</span>
                      <span className="text-blue-700 font-bold">₦{deliveryFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-600">Split among {members.length} members</span>
                      <span className="text-blue-600 font-medium">₦{getDeliveryFeePerPerson()}/person</span>
                    </div>
                  </div>

                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between font-bold text-xl">
                      <span>Grand Total</span>
                      <span className="text-green-600">₦{(getTotalOrder() + deliveryFee).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Payment Progress</span>
                      <span className="font-medium">
                        {getPaidMembers()}/{members.length} paid
                      </span>
                    </div>
                    <Progress value={(getPaidMembers() / members.length) * 100} className="h-3" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleCompleteOrder}
                    disabled={!canCompleteOrder()}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 text-lg shadow-lg"
                  >
                    {canCompleteOrder() ? (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Complete Group Order
                      </>
                    ) : (
                      `Waiting for ${members.length - getPaidMembers()} payment${members.length - getPaidMembers() !== 1 ? "s" : ""}`
                    )}
                  </Button>

                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50">
                    Cancel Group Order
                  </Button>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-center mb-2">
                    <Crown className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="font-semibold text-yellow-800">Host Reward</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Get ₦200 off your next order for organizing this group order!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
