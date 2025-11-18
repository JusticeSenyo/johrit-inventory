"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChefHat, ShoppingCart, Settings } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/${user.role}`)
    }
  }, [user, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-12 max-w-2xl">
          {/* Logo */}
          <div className="space-y-4">
            <div className="w-20 h-20 rounded-lg bg-primary flex items-center justify-center mx-auto">
              <ChefHat className="w-12 h-12 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">RestaurantOS</h1>
              <p className="text-muted-foreground">Role-Based Management System</p>
            </div>
          </div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin Login */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Admin</h3>
                <p className="text-sm text-muted-foreground mt-1">Manage everything</p>
              </div>
              <Button onClick={() => router.push("/admin/login")} variant="outline" className="w-full">
                Admin Login
              </Button>
            </div>

            {/* POS Login */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">POS</h3>
                <p className="text-sm text-muted-foreground mt-1">Place orders</p>
              </div>
              <Button onClick={() => router.push("/pos/login")} variant="outline" className="w-full">
                POS Login
              </Button>
            </div>

            {/* Chef Login */}
            <div className="bg-card rounded-lg border border-border p-6 space-y-4 hover:border-primary transition-colors">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Chef</h3>
                <p className="text-sm text-muted-foreground mt-1">Prepare orders</p>
              </div>
              <Button onClick={() => router.push("/chef/login")} variant="outline" className="w-full">
                Chef Login
              </Button>
            </div>
          </div>

          {/* Demo Info */}
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground">
              Use any email and any password to log in. This is a demo environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
