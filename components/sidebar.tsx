"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { navigationConfig } from "@/lib/navigation-config"
import { cn } from "@/lib/utils"
import { LogOut, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import router from "next/router"

export function Sidebar() {
  const { user, logout } = useAuth()
  const pathname = usePathname()


  const handleLogout = () => {
  logout()
  router.push("/")   // or any path
}

  // Only show for admin users
  if (!user || user.role !== "admin") return null

  const config = navigationConfig.admin

  const isActive = (href: string) => {
    if (href === pathname) return true
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}
      <div className="border-b border-sidebar-border p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <div className="font-semibold text-sidebar-foreground">RestaurantOS</div>
            <div className="text-xs text-sidebar-foreground/60">Admin</div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {config.main.map((item) => (
          <Link key={item.href} href={item.href}>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive(item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
            </button>
          </Link>
        ))}
      </nav>

      {/* Secondary Navigation */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {config.secondary.map((item) => (
          <Link key={item.href} href={item.href}>
            <button
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200",
                isActive(item.href)
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          </Link>
        ))}

        {/* Logout Button */}
        <Button 
          onClick={handleLogout} 
          variant="outline" 
          size="sm" 
          className="w-full gap-2 mt-2 bg-transparent"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </aside>
  )
}
