"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-context"
import { useAuth } from "@/lib/auth-context"
import { Moon, Sun, User, LogOut } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your preferences</p>
        </div>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Appearance</h2>
          <div className="flex gap-2">
            {["light", "dark", "system"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  theme === t ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {t === "light" && <Sun className="w-4 h-4" />}
                {t === "dark" && <Moon className="w-4 h-4" />}
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6 border-red-200 dark:border-red-900/50">
          <h2 className="text-lg font-semibold text-foreground mb-4">Session</h2>
          <Button onClick={logout} variant="destructive" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </Card>
      </div>
    </DashboardLayout>
  )
}
