"use client"

import React, { useState, useMemo, useCallback, useEffect } from "react"
import { TableHeader } from "@/components/table/table-header"
import { TableCell } from "@/components/table/table-cell"
// import { DjangoErrorHandler } from "@/components/django-error-handler"
// import { useDjangoApi } from "@/hooks/use-django-api"
// import { useTableState } from "@/hooks/use-table-state"
// import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Plus,
  Minus,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TableRow, TableColumn, FilterConfig, RowAction, SearchConfig, ExportConfig } from "@/types/table-types"

export interface DjangoApiConfig {
  baseUrl: string
  endpoints: {
    list: string
    create: string
    update: string
    delete: string
    bulk: string
  }
  headers?: Record<string, string>
}

export interface EnterpriseTableProps<T = TableRow> {
  data?: T[] // جعل البيانات اختيارية عند استخدام Django API
  columns: TableColumn<T>[]
  filters?: FilterConfig[]
  title?: string
  actions?: {
    label: string
    icon?: React.ReactNode
    onClick: (selectedRows: T[]) => void | Promise<void>
    variant?: "default" | "destructive" | "outline"
    loading?: boolean
  }[]
  rowActions?: RowAction[]
  onRowClick?: (row: T) => void
  onAdd?: () => void
  searchable?: boolean
  exportable?: boolean
  className?: string
  viewOptions?: "list" | "tree" | "both"
  defaultView?: "list" | "tree"
  searchConfig?: SearchConfig
  exportConfig?: ExportConfig
  persistState?: boolean
  djangoApi?: DjangoApiConfig
  serverSidePagination?: boolean
  autoRefresh?: number // بالثواني
  showActionsOnlyWhenSelected?: boolean
}

export const EnterpriseTable = <T extends TableRow = TableRow>({
  data: staticData,
  columns: initialColumns,
  filters = [],
  title = "قائمة البيانات",
  actions = [],
  rowActions = [],
  onRowClick,
  onAdd,
  searchable = true,
  exportable = true,
  className = "",
  viewOptions = "both",
  defaultView = "list",
  searchConfig = { globalSearch: true, columnSearch: true, fuzzySearch: false, debounceMs: 300 },
  exportConfig = { formats: ["csv", "excel", "json"], includeFilters: true },
  persistState = true,
  djangoApi,
  serverSidePagination = false,
  autoRefresh,
  showActionsOnlyWhenSelected = false,
}: EnterpriseTableProps<T>) => {
//   const djangoApiHook = useDjangoApi<T>(djangoApi)
  const { hiddenColumns, setHiddenColumns, itemsPerPage, setItemsPerPage, currentPage, setCurrentPage } = useTableState(
    title,
    persistState,
  )
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set())
  const [expandedRows, setExpandedRows] = useState<Set<string | number>>(new Set())
  const [currentView, setCurrentView] = useState<"list" | "tree">(defaultView)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null)
  const [columns, setColumns] = useState(initialColumns)

