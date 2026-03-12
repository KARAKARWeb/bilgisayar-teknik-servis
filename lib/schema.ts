import type { SiteConfig, Service, PricePackage, Region, Review, FAQ } from '@/types'

// 1. LocalBusiness Schema
export function generateLocalBusinessSchema(config: SiteConfig, reviews?: Review[]) {
  if (!config?.site?.name || !config?.site?.domain || !config?.contact?.phone || !config?.contact?.email) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "WebDesignAgency",
    "name": config.schema?.localBusiness?.name || config.site.name,
    "description": config.schema?.localBusiness?.description || config.seo?.metaDescription || `${config.site.name}, ${config.site.district} ve ${config.site.city} bölgesinde profesyonel web tasarım, yazılım geliştirme, SEO ve dijital pazarlama hizmetleri sunmaktadır.`,
    "url": baseUrl,
    "telephone": config.contact.phone,
    "email": config.contact.email,
    "image": `${baseUrl}/bilgisayar-teknik-servis.webp`,
    "logo": `${baseUrl}/logo.webp`,
    "priceRange": config.schema?.localBusiness?.priceRange || "₺₺-₺₺₺",
  }

  // AreaServed - Hizmet verilen bölgeler
  schema.areaServed = [
    {
      "@type": "City",
      "name": config.site.district || "Tuzla"
    },
    {
      "@type": "City",
      "name": config.site.city || "İstanbul"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Marmara Bölgesi"
    }
  ]

  // AggregateRating ekle (reviews varsa)
  if (reviews && reviews.length > 0) {
    const approvedReviews = reviews.filter(r => r && r.approved)
    if (approvedReviews.length > 0) {
      const totalRating = approvedReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = (totalRating / approvedReviews.length).toFixed(1)
      
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": approvedReviews.length.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  }

  // Adres bilgisi - Tam adres
  const address: any = {
    "@type": "PostalAddress",
    "streetAddress": config.contact.address || "İçmeler Mah. Çağdaş Sok C Blok No: 398 D:40",
    "addressLocality": config.site.district || "Tuzla",
    "addressRegion": config.site.city || "İstanbul",
    "postalCode": "34947",
    "addressCountry": "TR"
  }
  schema.address = address

  // AggregateRating ekle
  if (config.schema?.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      "ratingValue": config.schema.aggregateRating.ratingValue,
      "reviewCount": config.schema.aggregateRating.reviewCount,
      "bestRating": config.schema.aggregateRating.bestRating,
      "worstRating": config.schema.aggregateRating.worstRating,
    }
  }

  // Geo koordinatları varsa ekle
  if (config.contact.geo?.latitude && config.contact.geo?.longitude) {
    schema.geo = {
      "@type": "GeoCoordinates",
      "latitude": config.contact.geo.latitude,
      "longitude": config.contact.geo.longitude,
    }
  }

  // Çalışma saatleri - default değerler
  if (config.contact.workingHours?.weekdays && config.contact.workingHours?.saturday) {
    schema.openingHours = [
      `Mo-Fr ${config.contact.workingHours.weekdays}`,
      `Sa ${config.contact.workingHours.saturday}`,
    ]
  } else {
    // Default çalışma saatleri (Türkiye standart iş saatleri)
    schema.openingHours = [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-13:00',
    ]
  }

  // Sosyal medya ve web varlığı linkleri (sameAs)
  const sameAsLinks = [
    config.social?.facebook,
    config.social?.instagram,
    config.social?.twitter ? `https://twitter.com/${config.social.twitter.replace('@', '')}` : null,
    config.social?.linkedin,
    config.social?.youtube,
    config.contact?.whatsapp,
  ].filter(Boolean)
  
  // En az WhatsApp linki ekle
  if (sameAsLinks.length === 0 && config.contact?.whatsapp) {
    sameAsLinks.push(config.contact.whatsapp)
  }
  
  if (sameAsLinks.length > 0) {
    schema.sameAs = sameAsLinks
  }

  return schema
}

// 2. Organization Schema
export function generateOrganizationSchema(config: SiteConfig) {
  if (!config?.site?.name || !config?.site?.domain || !config?.contact?.phone) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.schema?.organization?.legalName || config.site.name,
    "description": config.seo?.metaDescription || config.site.name,
    "url": baseUrl,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": config.contact.phone,
      "contactType": "customer service",
      "availableLanguage": "Turkish",
    },
  }

  // Logo varsa ekle
  if (config.seo?.logo) {
    schema.logo = `${baseUrl}${config.seo.logo}`
  }

  // Sosyal medya linkleri
  const socialLinks = [
    config.social?.facebook,
    config.social?.instagram,
    config.social?.twitter ? `https://twitter.com/${config.social.twitter.replace('@', '')}` : null,
    config.social?.linkedin,
  ].filter(Boolean)
  
  if (socialLinks.length > 0) {
    schema.sameAs = socialLinks
  }

  return schema
}

