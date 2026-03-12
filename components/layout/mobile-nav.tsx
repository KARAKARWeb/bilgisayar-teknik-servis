'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Layout, Code, Search, MapPin, ShoppingCart, Server, Zap } from 'lucide-react'

interface MobileNavProps {
  config: any
  services?: any[]
}

export function MobileNav({ config, services = [] }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false)
  const [kurumusalOpen, setKurumusalOpen] = useState(false)

  const navItems = [
    { name: 'Hizmet Bölgeleri', href: '/hizmet-bolgeleri' },
    { name: 'İletişim', href: '/iletisim' },
  ]
  
  const getIcon = (iconName: string) => {
    const iconProps = { className: "h-5 w-5 flex-shrink-0" }
    switch(iconName) {
      case 'layout': return <Layout {...iconProps} />
      case 'code': return <Code {...iconProps} />
      case 'search': return <Search {...iconProps} />
      case 'map-pin': return <MapPin {...iconProps} />
      case 'shopping-cart': return <ShoppingCart {...iconProps} />
      case 'server': return <Server {...iconProps} />
      default: return <Zap {...iconProps} />
    }
  }

  return (
    <div className="md:hidden ml-auto flex items-center gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 text-black bg-gray-50 hover:bg-black rounded-lg border border-gray-200 transition-colors group"
        aria-label="Menu"
      >
        {isOpen ? <X className="h-5 w-5 group-hover:text-white" /> : <Menu className="h-5 w-5 group-hover:text-white" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed top-0 left-0 right-0 bottom-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="fixed top-20 left-0 right-0 bg-white border-t border-gray-200 border-b border-gray-200 z-50 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="container mx-auto px-6 py-4">
              <ul className="space-y-2">
                {/* Kurumsal */}
                <li>
                  <button
                    onClick={() => setKurumusalOpen(!kurumusalOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 text-black hover:bg-gray-100 rounded-lg font-medium"
                  >
                    <span>Kurumsal</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${kurumusalOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {kurumusalOpen && (
                    <div className="mt-2 ml-4 space-y-1">
                      <Link
                        href="/hakkimizda"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        Hakkımızda
                      </Link>
                      <Link
                        href="/gizlilik-politikasi"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        Gizlilik Politikası
                      </Link>
                      <Link
                        href="/cerez-politikasi"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-100 rounded-lg"
                      >
                        Çerez Politikası
                      </Link>
                    </div>
                  )}
                </li>
                
                {/* Hizmetlerimiz */}
                <li>
                  <button
                    onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 text-black hover:bg-gray-100 rounded-lg font-medium"
                  >
                    <span>Hizmetlerimiz</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${hizmetlerOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {hizmetlerOpen && (
                    <div className="mt-2 ml-4 space-y-1">
                      <Link
                        href="/hizmetlerimiz"
                        onClick={() => setIsOpen(false)}
                        className="block py-2 px-4 text-sm text-gray-900 hover:bg-gray-100 rounded-lg font-medium"
                      >
                        Tüm Hizmetler
                      </Link>
                      {services.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/${service.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex items-start gap-3 py-2 px-4 text-sm hover:bg-gray-100 rounded-lg"
                        >
                          <div className="mt-0.5 text-gray-900">
                            {getIcon(service.icon)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900">{service.name}</div>
                            <div className="text-xs text-gray-600 mt-0.5">{service.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
                
                {/* Hizmet Bölgeleri & İletişim */}
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 text-black hover:bg-gray-100 rounded-lg font-medium"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={config.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 bg-[#25D366] text-white text-center rounded-lg font-semibold hover:bg-[#20BA5A]"
                    >
                      WhatsApp
                    </a>
                    <Link
                      href="/teklif-al"
                      onClick={() => setIsOpen(false)}
                      className="block py-3 px-4 bg-black text-white text-center rounded-lg font-semibold hover:bg-gray-800"
                    >
                      Teklif Al
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
