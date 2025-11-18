"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Eye } from "lucide-react"
import { useState } from "react"

const ordersData = [
  {
    id: "ORD-1001",
    table: "Table 5",
    items: ["Margherita Pizza", "Caesar Salad"],
    status: "New",
    time: "2m ago",
    total: "$45.99",
  },
  {
    id: "ORD-1002",
    table: "Table 8",
    items: ["Grilled Salmon", "Wine"],
    status: "Preparing",
    time: "12m ago",
    total: "$75.50",
  },
  {
    id: "ORD-1003",
    table: "Table 2",
    items: ["Pasta Carbonara"],
    status: "Ready",
    time: "8m ago",
    total: "$18.99",
  },
  {
    id: "ORD-1004",
    table: "Table 11",
    items: ["Burger", "Fries", "Shake"],
    status: "Served",
    time: "15m ago",
    total: "$32.00",
  },
  {
    id: "ORD-1005",
    table: "Table 3",
    items: ["Seafood Risotto", "Tiramisu"],
    status: "New",
    time: "1m ago",
    total: "$58.75",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Preparing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
    case "Ready":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Served":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function SalesOrdersPage() {
  const [filter, setFilter] = useState("all")

  const filtered =
    filter === "all" ? ordersData : ordersData.filter((o) => o.status.toLowerCase() === filter.toLowerCase())

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage active and pending orders</p>
          </div>
          <Button size="lg" className="gap-2">
            <Plus className="w-4 h-4" />
            New Order
          </Button>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {["all", "new", "preparing", "ready", "served"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((order) => (
            <Card key={order.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono font-bold text-foreground">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.table}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="space-y-1">
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-foreground">
                    • {item}
                  </p>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-primary">{order.total}</p>
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
