"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ShoppingCart, TrendingUp, Target, Clock } from "lucide-react"

const weeklyData = [
  { day: "Mon", sales: 12, revenue: 1200, target: 1500 },
  { day: "Tue", sales: 15, revenue: 1500, target: 1500 },
  { day: "Wed", sales: 10, revenue: 1000, target: 1500 },
  { day: "Thu", sales: 18, revenue: 1800, target: 1500 },
  { day: "Fri", sales: 22, revenue: 2200, target: 1500 },
  { day: "Sat", sales: 28, revenue: 2800, target: 1500 },
  { day: "Sun", sales: 20, revenue: 2000, target: 1500 },
]

export default function SalesDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
          <p className="text-muted-foreground mt-2">Your weekly performance and targets</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Orders This Week"
            value="155"
            icon={ShoppingCart}
            change={18}
            changeLabel="vs last week"
            color="primary"
          />
          <StatCard
            label="Revenue"
            value="$12.5K"
            icon={TrendingUp}
            change={22}
            changeLabel="vs last week"
            color="chart-1"
          />
          <StatCard label="Target Progress" value="87%" icon={Target} change={5} changeLabel="to goal" color="accent" />
          <StatCard
            label="Avg Order Value"
            value="$80.65"
            icon={Clock}
            change={8}
            changeLabel="vs last week"
            color="chart-2"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales vs Target */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Sales vs Target</h2>
              <p className="text-sm text-muted-foreground">Weekly performance comparison</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="sales" fill="hsl(var(--chart-1))" />
                <Bar dataKey="target" fill="hsl(var(--muted))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue Trend */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Revenue Trend</h2>
              <p className="text-sm text-muted-foreground">Daily revenue this week</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  fill="hsl(var(--chart-2))"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Performers */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Menu Items</h2>
          <div className="space-y-3">
            {[
              { name: "Margherita Pizza", count: 45, revenue: "$360" },
              { name: "Grilled Salmon", count: 32, revenue: "$512" },
              { name: "Caesar Salad", count: 28, revenue: "$140" },
              { name: "Pasta Carbonara", count: 25, revenue: "$200" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.count} orders</p>
                </div>
                <p className="font-semibold text-primary">{item.revenue}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
