'use client'

import { useState } from 'react'
import { Trash2, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface BulkActionsProps {
  selectedIds: string[]
  onDelete?: () => void
  onApprove?: () => void
  onReject?: () => void
  onClear: () => void
}

export function BulkActions({ selectedIds, onDelete, onApprove, onReject, onClear }: BulkActionsProps) {
  if (selectedIds.length === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4">
      <div className="rounded-xl border border-gray-200 bg-white shadow-2xl p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
              {selectedIds.length}
            </div>
            <span className="text-sm font-medium text-gray-700">
              öğe seçildi
            </span>
          </div>

          <div className="h-6 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            {onApprove && (
              <Button
                size="sm"
                variant="outline"
                onClick={onApprove}
                className="gap-2 text-green-700 border-green-200 hover:bg-green-50"
              >
                <Check className="h-4 w-4" />
                Onayla
              </Button>
            )}

            {onReject && (
              <Button
                size="sm"
                variant="outline"
                onClick={onReject}
                className="gap-2 text-orange-700 border-orange-200 hover:bg-orange-50"
              >
                <X className="h-4 w-4" />
                Reddet
              </Button>
            )}

            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={onDelete}
                className="gap-2 text-red-700 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Sil
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={onClear}
            >
              İptal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface SelectableItemProps {
  id: string
  selected: boolean
  onToggle: (id: string) => void
  children: React.ReactNode
}

export function SelectableItem({ id, selected, onToggle, children }: SelectableItemProps) {
  return (
    <div className="relative">
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(id)}
        className="absolute left-4 top-4 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer z-10"
      />
      <div className={selected ? 'ring-2 ring-blue-500 rounded-xl' : ''}>
        {children}
      </div>
    </div>
  )
}
