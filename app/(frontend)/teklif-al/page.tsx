import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/config'
import { getServices } from '@/lib/content'
import { getPageSettings } from '@/lib/page-settings'
import { QuoteFormTechService } from '@/components/forms/quote-form-tech-service'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageSettings = await getPageSettings()
  const baseUrl = `https://${config.site.domain}`
  
  const seoTitle = pageSettings?.['teklif-al']?.seo?.title
  const seoDescription = pageSettings?.['teklif-al']?.seo?.description
  const seoKeywords = pageSettings?.['teklif-al']?.seo?.keywords
  
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
      url: `${baseUrl}/teklif-al`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Teklif Al`,
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
      canonical: `${baseUrl}/teklif-al`,
    },
  }
}

export default async function TeklifAlPage() {
  const config = await getSiteConfig()
  const services = await getServices()
  const pageSettings = await getPageSettings()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Teklif Al', url: `${baseUrl}/teklif-al` }
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
      
      <div className="min-h-screen bg-white">
        {(pageSettings?.['teklif-al']?.title || pageSettings?.['teklif-al']?.description) && (
          <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                {pageSettings?.['teklif-al']?.title && (
                  <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                    {pageSettings['teklif-al'].title}
                  </h1>
                )}
                {pageSettings?.['teklif-al']?.description && (
                  <p className="mt-6 text-[18px] text-gray-900">
                    {pageSettings['teklif-al'].description}
                  </p>
                )}
                <div className="mt-6 flex justify-center">
                  <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
                </div>
              </div>
            </div>
          </section>
        )}

      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-6xl px-4">
            <QuoteFormTechService services={services} />
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
