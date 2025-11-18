"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Plus, 
  Trash2,
  Menu,
  Home,
  Package,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Search,
  Eye,
  MoreVertical,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const initialOrdersData = [
  { id: "ORD-001", customer: "John Smith", items: 3, total: "GH 45.99", status: "Completed", date: "2024-01-15" },
  { id: "ORD-002", customer: "Sarah Johnson", items: 5, total: "GH 89.50", status: "Pending", date: "2024-01-16" },
  { id: "ORD-003", customer: "Mike Chen", items: 2, total: "GH 32.00", status: "Processing", date: "2024-01-16" },
  { id: "ORD-004", customer: "Emma Davis", items: 4, total: "GH 67.25", status: "Completed", date: "2024-01-14" },
  { id: "ORD-005", customer: "Alex Wilson", items: 1, total: "GH 15.99", status: "Cancelled", date: "2024-01-13" },
  { id: "ORD-006", customer: "Lisa Brown", items: 6, total: "GH 125.50", status: "Completed", date: "2024-01-15" },
  { id: "ORD-007", customer: "David Lee", items: 3, total: "GH 58.75", status: "Processing", date: "2024-01-16" },
  { id: "ORD-008", customer: "Maria Garcia", items: 2, total: "GH 42.00", status: "Pending", date: "2024-01-16" },
]

// Zoho-style Sidebar Component
function ZohoSidebar({ isOpen, setIsOpen }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
    { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' },
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { id: 'users', label: 'users', icon: Users , path: '/admin/users'},
    { id: 'reports', label: 'reports', icon: Users , path: '/admin/reports'},
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ]

  const handleLogout = () => {
    router.push("/")
  }

  const isActiveItem = (itemPath) => {
    return pathname === itemPath
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 z-50
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-0 lg:w-20'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800">
            {isOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RM</span>
                </div>
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Restaurant
                </span>
              </div>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              )}
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = isActiveItem(item.path)
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => router.push(item.path)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' 
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        }
                        ${!isOpen && 'justify-center'}
                      `}
                    >
                      <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                      {isOpen && (
                        <span className="font-medium text-sm">{item.label}</span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
            <button 
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
                text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30
                ${!isOpen && 'justify-center'}
              `}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

// Add Order Modal
function AddOrderModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    customer: '',
    items: '',
    total: ''
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (formData.customer && formData.items && formData.total) {
      onSubmit(formData)
      setFormData({ customer: '', items: '', total: '' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create New Order
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Add a new order to the system
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., John Smith"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Number of Items
            </label>
            <input
              type="number"
              value={formData.items}
              onChange={(e) => setFormData({...formData, items: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Total Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.total}
              onChange={(e) => setFormData({...formData, total: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="45.99"
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium shadow-sm"
            >
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [ordersData, setOrdersData] = useState(initialOrdersData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = ordersData.filter((order) => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddOrder = (formData) => {
    const now = new Date()
    const date = now.toISOString().split("T")[0]
    const newOrder = {
      id: `ORD-${String(ordersData.length + 1).padStart(3, "0")}`,
      customer: formData.customer,
      items: parseInt(formData.items),
      total: `GH ${parseFloat(formData.total).toFixed(2)}`,
      status: "Pending",
      date,
    }
    setOrdersData([newOrder, ...ordersData])
    setIsAddModalOpen(false)
  }

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrdersData(ordersData.filter((order) => order.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "Pending":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      case "Processing":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "Cancelled":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-3 h-3" />
      case "Pending":
        return <Clock className="w-3 h-3" />
      case "Processing":
        return <Clock className="w-3 h-3" />
      case "Cancelled":
        return <XCircle className="w-3 h-3" />
      default:
        return null
    }
  }

  // Calculate stats
  const totalOrders = ordersData.length
  const completedOrders = ordersData.filter(order => order.status === "Completed").length
  const pendingOrders = ordersData.filter(order => order.status === "Pending").length
  const totalRevenue = ordersData.reduce((sum, order) => sum + parseFloat(order.total.replace('GH ', '')), 0)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <ZohoSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content Area */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}
      `}>
        {/* Top Header */}
        {/* <header className="sticky top-0 z-30 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              Mobile Menu Button
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Orders Management
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  View and manage all customer orders
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create Order</span>
              </button>
            </div>
          </div>
        </header> */}

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Total Orders</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{totalOrders}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <ShoppingCart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Completed</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{completedOrders}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Pending</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{pendingOrders}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">GH {totalRevenue.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
                    <DollarSign className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Search Bar */}
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search orders by ID or customer name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </Card>

            {/* Orders Table */}
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {filteredData.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                            {order.id}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 flex items-center justify-center">
                              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {order.customer}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {order.items} items
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            {order.total}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Calendar className="w-4 h-4" />
                            {order.date}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors group"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="p-2 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors group"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-red-600 dark:group-hover:text-red-400" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Empty State */}
              {filteredData.length === 0 && (
                <div className="py-16 text-center">
                  <ShoppingCart className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    No orders found
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Try adjusting your search or create a new order
                  </p>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOrder}
      />
    </div>
  )
}