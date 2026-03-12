import type { Metadata } from 'next'
import Link from 'next/link'
import { getSiteConfig } from '@/lib/config'
import { getServices } from '@/lib/content'
import { getPageSettings } from '@/lib/page-settings'
import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageSettings = await getPageSettings()
  const baseUrl = `https://${config.site.domain}`
  
  const seoTitle = pageSettings?.['hizmetlerimiz']?.seo?.title || undefined
  const seoDescription = pageSettings?.['hizmetlerimiz']?.seo?.description || undefined
  const seoKeywords = pageSettings?.['hizmetlerimiz']?.seo?.keywords || undefined
  
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
      url: `${baseUrl}/hizmetlerimiz`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Hizmetlerimiz`,
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
      canonical: `${baseUrl}/hizmetlerimiz`,
    },
  }
}

export default async function HizmetlerimizPage() {
  const config = await getSiteConfig()
  const services = await getServices()
  const pageSettings = await getPageSettings()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Hizmetlerimiz', url: `${baseUrl}/hizmetlerimiz` }
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      
      <div className="bg-white">
        <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              {pageSettings?.hizmetlerimiz?.title && (
                <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                  {pageSettings.hizmetlerimiz.title}
                </h1>
              )}
              {pageSettings?.hizmetlerimiz?.description && (
                <p className="mt-6 text-[18px] text-gray-900">
                  {pageSettings.hizmetlerimiz.description}
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const variantMap: Record<string, 'default' | 'code' | 'rocket' | 'ai' | 'ecommerce' | 'server' | 'onsite' | 'remote' | 'corporate' | 'individual' | 'emergency'> = {
                  'yerinde-teknik-destek': 'onsite',
                  'uzaktan-teknik-destek': 'remote',
                  'kurumsal-it-destek': 'corporate',
                  'bireysel-hizmetler': 'individual',
                  'kurumsal-hizmetler': 'corporate',
                  'hizli-mudahale-hizmetleri': 'emergency'
                }
                
                return (
                  <AnimatedFeatureCard
                    key={service.id}
                    title={service.name}
                    description={service.description}
                    href={`/${service.slug}`}
                    variant={variantMap[service.slug] || 'default'}
                  />
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-h3 font-semibold text-black md:text-4xl">
                Projeniz için en uygun hizmeti bulamadınız mı?
              </h2>
              <p className="mt-4 text-lg text-gray-900">
                Size özel çözümler sunmak için buradayız. Hemen iletişime geçin.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/iletisim" className="inline-flex items-center justify-center rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800">
                  İletişime Geçin
                </Link>
                <Link href={`tel:${config.contact.phone}`} className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-black hover:bg-gray-50">
                  {config.contact.phone}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
