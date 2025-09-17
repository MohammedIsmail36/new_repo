"use client"

import { useState, useCallback, useEffect } from "react"
import type { FilterPreset } from "@/types/table-types"

export const useTableState = (title: string, persistState: boolean) => {
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set())
  const [pinnedColumns, setPinnedColumns] = useState<Record<string, "left" | "right">>({})
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({})
  const [savedFilters, setSavedFilters] = useState<FilterPreset[]>([])
  const [itemsPerPage, setItemsPerPage] = useState(50)
  const [currentPage, setCurrentPage] = useState(1)

  const loadState = useCallback(() => {
    if (persistState) {
      try {
        const savedState = localStorage.getItem(`enterprise-table-${title}`)
        if (savedState) {
          const state = JSON.parse(savedState)
          setHiddenColumns(new Set(state.hiddenColumns || []))
          setPinnedColumns(state.pinnedColumns || {})
          setColumnWidths(state.columnWidths || {})
          setSavedFilters(state.savedFilters || [])
          setItemsPerPage(state.itemsPerPage || 50)
          setCurrentPage(state.currentPage || 1)
        }
      } catch (error) {
        console.error("Failed to load table state:", error)
      }
    }
  }, [title, persistState])

  useEffect(() => {
    loadState()
  }, [loadState])

  const saveState = useCallback(() => {
    if (persistState) {
      const state = {
        hiddenColumns: Array.from(hiddenColumns),
        pinnedColumns,
        columnWidths,
        savedFilters,
        itemsPerPage,
        currentPage,
      }
      localStorage.setItem(`enterprise-table-${title}`, JSON.stringify(state))
    }
  }, [title, persistState, hiddenColumns, pinnedColumns, columnWidths, savedFilters, itemsPerPage, currentPage])

  useEffect(() => {
    saveState()
  }, [saveState])

  return {
    hiddenColumns,
    setHiddenColumns,
    pinnedColumns,
    setPinnedColumns,
    columnWidths,
    setColumnWidths,
    savedFilters,
    setSavedFilters,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
  }
}
