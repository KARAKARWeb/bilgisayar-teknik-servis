'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  name: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, onChange, placeholder = 'Seçiniz' }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id))
    } else {
      onChange([...selected, id])
    }
  }

  const selectedNames = options
    .filter(opt => selected.includes(opt.id))
    .map(opt => opt.name)
    .join(', ')

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
      >
        <span className={cn(!selectedNames && 'text-gray-500')}>
          {selectedNames || placeholder}
        </span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
              >
                <div className={cn(
                  'flex h-4 w-4 items-center justify-center rounded border',
                  selected.includes(option.id) ? 'border-black bg-black' : 'border-gray-300'
                )}>
                  {selected.includes(option.id) && <Check className="h-3 w-3 text-white" />}
                </div>
                {option.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
