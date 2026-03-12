'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'

const AVAILABLE_ICONS = [
  'Layout',
  'Code2',
  'ShoppingCart',
  'Search',
  'Smartphone',
  'Globe',
  'Palette',
  'Zap',
  'TrendingUp',
  'Users',
  'MessageSquare',
  'Mail',
  'Phone',
  'MapPin',
  'Calendar',
  'Clock',
  'Star',
  'Heart',
  'Settings',
  'Package',
] as const

type IconName = typeof AVAILABLE_ICONS[number]

interface IconSelectorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function IconSelector({ value, onChange, className }: IconSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const getIcon = (name: string) => {
    const Icon = Icons[name as keyof typeof Icons] as any
    return Icon || Icons.Layout
  }

  const CurrentIcon = getIcon(value)

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50"
      >
        <CurrentIcon className="h-5 w-5" />
        <span className="text-sm">{value || 'Icon Seç'}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-2 max-h-64 w-64 overflow-y-auto rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
            <div className="grid grid-cols-4 gap-2">
              {AVAILABLE_ICONS.map((iconName) => {
                const Icon = getIcon(iconName)
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName)
                      setIsOpen(false)
                    }}
                    className={cn(
                      'flex flex-col items-center gap-1 rounded-lg p-2 hover:bg-gray-100',
                      value === iconName && 'bg-gray-100'
                    )}
                    title={iconName}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-[10px] text-gray-600">{iconName}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
