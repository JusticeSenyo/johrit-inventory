"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const allOrders = [
  { id: "ORD-1005", table: "Table 12", items: 3, time: "1m ago", status: "new" },
  { id: "ORD-1004", table: "Table 9", items: 2, time: "5m ago", status: "preparing" },
  { id: "ORD-1003", table: "Table 2", items: 1, time: "8m ago", status: "preparing" },
  { id: "ORD-1002", table: "Table 8", items: 2, time: "12m ago", status: "completed" },
  { id: "ORD-1001", table: "Table 5", items: 2, time: "18m ago", status: "completed" },
  { id: "ORD-1000", table: "Table 3", items: 1, time: "25m ago", status: "completed" },
]

export default function ChefOrdersPage() {
  const [filter, setFilter] = useState("all")

  const filtered = filter === "all" ? allOrders : allOrders.filter((o) => o.status === filter)

  const stats = {
    new: allOrders.filter((o) => o.status === "new").length,
    preparing: allOrders.filter((o) => o.status === "preparing").length,
    completed: allOrders.filter((o) => o.status === "completed").length,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Queue</h1>
          <p className="text-muted-foreground mt-1">View all orders by status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{stats.new}</p>
            <p className="text-sm text-muted-foreground">New Orders</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{stats.preparing}</p>
            <p className="text-sm text-muted-foreground">Preparing</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </Card>
        </div>

        {/* Filter */}
        <div className="flex gap-2 overflow-x-auto">
          {["all", "new", "preparing", "completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                filter === status ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {filtered.map((order) => {
            const statusConfig = {
              new: { bg: "bg-red-100 dark:bg-red-900", text: "text-red-800 dark:text-red-200", label: "New" },
              preparing: {
                bg: "bg-yellow-100 dark:bg-yellow-900",
                text: "text-yellow-800 dark:text-yellow-200",
                label: "Preparing",
              },
              completed: {
                bg: "bg-green-100 dark:bg-green-900",
                text: "text-green-800 dark:text-green-200",
                label: "Completed",
              },
            }
            const config = statusConfig[order.status as keyof typeof statusConfig]

            return (
              <Card
                key={order.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-mono font-bold text-foreground">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.table}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">Items</p>
                    <p className="font-semibold text-foreground">{order.items}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                    {config.label}
                  </span>
                  {order.status !== "completed" && (
                    <Button size="sm" variant="outline">
                      Update
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
