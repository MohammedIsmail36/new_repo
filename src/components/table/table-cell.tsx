import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, CheckCircle, X, ImageIcon, AlertTriangle } from "lucide-react"
import type { TableRow, TableColumn } from "@/types/table-types"

interface TableCellProps {
  value: any
  row: TableRow
  column: TableColumn
  formatNumber?: (value: number) => string
  formatCurrency?: (value: number, currency?: string) => string
  formatDate?: (date: string | Date) => string
}

export const TableCell = memo<TableCellProps>(({ value, row, column, formatNumber, formatCurrency, formatDate }) => {
  try {
    if (typeof value === "number" && isNaN(value)) {
      console.log("[v0] NaN detected in TableCell:", { value, column: column.key, row })
    }

    if (column.render) {
      return <>{column.render(value, row)}</>
    }

    // Handle different cell types
    if (column.cellType) {
      switch (column.cellType.type) {
        case "currency":
          const currency = column.cellType.currency || "SAR"
          const precision = column.cellType.precision || 2
          const showSymbol = column.cellType.showSymbol !== false
          const amount = Number(value)

          if (isNaN(amount) || !isFinite(amount)) {
            console.log("[v0] Invalid currency value:", { value, amount, column: column.key })
            return <span className="text-muted-foreground">-</span>
          }

          if (formatCurrency) {
            return (
              <div className="flex items-center justify-end gap-1 font-mono">
                <span
                  className={`text-sm font-semibold ${amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {formatCurrency(amount, currency)}
                </span>
              </div>
            )
          }

          return (
            <div className="flex items-center justify-end gap-1 font-mono">
              <span
                className={`text-sm font-semibold ${amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {amount.toLocaleString("en-US", {
                  minimumFractionDigits: precision,
                  maximumFractionDigits: precision,
                })}
              </span>
              {showSymbol && (
                <span className="text-xs text-muted-foreground">{currency === "SAR" ? "ر.س" : currency}</span>
              )}
            </div>
          )

        case "amount":
          const amountValue = Number(value)
          if (isNaN(amountValue) || !isFinite(amountValue)) {
            console.log("[v0] Invalid amount value:", { value, amountValue, column: column.key })
            return <span className="text-muted-foreground">-</span>
          }

          const formattedAmount = formatNumber ? formatNumber(amountValue) : amountValue.toLocaleString("en-US")

          return (
            <div className="flex items-center justify-end font-mono">
              <span
                className={`text-sm font-medium ${amountValue >= 0 ? "text-foreground" : "text-red-600 dark:text-red-400"}`}
              >
                {formattedAmount}
              </span>
            </div>
          )

        case "date":
          if (!value) return <span className="text-muted-foreground">-</span>

          const date = new Date(value)
          if (isNaN(date.getTime())) {
            console.log("[v0] Invalid date value:", { value, column: column.key })
            return <span className="text-muted-foreground">-</span>
          }

          if (formatDate) {
            return (
              <div className="text-sm">
                <div className="font-mono text-foreground">{formatDate(date)}</div>
              </div>
            )
          }

          const gregorianDate = date.toLocaleDateString("ar-SA-u-nu-latn", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })

          return (
            <div className="text-sm">
              <div className="font-mono text-foreground">{gregorianDate}</div>
            </div>
          )

        case "status":
          const statusColors = column.cellType.statusColors || {
            نشط: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
            معلق: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
            ملغي: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
            مكتمل: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
            مدفوع: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
            "غير مدفوع": "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
          }

          const statusValue = String(value || "")
          const colorClass =
            statusColors[statusValue] || "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"

          return (
            <div className="flex justify-center">
              <Badge className={`px-3 py-1 text-xs font-medium rounded-full border-0 ${colorClass}`}>
                {statusValue}
              </Badge>
            </div>
          )

        case "number":
          const numValue = Number(value)
          if (isNaN(numValue) || !isFinite(numValue)) {
            console.log("[v0] Invalid number value:", { value, numValue, column: column.key })
            return <span className="text-muted-foreground">-</span>
          }

          const formattedNumber = formatNumber ? formatNumber(numValue) : numValue.toLocaleString("en-US")

          return (
            <div className="flex items-center justify-end font-mono">
              <span className="text-sm font-medium">{formattedNumber}</span>
            </div>
          )

        case "progress":
          const progressValue = Number(value)
          const safeProgressValue =
            isNaN(progressValue) || !isFinite(progressValue) ? 0 : Math.max(0, Math.min(100, progressValue))

          return (
            <div className="flex items-center gap-2">
              <Progress value={safeProgressValue} className="w-full h-2" />
              <span className="text-xs text-muted-foreground font-mono">{safeProgressValue}%</span>
            </div>
          )

        case "rating":
          const ratingValue = Number(value)
          const safeRating = isNaN(ratingValue) || !isFinite(ratingValue) ? 0 : Math.max(0, Math.min(5, ratingValue))

          return (
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-colors ${
                    i < safeRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
              <span className="text-xs text-muted-foreground mr-1 font-mono">({safeRating})</span>
            </div>
          )

        case "tags":
          if (!Array.isArray(value)) return <span className="text-muted-foreground">-</span>
          return (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1 rounded-full">
                  {tag}
                </Badge>
              ))}
              {value.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1 rounded-full">
                  +{value.length - 3}
                </Badge>
              )}
            </div>
          )

        case "image":
          return value ? (
            <div className="relative group">
              <img
                src={value || "/placeholder.svg"}
                alt=""
                className="h-10 w-10 rounded-lg object-cover border border-border/50 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-lg bg-muted/50 flex items-center justify-center border border-border/50">
              <ImageIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          )

        case "boolean":
          return value ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-700 dark:text-green-400">نعم</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <X className="h-4 w-4 text-red-500" />
              <span className="text-sm text-red-700 dark:text-red-400">لا</span>
            </div>
          )

        case "json":
          return (
            <details className="cursor-pointer group">
              <summary className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                عرض JSON
              </summary>
              <pre className="text-xs mt-2 p-3 bg-muted/50 rounded-md border border-border/50 max-w-xs overflow-auto font-mono">
                {JSON.stringify(value, null, 2)}
              </pre>
            </details>
          )
      }
    }

    // Default rendering
    if (value === null || value === undefined) return <span className="text-muted-foreground">-</span>
    if (typeof value === "boolean")
      return value ? (
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-700 dark:text-green-400">نعم</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <X className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700 dark:text-red-400">لا</span>
        </div>
      )
    if (Array.isArray(value)) return <span className="text-sm">{value.join(", ")}</span>

    if (typeof value === "number") {
      if (isNaN(value) || !isFinite(value)) {
        console.log("[v0] Invalid default number value:", { value, column: column.key })
        return <span className="text-muted-foreground">-</span>
      }

      const defaultFormattedNumber = formatNumber ? formatNumber(value) : value.toLocaleString("en-US")

      return (
        <div className="flex items-center justify-end font-mono">
          <span className="text-sm">{defaultFormattedNumber}</span>
        </div>
      )
    }

    const stringValue = String(value)
    if (stringValue === "NaN") {
      console.log("[v0] NaN string detected:", { value, column: column.key })
      return <span className="text-muted-foreground">-</span>
    }

    return <span className="text-sm">{stringValue}</span>
  } catch (error) {
    console.error("Error rendering cell:", error)
    return (
      <div className="flex items-center gap-2 text-destructive">
        <AlertTriangle className="h-3 w-3" />
        <span className="text-xs">خطأ في العرض</span>
      </div>
    )
  }
})

TableCell.displayName = "TableCell"
