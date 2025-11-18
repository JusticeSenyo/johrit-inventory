"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  Bell, 
  ChefHat, 
  Timer, 
  User,
  LogOut,
  Menu,
  X,
  History,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const mockOrders = [
  {
    id: "ORD-183",
    customerId: "Customer 1",
    items: [
      { name: "Jollof Rice", qty: 2 },
      { name: "Grilled Chicken", qty: 1 },
    ],
    status: "pending",
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    id: "ORD-182",
    customerId: "Customer 2",
    items: [{ name: "Waakye", qty: 1 }],
    status: "pending",
    createdAt: new Date(Date.now() - 10 * 60000).toISOString(),
  },
  {
    id: "ORD-181",
    customerId: "Customer 3",
    items: [
      { name: "Fufu", qty: 1 },
      { name: "Light Soup", qty: 1 },
    ],
    status: "preparing",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
  },
]

const completedOrders = [
  {
    id: "ORD-180",
    customerId: "Customer 4",
    items: [{ name: "Fried Rice", qty: 1 }],
    status: "done",
    createdAt: new Date(Date.now() - 20 * 60000).toISOString(),
  },
  {
    id: "ORD-179",
    customerId: "Customer 5",
    items: [
      { name: "Banku", qty: 1 },
      { name: "Tilapia", qty: 1 }
    ],
    status: "done",
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
  },
]

export default function KitchenOrderManagement() {
  const [orders, setOrders] = useState(mockOrders)
  const [completed, setCompleted] = useState(completedOrders)
  const [readyNotifications, setReadyNotifications] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [expandedOrders, setExpandedOrders] = useState({})
  const [chefName] = useState("Chef Carlos")

  const handleStartPreparing = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "preparing" } : order
      )
    )
  }

  const handleMarkDone = (orderId) => {
    const order = orders.find((o) => o.id === orderId)
    if (order) {
      setOrders((prev) => prev.filter((o) => o.id !== orderId))
      setCompleted((prev) => [{ ...order, status: "done" }, ...prev])
      
      setReadyNotifications((prev) => [...prev, orderId])
      console.log(`Order ${orderId} marked as ready for pickup - POS notification sent`)
      
      // Auto-dismiss notification after 5 seconds
      setTimeout(() => {
        setReadyNotifications((prev) => prev.filter((id) => id !== orderId))
      }, 5000)
    }
  }

  const getTimeSince = (timestamp) => {
    const minutes = Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000)
    return minutes < 1 ? 'Just now' : `${minutes} min ago`
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      window.location.href = "/"
    }
  }

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length
  const preparingCount = orders.filter((o) => o.status === "preparing").length

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 backdrop-blur-sm shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Kitchen Management
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Order preparation dashboard
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
              <ChefHat className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {chefName}
              </span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Completed</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-[1800px] mx-auto space-y-6">
          {/* Ready Notifications */}
          {readyNotifications.length > 0 && (
            <div className="space-y-3">
              {readyNotifications.map((orderId) => (
                <Card key={orderId} className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border-2 border-emerald-200 dark:border-emerald-800 shadow-lg animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                      <Bell className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-emerald-900 dark:text-emerald-100">
                        Order {orderId} is ready for pickup!
                      </p>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">POS system has been notified</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Quick Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    New Orders
                  </p>
                  <h3 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {pendingCount}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    Awaiting preparation
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </Card>

            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    In Progress
                  </p>
                  <h3 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {preparingCount}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    Being prepared
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
                  <ChefHat className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </Card>

            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    Completed Today
                  </p>
                  <h3 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                    {completed.length}
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500">
                    Ready for pickup
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Pending Orders Section */}
          {pendingCount > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  New Orders
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {pendingCount} {pendingCount === 1 ? 'order' : 'orders'} waiting to start
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {orders
                  .filter((o) => o.status === "pending")
                  .map((order) => (
                    <Card 
                      key={order.id} 
                      className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 p-5 shadow-sm hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                              {order.id}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-700">
                              NEW
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {order.customerId}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 px-2 py-1 rounded-lg">
                          <Clock className="w-3.5 h-3.5" />
                          <span className="font-medium">{getTimeSince(order.createdAt)}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 p-4 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-2">
                          Order Items
                        </p>
                        {order.items.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                          >
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {item.name}
                            </p>
                            <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                              × {item.qty}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleStartPreparing(order.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-lg font-semibold transition-colors shadow-sm"
                      >
                        <ChefHat className="w-5 h-5" />
                        Start Preparing
                      </button>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Preparing Orders Section */}
          {preparingCount > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  In Progress
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  {preparingCount} {preparingCount === 1 ? 'order' : 'orders'} being prepared
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {orders
                  .filter((o) => o.status === "preparing")
                  .map((order) => (
                    <Card 
                      key={order.id} 
                      className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 p-5 shadow-sm hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">
                              {order.id}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                              COOKING
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {order.customerId}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 bg-white dark:bg-neutral-900 px-2 py-1 rounded-lg">
                          <Timer className="w-3.5 h-3.5 animate-pulse" />
                          <span className="font-medium">{getTimeSince(order.createdAt)}</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 p-4 bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wide mb-2">
                          Order Items
                        </p>
                        {order.items.map((item, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between py-2 border-b border-neutral-100 dark:border-neutral-800 last:border-0"
                          >
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {item.name}
                            </p>
                            <span className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                              × {item.qty}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => handleMarkDone(order.id)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Mark as Complete
                      </button>
                    </Card>
                  ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {orders.length === 0 && (
            <Card className="p-16 text-center border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
              <div className="w-24 h-24 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                All Caught Up!
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
                No pending orders at this time. New orders will appear here automatically.
              </p>
            </Card>
          )}
        </div>
      </main>

      {/* Completed Orders History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-white dark:bg-neutral-950 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
              <div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Completed Orders
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  View all finished orders
                </p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="space-y-4">
                {completed.map((order) => (
                  <div
                    key={order.id}
                    className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div 
                      onClick={() => toggleOrderExpansion(order.id)}
                      className="p-4 bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                          <div>
                            <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {order.id}
                            </p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400">
                              {order.customerId} • {getTimeSince(order.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                            COMPLETED
                          </span>
                          {expandedOrders[order.id] ? (
                            <ChevronUp className="w-5 h-5 text-neutral-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items - Expandable */}
                    {expandedOrders[order.id] && (
                      <div className="p-4 bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
                        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
                          Order Items:
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900/30 rounded-lg"
                            >
                              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                {item.name}
                              </p>
                              <span className="px-2.5 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                                × {item.qty}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}