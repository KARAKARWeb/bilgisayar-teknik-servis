'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollStickySidebarProps {
  children: React.ReactNode
  topOffset?: number
}

export function ScrollStickySidebar({ children, topOffset = 96 }: ScrollStickySidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sidebarRef.current || !containerRef.current) return

      const sidebar = sidebarRef.current
      const container = containerRef.current
      const containerRect = container.getBoundingClientRect()
      const sidebarHeight = sidebar.offsetHeight
      
      // Container'ın üst ve alt sınırları
      const containerTop = containerRect.top + window.scrollY
      const containerBottom = containerTop + containerRect.height
      
      const scrollTop = window.scrollY
      const sidebarTop = scrollTop + topOffset
      const sidebarBottom = sidebarTop + sidebarHeight
      
      // Sticky pozisyon hesaplama
      if (scrollTop + topOffset < containerTop) {
        // Üstte - henüz container'a ulaşmadık
        sidebar.style.position = 'absolute'
        sidebar.style.top = '0px'
      } else if (sidebarBottom > containerBottom) {
        // Altta - sidebar container'ın sonuna ulaştı
        sidebar.style.position = 'absolute'
        sidebar.style.top = `${containerRect.height - sidebarHeight}px`
      } else {
        // Ortada - sticky pozisyon
        sidebar.style.position = 'fixed'
        sidebar.style.top = `${topOffset}px`
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [topOffset])

  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '100%' }}>
      <div
        ref={sidebarRef}
        style={{
          width: '300px',
          zIndex: 5,
        }}
      >
        {children}
      </div>
    </div>
  )
}
