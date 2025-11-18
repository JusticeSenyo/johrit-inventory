import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  description?: string
  stat: string | number
  change?: number
  trend?: "up" | "down"
}

export function AnalyticsCard({ title, description, stat, change, trend }: AnalyticsCardProps) {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        </div>

        <div className="flex items-end justify-between">
          <div className="text-3xl font-bold text-foreground">{stat}</div>
          {change !== undefined && trend && (
            <div
              className={`flex items-center gap-1 text-xs font-semibold ${
                trend === "up" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {Math.abs(change)}%
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
