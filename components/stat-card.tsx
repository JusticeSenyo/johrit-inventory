import type { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  change?: number
  changeLabel?: string
  color?: "primary" | "accent" | "chart-1" | "chart-2"
}

export function StatCard({ label, value, icon: Icon, change, changeLabel, color = "primary" }: StatCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    "chart-1": "bg-[hsl(var(--chart-1)_/_0.1)] text-[hsl(var(--chart-1))]",
    "chart-2": "bg-[hsl(var(--chart-2)_/_0.1)] text-[hsl(var(--chart-2))]",
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {change !== undefined && (
            <p
              className={`text-xs font-medium ${change >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {change >= 0 ? "+" : ""}
              {change}% {changeLabel || "from last month"}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  )
}
