import type { SiteConfig, Service, PricePackage, Region, Review, FAQ } from '@/types'

// 1. LocalBusiness Schema
export function generateLocalBusinessSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "additionalType": "ComputerRepair",
    "name": config.schema.localBusiness.name,
    "description": config.schema.localBusiness.description,
    "image": `${config.contact.website}${config.seo.logo}`,
    "logo": `${config.contact.website}${config.seo.logo}`,
    "url": config.contact.website,
    "telephone": config.contact.phone,
    "email": config.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": config.contact.address.street,
      "addressLocality": config.contact.address.district,
      "addressRegion": config.contact.address.city,
      "postalCode": config.contact.address.postalCode,
      "addressCountry": config.contact.address.country,
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": config.contact.geo.latitude,
      "longitude": config.contact.geo.longitude,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": config.contact.workingHours.weekdays.split(' - ')[0],
        "closes": config.contact.workingHours.weekdays.split(' - ')[1],
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": config.contact.workingHours.saturday.split(' - ')[0] || "10:00",
        "closes": config.contact.workingHours.saturday.split(' - ')[1] || "16:00",
      },
    ],
    "priceRange": config.schema.localBusiness.priceRange,
    "areaServed": {
      "@type": "City",
      "name": config.schema.localBusiness.areaServed,
    },
    "knowsAbout": config.schema.localBusiness.knowsAbout,
    "slogan": config.schema.localBusiness.slogan,
    "award": config.schema.localBusiness.award,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": config.schema.aggregateRating.ratingValue,
      "reviewCount": config.schema.aggregateRating.reviewCount,
      "bestRating": config.schema.aggregateRating.bestRating,
      "worstRating": config.schema.aggregateRating.worstRating,
    },
  }
}

// 2. Organization Schema
export function generateOrganizationSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": config.schema.localBusiness.name,
    "legalName": config.schema.organization.legalName,
    "url": config.contact.website,
    "logo": `${config.contact.website}${config.seo.logo}`,
    "foundingDate": config.schema.organization.foundedYear,
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "value": config.schema.organization.employeeCount,
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": config.contact.phone,
      "contactType": "customer service",
      "email": config.contact.email,
      "availableLanguage": "Turkish",
    },
    "sameAs": [
      config.social.facebook,
      config.social.instagram,
      config.social.twitter,
      config.social.linkedin,
      config.social.youtube,
    ].filter(Boolean),
  }
}

// 3. WebSite Schema (Sitelinks Searchbox)
export function generateWebSiteSchema(config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": config.site.name,
    "url": config.contact.website,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${config.contact.website}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

// 4. Service Schema
export function generateServiceSchema(service: Service, config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
    "provider": {
      "@type": "LocalBusiness",
      "name": config.schema.localBusiness.name,
    },
    "areaServed": {
      "@type": "City",
      "name": config.site.city,
    },
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceRange": config.schema.localBusiness.priceRange,
    },
  }
}

// 5. Product/Offer Schema (Fiyat Paketleri)
export function generateProductSchema(pkg: PricePackage, config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": pkg.name,
    "description": pkg.description,
    "brand": {
      "@type": "Brand",
      "name": config.site.name,
    },
    "offers": {
      "@type": "Offer",
      "url": `${config.contact.website}/fiyatlarimiz`,
      "priceCurrency": "TRY",
      "price": pkg.price.toString(),
      "priceValidUntil": pkg.seo?.validUntil || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "availability": pkg.seo?.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": config.site.name,
      },
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": config.schema.aggregateRating.ratingValue,
      "reviewCount": config.schema.aggregateRating.reviewCount,
    },
  }
}

// 6. BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }
}

// 7. FAQPage Schema
export function generateFAQPageSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  }
}

// 8. Review Schema
export function generateReviewSchema(review: Review, config: SiteConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "LocalBusiness",
      "name": config.schema.localBusiness.name,
    },
    "author": {
      "@type": "Person",
      "name": review.name,
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating.toString(),
      "bestRating": "5",
      "worstRating": "1",
    },
    "reviewBody": review.comment,
    "datePublished": review.date,
  }
}

// 9. Article Schema (SEO İçerik Alanları)
export function generateArticleSchema(
  title: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  config: SiteConfig
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "author": {
      "@type": "Organization",
      "name": config.site.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": config.site.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${config.contact.website}${config.seo.logo}`,
      },
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "image": image,
  }
}

// 10. HowTo Schema (SSS için)
export function generateHowToSchema(
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step) => ({
      "@type": "HowToStep",
      "name": step.name,
      "text": step.text,
    })),
  }
}

// Helper: Tüm schema'ları birleştir
export function generateAllSchemas(config: SiteConfig) {
  const localBusiness = generateLocalBusinessSchema(config)
  const organization = generateOrganizationSchema(config)
  const website = generateWebSiteSchema(config)
  
  // @graph kullanırken içteki schema'lardan @context kaldır
  const { "@context": _, ...localBusinessWithoutContext } = localBusiness
  const { "@context": __, ...organizationWithoutContext } = organization
  const { "@context": ___, ...websiteWithoutContext } = website
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusinessWithoutContext,
      organizationWithoutContext,
      websiteWithoutContext,
    ]
  }
}
