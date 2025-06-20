"use client"

import { useState } from "react"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, Copy, Users, Clock, Share2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface GroupMember {
  id: string
  name: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  paid: boolean
}

export default function CreateGroupOrderPage() {
  const [groupOrderId] = useState("GO-" + Math.random().toString(36).substr(2, 9).toUpperCase())
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [members, setMembers] = useState<GroupMember[]>([
    {
      id: "1",
      name: "You (Host)",
      items: [
        { name: "Refuel Max", quantity: 1, price: 3500 },
        { name: "Vanilla Ice Cream", quantity: 1, price: 1500 },
      ],
      total: 5000,
      paid: false,
    },
  ])

  const shareLink = `https://foodeehub.com/group-order/join/${groupOrderId}`

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getTotalOrder = () => {
    return members.reduce((total, member) => total + member.total, 0)
  }

  const getPaidMembers = () => {
    return members.filter((member) => member.paid).length
  }

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/vendor/1">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <SafeImage src="/images/foodee-logo.png" alt="FoodeeHub" width={100} height={32} className="h-6 w-auto" />
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(timeLeft)}
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Group Order Header */}
        <Card className="mb-6 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-orange-800">Group Order Started!</CardTitle>
                <p className="text-orange-600 mt-1">Order ID: {groupOrderId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-600">Vendors</p>
                <p className="font-semibold">Chicken Republic + Cold Stone</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="share-link" className="text-sm font-medium">
                  Share this link with friends:
                </Label>
                <div className="flex mt-2">
                  <Input id="share-link" value={shareLink} readOnly className="rounded-r-none" />
                  <Button onClick={copyShareLink} className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full mt-2 bg-blue-500 hover:bg-blue-600">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
              <div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{members.length}/5</div>
                  <p className="text-sm text-gray-600">Members joined</p>
                  <Progress value={(members.length / 5) * 100} className="mt-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Members List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Group Members ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{member.name}</h3>
                        {member.paid && (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Paid
                          </Badge>
                        )}
                        {!member.paid && member.id === "1" && <Badge variant="secondary">Host</Badge>}
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₦{member.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {member.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm text-gray-600">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    {member.id === "1" && !member.paid && (
                      <Button size="sm" className="w-full mt-3 bg-orange-500 hover:bg-orange-600">
                        Pay My Share
                      </Button>
                    )}
                  </div>
                ))}

                {/* Waiting for more members */}
                {members.length < 5 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Waiting for friends to join...</p>
                    <p className="text-sm text-gray-400 mt-1">Share the link above to invite them</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Order Value</span>
                    <span className="font-semibold">₦{getTotalOrder().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₦500</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Split among {members.length} members</span>
                    <span>₦{Math.round(500 / members.length)}/person</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Grand Total</span>
                      <span>₦{(getTotalOrder() + 500).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Members Paid</span>
                    <span>
                      {getPaidMembers()}/{members.length}
                    </span>
                  </div>
                  <Progress value={(getPaidMembers() / members.length) * 100} />
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={getPaidMembers() < members.length}
                  >
                    Complete Group Order
                  </Button>
                  <Button variant="outline" className="w-full">
                    Cancel Group Order
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>Host Reward: Get ₦200 off your next order for organizing this group order!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
