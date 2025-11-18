"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search,
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
  MoreVertical,
  AlertCircle,
  ChevronDown
} from "lucide-react"
import router from "next/router"

const initialInventoryData = [
  { id: 1, name: "Tomatoes", category: "Vegetables", quantity: 150, unit: "kg", price: "GH 2.50", status: "In Stock" },
  { id: 2, name: "Chicken Breast", category: "Meat", quantity: 45, unit: "kg", price: "GH 8.00", status: "In Stock" },
  { id: 3, name: "Mozzarella", category: "Dairy", quantity: 20, unit: "kg", price: "GH 12.00", status: "Low Stock" },
  { id: 4, name: "Olive Oil", category: "Oils", quantity: 5, unit: "L", price: "GH 15.00", status: "Critical" },
  { id: 5, name: "Basil", category: "Herbs", quantity: 8, unit: "bundles", price: "GH 3.50", status: "In Stock" },
  { id: 6, name: "Pasta", category: "Grains", quantity: 80, unit: "kg", price: "GH 1.80", status: "In Stock" },
  { id: 7, name: "Salmon", category: "Seafood", quantity: 12, unit: "kg", price: "GH 18.00", status: "Low Stock" },
  { id: 8, name: "Parmesan", category: "Dairy", quantity: 15, unit: "kg", price: "GH 22.00", status: "In Stock" },
]

// Zoho-style Sidebar Component
function ZohoSidebar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState('inventory')

    const router = useRouter();

  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home,path: '/admin' },
    { id: 'inventory', label: 'Inventory', icon: Package ,path: '/admin/inventory'},
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { id: 'users', label: 'users', icon: Users , path: '/admin/users'},
    { id: 'reports', label: 'reports', icon: Users , path: '/admin/reports'},
    { id: 'settings', label: 'Settings', icon: Settings ,path: '/admin/settings'},
  ]

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
                const isActive = activeItem === item.id
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() =>{ setActiveItem(item.id);
                      router.push(item.path); // navigate to page
                      
                      }}
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
            <button className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
              text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30
              ${!isOpen && 'justify-center'}
            `}>
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

// Add/Edit Inventory Modal
function AddInventoryModal({ isOpen, onClose, onSubmit, editingItem }) {
  const [formData, setFormData] = useState(editingItem || {
    name: '',
    category: '',
    quantity: '',
    unit: '',
    price: ''
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (formData.name && formData.category && formData.quantity && formData.unit && formData.price) {
      onSubmit(formData)
      setFormData({ name: '', category: '', quantity: '', unit: '', price: '' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {editingItem ? 'Update item details' : 'Add a new item to inventory'}
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Item Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., Tomatoes"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Vegetables"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Unit
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="kg"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="100"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="2.50"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium shadow-sm"
            >
              {editingItem ? 'Update' : 'Add Item'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InventoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [inventoryData, setInventoryData] = useState(initialInventoryData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredData = inventoryData.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddItem = (formData) => {
    if (editingItem) {
      setInventoryData(inventoryData.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, price: `GH ${parseFloat(formData.price).toFixed(2)}` }
          : item
      ))
    } else {
      const newItem = {
        id: Math.max(...inventoryData.map((i) => i.id), 0) + 1,
        ...formData,
        price: `GH ${parseFloat(formData.price).toFixed(2)}`,
        status: formData.quantity > 50 ? "In Stock" : formData.quantity > 20 ? "Low Stock" : "Critical",
      }
      setInventoryData([...inventoryData, newItem])
    }
    setIsAddModalOpen(false)
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventoryData(inventoryData.filter((item) => item.id !== id))
    }
  }

  const handleEditItem = (item) => {
    setEditingItem(item)
    setIsAddModalOpen(true)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
      case "Low Stock":
        return "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
      case "Critical":
        return "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400"
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  const getStatusIcon = (status) => {
    if (status === "Critical" || status === "Low Stock") {
      return <AlertCircle className="w-3 h-3" />
    }
    return null
  }

  // Calculate stats
  const totalItems = inventoryData.length
  const lowStockItems = inventoryData.filter(item => item.status === "Low Stock" || item.status === "Critical").length
  const totalValue = inventoryData.reduce((sum, item) => sum + (parseFloat(item.price.replace('GH', '')) * item.quantity), 0)

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
        <header className="sticky top-0 z-30 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 backdrop-blur-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </button>
              
              <div>
                <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                  Inventory Management
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Track and manage your stock levels
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button> */}
              <button 
                onClick={() => {
                  setEditingItem(null)
                  setIsAddModalOpen(true)
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Item</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Total Items</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{totalItems}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Low Stock Alert</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{lowStockItems}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
                    <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Total Value</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">GH {totalValue.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                    <Package className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
                  placeholder="Search inventory by name or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </Card>

            {/* Inventory Table */}
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Item Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {filteredData.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 flex items-center justify-center">
                              <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {item.quantity} {item.unit}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {item.price}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditItem(item)}
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors group"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
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
                  <Package className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    No items found
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Try adjusting your search or add a new item
                  </p>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      <AddInventoryModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setEditingItem(null)
          setIsAddModalOpen(false)
        }}
        onSubmit={handleAddItem}
        editingItem={editingItem}
      />
    </div>
  )
}