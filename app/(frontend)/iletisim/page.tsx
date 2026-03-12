import type { Metadata } from 'next'
import { Phone, Mail, MapPin, MessageCircle, Headphones } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getPageSettings } from '@/lib/page-settings'
import { getPageContent } from '@/lib/pages'
import { ContactForm } from '@/components/forms/contact-form'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateBreadcrumbSchema, generateLocalBusinessSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  
  const baseUrl = `https://${config.site.domain}`
  const seoTitle = pageContent?.contact?.seo?.title
  const seoDescription = pageContent?.contact?.seo?.description
  const seoKeywords = pageContent?.contact?.seo?.keywords
  
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
      url: `${baseUrl}/iletisim`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${config.site.name} İletişim`,
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
      canonical: `${baseUrl}/iletisim`,
    },
  }
}

export default async function IletisimPage() {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'İletişim', url: `${baseUrl}/iletisim` }
  ]
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
  const localBusinessSchema = generateLocalBusinessSchema(config)

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      
      <div className="bg-white">
        <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              {pageContent?.contact?.hero?.title && (
                <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                  {pageContent.contact.hero.title}
                </h1>
              )}
              {pageContent?.contact?.hero?.subtitle && (
                <p className="mt-6 text-[18px] text-gray-900">
                  {pageContent.contact.hero.subtitle}
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
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold text-black mb-2">İletişim Bilgileri</h2>
                {pageContent?.contact?.info?.description && (
                  <p className="text-gray-900 mb-8">{pageContent.contact.info.description}</p>
                )}
                
                <div className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">Telefon</h3>
                        <a href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`} className="text-gray-900 hover:text-[#006bff] transition-colors">
                          {config.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">WhatsApp</h3>
                        <a href={config.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#006bff] transition-colors">
                          Konuşma Başlat!
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">E-posta</h3>
                        <a href={`mailto:${config.contact.email}`} className="text-gray-900 hover:text-[#006bff] transition-colors">
                          Göndermek İçin Tıkla!
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <Headphones className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">Canlı Destek</h3>
                        <a href="https://tawk.to/karakar" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#006bff] transition-colors">
                          Sohbet Başlat!
                        </a>
                      </div>
                    </div>
                  </div>

                  {config.contact.address && (
                    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
                      <div className="flex-shrink-0 w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-black mb-1">Adres</h3>
                        <p className="text-gray-900">
                          {typeof config.contact.address === 'string' 
                            ? config.contact.address 
                            : `${config.contact.address.street}, ${config.contact.address.district}, ${config.contact.address.city}`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {(config.social?.facebook || config.social?.instagram || config.social?.linkedin) && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-black mb-4">Sosyal Medya</h3>
                    <div className="flex flex-wrap gap-3">
                      {config.social.facebook && (
                        <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 hover:text-[#006bff] hover:border-gray-300 transition-colors">
                          Facebook
                        </a>
                      )}
                      {config.social.instagram && (
                        <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 hover:text-[#006bff] hover:border-gray-300 transition-colors">
                          Instagram
                        </a>
                      )}
                      {config.social.linkedin && (
                        <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 hover:text-[#006bff] hover:border-gray-300 transition-colors">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold text-black mb-2">Mesaj Gönderin</h2>
                {pageContent?.contact?.form?.description && (
                  <p className="text-gray-900 mb-8">{pageContent.contact.form.description}</p>
                )}
                <ContactForm />
              </div>
            </div>

            {/* Google Maps */}
            {pageContent?.contact?.maps?.iframe && (
              <div className="mt-8">
                <div 
                  className="w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                  dangerouslySetInnerHTML={{ __html: pageContent.contact.maps.iframe }}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
