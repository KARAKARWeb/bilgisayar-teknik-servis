'use client'

interface StickySidebarProps {
  children: React.ReactNode
  className?: string
}

export function StickySidebar({ children, className = '' }: StickySidebarProps) {
  return (
    <div className={`hidden lg:block lg:sidebar-sticky-wrapper ${className}`}>
      {children}
    </div>
  )
}
