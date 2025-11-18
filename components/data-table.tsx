"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (value: any, row: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id?: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-4 text-left text-sm font-semibold text-foreground"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id || idx}
              onClick={() => onRowClick?.(row)}
              className={cn(
                "border-b border-border hover:bg-muted/30 transition-colors",
                onRowClick && "cursor-pointer",
              )}
            >
              {columns.map((col) => (
                <td key={String(col.key)} className="px-6 py-4 text-sm text-foreground" style={{ width: col.width }}>
                  {col.render
                    ? col.render((row as any)[col.key as keyof T], row)
                    : String((row as any)[col.key as keyof T])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
