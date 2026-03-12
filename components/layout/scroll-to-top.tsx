'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-[100px] right-4 z-40 rounded-full bg-black p-3 text-white shadow-lg',
        'md:bottom-4',
        'hover:bg-gray-800 transition-all duration-500 ease-in-out'
      )}
      aria-label="Yukarı çık"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
