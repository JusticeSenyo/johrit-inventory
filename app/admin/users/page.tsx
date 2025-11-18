"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { 
  Plus, 
  Edit2,
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
  Mail,
  Calendar,
  Shield,
  UserCheck,
  UserX,
  Crown,
  ChefHat,
  Briefcase
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const usersData = [
  {
    id: 1,
    name: "Alice Manager",
    email: "alice@restaurant.com",
    role: "Admin",
    status: "Active",
    joined: "2023-01-15",
  },
  { 
    id: 2, 
    name: "Bob Sales", 
    email: "bob@restaurant.com", 
    role: "Sales", 
    status: "Active", 
    joined: "2023-02-20" 
  },
  { 
    id: 3, 
    name: "Chef Carlos", 
    email: "carlos@restaurant.com", 
    role: "Chef", 
    status: "Active", 
    joined: "2023-03-10" 
  },
  {
    id: 4,
    name: "Diana Support",
    email: "diana@restaurant.com",
    role: "Sales",
    status: "Inactive",
    joined: "2023-04-05",
  },
  { 
    id: 5, 
    name: "Eve Kitchen", 
    email: "eve@restaurant.com", 
    role: "Chef", 
    status: "Active", 
    joined: "2023-05-12" 
  },
  { 
    id: 6, 
    name: "Frank Manager", 
    email: "frank@restaurant.com", 
    role: "Admin", 
    status: "Active", 
    joined: "2023-06-18" 
  },
]

// Zoho-style Sidebar Component
function ZohoSidebar({ isOpen, setIsOpen }) {
  const router = useRouter()
  const pathname = usePathname()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home,path: '/admin' },
    { id: 'inventory', label: 'Inventory', icon: Package ,path: '/admin/inventory'},
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { id: 'users', label: 'users', icon: Users , path: '/admin/users'},
    { id: 'reports', label: 'reports', icon: Users , path: '/admin/reports'},
    { id: 'settings', label: 'Settings', icon: Settings ,path: '/admin/reports'},
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

// Add User Modal
function AddUserModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Sales'
  })

  if (!isOpen) return null

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      onSubmit(formData)
      setFormData({ name: '', email: '', role: 'Sales' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-2xl max-w-md w-full border border-neutral-200 dark:border-neutral-800">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Add New User
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Add a new team member to the system
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="e.g., John Doe"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="john@restaurant.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="Admin">Admin</option>
              <option value="Sales">Sales</option>
              <option value="Chef">Chef</option>
            </select>
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
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [users, setUsers] = useState(usersData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredData = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddUser = (formData) => {
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: "Active",
      joined: new Date().toISOString().split('T')[0],
    }
    setUsers([...users, newUser])
    setIsAddModalOpen(false)
  }

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400"
      case "Sales":
        return "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400"
      case "Chef":
        return "bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400"
      default:
        return "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return <Crown className="w-3 h-3" />
      case "Sales":
        return <Briefcase className="w-3 h-3" />
      case "Chef":
        return <ChefHat className="w-3 h-3" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    return status === "Active"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
      : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
  }

  const getStatusIcon = (status) => {
    return status === "Active" 
      ? <UserCheck className="w-3 h-3" />
      : <UserX className="w-3 h-3" />
  }

  // Calculate stats
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.status === "Active").length
  const adminCount = users.filter(u => u.role === "Admin").length
  const inactiveUsers = users.filter(u => u.status === "Inactive").length

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
                  Team Management
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Manage team members and their roles
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
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add User</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Total Users</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{totalUsers}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                    <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Active Users</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{activeUsers}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                    <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Admins</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{adminCount}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30">
                    <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </Card>

              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">Inactive</p>
                    <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">{inactiveUsers}</h3>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900">
                    <UserX className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
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
                  placeholder="Search users by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </Card>

            {/* Users Table */}
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {filteredData.map((user) => (
                      <tr 
                        key={user.id} 
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 flex items-center justify-center">
                              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Mail className="w-4 h-4" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {getRoleIcon(user.role)}
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)}
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Calendar className="w-4 h-4" />
                            {user.joined}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors group"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
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
                  <Users className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                    No users found
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Try adjusting your search or add a new user
                  </p>
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
      />
    </div>
  )
}