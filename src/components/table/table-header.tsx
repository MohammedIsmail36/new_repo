"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Download, Settings, List, TreePine, Filter, X } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TableColumn, FilterConfig } from "@/types/table-types"

interface TableHeaderProps {
  title: string
  searchTerm: string
  onSearchChange: (term: string) => void
  onAdd?: () => void
  actions: Array<{
    label: string
    icon?: React.ReactNode
    onClick: (selectedRows: any[]) => void | Promise<void> // تحديث نوع onClick ليقبل selectedRows
    variant?: "default" | "destructive" | "outline"
    loading?: boolean
    category?: "export" | "print" | "bulk" | "financial" | "inventory"
    requiresSelection?: boolean
    shortcut?: string
  }>
  viewOptions: "list" | "tree" | "both"
  currentView: "list" | "tree"
  onViewChange: (view: "list" | "tree") => void
  columns: TableColumn[]
  hiddenColumns: Set<string>
  onToggleColumn: (columnKey: string) => void
  onShowAllColumns: () => void
  selectedCount: number
  selectedRows: any[] // إضافة selectedRows prop
  filters?: FilterConfig[]
  activeFilters: Record<string, any>
  onFilterChange: (filterKey: string, value: any) => void
  onClearFilters: () => void
  loading?: boolean
  showActionsOnlyWhenSelected?: boolean
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title,
  searchTerm,
  onSearchChange,
  onAdd,
  actions,
  viewOptions,
  currentView,
  onViewChange,
  columns,
  hiddenColumns,
  onToggleColumn,
  onShowAllColumns,
  selectedCount,
  selectedRows, // استقبال selectedRows
  filters = [],
  activeFilters,
  onFilterChange,
  onClearFilters,
  loading,
  showActionsOnlyWhenSelected = false,
}) => {
  const activeFilterCount = Object.values(activeFilters).filter(
    (value) => value !== undefined && value !== null && value !== "",
  ).length

  const groupedActions = actions.reduce(
    (groups, action) => {
      const category = action.category || "general"
      if (!groups[category]) groups[category] = []
      groups[category].push(action)
      return groups
    },
    {} as Record<string, typeof actions>,
  )

  const renderFilter = (filter: FilterConfig) => {
    switch (filter.type) {
      case "select":
        return (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || ""}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-40 bg-background/50 border-border/50">
              <SelectValue placeholder={filter.placeholder} />
            </SelectTrigger>
            <SelectContent dir="rtl">
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "quickdate":
        return (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || ""}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-32 bg-background/50 border-border/50">
              <SelectValue placeholder="التاريخ" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="today">اليوم</SelectItem>
              <SelectItem value="week">هذا الأسبوع</SelectItem>
              <SelectItem value="month">هذا الشهر</SelectItem>
              <SelectItem value="quarter">هذا الربع</SelectItem>
              <SelectItem value="year">هذا العام</SelectItem>
            </SelectContent>
          </Select>
        )

      case "amount":
        return (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || ""}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-36 bg-background/50 border-border/50">
              <SelectValue placeholder="المبلغ" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              <SelectItem value="0-1000">0 - 1,000</SelectItem>
              <SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
              <SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
              <SelectItem value="10000+">أكثر من 10,000</SelectItem>
            </SelectContent>
          </Select>
        )

      case "status":
        return (
          <Select
            key={filter.key}
            value={activeFilters[filter.key] || ""}
            onValueChange={(value) => onFilterChange(filter.key, value)}
          >
            <SelectTrigger className="w-32 bg-background/50 border-border/50">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent dir="rtl">
              {filter.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            key={filter.key}
            placeholder={filter.placeholder}
            value={activeFilters[filter.key] || ""}
            onChange={(e) => onFilterChange(filter.key, e.target.value)}
            className="w-40 bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-right"
            dir="rtl"
            disabled={loading}
          />
        )
    }
  }

  return (
    <div
      className="flex flex-col gap-4 p-6 bg-gradient-to-l from-background via-background to-muted/20 border-b border-border/50"
      dir="rtl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-foreground font-tajawal">{title}</h2>
          {selectedCount > 0 && (
            <div className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20 font-mono">
              {selectedCount} محدد
            </div>
          )}
        </div>
        {onAdd && (
          <Button
            onClick={onAdd}
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={loading}
          >
            <Plus className="h-4 w-4" />
            إضافة جديد
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* البحث والفلاتر - محاذاة لليسار */}
        <div className="flex items-center gap-3 flex-1 justify-start">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في جميع البيانات..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors text-right"
              dir="rtl"
              disabled={loading}
            />
          </div>

          {filters.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-background/50 relative" disabled={loading}>
                  <Filter className="h-4 w-4" />
                  الفلاتر
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-mono">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-80 p-4" dir="rtl">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">الفلاتر المتقدمة</h4>
                  {activeFilterCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-6 px-2 text-xs">
                      <X className="h-3 w-3 ml-1" />
                      مسح الكل
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">{filters.map(renderFilter)}</div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* الإجراءات - محاذاة لليمين */}
        <div className="flex items-center gap-2">
          {/* أزرار التبديل بين العرض */}
          {viewOptions === "both" && (
            <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg border border-border/50">
              <Button
                variant={currentView === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange("list")}
                className="h-8 px-3"
                disabled={loading}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={currentView === "tree" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange("tree")}
                className="h-8 px-3"
                disabled={loading}
              >
                <TreePine className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* إدارة الأعمدة */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent" disabled={loading}>
                <Settings className="h-4 w-4" />
                الأعمدة
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56" dir="rtl">
              <DropdownMenuItem onClick={onShowAllColumns}>
                <span>إظهار جميع الأعمدة</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {columns.map((column) => (
                <DropdownMenuItem
                  key={column.key}
                  onClick={() => onToggleColumn(column.key as string)}
                  className="flex items-center justify-between"
                >
                  <span>{column.label}</span>
                  {!hiddenColumns.has(column.key as string) && <span className="text-primary">✓</span>}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* الإجراءات الأخرى */}
          {(!showActionsOnlyWhenSelected || selectedCount > 0) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" disabled={loading}>
                  <Download className="h-4 w-4" />
                  الإجراءات
                  {selectedCount > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs rounded-full px-1.5 py-0.5 mr-1 font-mono">
                      {selectedCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" dir="rtl">
                {Object.entries(groupedActions).map(([category, categoryActions], categoryIndex) => (
                  <div key={category}>
                    {categoryIndex > 0 && <DropdownMenuSeparator />}
                    {category !== "general" && (
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {category === "export" && "التصدير"}
                        {category === "print" && "الطباعة"}
                        {category === "bulk" && "العمليات المجمعة"}
                        {category === "financial" && "المالية"}
                        {category === "inventory" && "المخزون"}
                      </div>
                    )}
                    {categoryActions.map((action, index) => (
                      <DropdownMenuItem
                        key={`${category}-${index}`}
                        onClick={() => action.onClick(selectedRows)} // تمرير selectedRows للإجراء
                        disabled={action.loading || (action.requiresSelection && selectedCount === 0)}
                        className={`cursor-pointer flex items-center justify-between ${
                          action.variant === "destructive" ? "text-destructive focus:text-destructive" : ""
                        } ${action.requiresSelection && selectedCount === 0 ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-center">
                          {action.icon && <span className="ml-2">{action.icon}</span>}
                          <span>{action.label}</span>
                          {action.requiresSelection && selectedCount === 0 && (
                            <span className="text-xs text-muted-foreground ml-2">(يتطلب تحديد)</span>
                          )}
                        </div>
                        {action.shortcut && (
                          <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
                            {action.shortcut}
                          </span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  )
}
