"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

async function getSalesReportsData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/reports/sales`, {
      next: { revalidate: 3600 },
    })

    const performanceData = response.ok
      ? await response.json()
      : [
          { week: "Week 1", revenue: 8500, orders: 95, target: 9000 },
          { week: "Week 2", revenue: 9200, orders: 102, target: 9000 },
          { week: "Week 3", revenue: 8800, orders: 98, target: 9000 },
          { week: "Week 4", revenue: 10200, orders: 112, target: 9000 },
        ]

    return performanceData
  } catch (error) {
    console.error("Failed to fetch sales reports data:", error)
    return [
      { week: "Week 1", revenue: 8500, orders: 95, target: 9000 },
      { week: "Week 2", revenue: 9200, orders: 102, target: 9000 },
      { week: "Week 3", revenue: 8800, orders: 98, target: 9000 },
      { week: "Week 4", revenue: 10200, orders: 112, target: 9000 },
    ]
  }
}

export default async function SalesReportsPage() {
  const performanceData = await getSalesReportsData()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Reports</h1>
          <p className="text-muted-foreground mt-1">Performance metrics and trends</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Report */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Monthly Revenue</h2>
              <p className="text-sm text-muted-foreground">Revenue vs target</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
                <Bar dataKey="target" fill="hsl(var(--muted))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Orders Trend */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Orders Trend</h2>
              <p className="text-sm text-muted-foreground">Weekly order volume</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-2))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
