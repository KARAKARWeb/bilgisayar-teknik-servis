import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'
import { getSiteConfig } from '@/lib/config'
import { getRegions, getServices } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { generateServiceSchema, generateBreadcrumbSchema, generateRegionLocalBusinessSchema, generateRegionArticleSchema } from '@/lib/schema'

interface RegionPageProps {
  params: {
    'region-slug': string
  }
}

export const revalidate = 3600

export async function generateStaticParams() {
  const regions = await getRegions()
  return regions.map((region) => ({
    'region-slug': region.slug,
  }))
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const config = await getSiteConfig()
  const regions = await getRegions()
  const region = regions.find(r => r.slug === params['region-slug'])
  
  const baseUrl = `https://${config.site.domain}`
  if (!region) return {}
  
  return {
    title: {
      absolute: region.seo?.title || region.name,
    },
    description: region.seo?.description,
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
      title: region.seo?.title,
      description: region.seo?.description,
      url: `${baseUrl}/${region.slug}`,
      siteName: config.site.name,
      images: [
        {
          url: region.seo?.ogImage || `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: `${region.name} - ${config.site.name}`,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: region.seo?.title,
      description: region.seo?.description,
      images: [region.seo?.ogImage || `${baseUrl}${config.seo.ogImage}`],
    },
    alternates: {
      canonical: `${baseUrl}/${region.slug}`,
    },
  }
}

export default async function RegionDetailPage({ params }: RegionPageProps) {
  const config = await getSiteConfig()
  const regions = await getRegions()
  const region = regions.find(r => r.slug === params['region-slug'])

  if (!region) {
    notFound()
  }

  const services = await getServices()
  const { getReviews } = await import('@/lib/content')
  const reviews = await getReviews()
  
  const regionServices = services.filter(s => region.services?.includes(s.id))

  const baseUrl = `https://${config.site.domain}`
  const breadcrumbItems = [
    { name: 'Hizmet Bölgeleri', url: `${baseUrl}/hizmet-bolgeleri` },
    { name: region.name.replace(' Mahallesi', ''), url: `${baseUrl}/${region.slug}` }
  ]
  const localBusinessSchema = generateRegionLocalBusinessSchema(config, region, reviews)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)
  const articleSchema = generateRegionArticleSchema(region, config)

  return (
    <>
      {localBusinessSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      {articleSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      )}
      
      <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4">
              <Link href="/hizmet-bolgeleri" className="text-sm text-gray-900 hover:text-black">
                ← Hizmet Bölgeleri
              </Link>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-8 w-8 text-gray-900" />
              <h1 className="text-h1-mobile font-semibold text-black md:text-h1-tablet lg:text-h1-desktop">
                {region.hero?.title}
              </h1>
            </div>
            <p className="text-[18px] text-gray-900">
              {region.hero?.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-4xl">
            <article 
              className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-24 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-24 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-black prose-strong:font-semibold prose-em:text-gray-900 prose-ul:my-6 prose-ol:my-6 prose-li:text-gray-700 prose-table:my-8 prose-th:bg-gray-100 prose-th:text-black prose-th:font-semibold prose-td:text-gray-700"
              dangerouslySetInnerHTML={{ 
                __html: (() => {
                  const content = typeof region.content === 'string' ? region.content : '';
                  const firstParagraphEnd = content.indexOf('</p>') + 4;
                  const beforeFirstP = content.substring(0, firstParagraphEnd);
                  const afterFirstP = content.substring(firstParagraphEnd);
                  
                  const regionNameWithoutMahallesi = region.name.replace(' Mahallesi', '');
                  const toc = `
                    <div class="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6 not-prose">
                      <div class="flex items-center gap-2 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-900"><path d="M3 5h.01"></path><path d="M3 12h.01"></path><path d="M3 19h.01"></path><path d="M8 5h13"></path><path d="M8 12h13"></path><path d="M8 19h13"></path></svg>
                        <div class="text-lg font-bold text-black">İçindekiler</div>
                      </div>
                      <nav class="space-y-2">
                        <a href="#kurumsal-web-tasarim" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} Kurumsal Web Tasarım</a>
                        <a href="#web-sitesi-tasarimi" class="block text-sm text-gray-700 hover:text-[#006bff] transition-colors pl-4">${regionNameWithoutMahallesi} Web Sitesi Tasarımı</a>
                        <a href="#web-yazilim" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} Web Yazılım</a>
                        <a href="#seo" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} SEO</a>
                        <a href="#geo" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} GEO</a>
                        <a href="#e-ticaret" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} E-Ticaret</a>
                        <a href="#domain-hosting" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi} Domain ve Hosting</a>
                        <a href="#kurumsal-e-posta" class="block text-sm text-gray-700 hover:text-[#006bff] transition-colors pl-4">${regionNameWithoutMahallesi} Kurumsal E-Posta</a>
                        <a href="#bolge-konum" class="block text-sm font-medium text-gray-900 hover:text-[#006bff] transition-colors">${regionNameWithoutMahallesi}, ${region.district} / ${region.city}</a>
                      </nav>
                    </div>
                  `;
                  
                  let modifiedContent = beforeFirstP + toc + afterFirstP;
                  
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) Kurumsal Web Tasarım<\/h2>/,
                    '<h2 id="kurumsal-web-tasarim">$1 Kurumsal Web Tasarım</h2>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) Web Yazılım<\/h2>/,
                    '<h2 id="web-yazilim">$1 Web Yazılım</h2>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) SEO<\/h2>/,
                    '<h2 id="seo">$1 SEO</h2>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) GEO<\/h2>/,
                    '<h2 id="geo">$1 GEO</h2>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) E-Ticaret<\/h2>/,
                    '<h2 id="e-ticaret">$1 E-Ticaret</h2>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h2>(.+?) Domain ve Hosting<\/h2>/,
                    '<h2 id="domain-hosting">$1 Domain ve Hosting</h2>'
                  );
                  
                  // H3'lere ID ekle
                  modifiedContent = modifiedContent.replace(
                    /<h3>(.+?) Web Sitesi Tasarımı<\/h3>/,
                    '<h3 id="web-sitesi-tasarimi">$1 Web Sitesi Tasarımı</h3>'
                  );
                  modifiedContent = modifiedContent.replace(
                    /<h3>(.+?) Kurumsal E-Posta<\/h3>/,
                    '<h3 id="kurumsal-e-posta">$1 Kurumsal E-Posta</h3>'
                  );
                  
                  // Son başlık - Bölge, İlçe / Şehir (dinamik)
                  const locationPattern = new RegExp(`<h2>(.+?), ${region.district} \\/ ${region.city}<\\/h2>`);
                  modifiedContent = modifiedContent.replace(
                    locationPattern,
                    `<h2 id="bolge-konum">$1, ${region.district} / ${region.city}</h2>`
                  );
                  
                  return modifiedContent;
                })()
              }}
            />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h3 font-semibold text-black md:text-4xl">
              {region.name} Web Tasarım Hizmeti Alın
            </h2>
            <p className="mt-4 text-lg text-gray-900">
              Ücretsiz danışmanlık için hemen iletişime geçin.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/teklif-al">
                <Button size="lg" className="w-full sm:w-auto">
                  Ücretsiz Teklif Al
                </Button>
              </Link>
              <Link href={`tel:${config.contact.phone}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  {config.contact.phone}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
