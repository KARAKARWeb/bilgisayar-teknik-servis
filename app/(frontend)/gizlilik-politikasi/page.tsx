import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/config'
import { getPageContent } from '@/lib/pages'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  
  const baseUrl = `https://${config.site.domain}`
  const seoTitle = pageContent?.privacy?.seo?.title
  const seoDescription = pageContent?.privacy?.seo?.description
  const seoKeywords = pageContent?.privacy?.seo?.keywords
  
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
      url: `${baseUrl}/gizlilik-politikasi`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Gizlilik Politikası`,
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
    alternates: { canonical: `${baseUrl}/gizlilik-politikasi` },
  }
}

export default async function GizlilikPolitikasiPage() {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Gizlilik Politikası', url: `${baseUrl}/gizlilik-politikasi` }
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      
      <div className="bg-white">
        {pageContent?.privacy?.hero?.title && (
          <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">{pageContent.privacy.hero.title}</h1>
                {pageContent.privacy.hero.subtitle && (
                  <p className="mt-6 text-[18px] text-gray-900">{pageContent.privacy.hero.subtitle}</p>
                )}
                <div className="mt-6 flex justify-center">
                  <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
                </div>
              </div>
            </div>
          </section>
        )}

        {pageContent?.privacy?.content && (
          <section className="py-16">
            <div className="container mx-auto">
              <div className="prose prose-lg max-w-4xl mx-auto" dangerouslySetInnerHTML={{ __html: pageContent.privacy.content }} />
            </div>
          </section>
        )}
      </div>
    </>
  )
}
