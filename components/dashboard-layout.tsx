"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (user === null && typeof window !== "undefined") {
      // Check if we're not on the login page
      if (!window.location.pathname.includes("/")) {
        router.push("/")
      }
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
