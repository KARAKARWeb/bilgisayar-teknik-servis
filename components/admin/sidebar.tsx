'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { 
  LayoutDashboard, 
  FileText, 
  DollarSign, 
  MapPin, 
  Star, 
  HelpCircle, 
  Settings, 
  Smartphone,
  ChevronDown,
  ChevronRight,
  Building2,
  MessageSquare,
  MoreHorizontal
} from 'lucide-react'

const menuItems = [
  { 
    href: '/admin', 
    label: 'Dashboard', 
    icon: LayoutDashboard
  },
  { 
    href: '/admin/content', 
    label: 'Ana Sayfa', 
    icon: FileText 
  },
  { 
    label: 'Kurumsal', 
    icon: Building2,
    submenu: [
      { href: '/admin/kurumsal/hakkimizda', label: 'Hakkımızda' },
      { href: '/admin/kurumsal/gizlilik', label: 'Gizlilik' },
      { href: '/admin/kurumsal/cerez', label: 'Çerez' },
      { href: '/admin/kurumsal/site-haritasi', label: 'Site Haritası' },
    ]
  },
  { 
    href: '/admin/services', 
    label: 'Hizmetler', 
    icon: FileText 
  },
  { 
    href: '/admin/regions', 
    label: 'Bölgeler', 
    icon: MapPin 
  },
  { 
    href: '/admin/iletisim', 
    label: 'İletişim', 
    icon: MessageSquare 
  },
  { 
    label: 'Diğer', 
    icon: MoreHorizontal,
    submenu: [
      { href: '/admin/faq', label: 'SSS' },
      { href: '/admin/reviews', label: 'Yorumlar' },
    ]
  },
  { 
    label: 'Site Ayarları', 
    icon: Settings,
    submenu: [
      { href: '/admin/config', label: 'Site Ayarları' },
      { href: '/admin/teklif-al', label: 'Teklif Al' },
    ]
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const isLinkActive = (href: string) => {
    if (href.includes('?')) {
      return typeof window !== 'undefined' && window.location.href.includes(href)
    }
    // Dashboard için sadece tam eşleşme
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname === href || pathname?.startsWith(href + '/')
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white overflow-y-auto z-40">
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-bold text-black">Admin Panel</h1>
      </div>

      <nav className="p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const hasSubmenu = 'submenu' in item && item.submenu
            const isOpen = openMenus[item.label]
            
            if (hasSubmenu) {
              const isAnySubmenuActive = item.submenu?.some(sub => isLinkActive(sub.href))
              
              return (
                <li key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className={`w-full flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isAnySubmenuActive
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {isOpen && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.submenu?.map((subItem) => {
                        const isSubActive = isLinkActive(subItem.href)
                        return (
                          <li key={subItem.href}>
                            <Link
                              href={subItem.href}
                              className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                isSubActive
                                  ? 'bg-black text-white'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <span className="ml-2">└─</span>
                              {subItem.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            }

            const isActive = item.href ? isLinkActive(item.href) : false

            return (
              <li key={item.href || index}>
                <Link
                  href={item.href || '/admin'}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
          <li className="mt-4 pt-4 border-t border-gray-200">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" x2="21" y1="14" y2="3"></line>
              </svg>
              Siteyi Görüntüle
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
