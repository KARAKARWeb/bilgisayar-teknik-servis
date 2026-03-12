'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MobileNav } from '@/components/layout/mobile-nav'
import { Zap, ChevronDown, PhoneCall, Sparkles, MessageCircle, Layout, Code, Search, MapPin, ShoppingCart, Server } from 'lucide-react'
import type { SiteConfig } from '@/types'

interface HeaderProps {
  config: SiteConfig
  services?: any[]
}

export function Header({ config, services = [] }: HeaderProps) {
  const pathname = usePathname()
  const [kurumusalOpen, setKurumusalOpen] = useState(false)
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [kurumusalTimeout, setKurumusalTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hizmetlerTimeout, setHizmetlerTimeout] = useState<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Smart sticky: scroll down'da gizlen, scroll up'ta göster
      if (currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
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
    <header className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`} role="banner">
      <div className="container-header">
        <div className="flex h-20 items-center">
          {/* Left: Logo + Phone */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2" aria-label="Ana Sayfa">
              <Image 
                src="/logo.webp" 
                alt={config.site.name} 
                width={200} 
                height={24}
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                sizes="200px"
                className="h-6 w-auto"
              />
            </Link>
            
            <a
              href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 outline-none m-0 p-0 border-0 align-baseline no-underline group relative cursor-pointer select-none px-3 py-2 rounded-md transition-opacity duration-200 hover:opacity-70"
            >
              <div className="w-8 h-8 rounded-md border flex items-center justify-center border-[#006BFF] bg-blue-100 animate-pulse">
                <PhoneCall className="h-4 w-4 text-[#006BFF]" />
              </div>
              <div className="flex flex-col justify-center h-8">
                <span className="text-xs text-gray-900 leading-tight">Müşteri Hizmetleri</span>
                <span className="font-semibold text-black text-[14px] leading-tight">{config.contact.phone.replace('+90 ', '0')}</span>
              </div>
            </a>
          </div>

          {/* Navigation - Right aligned */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-end mr-8" aria-label="Ana navigasyon">
            <div className="relative" onMouseEnter={() => {
              if (kurumusalTimeout) clearTimeout(kurumusalTimeout)
              setKurumusalOpen(true)
            }} onMouseLeave={() => {
              const timeout = setTimeout(() => setKurumusalOpen(false), 200)
              setKurumusalTimeout(timeout)
            }}>
              <button 
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname === '/hakkimizda' ? 'text-[#006bff]' : 'text-gray-900 hover:text-[#006bff]'}`}
              >
                Kurumsal
                <ChevronDown className="h-3 w-3" />
              </button>
              {kurumusalOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                  <Link 
                    href="/hakkimizda" 
                    className={`block px-4 py-2 text-sm transition-colors ${pathname === '/hakkimizda' ? 'text-[#006bff] bg-gray-50' : 'text-gray-900 hover:text-[#006bff] hover:bg-gray-50'}`}
                  >
                    Hakkımızda
                  </Link>
                  <Link 
                    href="/gizlilik-politikasi" 
                    className={`block px-4 py-2 text-sm transition-colors ${pathname === '/gizlilik-politikasi' ? 'text-[#006bff] bg-gray-50' : 'text-gray-900 hover:text-[#006bff] hover:bg-gray-50'}`}
                  >
                    Gizlilik Politikası
                  </Link>
                  <Link 
                    href="/cerez-politikasi" 
                    className={`block px-4 py-2 text-sm transition-colors ${pathname === '/cerez-politikasi' ? 'text-[#006bff] bg-gray-50' : 'text-gray-900 hover:text-[#006bff] hover:bg-gray-50'}`}
                  >
                    Çerez Politikası
                  </Link>
                  <Link 
                    href="/site-haritasi" 
                    className={`block px-4 py-2 text-sm transition-colors ${pathname === '/site-haritasi' ? 'text-[#006bff] bg-gray-50' : 'text-gray-900 hover:text-[#006bff] hover:bg-gray-50'}`}
                  >
                    Site Haritası
                  </Link>
                </div>
              )}
            </div>
            <div className="relative" onMouseEnter={() => {
              if (hizmetlerTimeout) clearTimeout(hizmetlerTimeout)
              setHizmetlerOpen(true)
            }} onMouseLeave={() => {
              const timeout = setTimeout(() => setHizmetlerOpen(false), 200)
              setHizmetlerTimeout(timeout)
            }}>
              <Link href="/hizmetlerimiz">
                <button 
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname.includes('/hizmetlerimiz') || services.some(s => pathname.includes(s.slug)) ? 'text-[#006bff]' : 'text-gray-900 hover:text-[#006bff]'}`}
                >
                  Hizmetlerimiz
                  <ChevronDown className="h-3 w-3" />
                </button>
              </Link>
              {hizmetlerOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl py-3 z-50">
                  {services.map(service => {
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
                      <Link 
                        key={service.slug}
                        href={`/${service.slug}`} 
                        className={`flex items-center gap-3 px-4 py-3 transition-colors group ${pathname.includes(service.slug) ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`transition-colors ${pathname.includes(service.slug) ? 'text-[#006bff]' : 'text-gray-900 group-hover:text-[#006bff]'}`}>
                          {getIcon(service.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium ${pathname.includes(service.slug) ? 'text-[#006bff]' : 'text-gray-900'}`}>
                            {service.name}
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            {service.description}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link 
                    href="/hizmetlerimiz" 
                    className={`block px-4 py-3 text-sm font-medium transition-colors ${pathname === '/hizmetlerimiz' ? 'text-[#006bff] bg-gray-50' : 'text-gray-900 hover:bg-gray-50'}`}
                  >
                    Tüm Hizmetler
                  </Link>
                </div>
              )}
            </div>
            <Link 
              href="/hizmet-bolgeleri" 
              className={`text-sm font-medium transition-colors ${pathname === '/hizmet-bolgeleri' ? 'text-[#006bff]' : 'text-gray-900 hover:text-[#006bff]'}`}
            >
              Hizmet Bölgeleri
            </Link>
            <Link 
              href="/iletisim" 
              className={`text-sm font-medium transition-colors ${pathname === '/iletisim' ? 'text-[#006bff]' : 'text-gray-900 hover:text-[#006bff]'}`}
            >
              İletişim
            </Link>
          </nav>

          {/* Right: CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <a
              href={config.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group outline-none m-0 p-0 align-baseline no-underline relative cursor-pointer select-none transform translate-z-0 flex text-[var(--themed-fg,_var(--ds-background-100))] bg-[var(--themed-bg,_var(--ds-gray-1000))] font-medium max-w-full items-center justify-center transition-[border-color,background,color,transform,box-shadow] duration-[150ms] ease-in-out [&_svg]:shrink-0 [--x-padding:6px] [--height:32px] !pl-[var(--x-padding)] !pr-[var(--x-padding)] rounded-md border border-[#25D366] animate-pulse [--themed-bg:_var(--ds-background-100)] [--themed-fg:_var(--ds-gray-1000)] text-sm h-[var(--height)] hover:bg-[#25D366] hover:text-white"
              style={{ '--geist-icon-size': '16px' } as React.CSSProperties}
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366] group-hover:text-white transition-colors" />
            </a>
            
            <a
              href="/teklif-al"
              className="outline-none m-0 p-0 border-0 align-baseline no-underline group/trigger relative cursor-pointer select-none transform translate-z-0 flex text-[var(--themed-fg,_var(--ds-background-100))] bg-[var(--themed-bg,_var(--ds-gray-1000))] font-medium max-w-full items-center justify-center transition-[border-color,background,color,transform,box-shadow] duration-[150ms] ease-in-out [&_svg]:shrink-0 [--x-padding:6px] [--height:32px] !pl-[var(--x-padding)] !pr-[var(--x-padding)] rounded-md text-sm h-[var(--height)] hover:bg-[hsl(0,0%,22%)]"
              style={{ '--geist-icon-size': '16px' } as React.CSSProperties}
            >
              <span className="mr-0.5 min-w-5 shrink-0 flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <span className="truncate inline-block px-1.5">Teklif Al</span>
            </a>
          </div>

          {/* Mobile Menu */}
          <MobileNav config={config} services={services} />
        </div>
      </div>
    </header>
  )
}
