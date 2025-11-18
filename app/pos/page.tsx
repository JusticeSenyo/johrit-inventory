"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  User,
  Coffee,
  Pizza,
  Salad,
  IceCream,
  Utensils,
  Search,
  Receipt,
  CheckCircle,
  History,
  LogOut,
  Clock,
  X,
  Package,
  AlertCircle,
  ChevronRight,
  LayoutGrid
} from "lucide-react"

// Mock categories and items data
const categories = [
  { id: "beverages", name: "Beverages", icon: Coffee },
  { id: "appetizers", name: "Appetizers", icon: Utensils },
  { id: "main", name: "Main Courses", icon: Pizza },
  { id: "desserts", name: "Desserts", icon: IceCream },
  { id: "sides", name: "Sides", icon: Salad }
]

const initialItems = {
  beverages: [
    { id: "1", name: "Soft Drink", price: 2.5, availability: 50 },
    { id: "2", name: "Fresh Juice", price: 3.0, availability: 30 },
    { id: "3", name: "Coffee", price: 2.0, availability: 40 },
    { id: "4", name: "Tea", price: 1.5, availability: 45 },
  ],
  appetizers: [
    { id: "5", name: "Spring Rolls", price: 5.0, availability: 25 },
    { id: "6", name: "Chicken Wings", price: 6.0, availability: 35 },
    { id: "7", name: "Nachos", price: 4.5, availability: 20 },
    { id: "8", name: "Soup", price: 4.0, availability: 30 },
  ],
  main: [
    { id: "9", name: "Grilled Chicken", price: 12.0, availability: 15 },
    { id: "10", name: "Fish and Chips", price: 10.0, availability: 18 },
    { id: "11", name: "Beef Steak", price: 15.0, availability: 12 },
    { id: "12", name: "Pasta", price: 9.0, availability: 20 },
  ],
  desserts: [
    { id: "13", name: "Chocolate Cake", price: 4.0, availability: 8 },
    { id: "14", name: "Ice Cream", price: 3.5, availability: 25 },
    { id: "15", name: "Tiramisu", price: 5.0, availability: 10 },
    { id: "16", name: "Fruit Salad", price: 3.0, availability: 15 },
  ],
  sides: [
    { id: "17", name: "French Fries", price: 3.0, availability: 40 },
    { id: "18", name: "Coleslaw", price: 2.5, availability: 30 },
    { id: "19", name: "Rice", price: 2.0, availability: 50 },
    { id: "20", name: "Bread", price: 1.5, availability: 60 },
  ],
}

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState("beverages")
  const [orderItems, setOrderItems] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [staffName] = useState("John Doe")
  const [showHistory, setShowHistory] = useState(false)
  const [items, setItems] = useState(initialItems)
  const [orderHistory, setOrderHistory] = useState([])
  const [selectedHistoryOrder, setSelectedHistoryOrder] = useState(null)

  const generateOrderId = () => {
    return `ORD-${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`
  }
  const [currentOrderId, setCurrentOrderId] = useState(generateOrderId())

  const selectedCategoryItems = items[selectedCategory] || []
  const filteredItems = selectedCategoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addItemToOrder = (item) => {
    // Check if item is out of stock
    if (item.availability <= 0) {
      alert(`${item.name} is out of stock!`)
      return
    }

    const existingItem = orderItems.find((o) => o.id === item.id)
    const currentQuantityInOrder = existingItem ? existingItem.quantity : 0

    // Check if adding one more would exceed availability
    if (currentQuantityInOrder + 1 > item.availability) {
      alert(`Only ${item.availability} ${item.name}(s) available in stock!`)
      return
    }

    if (existingItem) {
      setOrderItems(
        orderItems.map((o) =>
          o.id === item.id ? { ...o, quantity: o.quantity + 1 } : o
        )
      )
    } else {
      setOrderItems([
        ...orderItems,
        { ...item, quantity: 1 },
      ])
    }
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeItemFromOrder(itemId)
    } else {
      const item = orderItems.find((o) => o.id === itemId)
      
      // Check availability before increasing quantity
      if (quantity > item.availability) {
        alert(`Only ${item.availability} ${item.name}(s) available in stock!`)
        return
      }
      
      setOrderItems(
        orderItems.map((o) => (o.id === itemId ? { ...o, quantity } : o))
      )
    }
  }

  const removeItemFromOrder = (itemId) => {
    setOrderItems(orderItems.filter((o) => o.id !== itemId))
  }

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0)

  const submitOrder = () => {
    if (orderItems.length === 0) {
      alert("Please add items to the order")
      return
    }

    // Update inventory
    const updatedItems = { ...items }
    orderItems.forEach((orderItem) => {
      Object.keys(updatedItems).forEach((category) => {
        updatedItems[category] = updatedItems[category].map((item) =>
          item.id === orderItem.id
            ? { ...item, availability: item.availability - orderItem.quantity }
            : item
        )
      })
    })
    setItems(updatedItems)

    // Create order record with items
    const newOrder = {
      id: currentOrderId,
      date: new Date().toLocaleString(),
      items: orderItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity
      })),
      totalItems: totalItems,
      total: totalPrice,
      status: "Completed"
    }

    setOrderHistory([newOrder, ...orderHistory])

    console.log("Order submitted:", {
      orderId: currentOrderId,
      staffName: staffName,
      items: orderItems,
      total: totalPrice,
      timestamp: new Date().toISOString(),
    })

    alert(`Order ${currentOrderId} submitted successfully!`)
    setOrderItems([])
    setCurrentOrderId(generateOrderId())
  }

  const clearOrder = () => {
    if (orderItems.length > 0 && window.confirm("Clear all items from the order?")) {
      setOrderItems([])
    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Zoho-Style Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Left Section - Logo & Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <Receipt className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  Point of Sale
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Restaurant Management
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
              <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                {staffName}
              </span>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-all duration-200 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-md transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-900"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-[2000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Section: Item Selection - 8 columns */}
            <div className="lg:col-span-8 space-y-5">
              {/* Search & Filter Bar */}
              <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>
              </Card>

              {/* Category Navigation */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm p-3">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    const isActive = selectedCategory === cat.id
                    
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap
                          ${isActive
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
                          }
                        `}
                      >
                        <Icon className="w-4 h-4" />
                        {cat.name}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {filteredItems.map((item) => {
                  const isOutOfStock = item.availability <= 0
                  const isLowStock = item.availability > 0 && item.availability <= 5
                  
                  return (
                    <Card
                      key={item.id}
                      onClick={() => !isOutOfStock && addItemToOrder(item)}
                      className={`
                        group border bg-white dark:bg-slate-900 transition-all duration-200
                        ${isOutOfStock 
                          ? 'opacity-50 cursor-not-allowed border-slate-200 dark:border-slate-800' 
                          : 'cursor-pointer hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-950/50 hover:-translate-y-0.5 border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                        }
                      `}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center gap-1.5">
                              <Package className="w-3 h-3 text-slate-400" />
                              <span className={`text-xs font-medium ${
                                isOutOfStock 
                                  ? 'text-red-600 dark:text-red-400' 
                                  : isLowStock 
                                  ? 'text-amber-600 dark:text-amber-400' 
                                  : 'text-slate-500 dark:text-slate-400'
                              }`}>
                                {isOutOfStock ? 'Out of Stock' : `${item.availability} in stock`}
                              </span>
                            </div>
                          </div>
                          {isOutOfStock && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900">
                              Unavailable
                            </span>
                          )}
                          {isLowStock && !isOutOfStock && (
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200 dark:border-amber-900">
                              Low
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                          <div>
                            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
                              ¢{item.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">per unit</p>
                          </div>
                          {!isOutOfStock && (
                            <button className="w-8 h-8 flex items-center justify-center bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-all duration-200 shadow-sm">
                              <Plus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>

              {/* Empty State */}
              {filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    No items found
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>

            {/* Right Section: Order Cart - 4 columns */}
            <div className="lg:col-span-4">
              <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg sticky top-24">
                {/* Order Header */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-850/30">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Current Order</span>
                      </div>
                      <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                        {currentOrderId}
                      </p>
                    </div>
                    {orderItems.length > 0 && (
                      <button
                        onClick={clearOrder}
                        className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline transition-colors"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date().toLocaleTimeString()}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5 space-y-3 max-h-[500px] overflow-y-auto">
                  {orderItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <ShoppingCart className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        No items in cart
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Select items to begin order
                      </p>
                    </div>
                  ) : (
                    orderItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              ¢{item.price.toFixed(2)} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeItemFromOrder(item.id)}
                            className="p-1 hover:bg-red-50 dark:hover:bg-red-950/30 rounded transition-colors group"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3 text-slate-700 dark:text-slate-300" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            ¢{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Order Summary */}
                <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4 bg-slate-50/50 dark:bg-slate-850/30">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Subtotal ({totalItems} items)</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        ¢{totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Tax (0%)</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">¢0.00</span>
                    </div>
                    <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-base font-semibold text-slate-900 dark:text-slate-100">Total Amount</span>
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          ¢{totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={submitOrder}
                    disabled={orderItems.length === 0}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 disabled:shadow-none"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete Order
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Order History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-850/30">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {selectedHistoryOrder ? 'Order Details' : 'Order History'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedHistoryOrder ? `Viewing ${selectedHistoryOrder.id}` : 'View all completed orders'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowHistory(false)
                  setSelectedHistoryOrder(null)
                }}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-100px)]">
              {selectedHistoryOrder ? (
                // Order Details View
                <div className="space-y-5">
                  <button
                    onClick={() => setSelectedHistoryOrder(null)}
                    className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Back to all orders
                  </button>
                  
                  <div className="p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <p className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                          {selectedHistoryOrder.id}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="w-3 h-3" />
                          {selectedHistoryOrder.date}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                        {selectedHistoryOrder.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-5">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                        Order Items
                      </p>
                      {selectedHistoryOrder.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-0.5">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              ¢{item.price.toFixed(2)} × {item.quantity}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            ¢{item.total.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Total Items
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {selectedHistoryOrder.totalItems}
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-base font-semibold text-slate-900 dark:text-slate-100">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          ¢{selectedHistoryOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Order List View
                <div className="space-y-3">
                  {orderHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <History className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                      </div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        No orders yet
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Completed orders will appear here
                      </p>
                    </div>
                  ) : (
                    orderHistory.map((order) => (
                      <div
                        key={order.id}
                        onClick={() => setSelectedHistoryOrder(order)}
                        className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-950/50 transition-colors">
                              <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm mb-0.5">
                                {order.id}
                              </p>
                              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                                <Clock className="w-3 h-3" />
                                {order.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                              {order.status}
                            </span>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-3 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-slate-600 dark:text-slate-400">
                            {order.totalItems} items
                          </span>
                          <span className="font-bold text-slate-900 dark:text-slate-100">
                            ¢{order.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}