'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SmartHeaderProps {
  children: React.ReactNode
}

export function SmartHeader({ children }: SmartHeaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-transform duration-300 ease-out',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      {children}
    </header>
  )
}
