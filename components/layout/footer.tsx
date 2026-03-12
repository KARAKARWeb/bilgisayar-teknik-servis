'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin, MessageCircle, Headphones, ChevronDown, ChevronRight, Layout, Code, Search, ShoppingCart, Server } from 'lucide-react'
import type { SiteConfig, Region } from '@/types'

interface FooterProps {
  config: SiteConfig
  services?: any[]
  regions?: Region[]
  pages?: any
}

export function Footer({ config, services = [], regions = [], pages }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const [kurumusalOpen, setKurumusalOpen] = useState(false)
  const [hizmetlerOpen, setHizmetlerOpen] = useState(false)
  const [bolgelerOpen, setBolgelerOpen] = useState(false)

  return (
    <footer className="border-t border-gray-200 bg-white" role="contentinfo">
      {/* Layer 1: Main Footer Grid */}
      <div className="container-wide py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          {/* Logo & Description */}
          <div>
            <h3 className="text-xl font-bold text-black mb-4">
              {pages?.footer?.title || config.site.name}
            </h3>
            {(pages?.footer?.description || config.schema?.localBusiness?.description || config.seo?.metaDescription) && (
              <p className="text-sm text-gray-900 mb-4">
                {pages?.footer?.description || config.schema?.localBusiness?.description || config.seo?.metaDescription}
              </p>
            )}
            {config.contact.address && (
              <p className="text-sm text-gray-900 mb-4">
                {typeof config.contact.address === 'string' 
                  ? config.contact.address 
                  : `${config.contact.address.street}, ${config.contact.address.district}, ${config.contact.address.city}`}
              </p>
            )}
          </div>

          {/* Kurumsal */}
          <div>
            <button
              onClick={() => setKurumusalOpen(!kurumusalOpen)}
              className="flex items-center justify-between w-full text-sm font-semibold mb-4 md:cursor-default"
            >
              <span>Kurumsal</span>
              <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${kurumusalOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 ${kurumusalOpen ? 'block' : 'hidden'} md:block`}>
              <li>
                <Link href="/hakkimizda" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link href="/gizlilik-politikasi" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>Gizlilik Politikası</span>
                </Link>
              </li>
              <li>
                <Link href="/cerez-politikasi" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>Çerez Politikası</span>
                </Link>
              </li>
              <li>
                <Link href="/site-haritasi" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>Site Haritası</span>
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>İletişim</span>
                </Link>
              </li>
              <li>
                <Link href="/teklif-al" className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                  <ChevronRight className="h-4 w-4" />
                  <span>Teklif Al</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <button
              onClick={() => setHizmetlerOpen(!hizmetlerOpen)}
              className="flex items-center justify-between w-full text-sm font-semibold mb-4 md:cursor-default"
            >
              <span>Hizmetlerimiz</span>
              <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${hizmetlerOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 ${hizmetlerOpen ? 'block' : 'hidden'} md:block`}>
              {services.map((service) => {
                const iconMap: { [key: string]: any } = {
                  'web-tasarim': Layout,
                  'web-yazilim': Code,
                  'seo': Search,
                  'geo': MapPin,
                  'e-ticaret': ShoppingCart,
                  'domain-hosting': Server
                }
                const Icon = iconMap[service.slug] || Layout
                
                return (
                  <li key={service.id}>
                    <Link href={`/${service.slug}`} className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                      <Icon className="h-4 w-4" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Hizmet Bölgeleri */}
          <div>
            <button
              onClick={() => setBolgelerOpen(!bolgelerOpen)}
              className="flex items-center justify-between w-full text-sm font-semibold mb-4 md:cursor-default"
            >
              <span>Hizmet Bölgeleri</span>
              <ChevronDown className={`h-4 w-4 md:hidden transition-transform ${bolgelerOpen ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-2 ${bolgelerOpen ? 'block' : 'hidden'} md:block`}>
              {regions.slice(0, 6).map((region) => (
                <li key={region.id}>
                  <Link href={`/${region.slug}`} className="flex items-center gap-2 text-sm text-gray-900 hover:text-black">
                    <MapPin className="h-4 w-4" />
                    <span>{region.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-sm font-semibold mb-4">İletişim</h3>
            <div className="grid grid-cols-2 gap-2.5 md:grid-cols-1 md:gap-2.5">
              {/* Telefon */}
              <div className="flex items-start space-x-2 group">
                <div className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[#006bff] group-hover:bg-blue-50">
                  <Phone className="h-[17px] w-[17px] text-gray-400 group-hover:text-[#006bff] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-900">Telefon:</span>
                  <a href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`} className="text-[12px] text-gray-900 hover:text-[#006bff] transition-colors">
                    {config.contact.phone}
                  </a>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="flex items-start space-x-2 group">
                <div className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[#25D366] group-hover:bg-green-50">
                  <MessageCircle className="h-[17px] w-[17px] text-gray-400 group-hover:text-[#25D366] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-900">WhatsApp:</span>
                  <a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-900 hover:text-[#25D366] transition-colors">
                    Konuşma Başlat
                  </a>
                </div>
              </div>
              
              {/* Canlı Destek */}
              <div className="flex items-start space-x-2 group">
                <div className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[#006bff] group-hover:bg-blue-50">
                  <Headphones className="h-[17px] w-[17px] text-gray-400 group-hover:text-[#006bff] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-900">Canlı Destek:</span>
                  <a href="https://tawk.to/karakar" target="_blank" rel="noopener noreferrer" className="text-[12px] text-gray-900 hover:text-[#006bff] transition-colors">
                    Sohbet Başlat
                  </a>
                </div>
              </div>
              
              {/* E-Posta */}
              <div className="flex items-start space-x-2 group">
                <div className="w-[34px] h-[34px] rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-center flex-shrink-0 transition-colors group-hover:border-[#006bff] group-hover:bg-blue-50">
                  <Mail className="h-[17px] w-[17px] text-gray-400 group-hover:text-[#006bff] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-900">E-Posta:</span>
                  <a href={`mailto:${config.contact.email}`} className="text-[12px] text-gray-900 hover:text-[#006bff] transition-colors">
                    {config.contact.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Layer 3: Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="container-wide py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-900">
              © {currentYear} {config.site.name}. Tüm hakları saklıdır.
            </p>
            <a 
              href="https://karakar.web.tr" 
              target="_blank" 
              title={config.site.name} 
              className="hover:opacity-80 transition-opacity mt-4 md:mt-0 inline-block"
            >
              <Image 
                src="/logo.webp" 
                alt={config.site.name} 
                width={40}
                height={40}
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                sizes="200px"
                className="h-6 w-auto"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
