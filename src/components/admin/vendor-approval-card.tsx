"use client"

import { useState } from "react"
import { Clock, MapPin, FileText, Check, X, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

interface VendorApprovalCardProps {
  vendor: {
    id: number
    name: string
    email: string
    phone: string
    category: string
    description: string
    address: string
    appliedDate: string
    documents: string[]
  }
  onApprove: (vendorId: number, reason?: string) => void
  onReject: (vendorId: number, reason: string) => void
}

export function VendorApprovalCard({ vendor, onApprove, onReject }: VendorApprovalCardProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)

  const handleApprove = async () => {
    setIsProcessing(true)
    try {
      await onApprove(vendor.id)
      toast({
        title: "Vendor Approved",
        description: `${vendor.name} has been approved successfully.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve vendor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    try {
      await onReject(vendor.id, rejectReason)
      toast({
        title: "Vendor Rejected",
        description: `${vendor.name} has been rejected.`,
      })
      setShowRejectDialog(false)
      setRejectReason("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject vendor. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-400">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">{vendor.name}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{vendor.category}</p>
          </div>
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {vendor.address}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            Applied: {vendor.appliedDate}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FileText className="h-4 w-4 mr-2" />
            {vendor.documents.length} documents submitted
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            size="sm"
            onClick={handleApprove}
            disabled={isProcessing}
            className="bg-green-600 hover:bg-green-700 text-white flex-1"
          >
            <Check className="h-4 w-4 mr-1" />
            {isProcessing ? "Approving..." : "Approve"}
          </Button>

          <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" disabled={isProcessing} className="flex-1">
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Vendor Application</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please provide a reason for rejecting {vendor.name}'s application:
                </p>
                <div>
                  <Label htmlFor="reject-reason">Rejection Reason</Label>
                  <Textarea
                    id="reject-reason"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleReject} disabled={isProcessing} variant="destructive" className="flex-1">
                    {isProcessing ? "Rejecting..." : "Confirm Rejection"}
                  </Button>
                  <Button onClick={() => setShowRejectDialog(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-1" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Vendor Application Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Business Name</Label>
                    <p className="text-sm text-gray-600">{vendor.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Category</Label>
                    <p className="text-sm text-gray-600">{vendor.category}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-gray-600">{vendor.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-gray-600">{vendor.phone}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Description</Label>
                  <p className="text-sm text-gray-600">{vendor.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Address</Label>
                  <p className="text-sm text-gray-600">{vendor.address}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Documents</Label>
                  <div className="space-y-1">
                    {vendor.documents.map((doc, index) => (
                      <div key={index} className="flex items-center text-sm text-blue-600 hover:text-blue-800">
                        <FileText className="h-4 w-4 mr-2" />
                        <button className="underline">{doc}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
