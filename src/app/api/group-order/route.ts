import { type NextRequest, NextResponse } from "next/server"

interface GroupOrderData {
  hostId: string
  vendorIds: number[]
  deliveryAddress: string
  expiresIn: number // minutes
}

// Mock function to create group order
async function createGroupOrder(data: GroupOrderData) {
  const groupCode = "GO-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const expiresAt = new Date(Date.now() + data.expiresIn * 60 * 1000)

  // This would typically insert into your database
  const groupOrder = {
    id: Math.floor(Math.random() * 1000),
    groupCode,
    hostId: data.hostId,
    vendorIds: data.vendorIds,
    deliveryAddress: data.deliveryAddress,
    status: "active",
    maxParticipants: 5,
    expiresAt: expiresAt.toISOString(),
    createdAt: new Date().toISOString(),
    participants: [],
  }

  return groupOrder
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { hostId, vendorIds, deliveryAddress, expiresIn = 30 } = body

    if (!hostId || !vendorIds || !deliveryAddress) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const groupOrder = await createGroupOrder({
      hostId,
      vendorIds,
      deliveryAddress,
      expiresIn,
    })

    return NextResponse.json(groupOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating group order:", error)
    return NextResponse.json({ error: "Failed to create group order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const groupCode = searchParams.get("groupCode")

    if (!groupCode) {
      return NextResponse.json({ error: "Group code is required" }, { status: 400 })
    }

    // Mock group order data
    const groupOrder = {
      id: 1,
      groupCode,
      hostId: "1",
      vendorIds: [1, 2],
      vendors: [
        { id: 1, name: "Chicken Republic" },
        { id: 2, name: "Cold Stone Creamery" },
      ],
      deliveryAddress: "23 Ozumba Mbadiwe, Victoria Island, Lagos",
      status: "active",
      maxParticipants: 5,
      expiresAt: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
      participants: [
        {
          id: "1",
          name: "Sarah Johnson (Host)",
          items: [],
          total: 0,
          paid: false,
        },
      ],
    }

    return NextResponse.json(groupOrder)
  } catch (error) {
    console.error("Error fetching group order:", error)
    return NextResponse.json({ error: "Failed to fetch group order" }, { status: 500 })
  }
}
