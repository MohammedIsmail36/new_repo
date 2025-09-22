import type React from "react"
export interface ColumnConfig {
  resizable?: boolean
  sortable?: boolean
  filterable?: boolean
  pinnable?: boolean
  hideable?: boolean
  reorderable?: boolean
  width?: string
  minWidth?: string
  maxWidth?: string
}

export interface CellType {
  type:
    | "text"
    | "number"
    | "currency"
    | "date"
    | "image"
    | "progress"
    | "rating"
    | "tags"
    | "json"
    | "boolean"
    | "status"
    | "amount"
  format?: string
  currency?: string
  locale?: string
  statusColors?: Record<string, string>
  showSymbol?: boolean
  precision?: number
}

export interface TableColumn<T = any> {
  key: keyof T | string
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  render?: (value: any, row: T) => React.ReactNode
  config?: ColumnConfig
  cellType?: CellType
  pinned?: "left" | "right" | false
  hidden?: boolean
}

export interface TableRow {
  id: string | number
  [key: string]: any
  children?: TableRow[]
  _state?: {
    loading?: boolean
    error?: boolean
    modified?: boolean
    new?: boolean
    deleted?: boolean
    locked?: boolean
  }
}

export interface FilterConfig {
  key: string
  label: string
  type: "select" | "text" | "date" | "daterange" | "number" | "range" | "quickdate" | "amount" | "status"
  options?: { label: string; value: string }[]
  placeholder?: string
  multiple?: boolean
}

export interface RowAction {
  label: string
  icon?: React.ReactNode
  onClick: (row: TableRow) => void | Promise<void>
  variant?: "default" | "destructive" | "outline"
  disabled?: (row: TableRow) => boolean
  visible?: (row: TableRow) => boolean
  separator?: boolean
}

export interface FilterPreset {
  id: string
  label: string
  filters: Record<string, any>
  searchTerm?: string
}

export interface TableError {
  message: string
  code?: string
  details?: any
}

export interface SearchConfig {
  globalSearch?: boolean
  columnSearch?: boolean
  fuzzySearch?: boolean
  searchHistory?: boolean
  debounceMs?: number
}

export interface ExportConfig {
  formats?: ("csv" | "excel" | "json" | "pdf")[]
  includeFilters?: boolean
  customTemplates?: boolean
}
