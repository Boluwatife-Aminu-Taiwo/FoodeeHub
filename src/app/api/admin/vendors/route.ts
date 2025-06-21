import { type NextRequest, NextResponse } from "next/server"

interface VendorApprovalData {
  vendorId: number
  status: "approved" | "rejected"
  reason?: string
}

interface FeaturedVendorData {
  vendorId: number
  isFeatured: boolean
  featuredOrder?: number
}

// Mock function to get pending vendors
async function getPendingVendors() {
  return [
    {
      id: 7,
      name: "New Pizza Place",
      email: "contact@newpizza.com",
      phone: "+2348012345699",
      category: "pizza",
      description: "Authentic Italian pizza",
      address: "Surulere, Lagos",
      latitude: 6.4969,
      longitude: 3.3481,
      deliveryFee: 550,
      approvalStatus: "pending",
      createdAt: "2024-01-15T10:30:00Z",
      documents: ["business_license.pdf", "food_permit.pdf"],
    },
    {
      id: 8,
      name: "Healthy Bites",
      email: "info@healthybites.com",
      phone: "+2348012345700",
      category: "healthy",
      description: "Fresh salads and healthy meals",
      address: "Yaba, Lagos",
      latitude: 6.5158,
      longitude: 3.3707,
      deliveryFee: 400,
      approvalStatus: "pending",
      createdAt: "2024-01-14T15:45:00Z",
      documents: ["business_license.pdf"],
    },
  ]
}

// Mock function to get all vendors for admin
async function getAllVendorsForAdmin() {
  return [
    {
      id: 1,
      name: "Chicken Republic",
      category: "fast_food",
      rating: 4.5,
      totalOrders: 2340,
      revenue: 2450000,
      approvalStatus: "approved",
      isFeatured: true,
      featuredOrder: 1,
      isActive: true,
      createdAt: "2023-12-01T10:00:00Z",
    },
    {
      id: 2,
      name: "Cold Stone Creamery",
      category: "ice_cream",
      rating: 4.3,
      totalOrders: 1560,
      revenue: 1560000,
      approvalStatus: "approved",
      isFeatured: true,
      featuredOrder: 2,
      isActive: true,
      createdAt: "2023-12-02T11:00:00Z",
    },
    {
      id: 3,
      name: "Dominos Pizza",
      category: "pizza",
      rating: 4.2,
      totalOrders: 1890,
      revenue: 1890000,
      approvalStatus: "approved",
      isFeatured: true,
      featuredOrder: 3,
      isActive: true,
      createdAt: "2023-12-03T12:00:00Z",
    },
    {
      id: 4,
      name: "Mr. Biggs",
      category: "local_cuisine",
      rating: 4.1,
      totalOrders: 1670,
      revenue: 1670000,
      approvalStatus: "approved",
      isFeatured: false,
      featuredOrder: 0,
      isActive: true,
      createdAt: "2023-12-04T13:00:00Z",
    },
  ]
}

// Mock function to approve/reject vendor
async function updateVendorApproval(data: VendorApprovalData) {
  console.log(`Vendor ${data.vendorId} ${data.status}`, data.reason)
  return {
    success: true,
    message: `Vendor ${data.status} successfully`,
  }
}

// Mock function to update featured status
async function updateFeaturedVendor(data: FeaturedVendorData) {
  console.log(`Vendor ${data.vendorId} featured status: ${data.isFeatured}`, data.featuredOrder)
  return {
    success: true,
    message: `Featured status updated successfully`,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    if (type === "pending") {
      const pendingVendors = await getPendingVendors()
      return NextResponse.json({ vendors: pendingVendors })
    }

    // Default: get all vendors
    const vendors = await getAllVendorsForAdmin()
    return NextResponse.json({ vendors })
  } catch (error) {
    console.error("Error fetching admin vendors:", error)
    return NextResponse.json({ error: "Failed to fetch vendors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action } = body

    if (action === "approve" || action === "reject") {
      const data: VendorApprovalData = {
        vendorId: body.vendorId,
        status: action === "approve" ? "approved" : "rejected",
        reason: body.reason,
      }
      const result = await updateVendorApproval(data)
      return NextResponse.json(result)
    }

    if (action === "featured") {
      const data: FeaturedVendorData = {
        vendorId: body.vendorId,
        isFeatured: body.isFeatured,
        featuredOrder: body.featuredOrder,
      }
      const result = await updateFeaturedVendor(data)
      return NextResponse.json(result)
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Error updating vendor:", error)
    return NextResponse.json({ error: "Failed to update vendor" }, { status: 500 })
  }
}
