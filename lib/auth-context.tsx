"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export type UserRole = "admin" | "pos" | "chef"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  loginRole: UserRole | null
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  switchRole: (role: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loginRole, setLoginRole] = useState<UserRole | null>(null)

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    setLoginRole(role)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))

    const demoUser: User = {
      id: "1",
      name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
      email,
      role,
      avatar: `https://avatar.vercel.sh/${email}`,
    }

    setUser(demoUser)
    setIsLoading(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setLoginRole(null)
  }, [])

  const switchRole = useCallback((role: UserRole) => {
    setUser((prev) => (prev ? { ...prev, role } : null))
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, loginRole, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
