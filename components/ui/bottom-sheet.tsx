'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={cn(
        'absolute bottom-0 left-0 right-0 rounded-t-2xl bg-white p-6',
        'animate-in slide-in-from-bottom duration-300',
        'max-h-[90vh] overflow-y-auto'
      )}>
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gray-300" />
        {children}
      </div>
    </div>
  )
}
