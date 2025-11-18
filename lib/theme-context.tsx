"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = (localStorage.getItem("theme") as Theme) || "system"
    setThemeState(stored)
    updateTheme(stored)
  }, [])

  const updateTheme = (newTheme: Theme) => {
    const html = document.documentElement
    let shouldBeDark = false

    if (newTheme === "system") {
      shouldBeDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } else {
      shouldBeDark = newTheme === "dark"
    }

    if (shouldBeDark) {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
    setIsDark(shouldBeDark)
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem("theme", newTheme)
    updateTheme(newTheme)
  }

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return children
  }

  return <ThemeContext.Provider value={{ theme, setTheme, isDark }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
