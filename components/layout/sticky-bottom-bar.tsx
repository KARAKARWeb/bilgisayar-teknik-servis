'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { SiteConfig } from '@/types'

interface StickyBottomBarProps {
  config: SiteConfig
}

export function StickyBottomBar({ config }: StickyBottomBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let lastScroll = 0

    const handleScroll = () => {
      const currentScroll = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Footer'a yaklaşıldığında gizle (footer yüksekliği ~500px varsayımı)
      const distanceFromBottom = documentHeight - (currentScroll + windowHeight)
      const isNearFooter = distanceFromBottom < 600

      if (currentScroll > 300 && !isNearFooter) {
        setVisible(currentScroll > lastScroll)
      } else {
        setVisible(false)
      }

      lastScroll = currentScroll
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:hidden sticky-bottom-bar',
        'flex gap-2 bg-white p-3 shadow-lg border-t border-gray-200',
        'transition-transform duration-300',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <a href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`} className="flex-1">
        <Button className="w-full" size="sm">
          <Phone className="mr-2 h-4 w-4" />
          Telefon
        </Button>
      </a>
      <a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1">
        <Button variant="secondary" className="w-full" size="sm">
          <MessageCircle className="mr-2 h-4 w-4" />
          WhatsApp
        </Button>
      </a>
    </div>
  )
}
