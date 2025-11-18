"use client"

import { PosLayout } from "@/components/pos-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "@/lib/theme-context"

export default function POSSettingsPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <PosLayout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground mt-2">Manage your POS preferences</p>
          </div>

          {/* Profile Section */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">STAFF NAME</p>
                <p className="text-foreground">{user?.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">EMAIL</p>
                <p className="text-foreground">{user?.email}</p>
              </div>
            </div>
          </Card>

          {/* Preferences Section */}
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark mode</p>
              </div>
              <Button variant="outline" onClick={toggleTheme}>
                {theme === "dark" ? "Light" : "Dark"}
              </Button>
            </div>
          </Card>

          {/* Logout Section */}
          <Card className="p-6">
            <p className="font-medium text-foreground mb-4">Session</p>
            <Button
              variant="destructive"
              onClick={() => {
                logout()
              }}
              className="w-full"
            >
              Logout
            </Button>
          </Card>
        </div>
      </div>
    </PosLayout>
  )
}
