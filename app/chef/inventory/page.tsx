"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

const kitchenInventory = [
  { item: "Tomatoes", quantity: 15, unit: "kg", status: "good" },
  { item: "Chicken Breast", quantity: 8, unit: "kg", status: "good" },
  { item: "Mozzarella", quantity: 2, unit: "kg", status: "low" },
  { item: "Olive Oil", quantity: 0.5, unit: "L", status: "critical" },
  { item: "Basil", quantity: 3, unit: "bundles", status: "good" },
  { item: "Pasta", quantity: 5, unit: "kg", status: "good" },
  { item: "Rice", quantity: 2, unit: "kg", status: "low" },
  { item: "Salmon Fillet", quantity: 12, unit: "pieces", status: "good" },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "good":
      return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
    case "low":
      return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
    case "critical":
      return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
    default:
      return "bg-gray-100 dark:bg-gray-700"
  }
}

export default function ChefInventoryPage() {
  const criticalItems = kitchenInventory.filter((i) => i.status === "critical")
  const lowItems = kitchenInventory.filter((i) => i.status === "low")

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kitchen Inventory</h1>
          <p className="text-muted-foreground mt-1">Current stock levels and availability</p>
        </div>

        {/* Alerts */}
        {(criticalItems.length > 0 || lowItems.length > 0) && (
          <Card className="p-4 border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Stock Alerts</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {criticalItems.length} critical, {lowItems.length} low stock items
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {kitchenInventory.map((item, idx) => (
            <Card key={idx} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <p className="font-semibold text-foreground">{item.item}</p>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                <div className="bg-background rounded p-3 text-center">
                  <p className="text-2xl font-bold text-foreground">{item.quantity}</p>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
