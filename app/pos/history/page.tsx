"use client"

import { PosLayout } from "@/components/pos-layout"
import { Card } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

// Mock order history data
const mockOrderHistory = [
  {
    orderId: "ORD-2891",
    staffName: "Kofi",
    items: ["Grilled Chicken", "French Fries"],
    total: 15.0,
    timestamp: "2025-11-16 14:30",
  },
  {
    orderId: "ORD-2890",
    staffName: "Kofi",
    items: ["Fish and Chips", "Coleslaw", "Soft Drink"],
    total: 15.5,
    timestamp: "2025-11-16 13:45",
  },
  {
    orderId: "ORD-2889",
    staffName: "Ama",
    items: ["Beef Steak", "Rice", "Fresh Juice"],
    total: 20.0,
    timestamp: "2025-11-16 13:15",
  },
  {
    orderId: "ORD-2888",
    staffName: "Kofi",
    items: ["Spring Rolls", "Chicken Wings"],
    total: 11.0,
    timestamp: "2025-11-16 12:00",
  },
  {
    orderId: "ORD-2887",
    staffName: "Ama",
    items: ["Chocolate Cake", "Coffee"],
    total: 6.0,
    timestamp: "2025-11-16 11:30",
  },
]

export default function OrderHistoryPage() {
  const { user } = useAuth()

  const userOrders = mockOrderHistory.filter((order) => order.staffName === user?.name)

  return (
    <PosLayout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order History</h1>
            <p className="text-muted-foreground mt-2">
              Showing orders placed by {user?.name}
            </p>
          </div>

          {userOrders.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No orders placed yet</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <Card key={order.orderId} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    {/* Order ID */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">ORDER ID</p>
                      <p className="font-mono font-bold text-lg text-foreground">{order.orderId}</p>
                    </div>

                    {/* Items */}
                    <div className="md:col-span-2">
                      <p className="text-xs text-muted-foreground mb-2">ITEMS</p>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="text-sm text-foreground">
                            • {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    {/* Total */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">TOTAL</p>
                      <p className="font-bold text-primary text-lg">GHS {order.total.toFixed(2)}</p>
                    </div>

                    {/* Timestamp */}
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">TIME</p>
                      <p className="text-sm text-foreground">{order.timestamp}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </PosLayout>
  )
}
