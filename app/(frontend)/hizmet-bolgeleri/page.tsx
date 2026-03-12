import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getRegions } from '@/lib/content'
import { getPageSettings } from '@/lib/page-settings'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageSettings = await getPageSettings()
  const baseUrl = `https://${config.site.domain}`
  
  const seoTitle = pageSettings?.['hizmet-bolgeleri']?.seo?.title
  const seoDescription = pageSettings?.['hizmet-bolgeleri']?.seo?.description
  const seoKeywords = pageSettings?.['hizmet-bolgeleri']?.seo?.keywords
  
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
      url: `${baseUrl}/hizmet-bolgeleri`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Hizmet Bölgeleri`,
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
      canonical: `${baseUrl}/hizmet-bolgeleri`,
    },
  }
}

export default async function HizmetBolgeleriPage() {
  const config = await getSiteConfig()
  const regions = await getRegions()
  const pageSettings = await getPageSettings()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Hizmet Bölgeleri', url: `${baseUrl}/hizmet-bolgeleri` }
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
              <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                {pageSettings?.['hizmet-bolgeleri']?.title || 'Hizmet Bölgelerimiz'}
              </h1>
              {pageSettings?.['hizmet-bolgeleri']?.subtitle && (
                <p className="mt-6 text-[18px] text-gray-900">
                  {pageSettings['hizmet-bolgeleri'].subtitle}
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
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {regions.map((region: any) => (
                <article
                  key={region.id}
                  className="rounded-lg border border-gray-200 bg-white overflow-hidden flex flex-col"
                >
                  <div className="flex flex-col items-stretch justify-start p-6 flex-1">
                    <div className="flex flex-row items-center justify-between mb-4">
                      <p className="text-sm text-gray-900">{region.district}</p>
                      <MapPin className="h-6 w-6 text-gray-900" />
                    </div>
                    <Link
                      href={`/${region.slug}`}
                      className="text-xl font-semibold text-black hover:underline mb-4"
                    >
                      {region.name}
                    </Link>
                    {region.content && (
                      <p className="text-sm text-gray-900 leading-relaxed line-clamp-2">
                        {typeof region.content === 'string' 
                          ? region.content.replace(/<[^>]*>/g, '').substring(0, 70) + '...'
                          : region.content.main?.replace(/<[^>]*>/g, '').substring(0, 70) + '...'
                        }
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/${region.slug}`}
                    className="block w-full py-3 px-6 bg-gray-100 text-center text-sm font-medium text-gray-900 hover:bg-blue-600 hover:text-white transition-colors mt-auto"
                  >
                    Bölgeyi İncele
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
