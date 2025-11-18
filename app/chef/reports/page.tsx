"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { AnalyticsCard } from "@/components/analytics-card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

async function getChefReportsData() {
  try {
    const dailyResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/reports/kitchen/daily`,
      { next: { revalidate: 3600 } },
    )
    const dishResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/reports/kitchen/dishes`,
      { next: { revalidate: 3600 } },
    )

    const dailyOrderData = dailyResponse.ok
      ? await dailyResponse.json()
      : [
          { day: "Mon", ordersCompleted: 45, avgTime: 12, mistakes: 1 },
          { day: "Tue", ordersCompleted: 52, avgTime: 11, mistakes: 0 },
          { day: "Wed", ordersCompleted: 48, avgTime: 13, mistakes: 2 },
          { day: "Thu", ordersCompleted: 61, avgTime: 10, mistakes: 1 },
          { day: "Fri", ordersCompleted: 68, avgTime: 11, mistakes: 0 },
          { day: "Sat", ordersCompleted: 72, avgTime: 12, mistakes: 1 },
          { day: "Sun", ordersCompleted: 58, avgTime: 12, mistakes: 1 },
        ]

    const dishTypeData = dishResponse.ok
      ? await dishResponse.json()
      : [
          { type: "Pizza", count: 145 },
          { type: "Pasta", count: 98 },
          { type: "Salads", count: 76 },
          { type: "Seafood", count: 82 },
          { type: "Desserts", count: 54 },
        ]

    return { dailyOrderData, dishTypeData }
  } catch (error) {
    console.error("Failed to fetch chef reports data:", error)
    return {
      dailyOrderData: [
        { day: "Mon", ordersCompleted: 45, avgTime: 12, mistakes: 1 },
        { day: "Tue", ordersCompleted: 52, avgTime: 11, mistakes: 0 },
        { day: "Wed", ordersCompleted: 48, avgTime: 13, mistakes: 2 },
        { day: "Thu", ordersCompleted: 61, avgTime: 10, mistakes: 1 },
        { day: "Fri", ordersCompleted: 68, avgTime: 11, mistakes: 0 },
        { day: "Sat", ordersCompleted: 72, avgTime: 12, mistakes: 1 },
        { day: "Sun", ordersCompleted: 58, avgTime: 12, mistakes: 1 },
      ],
      dishTypeData: [
        { type: "Pizza", count: 145 },
        { type: "Pasta", count: 98 },
        { type: "Salads", count: 76 },
        { type: "Seafood", count: 82 },
        { type: "Desserts", count: 54 },
      ],
    }
  }
}

export default async function ChefReportsPage() {
  const { dailyOrderData, dishTypeData } = await getChefReportsData()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kitchen Reports</h1>
          <p className="text-muted-foreground mt-1">Preparation analytics and performance metrics</p>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnalyticsCard
            title="Orders Completed"
            stat={dailyOrderData.reduce((acc, curr) => acc + curr.ordersCompleted, 0).toString()}
            change={8}
            trend="up"
          />
          <AnalyticsCard
            title="Avg Prep Time"
            stat={
              (dailyOrderData.reduce((acc, curr) => acc + curr.avgTime, 0) / dailyOrderData.length).toFixed(1) + "m"
            }
            change={-3}
            trend="down"
          />
          <AnalyticsCard
            title="Quality Score"
            stat={
              (
                ((dailyOrderData.reduce((acc, curr) => acc + curr.ordersCompleted, 0) -
                  dailyOrderData.reduce((acc, curr) => acc + curr.mistakes, 0)) /
                  dailyOrderData.reduce((acc, curr) => acc + curr.ordersCompleted, 0)) *
                100
              ).toFixed(1) + "%"
            }
            change={2}
            trend="up"
          />
          <AnalyticsCard
            title="Rush Orders"
            stat={dailyOrderData.filter((curr) => curr.avgTime < 15).length.toString()}
            change={15}
            trend="up"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Daily Orders Completed */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Weekly Order Completion</h2>
              <p className="text-sm text-muted-foreground">Orders completed per day</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyOrderData}>
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
                <Bar dataKey="ordersCompleted" fill="hsl(var(--chart-1))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Average Preparation Time */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Prep Time Trend</h2>
              <p className="text-sm text-muted-foreground">Average time per dish (minutes)</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyOrderData}>
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
                <Line
                  type="monotone"
                  dataKey="avgTime"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Quality Metrics */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Quality Control</h2>
              <p className="text-sm text-muted-foreground">Order mistakes per day</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyOrderData}>
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
                <Bar dataKey="mistakes" fill="hsl(var(--destructive))" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Dish Type Distribution */}
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">Dishes Prepared by Type</h2>
              <p className="text-sm text-muted-foreground">Weekly distribution</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dishTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, count }) => `${type}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {dishTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Performance Summary Table */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Daily Performance Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-2 text-left text-muted-foreground">Day</th>
                  <th className="px-4 py-2 text-right text-muted-foreground">Completed</th>
                  <th className="px-4 py-2 text-right text-muted-foreground">Avg Time (min)</th>
                  <th className="px-4 py-2 text-right text-muted-foreground">Mistakes</th>
                  <th className="px-4 py-2 text-right text-muted-foreground">Quality %</th>
                </tr>
              </thead>
              <tbody>
                {dailyOrderData.map((row, idx) => {
                  const quality = (((row.ordersCompleted - row.mistakes) / row.ordersCompleted) * 100).toFixed(1)
                  return (
                    <tr key={idx} className="border-b border-border hover:bg-muted/30">
                      <td className="px-4 py-2 text-foreground font-medium">{row.day}</td>
                      <td className="px-4 py-2 text-right text-foreground">{row.ordersCompleted}</td>
                      <td className="px-4 py-2 text-right text-foreground">{row.avgTime}</td>
                      <td className="px-4 py-2 text-right text-foreground">{row.mistakes}</td>
                      <td className="px-4 py-2 text-right font-semibold text-primary">{quality}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