// 3. WebSite Schema
export function generateWebSiteSchema(config: SiteConfig) {
  if (!config?.site?.name || !config?.site?.domain) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.site.name,
    "url": baseUrl,
  }
}

// 4. Service Schema
export function generateServiceSchema(service: Service, config: SiteConfig) {
  if (!service?.name || !service?.description || !config?.site?.name || !config?.site?.domain) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": config.site.name,
      "url": baseUrl,
      "telephone": config.contact?.phone,
      "email": config.contact?.email,
    },
    "serviceType": service.name,
    "areaServed": [
      {
        "@type": "City",
        "name": config.site.district || "Çayırova",
      },
      {
        "@type": "City",
        "name": config.site.city || "Kocaeli",
      }
    ],
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "TRY",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "TRY",
        "price": "0",
        "description": "Fiyat teklifi için iletişime geçin"
      }
    }
  }
  
  // Service URL ekle
  if (service.slug) {
    schema.url = `${baseUrl}/${service.slug}`
  }
  
  // Service image ekle
  if (config.seo?.ogImage) {
    schema.image = `${baseUrl}${config.seo.ogImage}`
  }
  
  return schema
}

// 5. Product/Offer Schema (Fiyat Paketleri için)
export function generateProductSchema(pkg: PricePackage, config: SiteConfig) {
  if (!pkg?.name || !pkg?.description || !pkg?.price || !config?.site?.name || !config?.site?.domain) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    "name": pkg.name,
    "description": pkg.description,
    "price": pkg.price,
    "priceCurrency": "TRY",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": config.site.name,
      "url": baseUrl,
    },
  }
}

// 6. Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  if (!items || items.length === 0) return null
  
  try {
    // Her item'ın name ve url'inin olduğundan emin ol
    const validItems = items.filter(item => item && item.name && item.url)
    if (validItems.length === 0) return null
    
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": validItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url,
      })),
    }
  } catch (error) {
    console.error('Breadcrumb schema generation error:', error)
    return null
  }
}

// 7. FAQPage Schema
export function generateFAQSchema(faqs: FAQ[]) {
  if (!faqs || faqs.length === 0) return null
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

// 8. Review Schema (Individual)
export function generateReviewSchema(review: Review, config: SiteConfig) {
  if (!review || !config || !config.site) return null
  
  const baseUrl = `https://${config.site.domain}`
  
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.name,
    },
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": config.site.name,
      "url": baseUrl,
      "telephone": config.contact?.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": config.site.district,
        "addressRegion": config.site.city,
        "addressCountry": "TR"
      }
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "reviewBody": review.comment,
    "datePublished": review.date || new Date().toISOString(),
  }
}

// Reviews Collection Schema
export function generateReviewsSchema(reviews: Review[], config: SiteConfig) {
  if (!reviews || reviews.length === 0) return null
  
  return reviews
    .filter(r => r.approved)
    .map(review => generateReviewSchema(review, config))
    .filter(Boolean)
}

// 8b. AggregateRating Schema (Tüm yorumlar için)
export function generateAggregateRatingSchema(reviews: Review[], config: SiteConfig) {
  if (!reviews || !config) return null
  
  const approvedReviews = reviews.filter(r => r && r.approved)
  if (approvedReviews.length === 0) return null
  
  const totalRating = approvedReviews.reduce((sum, r) => sum + r.rating, 0)
  const averageRating = (totalRating / approvedReviews.length).toFixed(1)
  
  const baseUrl = `https://${config.site.domain}`
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": config.site.name,
    "telephone": config.contact.phone,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": averageRating,
      "reviewCount": approvedReviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  }
  
  // PriceRange ekle
  if (config.schema?.localBusiness?.priceRange) {
    schema.priceRange = config.schema.localBusiness.priceRange
  }
  
  // Image ekle
  if (config.schema?.localBusiness?.image) {
    schema.image = `${baseUrl}${config.schema.localBusiness.image}`
  } else if (config.seo?.logo) {
    schema.image = `${baseUrl}${config.seo.logo}`
  }
  
  // Address ekle
  const address: any = {
    "@type": "PostalAddress",
    "addressLocality": config.site.district || config.contact.address?.district,
    "addressRegion": config.site.city || config.contact.address?.city,
    "addressCountry": "TR"
  }
  if (config.contact.streetAddress) address.streetAddress = config.contact.streetAddress
  if (config.contact.postalCode) address.postalCode = config.contact.postalCode
  if (config.contact.address?.street) address.streetAddress = config.contact.address.street
  if (config.contact.address?.postalCode) address.postalCode = config.contact.address.postalCode
  schema.address = address
  
  return schema
}

