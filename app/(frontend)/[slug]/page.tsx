import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MessageCircle, Phone, FileText, Calculator, Layout, Code, Search, MapPin, ShoppingCart, Server, Check, List, ChevronDown } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getServices, getRegions, getReviews, getFAQByRegion } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { Breadcrumb } from '@/components/layout/breadcrumb'
import { generateServiceSchema, generateBreadcrumbSchema, generateAggregateRatingSchema } from '@/lib/schema'
import { ReviewsSection } from '@/components/sections/reviews'
import { ScrollStickySidebar } from '@/components/layout/scroll-sticky-sidebar'

interface ServicePageProps {
  params: {
    slug: string
  }
}

export const revalidate = 3600

export async function generateStaticParams() {
  const services = await getServices()
  const regions = await getRegions()
  
  return [
    ...services.map((service) => ({ slug: service.slug })),
    ...regions.map((region) => ({ slug: region.slug }))
  ]
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const config = await getSiteConfig()
  const services = await getServices()
  const regions = await getRegions()
  
  const baseUrl = `https://${config.site.domain}`
  const service = services.find(s => s.slug === slug)
  const region = regions.find(r => r.slug === slug)
  
  const item = service || region
  if (!item) return {}
  
  // Type guard for content structure
  const seoData: any = (typeof item.content === 'object' && item.content !== null && 'seo' in item.content) 
    ? item.content.seo 
    : (item.seo || {})
  
  return {
    title: region ? {
      absolute: seoData.title || item.name,
    } : seoData.title || item.name,
    description: seoData.description || '',
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
      title: seoData.title || item.name,
      description: seoData.description || '',
      url: `${baseUrl}/${item.slug}`,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${item.name} - ${config.site.name}`,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title || item.name,
      description: seoData.description || '',
      images: [`${baseUrl}${config.seo.ogImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${item.slug}`,
    },
  }
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const config = await getSiteConfig()
  const services = await getServices()
  const regions = await getRegions()
  const reviews = await getReviews()
  
  const service = services.find(s => s.slug === slug)
  const region = regions.find(r => r.slug === slug)
  
  // Eğer bölge sayfası ise, bölge sayfasını render et
  if (region) {
    // OSB listesi - bunlara "Mahallesi" eklenmeyecek
    const osbList = ['iayosb', 'idosb', 'bosb', 'kosb', 'itosb'];
    const isOSB = osbList.includes(region.id);
    const regionNameWithoutMahallesi = region.name.replace(' Mahallesi', '');
    const regionDisplayName = isOSB ? region.name : `${regionNameWithoutMahallesi} Mahallesi`;
    
    const baseUrl = `https://${config.site.domain}`
    const breadcrumbItems = [
      { name: 'Hizmet Bölgeleri', url: `${baseUrl}/hizmet-bolgeleri` },
      { name: regionNameWithoutMahallesi, url: `${baseUrl}/${region.slug}` }
    ]
    const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
    
    // Bu bölgeye özel yorumları filtrele
    const regionReviews = reviews.filter(r => r.region === region.id && r.approved)
    const aggregateRatingSchema = regionReviews.length > 0 ? generateAggregateRatingSchema(regionReviews, config) : null
    
    // Bu bölgeye özel SSS'leri çek
    const regionFAQs = await getFAQByRegion(region.id)

    // Article Schema for Region
    const articleSchema = region.publishedDate ? {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${region.name} Web Tasarım`,
      "description": region.description || `${region.name} bölgesinde profesyonel web tasarım hizmetleri`,
      "datePublished": region.publishedDate,
      "dateModified": region.publishedDate,
      "author": {
        "@type": "Organization",
        "name": config.site.name,
        "url": `https://${config.site.domain}`
      },
      "publisher": {
        "@type": "Organization",
        "name": config.site.name,
        "logo": {
          "@type": "ImageObject",
          "url": `https://${config.site.domain}${config.seo.logo}`
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://${config.site.domain}/${region.slug}`
      }
    } : null

    return (
      <>
        {breadcrumbSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        )}
        {aggregateRatingSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
        )}
        {articleSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        )}
        
        <div className="bg-white">
          <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                  {region.name.replace(' Mahallesi', '')} Bilgisayar Teknik Servis
                </h1>
                {region.city && (
                  <p className="mt-6 text-[18px] text-gray-900">
                    {region.description || `${region.city} bölgesinde profesyonel web tasarım, SEO ve dijital pazarlama hizmetleri sunuyoruz.`}
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
              <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-8">
                {/* Main Content - Left */}
                <div className="min-w-0">
                  <article 
                    className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-black prose-strong:font-semibold prose-em:text-gray-900 prose-ul:my-6 prose-ol:my-6 prose-li:text-gray-700 prose-table:my-8 prose-th:bg-gray-100 prose-th:text-black prose-th:font-semibold prose-td:text-gray-700"
                    dangerouslySetInnerHTML={{ 
                      __html: (() => {
                        const content = typeof region.content === 'string' ? region.content : (region.content?.main || '');
                        const firstParagraphEnd = content.indexOf('</p>') + 4;
                        const beforeFirstP = content.substring(0, firstParagraphEnd);
                        const afterFirstP = content.substring(firstParagraphEnd);
                        
                        const regionNameWithoutMahallesi = region.name.replace(' Mahallesi', '');
                        
                        // İçerikten başlıkları çıkar ve TOC oluştur
                        const h2Matches = content.match(/<h2>(.+?)<\/h2>/g) || [];
                        const h3Matches = content.match(/<h3>(.+?)<\/h3>/g) || [];
                        
                        const tocItems: Array<{text: string, id: string, isH3: boolean}> = [];
                        
                        h2Matches.forEach(h2 => {
                          const text = h2.replace(/<\/?h2>/g, '');
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-ığüşöçİĞÜŞÖÇ]/g, '')
                            .replace(/ı/g, 'i')
                            .replace(/ğ/g, 'g')
                            .replace(/ü/g, 'u')
                            .replace(/ş/g, 's')
                            .replace(/ö/g, 'o')
                            .replace(/ç/g, 'c')
                            .replace(/İ/g, 'i')
                            .replace(/Ğ/g, 'g')
                            .replace(/Ü/g, 'u')
                            .replace(/Ş/g, 's')
                            .replace(/Ö/g, 'o')
                            .replace(/Ç/g, 'c');
                          tocItems.push({ text, id, isH3: false });
                        });
                        
                        h3Matches.forEach(h3 => {
                          const text = h3.replace(/<\/?h3>/g, '');
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-ığüşöçİĞÜŞÖÇ]/g, '')
                            .replace(/ı/g, 'i')
                            .replace(/ğ/g, 'g')
                            .replace(/ü/g, 'u')
                            .replace(/ş/g, 's')
                            .replace(/ö/g, 'o')
                            .replace(/ç/g, 'c')
                            .replace(/İ/g, 'i')
                            .replace(/Ğ/g, 'g')
                            .replace(/Ü/g, 'u')
                            .replace(/Ş/g, 's')
                            .replace(/Ö/g, 'o')
                            .replace(/Ç/g, 'c');
                          tocItems.push({ text, id, isH3: true });
                        });
                        
                        const tocLinks = tocItems.map(item => 
                          `<a href="#${item.id}" class="block text-sm ${item.isH3 ? 'text-gray-700 pl-4' : 'font-medium text-gray-900'} hover:text-[#006bff] transition-colors">${item.text}</a>`
                        ).join('\n                              ');
                        
                        const toc = `
                          <div class="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 not-prose">
                            <div class="flex items-center gap-2 mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-900"><path d="M3 5h.01"></path><path d="M3 12h.01"></path><path d="M3 19h.01"></path><path d="M8 5h13"></path><path d="M8 12h13"></path><path d="M8 19h13"></path></svg>
                              <div class="text-lg font-bold text-black">İçindekiler</div>
                            </div>
                            <nav class="space-y-2">
                              ${tocLinks}
                            </nav>
                          </div>
                        `;
                        
                        let modifiedContent = beforeFirstP + toc + afterFirstP;
                        
                        // Tüm H2 ve H3 başlıklarına dinamik ID ekle
                        modifiedContent = modifiedContent.replace(/<h2>(.+?)<\/h2>/g, (match, text) => {
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-ığüşöçİĞÜŞÖÇ]/g, '')
                            .replace(/ı/g, 'i')
                            .replace(/ğ/g, 'g')
                            .replace(/ü/g, 'u')
                            .replace(/ş/g, 's')
                            .replace(/ö/g, 'o')
                            .replace(/ç/g, 'c')
                            .replace(/İ/g, 'i')
                            .replace(/Ğ/g, 'g')
                            .replace(/Ü/g, 'u')
                            .replace(/Ş/g, 's')
                            .replace(/Ö/g, 'o')
                            .replace(/Ç/g, 'c');
                          return `<h2 id="${id}">${text}</h2>`;
                        });
                        
                        modifiedContent = modifiedContent.replace(/<h3>(.+?)<\/h3>/g, (match, text) => {
                          const id = text
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-ığüşöçİĞÜŞÖÇ]/g, '')
                            .replace(/ı/g, 'i')
                            .replace(/ğ/g, 'g')
                            .replace(/ü/g, 'u')
                            .replace(/ş/g, 's')
                            .replace(/ö/g, 'o')
                            .replace(/ç/g, 'c')
                            .replace(/İ/g, 'i')
                            .replace(/Ğ/g, 'g')
                            .replace(/Ü/g, 'u')
                            .replace(/Ş/g, 's')
                            .replace(/Ö/g, 'o')
                            .replace(/Ç/g, 'c');
                          return `<h3 id="${id}">${text}</h3>`;
                        });
                        
                        return modifiedContent;
                      })()
                    }} 
                  />

                  <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                    <h3 className="text-xl font-bold text-black mb-4">
                      {region.name} bölgesinde hizmet için teklif alın.
                    </h3>
                    <p className="text-gray-900 mb-6">
                      Size özel çözümler sunmak için buradayız.<br />
                      Hemen bizimle iletişime geçin.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row justify-center">
                      <Link href="/teklif-al">
                        <Button size="lg" className="w-full sm:w-auto">
                          Ücretsiz Teklif Al
                        </Button>
                      </Link>
                      <Link href={config.contact.whatsapp} target="_blank">
                        <Button size="lg" variant="outline" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A] border-0">
                          WhatsApp
                        </Button>
                      </Link>
                      <Link href={'tel:' + (config.contact.phoneInternational || config.contact.phone.replaceAll(' ', ''))}>
                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                          {config.contact.phone}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* SSS (FAQ) Section */}
                  {regionFAQs.length > 0 && (
                    <div className="mt-16">
                      <h2 className="text-2xl font-bold text-black mb-8">
                        Sık Sorulan Sorular
                      </h2>
                      <div className="space-y-4">
                        {regionFAQs.map((faq) => (
                          <details key={faq.id} className="group rounded-lg border border-gray-200 bg-gray-50 p-6">
                            <summary className="flex items-center justify-between cursor-pointer list-none">
                              <h3 className="text-base font-semibold text-black pr-4">
                                {faq.question}
                              </h3>
                              <ChevronDown className="h-5 w-5 text-gray-900 transition-transform group-open:rotate-180" />
                            </summary>
                            <div 
                              className="mt-4 text-gray-700 leading-relaxed prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: faq.answer }}
                            />
                          </details>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Yorumlar Section */}
                  {regionReviews.length > 0 && (
                    <div className="mt-16">
                      <ReviewsSection reviews={regionReviews} />
                    </div>
                  )}
                </div>

                {/* Sidebar - Right */}
                <aside className="hidden lg:block">
                  <ScrollStickySidebar topOffset={96}>
                    <div className="space-y-6">
                      {/* Tüm Hizmetlerimiz */}
                      <nav className="rounded-lg border border-gray-200 bg-white p-6 sticky top-20 self-start">
                        <h3 className="text-lg font-bold text-black mb-4">Tüm Hizmetlerimiz</h3>
                        <ul className="space-y-3">
                          {services.map((s) => {
                            const iconMap: { [key: string]: any } = {
                              'layout': Layout,
                              'code': Code,
                              'search': Search,
                              'map-pin': MapPin,
                              'shopping-cart': ShoppingCart,
                              'server': Server,
                            }
                            const Icon = iconMap[s.icon] || Layout
                            
                            return (
                              <li key={s.id}>
                                <Link 
                                  href={`/${s.slug}`}
                                  className="flex items-center gap-2 text-sm transition-colors text-gray-900 hover:text-[#006bff]"
                                >
                                  <Icon className="h-4 w-4" />
                                  <span>{s.name}</span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </nav>

                      {/* CTA Buttons */}
                      <div className="rounded-lg border border-gray-200 bg-white p-6 sticky top-20">
                        <h3 className="text-lg font-bold text-black mb-4">İletişime Geçin</h3>
                        
                        {/* WhatsApp ve Telefon yan yana */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <Link href={config.contact.whatsapp} target="_blank">
                            <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </Link>

                          <Link href={'tel:' + (config.contact.phoneInternational || config.contact.phone.replaceAll(' ', ''))}>
                            <Button className="w-full" variant="outline">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </Link>
                      </div>

                      {/* Teklif Al tam genişlik */}
                      <Link href="/teklif-al">
                        <Button className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Teklif Al
                        </Button>
                      </Link>
                    </div>
                    </div>
                  </ScrollStickySidebar>
                </aside>
              </div>
            </div>
          </section>


          {/* Diğer Hizmet Bölgeleri */}
          <section className="border-t border-gray-200 bg-gray-50 py-16">
            <div className="container mx-auto">
              <h2 className="text-2xl font-bold text-black mb-8">
                Diğer Hizmet Bölgelerimiz
              </h2>
              <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
                {regions
                  .filter(r => r.id !== region.id)
                  .map((otherRegion) => (
                    <Link
                      key={otherRegion.id}
                      href={`/${otherRegion.slug}`}
                      className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-lg transition-all"
                    >
                      <h3 className="text-lg font-semibold text-black mb-2 group-hover:underline">
                        {otherRegion.name}
                      </h3>
                      <p className="text-sm text-gray-900 line-clamp-2">
                        {otherRegion.description}
                      </p>
                      <span className="inline-block mt-4 text-sm text-blue-600 group-hover:text-blue-700">
                        İncele →
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      
      <div className="bg-white">
        {/* Hero Section */}
        <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                {service.name}
              </h1>
              <p className="mt-6 text-[18px] text-gray-900">
                {service.description}
              </p>
              <div className="mt-6 flex justify-center">
                <Breadcrumb items={breadcrumbItems} siteTitle={config.site.name} />
              </div>
            </div>
          </div>
        </section>

        {/* Content Section with Sidebar */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_300px] gap-8">
              {/* Main Content - Left */}
              <div className="min-w-0">
                <div 
                  className="prose prose-lg max-w-none prose-headings:text-black prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-black prose-strong:font-semibold prose-em:text-gray-800 prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 prose-table:border-collapse prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-td:border prose-td:border-gray-300 prose-td:p-3"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />

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

                {/* CTA - Mobile Only */}
                <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center lg:hidden">
                  <h3 className="text-xl font-bold text-black mb-4">
                    {service.name} hizmeti için teklif alın
                  </h3>
                  <p className="text-gray-900 mb-6">
                    Size özel çözümler sunmak için buradayız.<br />
                    Hemen bizimle iletişime geçin.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Link href="/teklif-al">
                      <Button size="lg" className="w-full sm:w-auto">
                        Ücretsiz Teklif Al
                      </Button>
                    </Link>
                    <Link href={config.contact.whatsapp} target="_blank">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto bg-[#25D366] text-white hover:bg-[#20BA5A] border-0">
                        WhatsApp
                      </Button>
                    </Link>
                    <Link href={'tel:' + (config.contact.phoneInternational || config.contact.phone.replaceAll(' ', ''))}>
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        {config.contact.phone}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar - Right */}
              <aside className="hidden lg:block">
              <ScrollStickySidebar topOffset={96}>
                <div className="space-y-6">
                  {/* Tüm Hizmetlerimiz */}
                  <nav className="rounded-lg border border-gray-200 bg-white p-6 sticky top-20 self-start">
                    <h3 className="text-lg font-bold text-black mb-4">Tüm Hizmetlerimiz</h3>
                    <ul className="space-y-3">
                      {services.map((s) => {
                        const iconMap: { [key: string]: any } = {
                          'layout': Layout,
                          'code': Code,
                          'search': Search,
                          'map-pin': MapPin,
                          'shopping-cart': ShoppingCart,
                          'server': Server,
                        }
                        const Icon = iconMap[s.icon] || Layout
                        
                        return (
                          <li key={s.id}>
                            <Link 
                              href={'/' + s.slug}
                              className="flex items-center gap-2 text-sm transition-colors text-gray-900 hover:text-[#006bff]"
                            >
                              <Icon className="h-4 w-4" />
                              <span>{s.name}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </nav>

                  {/* İletişime Geçin */}
                  <div className="rounded-lg border border-gray-200 bg-white p-6 sticky top-20">
                    <h3 className="text-lg font-bold text-black mb-4">İletişime Geçin</h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <Link href={config.contact.whatsapp} target="_blank">
                        <Button className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={'tel:' + (config.contact.phoneInternational || config.contact.phone.replaceAll(' ', ''))}>
                        <Button className="w-full" variant="outline">
                          <Phone className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    <Link href="/teklif-al">
                      <Button className="w-full">
                        <FileText className="h-4 w-4 mr-2" />
                        Teklif Al
                      </Button>
                    </Link>
                  </div>
                </div>
              </ScrollStickySidebar>
            </aside>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="border-t border-gray-200 bg-gray-50 py-16">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold text-black mb-8">
              Diğer Hizmetlerimiz
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {services
                .filter(s => s.id !== service.id)
                .slice(0, 5)
                .map((relatedService) => (
                  <Link 
                    key={relatedService.id} 
                    href={`/${relatedService.slug}`}
                    className="group block rounded-lg border border-gray-200 bg-white p-6 hover:border-gray-300 hover:shadow-lg transition-all"
                  >
                    <h3 className="text-lg font-semibold text-black mb-2 group-hover:underline">
                      {relatedService.name}
                    </h3>
                    <p className="text-sm text-gray-900">
                      {relatedService.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
