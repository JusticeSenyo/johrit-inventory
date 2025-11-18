"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Menu } from 'lucide-react'
import { useTheme } from "@/lib/theme-context"
import { navigationConfig } from "@/lib/navigation-config"
import Link from "next/link"

export function PosLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (!user) {
      router.push("/")
    }
  }, [user, router])

  if (!user) return null

  const posNavigation = navigationConfig.pos

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b border-border sticky top-0 z-40 bg-card">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">POS System</h1>
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 ml-6">
              {posNavigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Staff Name */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Staff Member</p>
              <p className="font-medium text-foreground">{user.name}</p>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            {/* Logout */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout()
                router.push("/login")
              }}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