//   const debouncedSearchTerm = useDebounce(searchTerm, searchConfig.debounceMs || 300)

  useEffect(() => {
    if (djangoApiHook && autoRefresh) {
      const interval = setInterval(() => {
        djangoApiHook.refresh()
      }, autoRefresh * 1000)
      return () => clearInterval(interval)
    }
  }, [djangoApiHook, autoRefresh])

  useEffect(() => {
    if (djangoApiHook && serverSidePagination) {
      const filters = { ...activeFilters }
      if (debouncedSearchTerm) {
        filters.search = debouncedSearchTerm
      }
      if (sortConfig) {
        filters.ordering = sortConfig.direction === "desc" ? `-${sortConfig.key}` : sortConfig.key
      }
      djangoApiHook.fetchData(currentPage, itemsPerPage, filters)
    }
  }, [djangoApiHook, currentPage, itemsPerPage, activeFilters, debouncedSearchTerm, sortConfig, serverSidePagination])

  const data = djangoApiHook?.data || staticData || []
  const loading = djangoApiHook?.loading || false
  const error = djangoApiHook?.error || null

  const formatNumber = useCallback((value: number): string => {
    if (isNaN(value) || !isFinite(value)) return "-"
    return value.toLocaleString("en-US") // الأرقام بالإنجليزية دائماً
  }, [])

  const formatCurrency = useCallback(
    (value: number, currency = "SAR"): string => {
      if (isNaN(value) || !isFinite(value)) return "-"
      const currencySymbols: Record<string, string> = {
        SAR: "ر.س",
        USD: "$",
        EUR: "€",
        AED: "د.إ",
        KWD: "د.ك",
        BHD: "د.ب",
        QAR: "ر.ق",
        OMR: "ر.ع",
        JOD: "د.أ",
        EGP: "ج.م",
      }
      const symbol = currencySymbols[currency] || currency
      return `${formatNumber(value)} ${symbol}`
    },
    [formatNumber],
  )

  const formatDate = useCallback((date: string | Date): string => {
    try {
      const dateObj = typeof date === "string" ? new Date(date) : date
      if (isNaN(dateObj.getTime())) return "-"

      // تنسيق التاريخ الميلادي بالعربية مع الأرقام الإنجليزية
      return dateObj.toLocaleDateString("ar-SA-u-nu-latn", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      })
    } catch {
      return "-"
    }
  }, [])

  const processedData = useMemo(() => {
    if (serverSidePagination && djangoApiHook) {
      return data
    }

    let filtered = [...data]

    // Apply global search
    if (debouncedSearchTerm) {
      const searchTerms = debouncedSearchTerm
        .toLowerCase()
        .split(" ")
        .filter((term) => term.length > 0)
      filtered = filtered.filter((row) =>
        searchTerms.every((term) =>
          Object.values(row).some((value) => value != null && String(value).toLowerCase().includes(term)),
        ),
      )
    }

    Object.entries(activeFilters).forEach(([filterKey, filterValue]) => {
      if (filterValue != null && filterValue !== "" && filterValue !== "all") {
        const filter = filters.find((f) => f.key === filterKey)
        if (filter) {
          switch (filter.type) {
            case "quickdate":
              const today = new Date()
              const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
              const startOfWeek = new Date(startOfDay)
              startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
              const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
              const startOfYear = new Date(today.getFullYear(), 0, 1)

              filtered = filtered.filter((row) => {
                const rowDate = new Date(row[filterKey])
                if (isNaN(rowDate.getTime())) return false
                switch (filterValue) {
                  case "today":
                    return rowDate >= startOfDay
                  case "week":
                    return rowDate >= startOfWeek
                  case "month":
                    return rowDate >= startOfMonth
                  case "year":
                    return rowDate >= startOfYear
                  default:
                    return true
                }
              })
              break
            case "amount":
              filtered = filtered.filter((row) => {
                const amount = Number(row[filterKey])
                if (isNaN(amount)) return false
                switch (filterValue) {
                  case "0-1000":
                    return amount >= 0 && amount <= 1000
                  case "1000-5000":
                    return amount > 1000 && amount <= 5000
                  case "5000-10000":
                    return amount > 5000 && amount <= 10000
                  case "10000+":
                    return amount > 10000
                  default:
                    return true
                }
              })
              break
            case "status":
            case "select":
              filtered = filtered.filter((row) => row[filterKey] === filterValue)
              break
            default:
              filtered = filtered.filter((row) =>
                String(row[filterKey]).toLowerCase().includes(String(filterValue).toLowerCase()),
              )
          }
        }
      }
    })

    // Apply sorting
    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1

        if (typeof aValue === "number" && typeof bValue === "number") {
          if (isNaN(aValue) && isNaN(bValue)) return 0
          if (isNaN(aValue)) return 1
          if (isNaN(bValue)) return -1
          return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue
        }

        const aStr = String(aValue).toLowerCase()
        const bStr = String(bValue).toLowerCase()
        return sortConfig.direction === "asc" ? aStr.localeCompare(bStr, "ar-SA") : bStr.localeCompare(aStr, "ar-SA")
      })
    }

    return filtered
  }, [data, debouncedSearchTerm, activeFilters, sortConfig, filters, serverSidePagination, djangoApiHook])

  const paginatedData = useMemo(() => {
    if (serverSidePagination && djangoApiHook) {
      return data
    }

    if (currentView === "tree") return processedData // Tree view shows all data
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return processedData.slice(startIndex, endIndex)
  }, [processedData, currentPage, itemsPerPage, currentView, serverSidePagination, djangoApiHook, data])

  const totalPages =
    serverSidePagination && djangoApiHook
      ? Math.ceil((djangoApiHook.pagination?.count || 0) / itemsPerPage) || 1
      : Math.ceil(processedData.length / itemsPerPage) || 1

  const totalItems = serverSidePagination && djangoApiHook ? djangoApiHook.pagination?.count || 0 : processedData.length

  const visibleColumns = useMemo(() => {
    return columns.filter((col) => !hiddenColumns.has(col.key as string))
  }, [columns, hiddenColumns])

  const handleSelectRow = useCallback((rowId: string | number, checked: boolean) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(rowId)
      } else {
        newSet.delete(rowId)
      }
      return newSet
    })
  }, [])

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedRows(new Set(paginatedData.map((row) => row.id)))
      } else {
        setSelectedRows(new Set())
      }
    },
    [paginatedData],
  )

  const toggleExpanded = useCallback((rowId: string | number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(rowId)) {
        newSet.delete(rowId)
      } else {
        newSet.add(rowId)
      }
      return newSet
    })
  }, [])

  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return prev.direction === "asc" ? { key, direction: "desc" } : null
      }
      return { key, direction: "asc" }
    })
  }, [])

  const toggleColumnVisibility = useCallback((columnKey: string) => {
    setHiddenColumns((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(columnKey)) {
        newSet.delete(columnKey)
      } else {
        newSet.add(columnKey)
      }
      return newSet
    })
  }, [])

  const showAllColumns = useCallback(() => {
    setHiddenColumns(new Set())
  }, [])

  const handleBulkAction = useCallback(
    async (action: string) => {
      if (selectedRows.size === 0) return

      const selectedRowsData = data.filter((row) => selectedRows.has(row.id))

      if (djangoApiHook) {
        try {
          const selectedRowsArray = Array.from(selectedRows)
          await djangoApiHook.bulkAction(action, selectedRowsArray)
          setSelectedRows(new Set())
        } catch (error) {
          console.error("Bulk action failed:", error)
        }
      } else {
        // معالجة محلية للإجراءات المجمعة
        const bulkAction = actions.find((a) => a.label === action)
        if (bulkAction) {
          await bulkAction.onClick(selectedRowsData)
          setSelectedRows(new Set())
        }
      }
    },
    [selectedRows, djangoApiHook, data, actions],
  )

  const handleFilterChange = useCallback(
    (filterKey: string, value: any) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterKey]: value,
      }))
      if (serverSidePagination) {
        setCurrentPage(1)
      }
    },
    [serverSidePagination, setCurrentPage],
  )

  const handleClearFilters = useCallback(() => {
    setActiveFilters({})
    if (serverSidePagination) {
      setCurrentPage(1)
    }
  }, [serverSidePagination, setCurrentPage])

  const renderTreeRow = (row: TableRow, level = 0) => {
    const isExpanded = expandedRows.has(row.id)
    const hasChildren = row.children && row.children.length > 0
    const rowState = row._state || {}

    return (
      <React.Fragment key={row.id}>
        <tr
          className={`border-b hover:bg-accent/50 cursor-pointer transition-all duration-200 group ${
            rowState.new
              ? "bg-green-50 dark:bg-green-950/20"
              : rowState.modified
                ? "bg-yellow-50 dark:bg-yellow-950/20"
                : rowState.deleted
                  ? "bg-red-50 dark:bg-red-950/20"
                  : ""
          }`}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(row.id)
            }
            onRowClick?.(row)
          }}
        >
          <td className="p-2 w-12">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedRows.has(row.id)}
                onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
                onClick={(e) => e.stopPropagation()}
                className="border-2 border-border data-[state=checked]:border-primary"
                disabled={rowState.locked}
              />
              <div style={{ marginLeft: `${level * 20}px` }} className="flex items-center gap-1">
                {hasChildren && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-primary/10 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleExpanded(row.id)
                    }}
                  >
                    {isExpanded ? (
                      <Minus className="h-3 w-3 text-primary" />
                    ) : (
                      <Plus className="h-3 w-3 text-primary" />
                    )}
                  </Button>
                )}
                {!hasChildren && level > 0 && (
                  <div className="h-6 w-6 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground/30"></div>
                  </div>
                )}
                {rowState.loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              </div>
            </div>
          </td>
          {visibleColumns.map((column) => (
            <td key={column.key} className="p-3 group-hover:bg-accent/30 transition-colors">
              <TableCell
                value={row[column.key]}
                row={row}
                column={column}
                formatNumber={formatNumber}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            </td>
          ))}
          <td className="p-3 group-hover:bg-accent/30 transition-colors">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={rowState.locked}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48" dir="rtl">
                {rowActions
                  .filter((action) => !action.visible || action.visible(row))
                  .map((action, index) => (
                    <React.Fragment key={index}>
                      {action.separator && index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          action.onClick(row)
                        }}
                        disabled={action.disabled?.(row)}
                        className={`cursor-pointer ${
                          action.variant === "destructive" ? "text-destructive focus:text-destructive" : ""
                        }`}
                      >
                        {action.icon && <span className="ml-2">{action.icon}</span>}
                        {action.label}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
        {hasChildren && isExpanded && (
          <React.Fragment>{row.children?.map((child) => renderTreeRow(child, level + 1))}</React.Fragment>
        )}
      </React.Fragment>
    )
  }

  const renderListRow = (row: TableRow) => {
    const rowState = row._state || {}

    return (
      <tr
        key={row.id}
        className={`border-b hover:bg-accent/50 cursor-pointer transition-all duration-200 group ${
          rowState.new
            ? "bg-green-50 dark:bg-green-950/20"
            : rowState.modified
              ? "bg-yellow-50 dark:bg-yellow-950/20"
              : rowState.deleted
                ? "bg-red-50 dark:bg-red-950/20"
                : ""
        }`}
        onClick={() => onRowClick?.(row)}
      >
        <td className="p-2 w-12">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedRows.has(row.id)}
              onCheckedChange={(checked) => handleSelectRow(row.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
              className="border-2 border-border data-[state=checked]:border-primary"
              disabled={rowState.locked}
            />
            {rowState.loading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
        </td>
        {visibleColumns.map((column) => (
          <td key={column.key} className="p-3 group-hover:bg-accent/30 transition-colors">
            <TableCell
              value={row[column.key]}
              row={row}
              column={column}
              formatNumber={formatNumber}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          </td>
        ))}
        <td className="p-3 group-hover:bg-accent/30 transition-colors">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-accent opacity-0 group-hover:opacity-100 transition-opacity"
                disabled={rowState.locked}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48" dir="rtl">
              {rowActions
                .filter((action) => !action.visible || action.visible(row))
                .map((action, index) => (
                  <React.Fragment key={index}>
                    {action.separator && index > 0 && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation()
                        action.onClick(row)
                      }}
                      disabled={action.disabled?.(row)}
                      className={`cursor-pointer ${
                        action.variant === "destructive" ? "text-destructive focus:text-destructive" : ""
                      }`}
                    >
                      {action.icon && <span className="ml-2">{action.icon}</span>}
                      {action.label}
                    </DropdownMenuItem>
                  </React.Fragment>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      </tr>
    )
  }

  return (
    <div className={`bg-background rounded-lg border border-border/50 shadow-sm ${className}`} dir="rtl">
      {error && (
        <DjangoErrorHandler
          error={error}
          onRetry={() => djangoApiHook?.refresh()}
          onDismiss={() => djangoApiHook && (djangoApiHook.error = null)}
        />
      )}

      <TableHeader
        title={title}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={onAdd}
        actions={actions}
        viewOptions={viewOptions}
        currentView={currentView}
        onViewChange={setCurrentView}
        columns={columns}
        hiddenColumns={hiddenColumns}
        onToggleColumn={toggleColumnVisibility}
        onShowAllColumns={showAllColumns}
        selectedCount={selectedRows.size}
        selectedRows={data.filter((row) => selectedRows.has(row.id))} // تمرير البيانات المحددة الفعلية
        filters={filters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
        loading={loading}
        showActionsOnlyWhenSelected={showActionsOnlyWhenSelected}
      />

      <div className="overflow-x-auto">
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">جاري التحميل...</span>
          </div>
        )}

        {!loading && (
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="p-3 text-right w-12">
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                    className="border-2 border-border data-[state=checked]:border-primary"
                  />
                </th>
                {visibleColumns.map((column) => (
                  <th
                    key={column.key}
                    className="p-3 text-right font-semibold text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => column.sortable !== false && handleSort(column.key as string)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{column.label}</span>
                      {sortConfig?.key === column.key && (
                        <span className="text-primary">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-3 text-right font-semibold text-foreground w-12">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {currentView === "tree"
                ? data.map((row) => renderTreeRow(row))
                : paginatedData.map((row) => renderListRow(row))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination - only for list view */}
      {currentView === "list" && !loading && (
        <div className="flex items-center justify-between p-4 border-t border-border/50 bg-muted/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">عرض</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  const newItemsPerPage = Number(value)
                  if (!isNaN(newItemsPerPage) && newItemsPerPage > 0) {
                    setItemsPerPage(newItemsPerPage)
                    setCurrentPage(1)
                  }
                }}
              >
                <SelectTrigger className="w-20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                  <SelectItem value="200">200</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">من {formatNumber(totalItems || 0)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0 font-mono"
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
