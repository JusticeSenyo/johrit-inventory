"use client"

import { useState } from "react"
import { 
  Home,
  Package,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useRouter } from "next/navigation" // use next/navigation for app router

export default function ZohoSidebar({ isOpen, setIsOpen }) {
  const [activeItem, setActiveItem] = useState('inventory')
  const router = useRouter()

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
    { id: 'inventory', label: 'Inventory', icon: Package, path: '/admin/inventory' },
    { id: 'orders', label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    { id: 'customers', label: 'Customers', icon: Users, path: '/admin/customers' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
  ]

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

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
                      onClick={() => {
                        setActiveItem(item.id)
                        router.push(item.path)
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
                      {isOpen && <span className="font-medium text-sm">{item.label}</span>}
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
