import type { Metadata } from 'next'
import { getSiteConfig } from '@/lib/config'
import { getServices, getRegions, getApprovedReviews, getFAQ } from '@/lib/content'
import { getPageContent } from '@/lib/pages'
import {
  HeroSection,
  FoundationSection,
  FeaturesSection,
  CTASection,
  ProcessSection
} from '@/components/sections'
import { BrandsSection } from '@/components/sections/brands'
import { ContentArea } from '@/components/sections/content-area'
import { ReviewsSection } from '@/components/sections/reviews'
import { RegionsSection } from '@/components/sections/regions'
import { FAQSection } from '@/components/sections/faq'
import { TrustBadgesSection } from '@/components/sections/trust-badges'
import { DevicesSection } from '@/components/sections/devices'
import { generateAllSchemas, generateFAQPageSchema } from '@/lib/schema'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  
  const baseUrl = `https://${config.site.domain}`
  const seoTitle = pageContent?.homepage?.seo?.title
  const seoDescription = pageContent?.homepage?.seo?.description
  const seoKeywords = pageContent?.homepage?.seo?.keywords
  
  return {
    title: {
      absolute: seoTitle,
    },
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
      url: baseUrl,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${config.seo.ogImage}`,
          width: 1200,
          height: 630,
          alt: config.site.name,
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
      canonical: baseUrl,
    },
    other: {
      'preload-image': `${baseUrl}${config.seo.ogImage}`,
    },
  }
}

export default async function HomePage() {
  const config = await getSiteConfig()
  const pageContent = await getPageContent()
  const services = await getServices()
  const regions = await getRegions()
  const faqs = await getFAQ()
  const reviews = await getApprovedReviews()
  
  const schemas = generateAllSchemas(config, reviews)
  const faqSchema = generateFAQPageSchema(faqs, config)

  return (
    <>
      {/* Schema Markup */}
      {schemas && schemas["@context"] && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas),
          }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      
      <div className="min-h-screen bg-white">
        {/* 1. Hero (Full screen, gradient, CTA) */}
        <HeroSection config={config} pageContent={pageContent} />
        
        {/* 2. Trust Badges (Güven Kartları) */}
        <TrustBadgesSection pageContent={pageContent} />
        
        {/* 3. SEO İçerik Alanı 1 */}
        {pageContent?.homepage?.seoContent1 && (
          <ContentArea content={pageContent.homepage.seoContent1} />
        )}
        
        {/* 4. Hizmetler (Next.js foundation tarzı) */}
        {services && services.length > 0 && (
          <FoundationSection services={services} pageContent={pageContent} config={config} />
        )}
        
        {/* 5. Hangi Cihazlara Hizmet Veriyoruz? */}
        <DevicesSection pageContent={pageContent} />
        
        {/* 6. Hizmet Bölgeleri */}
        {regions && regions.length > 0 && (
          <RegionsSection regions={regions} pageContent={pageContent} />
        )}
        
        {/* 7. Features (Neden biz? 6 özellik) */}
        <FeaturesSection pageContent={pageContent} />
        
        {/* 8. Süreç (4 adım) */}
        <ProcessSection pageContent={pageContent} />
        
        {/* 9. Markalar (Gri) */}
        <BrandsSection pageContent={pageContent} />
        
        {/* 10. Yorumlar */}
        {reviews && reviews.length > 0 && (
          <ReviewsSection reviews={reviews} pageContent={pageContent} />
        )}
        
        {/* 11. SSS */}
        {faqs && faqs.length > 0 && (
          <FAQSection faqs={faqs} pageContent={pageContent} />
        )}
        
        {/* 12. SEO İçerik Alanı 2 */}
        {pageContent?.homepage?.seoContent2 && (
          <ContentArea 
            content={pageContent.homepage.seoContent2}
          />
        )}
        
        {/* 13. CTA (Form + iletişim) */}
        <CTASection config={config} pageContent={pageContent} />
      </div>
    </>
  )
}
