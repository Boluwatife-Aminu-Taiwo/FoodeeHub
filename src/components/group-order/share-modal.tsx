"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Share2, MessageCircle, Mail, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ShareModalProps {
  groupCode: string
  shareLink: string
  children: React.ReactNode
}

export function ShareModal({ groupCode, shareLink, children }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied!",
        description: "Link copied to clipboard",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link",
        variant: "destructive",
      })
    }
  }

  const shareViaWhatsApp = () => {
    const message = `🍽️ Join my group food order on FoodeeHub!\n\nGroup Code: ${groupCode}\nLink: ${shareLink}\n\nLet's order together and save on delivery! 🚀`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const shareViaEmail = () => {
    const subject = "Join my FoodeeHub group order!"
    const body = `Hi!\n\nI've started a group food order on FoodeeHub and would love for you to join!\n\nGroup Code: ${groupCode}\nDirect Link: ${shareLink}\n\nJoin now to order together and split the delivery cost!\n\nBest regards`
    const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(emailUrl)
  }

  const shareViaNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join my FoodeeHub group order!",
          text: `Join my group food order with code: ${groupCode}`,
          url: shareLink,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      copyToClipboard(shareLink)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 mr-2" />
            Share Group Order
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
            <TabsTrigger value="qr">QR Code</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div>
              <Label htmlFor="share-link">Share Link</Label>
              <div className="flex mt-2">
                <Input id="share-link" value={shareLink} readOnly className="rounded-r-none" />
                <Button
                  onClick={() => copyToClipboard(shareLink)}
                  className="rounded-l-none"
                  variant={copied ? "default" : "outline"}
                >
                  {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button onClick={shareViaWhatsApp} className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={shareViaEmail} variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>

            <Button onClick={shareViaNative} className="w-full" variant="outline">
              <Share2 className="h-4 w-4 mr-2" />
              More Options
            </Button>
          </TabsContent>

          <TabsContent value="code" className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Share this code with friends to join your group order</p>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">{groupCode}</div>
                <Button onClick={() => copyToClipboard(groupCode)} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="qr" className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Scan this QR code to join the group order</p>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                <QrCode className="h-32 w-32 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-2">QR code generation coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
