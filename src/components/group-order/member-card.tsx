"use client"

import { useState } from "react"
import { CheckCircle, Clock, User, CreditCard, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  name: string
  quantity: number
  price: number
  vendor: string
}

interface Member {
  id: string
  name: string
  items: OrderItem[]
  total: number
  paid: boolean
  joinedAt: string
  isHost?: boolean
}

interface MemberCardProps {
  member: Member
  onPayment?: (memberId: string) => void
  canPay?: boolean
}

export function MemberCard({ member, onPayment, canPay = false }: MemberCardProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      onPayment?.(member.id)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const groupedItems = member.items.reduce(
    (acc, item) => {
      if (!acc[item.vendor]) {
        acc[item.vendor] = []
      }
      acc[item.vendor].push(item)
      return acc
    },
    {} as Record<string, OrderItem[]>,
  )

  return (
    <Card
      className={`transition-all duration-300 ${member.paid ? "border-green-200 bg-green-50" : "border-gray-200 hover:shadow-md"}`}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                member.paid ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              {member.paid ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <User className="h-5 w-5 text-gray-600" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">Joined {new Date(member.joinedAt).toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {member.isHost && <Badge className="bg-blue-100 text-blue-800">Host</Badge>}
            {member.paid ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Paid
              </Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Order Total</span>
            <span className="font-bold text-lg">₦{member.total.toLocaleString()}</span>
          </div>

          {member.items.length > 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start p-0 h-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  <span className="text-sm text-gray-600">
                    {member.items.length} item{member.items.length !== 1 ? "s" : ""} • View details
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{member.name}'s Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {Object.entries(groupedItems).map(([vendor, items]) => (
                    <div key={vendor} className="space-y-2">
                      <h4 className="font-medium text-gray-900">{vendor}</h4>
                      <div className="space-y-1 pl-4">
                        {items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      {Object.keys(groupedItems).length > 1 && <Separator />}
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>₦{member.total.toLocaleString()}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {canPay && !member.paid && (
          <Button
            onClick={handlePayment}
            disabled={isProcessingPayment}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            {isProcessingPayment ? "Processing..." : "Pay My Share"}
          </Button>
        )}

        {member.items.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <p className="text-sm">No items ordered yet</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
