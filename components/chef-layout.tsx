"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon, LogOut } from 'lucide-react'
import { useTheme } from "@/lib/theme-context"

export function ChefLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    if (user === null && typeof window !== "undefined") {
      if (!window.location.pathname.includes("/login")) {
        router.push("/")
      }
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kitchen Management</h1>
            <p className="text-sm text-muted-foreground">Manage incoming orders</p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-muted text-sm font-medium text-foreground">
              {user.name || "Chef"}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                logout()
                router.push("/login")
              }}
              className="text-muted-foreground hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
