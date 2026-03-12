import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/config'
import { getPageContent } from '@/lib/pages'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema, generateOrganizationSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  
  const baseUrl = `https://${config.site.domain}`
  const seoTitle = pageContent?.about?.seo?.title
  const seoDescription = pageContent?.about?.seo?.description
  const seoKeywords = pageContent?.about?.seo?.keywords
  
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
      url: `${baseUrl}/hakkimizda`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} Hakkımızda`,
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
      canonical: `${baseUrl}/hakkimizda`,
    },
  }
}

export default async function KurumsalPage() {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Hakkımızda', url: `${baseUrl}/hakkimizda` }
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
  const organizationSchema = generateOrganizationSchema(config)

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {organizationSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      )}
      
      <div className="min-h-screen bg-white">
        {pageContent?.about?.hero?.title && (
          <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                  {pageContent.about.hero.title}
                </h1>
                {pageContent.about.hero.subtitle && (
                  <p className="mt-6 text-[18px] text-gray-900">
                    {pageContent.about.hero.subtitle}
                  </p>
                )}
                <div className="mt-6 flex justify-center">
                  <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
                </div>
              </div>
            </div>
          </section>
        )}

        {(pageContent?.about?.content?.description || pageContent?.about?.content?.mission || pageContent?.about?.content?.vision) && (
          <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto space-y-12">
                {/* Hakkımızda */}
                {pageContent.about.content.description && (
                  <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                      Hakkımızda
                    </h2>
                    <div className="w-20 h-1 bg-black mx-auto mb-8" />
                    <p className="text-lg text-gray-900 leading-relaxed max-w-3xl mx-auto">
                      {pageContent.about.content.description}
                    </p>
                  </div>
                )}

                {/* Misyon & Vizyon */}
                {(pageContent.about.content.mission || pageContent.about.content.vision) && (
                  <div className="grid gap-8 md:grid-cols-2 mt-16">
                    {pageContent.about.content.mission && (
                      <div className="bg-gray-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-black mb-4">
                          Misyonumuz
                        </h3>
                        <div className="w-12 h-1 bg-black mb-6" />
                        <p className="text-gray-900 leading-relaxed">
                          {pageContent.about.content.mission}
                        </p>
                      </div>
                    )}

                    {pageContent.about.content.vision && (
                      <div className="bg-gray-50 p-8 rounded-lg">
                        <h3 className="text-2xl font-bold text-black mb-4">
                          Vizyonumuz
                        </h3>
                        <div className="w-12 h-1 bg-black mb-6" />
                        <p className="text-gray-900 leading-relaxed">
                          {pageContent.about.content.vision}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Değerlerimiz */}
        {pageContent?.about?.content?.values && pageContent.about.content.values.length > 0 && pageContent.about.content.values.some((v: any) => v.title || v.description) && (
          <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    Değerlerimiz
                  </h2>
                  <div className="w-20 h-1 bg-black mx-auto mb-8" />
                  {pageContent.about.content.valuesSubtitle && (
                    <p className="text-lg text-gray-900 max-w-2xl mx-auto">
                      {pageContent.about.content.valuesSubtitle}
                    </p>
                  )}
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {pageContent.about.content.values.filter((v: any) => v.title || v.description).map((value: any, index: number) => {
                    const getIcon = (iconName: string) => {
                      const iconProps = { className: "h-8 w-8" }
                      switch(iconName) {
                        case 'shield-check': return (
                          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )
                        case 'award': return (
                          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        )
                        case 'lightbulb': return (
                          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        )
                        case 'heart': return (
                          <svg {...iconProps} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )
                        default: return null
                      }
                    }

                    if (!value.title && !value.description) return null

                    return (
                      <div key={index} className="bg-white p-8 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-black text-white flex items-center justify-center">
                            {getIcon(value.icon)}
                          </div>
                          <div className="flex-1">
                            {value.title && (
                              <h3 className="text-xl font-bold text-black mb-3">
                                {value.title}
                              </h3>
                            )}
                            {value.description && (
                              <p className="text-gray-900 leading-relaxed">
                                {value.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  )
}
