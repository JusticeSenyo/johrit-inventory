"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Minus } from "lucide-react"

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const menuItems = [
  { name: "Margherita Pizza", price: 14.99 },
  { name: "Caesar Salad", price: 9.99 },
  { name: "Grilled Salmon", price: 24.99 },
  { name: "Pasta Carbonara", price: 16.99 },
  { name: "Burger", price: 12.99 },
]

export function AddOrderModal({ isOpen, onClose, onSubmit }: AddOrderModalProps) {
  const [items, setItems] = useState<OrderItem[]>([])
  const [table, setTable] = useState("Table 1")

  const handleAddItem = (menuItem: (typeof menuItems)[0]) => {
    const existing = items.find((i) => i.name === menuItem.name)
    if (existing) {
      setItems(items.map((i) => (i.name === menuItem.name ? { ...i, quantity: i.quantity + 1 } : i)))
    } else {
      setItems([...items, { ...menuItem, quantity: 1 }])
    }
  }

  const handleRemoveItem = (name: string) => {
    setItems(items.filter((i) => i.name !== name))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) {
      alert("Please add at least one item")
      return
    }
    onSubmit({ table, items, total })
    setItems([])
    setTable("Table 1")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Create New Order</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Table Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Table Number</label>
            <select
              value={table}
              onChange={(e) => setTable(e.target.value)}
              className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {Array.from({ length: 15 }, (_, i) => (
                <option key={i + 1}>Table {i + 1}</option>
              ))}
            </select>
          </div>

          {/* Menu Items */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Menu Items</h3>
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleAddItem(item)}
                  className="p-3 text-left bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Order Items */}
          {items.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">Order Items</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-muted rounded">{item.quantity}</span>
                      <span className="font-semibold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.name)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total:</span>
                  <span className="text-lg font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Order
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
