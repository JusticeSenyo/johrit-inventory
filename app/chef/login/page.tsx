"use client"

import type React from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChefHat } from 'lucide-react'

export default function ChefLoginPage() {
  const { user, login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (user && user.role === "chef") {
      router.push("/chef")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password, "chef")
    } catch (err) {
      setError("Login failed. Please try again.")
      console.error("Login failed:", err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card">
      <div className="w-full max-w-md">
        <div className="space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-lg bg-orange-600 flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Chef Login</h1>
            <p className="text-muted-foreground mt-2">Kitchen Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@restaurant.com"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-600"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-orange-600"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
              {isLoading ? "Signing in..." : "Chef Sign In"}
            </Button>
          </form>

          {/* Back Button */}
          <div className="text-center">
            <Button variant="ghost" onClick={() => router.push("/")} className="text-muted-foreground">
              Back to Role Selection
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
