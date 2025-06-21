"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import SafeImage from "@/components/safe-image"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, CreditCard, Wallet, Phone, CheckCircle, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  vendor: string
  vendorId: string
  image: string
}

interface DeliveryAddress {
  street: string
  area: string
  city: string
  state: string
  phone: string
  instructions?: string
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
    street: "",
    area: "",
    city: "Lagos",
    state: "Lagos",
    phone: "",
    instructions: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  // Add these state variables after the existing ones
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; type: string;
  description: string } | null>(null)
  const [scheduledDelivery, setScheduledDelivery] = useState<{ date: string; time: string } | null>(null)
  const [savedAddresses, setSavedAddresses] = useState<DeliveryAddress[]>([])
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1)
  const [tipAmount, setTipAmount] = useState(0)
  const [deliveryNotes, setDeliveryNotes] = useState("")

  // Add promo codes data
  const promoCodes = [
    { code: "FIRST10", discount: 10, type: "percentage", description: "10% off your first order" },
    { code: "SAVE500", discount: 500, type: "fixed", description: "₦500 off orders above ₦3000" },
    { code: "WEEKEND20", discount: 20, type: "percentage", description: "20% off weekend orders" },
  ]

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("foodeehub-cart")
    if (savedCart) {
      const cartData = JSON.parse(savedCart)
      setCart(cartData)
      if (cartData.length === 0) {
        router.push("/")
      }
    } else {
      router.push("/")
    }
  }, [router])

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getDeliveryFee = () => {
    const vendors = Array.from(new Set(cart.map((item) => item.vendorId)))
    return vendors.length * 500 // ₦500 per vendor
  }

  const getTotalAmount = () => {
    return getCartTotal() + getDeliveryFee()
  }

  const handleAddressSubmit = () => {
    if (!deliveryAddress.street || !deliveryAddress.area || !deliveryAddress.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required address fields",
        variant: "destructive",
      })
      return
    }
    setCurrentStep(2)
  }

  const applyPromoCode = () => {
    const promo = promoCodes.find((p) => p.code.toLowerCase() === promoCode.toLowerCase())
    if (!promo) {
      toast({
        title: "Invalid Promo Code",
        description: "The promo code you entered is not valid",
        variant: "destructive",
      })
      return
    }

    if (promo.code === "SAVE500" && getCartTotal() < 3000) {
      toast({
        title: "Minimum Order Required",
        description: "This promo requires a minimum order of ₦3,000",
        variant: "destructive",
      })
      return
    }

    setAppliedPromo(promo)
    toast({
      title: "Promo Applied!",
      description: promo.description,
    })
  }

  const getDiscountAmount = () => {
    if (!appliedPromo) return 0
    if (appliedPromo.type === "percentage") {
      return Math.round((getCartTotal() * appliedPromo.discount) / 100)
    }
    return appliedPromo.discount
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Generate order ID
      const newOrderId = "FH" + Math.random().toString(36).substr(2, 9).toUpperCase()
      setOrderId(newOrderId)

      // Clear cart
      localStorage.removeItem("foodeehub-cart")
      setCart([])

      setOrderPlaced(true)
      setCurrentStep(3)

      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${newOrderId} has been confirmed`,
      })
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const steps = [
    { number: 1, title: "Delivery Details", completed: currentStep > 1 },
    { number: 2, title: "Payment", completed: currentStep > 2 },
    { number: 3, title: "Confirmation", completed: orderPlaced },
  ]

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-4">Your order #{orderId} has been placed successfully</p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-green-700">Estimated delivery time: 25-35 minutes</p>
            </div>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link href={`/orders/${orderId}`}>Track Order</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h1 className="text-xl font-semibold">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed || currentStep === step.number
                      ? "bg-orange-500 border-orange-500 text-white"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="font-semibold">{step.number}</span>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step.completed || currentStep === step.number ? "text-orange-600" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-4 ${step.completed ? "bg-orange-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        placeholder="Enter your street address"
                        value={deliveryAddress.street}
                        onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, street: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area/Neighborhood *</Label>
                      <Input
                        id="area"
                        placeholder="e.g., Victoria Island"
                        value={deliveryAddress.area}
                        onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, area: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, city: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={deliveryAddress.state}
                        onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      placeholder="+234 xxx xxx xxxx"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special instructions for the delivery driver..."
                      value={deliveryAddress.instructions}
                      onChange={(e) => setDeliveryAddress((prev) => ({ ...prev, instructions: e.target.value }))}
                    />
                  </div>

                  {/* Scheduled Delivery */}
                  <div className="mt-6 p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Delivery Time</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScheduledDelivery(scheduledDelivery ? null : { date: "", time: "" })}
                      >
                        {scheduledDelivery ? "Cancel Schedule" : "Schedule Delivery"}
                      </Button>
                    </div>

                    {scheduledDelivery ? (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="delivery-date">Delivery Date</Label>
                          <Input
                            id="delivery-date"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={scheduledDelivery.date}
                            onChange={(e) =>
                              setScheduledDelivery((prev) => (prev ? { ...prev, date: e.target.value } : null))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="delivery-time">Preferred Time</Label>
                          <Select
                            value={scheduledDelivery.time}
                            onValueChange={(value) =>
                              setScheduledDelivery((prev) => (prev ? { ...prev, time: value } : null))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9-11">9:00 AM - 11:00 AM</SelectItem>
                              <SelectItem value="11-13">11:00 AM - 1:00 PM</SelectItem>
                              <SelectItem value="13-15">1:00 PM - 3:00 PM</SelectItem>
                              <SelectItem value="15-17">3:00 PM - 5:00 PM</SelectItem>
                              <SelectItem value="17-19">5:00 PM - 7:00 PM</SelectItem>
                              <SelectItem value="19-21">7:00 PM - 9:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600">Deliver as soon as possible (25-35 minutes)</p>
                    )}
                  </div>

                  <Button onClick={handleAddressSubmit} className="w-full bg-orange-500 hover:bg-orange-600">
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Payment Method
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentStep(1)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Address
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Delivery Address Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium mb-2">Delivering to:</h3>
                    <p className="text-sm text-gray-600">
                      {deliveryAddress.street}, {deliveryAddress.area}
                      <br />
                      {deliveryAddress.city}, {deliveryAddress.state}
                      <br />
                      {deliveryAddress.phone}
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="font-medium">
                            Debit/Credit Card
                          </Label>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Wallet className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <Label htmlFor="transfer" className="font-medium">
                            Bank Transfer
                          </Label>
                          <p className="text-sm text-gray-500">Transfer directly to our account</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border rounded-lg">
                        <RadioGroupItem value="ussd" id="ussd" />
                        <Phone className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <Label htmlFor="ussd" className="font-medium">
                            USSD
                          </Label>
                          <p className="text-sm text-gray-500">Pay using your mobile banking USSD</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>

                  {/* Tip Section */}
                  <div className="mt-6 p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">Add a tip for your delivery driver</h3>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[0, 100, 200, 500].map((amount) => (
                        <Button
                          key={amount}
                          variant={tipAmount === amount ? "default" : "outline"}
                          size="sm"
                          onClick={() => setTipAmount(amount)}
                        >
                          {amount === 0 ? "No tip" : `₦${amount}`}
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Custom amount"
                        value={tipAmount || ""}
                        onChange={(e) => setTipAmount(Number(e.target.value) || 0)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={() => setTipAmount(0)}>
                        Clear
                      </Button>
                    </div>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Doe" />
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={handlePayment}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing Payment...
                      </div>
                    ) : (
                      `Pay ₦${(getTotalAmount() - getDiscountAmount() + tipAmount).toLocaleString()}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.vendorId}`} className="flex items-center space-x-3">
                        <SafeImage src={item.image} alt={item.name} width={40} height={40} className="rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.vendor}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">×{item.quantity}</p>
                          <p className="text-sm text-gray-600">₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline" onClick={applyPromoCode} disabled={!promoCode || !!appliedPromo}>
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center justify-between text-sm text-green-600 bg-green-50 p-2 rounded">
                        <span>✓ {appliedPromo.code} applied</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setAppliedPromo(null)
                            setPromoCode("")
                          }}
                          className="h-auto p-0 text-green-600 hover:text-green-700"
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Updated pricing with discount */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₦{getCartTotal().toLocaleString()}</span>
                    </div>
                    {appliedPromo && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount ({appliedPromo.code})</span>
                        <span>-₦{getDiscountAmount().toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>₦{getDeliveryFee().toLocaleString()}</span>
                    </div>
                    {tipAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Tip</span>
                        <span>₦{tipAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>
                        ₦{(getCartTotal() - getDiscountAmount() + getDeliveryFee() + tipAmount).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="flex items-center text-orange-700">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">Estimated delivery: 25-35 minutes</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
