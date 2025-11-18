import { LayoutDashboard, Package, UtensilsCrossed, ShoppingCart, BarChart3, Users, Settings, Type as type, type LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
}

export interface NavConfig {
  main: NavItem[]
  secondary: NavItem[]
}

export const navigationConfig: Record<string, NavConfig> = {
  admin: {
    main: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Inventory", href: "/admin/inventory", icon: Package },
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Users", href: "/admin/users", icon: Users },
      { label: "Reports", href: "/admin/reports", icon: BarChart3 },
    ],
    secondary: [{ label: "Settings", href: "/admin/settings", icon: Settings }],
  },
  pos: {
    main: [
      { label: "New Order", href: "/pos", icon: ShoppingCart },
      { label: "Order History", href: "/pos/history", icon: BarChart3 },
    ],
    secondary: [{ label: "Settings", href: "/pos/settings", icon: Settings }],
  },
  chef: {
    main: [
      { label: "Kitchen Orders", href: "/chef", icon: UtensilsCrossed },
    ],
    secondary: [],
  },
}
