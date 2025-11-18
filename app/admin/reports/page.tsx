"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
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
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  BarChart3,

  ChevronDown
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

const monthlyData = [
  { month: "Jan", orders: 400, revenue: 24000, profit: 8000 },
  { month: "Feb", orders: 320, revenue: 14000, profit: 5000 },
  { month: "Mar", orders: 290, revenue: 9800, profit: 3500 },
  { month: "Apr", orders: 200, revenue: 9800, profit: 3200 },
  { month: "May", orders: 279, revenue: 39000, profit: 15000 },
  { month: "Jun", orders: 200, revenue: 9800, profit: 3800 },
]

const categoryData = [
  { category: "Pizza", revenue: 8500 },
  { category: "Salads", revenue: 4200 },
  { category: "Pasta", revenue: 6800 },
  { category: "Seafood", revenue: 9200 },
  { category: "Desserts", revenue: 3100 },
]

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

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
    { id: 'settings', label: 'Settings', icon: Settings ,path: '/admin/settings'},
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

// Analytics Stat Card
function AnalyticsCard({ title, stat, change, trend, icon: Icon }) {
  const isPositive = trend === 'up'
  
  return (
    <Card className="group relative overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            {title}
          </p>
          <h3 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
            {stat}
          </h3>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
              isPositive 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
            }`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {change}%
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              vs last period
            </span>
          </div>
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default function ReportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Calculate totals
  const totalRevenue = monthlyData.reduce((acc, curr) => acc + curr.revenue, 0)
  const totalOrders = monthlyData.reduce((acc, curr) => acc + curr.orders, 0)
  const totalProfit = monthlyData.reduce((acc, curr) => acc + curr.profit, 0)
  const avgOrderValue = totalRevenue / totalOrders

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
                  Business Reports & Analytics
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Comprehensive insights and performance metrics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Last 6 months</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filter</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>
          </div>
        </header> */}

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnalyticsCard
                title="Total Revenue"
                stat={`GH${totalRevenue.toLocaleString()}`}
                change={18}
                trend="up"
                icon={DollarSign}
              />
              <AnalyticsCard
                title="Total Orders"
                stat={totalOrders.toLocaleString()}
                change={12}
                trend="up"
                icon={ShoppingCart}
              />
              <AnalyticsCard
                title="Avg Order Value"
                stat={`GH ${avgOrderValue.toFixed(2)}`}
                change={5}
                trend="up"
                icon={BarChart3}
              />
              <AnalyticsCard
                title="Gross Profit"
                stat={`GH ${totalProfit.toLocaleString()}`}
                change={22}
                trend="up"
                icon={TrendingUp}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Orders Chart */}
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Orders by Month
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Total orders placed per month
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-indigo-500" />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Orders</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 229 229)" className="dark:stroke-neutral-800" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgb(115 115 115)" 
                        tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="rgb(115 115 115)" 
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
                      <Bar dataKey="orders" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Revenue Trend */}
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Revenue Trend
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Monthly revenue performance
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-violet-500" />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Revenue</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 229 229)" className="dark:stroke-neutral-800" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgb(115 115 115)" 
                        tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="rgb(115 115 115)" 
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

              {/* Profit Analysis */}
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                        Profit Margin
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Monthly profit analysis
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Profit</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgb(229 229 229)" className="dark:stroke-neutral-800" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgb(115 115 115)" 
                        tick={{ fill: 'rgb(115 115 115)', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="rgb(115 115 115)" 
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
                      <Bar dataKey="profit" fill="#10b981" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Category Distribution */}
              <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                    Revenue by Category
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Sales distribution across categories
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
                        label={({ category, revenue }) => `${category}: GH ${revenue}`}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="revenue"
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
                          {item.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Monthly Summary Table */}
            <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                  Monthly Performance Summary
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Detailed breakdown of monthly metrics
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Orders
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Revenue
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Profit
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
                        Margin %
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                    {monthlyData.map((row, idx) => (
                      <tr 
                        key={idx} 
                        className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                            {row.month}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm text-neutral-900 dark:text-neutral-100">
                            {row.orders}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                            GH {row.revenue.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            GH {row.profit.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400">
                            {((row.profit / row.revenue) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}