"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  ChevronDown, 
  Download, 
  Filter, 
  Calendar,
  Menu,
  Home,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

const chartData = [
  { name: "Mon", sales: 4000, orders: 24, revenue: 2400 },
  { name: "Tue", sales: 3000, orders: 19, revenue: 2210 },
  { name: "Wed", sales: 2000, orders: 29, revenue: 2290 },
  { name: "Thu", sales: 2780, orders: 20, revenue: 2000 },
  { name: "Fri", sales: 1890, orders: 28, revenue: 2181 },
  { name: "Sat", sales: 2390, orders: 40, revenue: 2500 },
  { name: "Sun", sales: 3490, orders: 43, revenue: 2100 },
]

const categoryData = [
  { name: "Vegetables", value: 35 },
  { name: "Meat", value: 25 },
  { name: "Dairy", value: 20 },
  { name: "Grains", value: 20 },
]

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b"]
// const router = useRouter()

// const handleLogout = () => {
//   // TODO: add your auth logout logic here
//   // e.g., clear tokens, reset auth context, etc.

//   router.push("/") // Navigate to homepage
// }



// Zoho-style Stat Card Component
function ZohoStatCard({ label, value, icon: Icon, change, changeLabel, color }) {
  const isPositive = change > 0
  
  return (
    <Card className="group relative overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
              {label}
            </p>
            <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              {value}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                isPositive 
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                  : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
              }`}>
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-500">
                {changeLabel}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-xl bg-gradient-to-br ${
            color === 'primary' ? 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30' :
            color === 'chart-1' ? 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30' :
            color === 'accent' ? 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30' :
            'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30'
          } group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-6 h-6 ${
              color === 'primary' ? 'text-indigo-600 dark:text-indigo-400' :
              color === 'chart-1' ? 'text-violet-600 dark:text-violet-400' :
              color === 'accent' ? 'text-pink-600 dark:text-pink-400' :
              'text-orange-600 dark:text-orange-400'
            }`} />
          </div>
        </div>
      </div>
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
        color === 'primary' ? 'from-blue-500 to-indigo-500' :
        color === 'chart-1' ? 'from-purple-500 to-violet-500' :
        color === 'accent' ? 'from-pink-500 to-rose-500' :
        'from-amber-500 to-orange-500'
      } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
    </Card>
  )
}

// Zoho-style Sidebar Component
function ZohoSidebar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState('dashboard')

    const router = useRouter();

  // Define handleLogout inside the component
  const handleLogout = () => {
    // TODO: add your logout logic (clear auth, localStorage, cookies etc.)
    router.push("/"); // redirect to homepage
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home,path: '/admin' },
    { id: 'inventory', label: 'Inventory', icon: Package ,path: '/admin/inventory'},
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { id: 'users', label: 'users', icon: Users , path: '/admin/users'},
    { id: 'reports', label: 'reports', icon: Users , path: '/admin/reports'},
    { id: 'settings', label: 'Settings', icon: Settings ,path: '/admin/reports'},
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
                      onClick={() => {setActiveItem(item.id);
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
            <button 
             onClick={handleLogout}
            className={`
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

// Zoho-style Dashboard Layout
function ZohoDashboardLayout({ children, sidebarOpen, setSidebarOpen }) {
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
              
              <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                Restaurant Management
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Last 7 days</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </header> */}

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <ZohoDashboardLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
              Dashboard Overview
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Monitor your restaurant's key metrics and performance
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ZohoStatCard
            label="Total Orders"
            value="1,234"
            icon={ShoppingCart}
            change={12}
            changeLabel="vs last month"
            color="primary"
          />
          <ZohoStatCard
            label="Inventory Items"
            value="584"
            icon={Package}
            change={-2}
            changeLabel="vs last month"
            color="chart-1"
          />
          <ZohoStatCard
            label="Active Users"
            value="342"
            icon={Users}
            change={8}
            changeLabel="vs last month"
            color="accent"
          />
          <ZohoStatCard
            label="Revenue"
            value="GH 45.2K"
            icon={TrendingUp}
            change={15}
            changeLabel="vs last month"
            color="chart-2"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <Card className="lg:col-span-2 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    Weekly Sales Performance
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sales trend over the last 7 days
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                    <div className="w-3 h-3 rounded-full bg-indigo-500" />
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Sales</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 229 229)" className="dark:stroke-neutral-800" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgb(115 115 115)" 
                    className="dark:stroke-neutral-500"
                    tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgb(115 115 115)" 
                    className="dark:stroke-neutral-500"
                    tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid rgb(229 229 229)",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    cursor={{ fill: 'rgb(249 250 251)' }}
                  />
                  <Bar 
                    dataKey="sales" 
                    fill="#6366f1" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Category Distribution */}
          <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                Inventory Distribution
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Stock by category
              </p>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name} ${value}%`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="white"
                    strokeWidth={2}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Revenue Trend Analysis
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Daily revenue performance over 7 days
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-violet-500" />
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Revenue</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 229 229)" className="dark:stroke-neutral-800" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgb(115 115 115)" 
                  className="dark:stroke-neutral-500"
                  tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                />
                <YAxis 
                  stroke="rgb(115 115 115)" 
                  className="dark:stroke-neutral-500"
                  tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid rgb(229 229 229)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", r: 5, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </ZohoDashboardLayout>
  )
}