// 9. Article Schema (Blog/İçerik için)
export function generateArticleSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  config: SiteConfig,
  url?: string
) {
  if (!title || !config?.site?.name || !config?.site?.domain) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image.startsWith('http') ? image : `${baseUrl}${image}`,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": config.site.name,
      "url": baseUrl,
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}${config.seo?.logo || config.seo?.ogImage}`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url || baseUrl
    }
  }
}

// Region Article Schema
export function generateRegionArticleSchema(region: Region, config: SiteConfig) {
  if (!region || !config) return null
  
  const baseUrl = `https://${config.site.domain}`
  const isOSB = ['iayosb', 'idosb', 'bosb', 'kosb', 'itosb'].includes(region.id)
  const displayName = isOSB ? region.name : `${region.name} Mahallesi`
  const description = region.seo?.description || region.description || `${displayName} web tasarım hizmetleri`
  const publishDate = region.publishedDate || new Date().toISOString()
  
  return generateArticleSchema(
    region.seo?.title || `${displayName} Web Tasarım`,
    description,
    config.seo?.ogImage || '/logo.webp',
    publishDate,
    publishDate,
    config,
    `${baseUrl}/${region.slug}`
  )
}

// 10. HowTo Schema (SSS için)
export function generateHowToSchema(faq: FAQ, config: SiteConfig) {
  if (!faq || !config) return null
  
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": faq.question,
    "description": faq.answer,
    "step": [
      {
        "@type": "HowToStep",
        "name": faq.question,
        "text": faq.answer,
      },
    ],
  }
}

// FAQPage Schema
export function generateFAQPageSchema(faqs: FAQ[], config: SiteConfig) {
  if (!faqs || faqs.length === 0) return null
  
  const baseUrl = `https://${config.site.domain}`
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Region-specific LocalBusiness Schema
export function generateRegionLocalBusinessSchema(config: SiteConfig, region: Region, reviews?: Review[]) {
  if (!config?.site?.name || !config?.site?.domain || !config?.contact?.phone) {
    return null
  }
  
  const baseUrl = `https://${config.site.domain}`
  const regionName = region.name
  const isOSB = ['iayosb', 'idosb', 'bosb', 'kosb', 'itosb'].includes(region.id)
  const displayName = isOSB ? regionName : `${regionName} Mahallesi`
  
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "WebDesignAgency",
    "name": `${config.site.name} - ${displayName}`,
    "description": region.seo?.description || region.description,
    "url": `${baseUrl}/${region.slug}`,
    "telephone": config.contact.phone,
    "email": config.contact.email,
    "areaServed": {
      "@type": "City",
      "name": displayName,
      "containedIn": {
        "@type": "City",
        "name": region.city
      }
    },
  }

  if (config.seo?.ogImage) {
    schema.image = `${baseUrl}${config.seo.ogImage}`
    schema.logo = `${baseUrl}${config.seo.ogImage}`
  }

  const address: any = {
    "@type": "PostalAddress",
    "addressLocality": displayName,
    "addressRegion": region.city,
    "addressCountry": "TR"
  }
  schema.address = address

  // Region-specific reviews varsa
  if (reviews && reviews.length > 0) {
    const regionReviews = reviews.filter(r => r.approved && r.region === region.id)
    if (regionReviews.length > 0) {
      const totalRating = regionReviews.reduce((sum, r) => sum + r.rating, 0)
      const averageRating = (totalRating / regionReviews.length).toFixed(1)
      
      schema.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": averageRating,
        "reviewCount": regionReviews.length.toString(),
        "bestRating": "5",
        "worstRating": "1"
      }
    }
  }

  return schema
}

// Helper: Tüm schema'ları birleştir
export function generateAllSchemas(config: SiteConfig, reviews?: Review[]) {
  if (!config || !config.site || !config.contact) return null
  
  try {
    const localBusiness = generateLocalBusinessSchema(config, reviews)
    const organization = generateOrganizationSchema(config)
    const website = generateWebSiteSchema(config)
    
    // Schema'ları array'e ekle ve sıkı null kontrolü yap
    const schemas = [localBusiness, organization, website].filter(schema => {
      // Schema'nın geçerli olduğundan emin ol
      if (!schema || typeof schema !== 'object') return false
      if (!schema["@context"] || schema["@context"] !== "https://schema.org") return false
      if (!schema["@type"]) return false
      return true
    })
    
    if (schemas.length === 0) return null
    
    // @graph kullanırken içteki schema'lardan @context kaldır
    const schemasWithoutContext = schemas.map(schema => {
      const copy = { ...schema } as any
      delete copy["@context"]
      return copy
    })
    
    return {
      "@context": "https://schema.org",
      "@graph": schemasWithoutContext,
    }
  } catch (error) {
    console.error('Schema generation error:', error)
    return null
  }
}
