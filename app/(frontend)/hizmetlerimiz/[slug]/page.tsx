import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getServices } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateServiceSchema, generateBreadcrumbSchema } from '@/lib/schema'

interface ServicePageProps {
  params: {
    'service-slug': string
  }
}

export const revalidate = 3600

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((service) => ({
    'service-slug': service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const config = await getSiteConfig()
  const services = await getServices()
  const service = services.find(s => s.slug === params['service-slug'])
  
  const baseUrl = `https://${config.site.domain}`
  if (!service) return {}
  
  return {
    title: service.seo.title,
    description: service.seo.description,
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
      title: service.seo.title,
      description: service.seo.description,
      url: `${baseUrl}/${service.slug}`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${service.name} - ${config.site.name}`,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seo.title,
      description: service.seo.description,
      images: [`${baseUrl}${config.seo.ogImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${service.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const config = await getSiteConfig()
  const services = await getServices()
  const service = services.find(s => s.slug === params['service-slug'])

  if (!service) {
    notFound()
  }

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Hizmetlerimiz', url: `${baseUrl}/hizmetlerimiz` },
    { name: service.name, url: `${baseUrl}/${service.slug}` }
  ]
  const serviceSchema = generateServiceSchema(service, config)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      {serviceSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      
      <div className="min-h-screen bg-white">
        <section className="border-b border-gray-200 bg-white py-8">
          <div className="container mx-auto">
            <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
          </div>
        </section>

        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <Link href="/hizmetlerimiz" className="text-sm text-gray-900 hover:text-black">
                ← Hizmetlerimiz
              </Link>
            </div>
            <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
              {service.name}
            </h1>
            <p className="mt-6 text-[18px] text-gray-900">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-strong:text-black prose-strong:font-semibold prose-em:text-gray-800 prose-ul:my-6 prose-ol:my-6 prose-li:text-gray-700 prose-li:mb-2 prose-table:w-full prose-table:border-collapse prose-table:my-8 prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-black prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-3 prose-td:text-gray-700"
              dangerouslySetInnerHTML={{ __html: service.content }}
            ></div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-black mb-6">
                  Özellikler
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-8">
              <h3 className="text-xl font-bold text-black mb-4">
                {service.name} hizmeti için teklif alın
              </h3>
              <p className="text-gray-900 mb-6">
                Size özel çözümler sunmak için buradayız. Hemen iletişime geçin.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/teklif-al">
                  <Button size="lg" className="w-full sm:w-auto">
                    Ücretsiz Teklif Al
                  </Button>
                </Link>
                <Link href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    {config.contact.phone}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold text-black mb-8">
            Diğer Hizmetlerimiz
          </h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            {service.name} hizmetimizin yanı sıra, dijital varlığınızı güçlendirmek için tamamlayıcı çözümlerimizi keşfedin.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.filter(s => s.id !== service.id).map((relatedService) => (
              <Link
                key={relatedService.id}
                href={`/${relatedService.slug}`}
                className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold text-black mb-2 group-hover:underline">
                  {relatedService.name}
                </h3>
                <p className="text-sm text-gray-900 line-clamp-2">
                  {relatedService.description}
                </p>
                <span className="inline-block mt-4 text-sm text-blue-600 group-hover:text-blue-700">
                  Detaylı Bilgi →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
