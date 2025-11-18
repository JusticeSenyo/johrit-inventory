"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
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
  Save,
  Bell,
  Lock,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sun,
  Moon,
  Monitor,
  Check,
  Shield,
  CreditCard,
  Palette,
  Languages,
  Clock
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

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

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('general')
  const [theme, setTheme] = useState('light')
  const [isSaving, setIsSaving] = useState(false)

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    restaurantName: 'Restaurant Manager',
    email: 'info@restaurant.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, City, State 12345',
    website: 'www.restaurant.com',
    timezone: 'UTC-5 (EST)',
    language: 'English'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    inventoryAlerts: true,
    systemUpdates: false,
    marketingEmails: false
  })

  const tabs = [
    { id: 'general', label: 'General', icon: Building2 },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ]

  const themeOptions = [
    { id: 'light', label: 'Light', icon: Sun, description: 'Light mode' },
    { id: 'dark', label: 'Dark', icon: Moon, description: 'Dark mode' },
    { id: 'system', label: 'System', icon: Monitor, description: 'Follow system' }
  ]

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Settings saved successfully!')
  }

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark')
    } else {
      // System preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

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
                  Settings
                </h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 hidden sm:block">
                  Manage your account and preferences
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar Tabs */}
              <Card className="lg:col-span-1 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 h-fit">
                <nav className="p-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 mb-1
                          ${isActive 
                            ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400' 
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }
                        `}
                      >
                        <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />
                        <span className="font-medium text-sm">{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </Card>

              {/* Content Area */}
              <div className="lg:col-span-3 space-y-6">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      General Settings
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      Update your restaurant information
                    </p>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Building2 className="w-4 h-4" />
                            Restaurant Name
                          </label>
                          <input
                            type="text"
                            value={generalSettings.restaurantName}
                            onChange={(e) => setGeneralSettings({...generalSettings, restaurantName: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Mail className="w-4 h-4" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={generalSettings.email}
                            onChange={(e) => setGeneralSettings({...generalSettings, email: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Phone className="w-4 h-4" />
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={generalSettings.phone}
                            onChange={(e) => setGeneralSettings({...generalSettings, phone: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Globe className="w-4 h-4" />
                            Website
                          </label>
                          <input
                            type="text"
                            value={generalSettings.website}
                            onChange={(e) => setGeneralSettings({...generalSettings, website: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Clock className="w-4 h-4" />
                            Timezone
                          </label>
                          <select
                            value={generalSettings.timezone}
                            onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          >
                            <option>UTC-5 (EST)</option>
                            <option>UTC-6 (CST)</option>
                            <option>UTC-7 (MST)</option>
                            <option>UTC-8 (PST)</option>
                          </select>
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            <Languages className="w-4 h-4" />
                            Language
                          </label>
                          <select
                            value={generalSettings.language}
                            onChange={(e) => setGeneralSettings({...generalSettings, language: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          >
                            <option>English</option>
                            <option>Spanish</option>
                            <option>French</option>
                            <option>German</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                          <MapPin className="w-4 h-4" />
                          Address
                        </label>
                        <textarea
                          value={generalSettings.address}
                          onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>
                    </div>
                  </Card>
                )}

                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Appearance
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      Customize how the application looks
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4 block">
                          Theme Mode
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {themeOptions.map((option) => {
                            const Icon = option.icon
                            const isActive = theme === option.id
                            
                            return (
                              <button
                                key={option.id}
                                onClick={() => handleThemeChange(option.id)}
                                className={`
                                  relative p-6 rounded-xl border-2 transition-all duration-200 text-left
                                  ${isActive 
                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30' 
                                    : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
                                  }
                                `}
                              >
                                {isActive && (
                                  <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <Check className="w-4 h-4 text-white" />
                                  </div>
                                )}
                                <Icon className={`w-8 h-8 mb-3 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-neutral-600 dark:text-neutral-400'}`} />
                                <h3 className={`font-semibold mb-1 ${isActive ? 'text-indigo-900 dark:text-indigo-100' : 'text-neutral-900 dark:text-neutral-100'}`}>
                                  {option.label}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                  {option.description}
                                </p>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="p-4 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          <strong className="text-neutral-900 dark:text-neutral-100">Current theme:</strong> {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                          Theme changes apply immediately and are saved to your browser.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      Manage how you receive notifications
                    </p>

                    <div className="space-y-4">
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                        { key: 'orderAlerts', label: 'Order Alerts', description: 'Get notified about new orders' },
                        { key: 'inventoryAlerts', label: 'Inventory Alerts', description: 'Low stock warnings' },
                        { key: 'systemUpdates', label: 'System Updates', description: 'Updates about new features' },
                        { key: 'marketingEmails', label: 'Marketing Emails', description: 'Promotional content and tips' }
                      ].map((setting) => (
                        <div key={setting.key} className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors">
                          <div>
                            <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                              {setting.label}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {setting.description}
                            </p>
                          </div>
                          <button
                            onClick={() => setNotificationSettings({
                              ...notificationSettings,
                              [setting.key]: !notificationSettings[setting.key]
                            })}
                            className={`
                              relative w-12 h-6 rounded-full transition-colors duration-200
                              ${notificationSettings[setting.key] ? 'bg-indigo-600' : 'bg-neutral-300 dark:bg-neutral-700'}
                            `}
                          >
                            <span className={`
                              absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200
                              ${notificationSettings[setting.key] ? 'translate-x-6' : 'translate-x-0.5'}
                            `} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Security Settings
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      Manage your account security
                    </p>

                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 block">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        />
                      </div>

                      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors">
                        Update Password
                      </button>
                    </div>
                  </Card>
                )}

                {/* Billing Settings */}
                {activeTab === 'billing' && (
                  <Card className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                      Billing & Subscription
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      Manage your subscription and payment methods
                    </p>

                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl border border-indigo-200 dark:border-indigo-900">
                        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          Current Plan: Professional
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                          $49/month • Renews on Dec 15, 2024
                        </p>
                        <button className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors">
                          Upgrade Plan
                        </button>
                      </div>

                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-neutral-100 mb-4">
                          Payment Methods
                        </h3>
                        <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                              <CreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900 dark:text-neutral-100">
                                •••• •••• •••• 4242
                              </p>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                Expires 12/2025
                              </p>
                            </div>
                          </div>
                          <button className="px-3 py-1.5 text-sm font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}