import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Home, Info, Lock, Cookie, Mail, FileText, Layout, Code, Search, MapPin, ShoppingCart, Server, DollarSign, MessageSquare, MapPinned } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getPageContent } from '@/lib/pages'
import { getServices, getRegions } from '@/lib/content'
import { Breadcrumb } from '@/components/layout/breadcrumb'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  
  const baseUrl = `https://${config.site.domain}`
  const seoTitle = pageContent?.sitemap?.seo?.title
  const seoDescription = pageContent?.sitemap?.seo?.description
  const seoKeywords = pageContent?.sitemap?.seo?.keywords
  
  return {
    title: seoTitle,
    description: seoDescription,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/site-haritasi`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Site Haritası`,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [`${baseUrl}${config.seo.ogImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/site-haritasi`,
    },
  }
}

export default async function SiteMapPage() {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  const services = await getServices()
  const regions = await getRegions()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Site Haritası', url: `${baseUrl}/site-haritasi` }
  ]

  const sitemapSections = [
    {
      title: 'Ana Sayfalar',
      icon: Home,
      links: [
        { name: 'Ana Sayfa', href: '/', icon: Home },
        { name: 'Hakkımızda', href: '/hakkimizda', icon: Info },
        { name: 'İletişim', href: '/iletisim', icon: Mail },
        { name: 'Teklif Al', href: '/teklif-al', icon: FileText },
      ]
    },
    {
      title: 'Hizmetlerimiz',
      icon: Code,
      links: [
        { name: 'Tüm Hizmetler', href: '/hizmetlerimiz', icon: Layout },
        ...services.map(service => ({
          name: service.name,
          href: `/${service.slug}`,
          icon: service.slug === 'web-tasarim' ? Layout :
                service.slug === 'web-yazilim' ? Code :
                service.slug === 'seo' ? Search :
                service.slug === 'geo' ? MapPin :
                service.slug === 'e-ticaret' ? ShoppingCart :
                service.slug === 'domain-hosting' ? Server : Layout
        })),
      ]
    },
    {
      title: 'Hizmet Bölgeleri',
      icon: MapPinned,
      links: [
        { name: 'Tüm Bölgeler', href: '/hizmet-bolgeleri', icon: MapPinned },
        ...regions.map(region => ({
          name: region.name.includes('(') ? region.name.match(/\(([^)]+)\)/)?.[1] || region.name : region.name,
          href: `/${region.slug}`,
          icon: MapPin
        }))
      ]
    },
    {
      title: 'Kurumsal',
      icon: Info,
      links: [
        { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi', icon: Lock },
        { name: 'Çerez Politikası', href: '/cerez-politikasi', icon: Cookie },
        { name: 'Site Haritası', href: '/site-haritasi', icon: FileText },
      ]
    }
  ]

  return (
    <div className="bg-white">
      <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            {pageContent?.sitemap?.hero?.title && (
              <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                {pageContent.sitemap.hero.title}
              </h1>
            )}
            {pageContent?.sitemap?.hero?.subtitle && (
              <p className="mt-6 text-[18px] text-gray-900">
                {pageContent.sitemap.hero.subtitle}
              </p>
            )}
            <div className="mt-6 flex justify-center">
              <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {sitemapSections.map((section, idx) => {
              const IconComponent = section.icon
              return (
                <div key={idx} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h2 className="text-xl font-semibold text-black">{section.title}</h2>
                  </div>
                  <ul className={section.title === 'Hizmet Bölgeleri' ? 'grid grid-cols-2 gap-x-4 gap-y-2' : 'space-y-2'}>
                    {section.links.map((link, linkIdx) => {
                      const LinkIcon = link.icon
                      return (
                        <li key={linkIdx}>
                          <Link 
                            href={link.href}
                            className="flex items-center gap-2 text-sm text-gray-900 hover:text-[#006bff] transition-colors group"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-[#006bff] transition-colors" />
                            <LinkIcon className="h-4 w-4 text-gray-400 group-hover:text-[#006bff] transition-colors" />
                            <span>{link.name}</span>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
