// Site Configuration Types
export interface SiteConfig {
  site: {
    domain: string
    name: string
    title: string
    city: string
    district: string
    country: string
  }
  contact: {
    phone: string
    phoneInternational?: string
    email: string
    website: string
    whatsapp: string
    liveSupport: string
    address: {
      street: string
      district: string
      city: string
      postalCode: string
      country: string
    }
    streetAddress?: string
    postalCode?: string
    geo: {
      latitude: string
      longitude: string
    }
    workingHours: {
      weekdays: string
      saturday: string
      sunday: string
    }
  }
  social: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
    youtube: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogImage: string
    favicon: string
    logo: string
  }
  schema: {
    localBusiness: {
      name: string
      description: string
      slogan: string
      award: string
      priceRange: string
      areaServed: string
      knowsAbout: string[]
      image?: string
    }
    organization: {
      foundedYear: string
      employeeCount: string
      legalName: string
    }
    aggregateRating: {
      ratingValue: string
      reviewCount: string
      bestRating: string
      worstRating: string
    }
  }
  business: {
    projectCount: string
    clientCount: string
    satisfactionRate: string
    experienceYears: string
  }
  integrations: {
    googleAnalytics: string
    googleSearchConsole: string
    googleMapsApiKey: string
    facebookPixel: string
    tawkTo: string
  }
  analytics?: {
    googleAnalytics?: string
    googleTagManager?: string
  }
  searchConsole?: {
    verificationCode?: string
  }
  pageSettings?: {
    [key: string]: {
      title: string
      subtitle: string
    }
  }
}

// Service Types
export interface Service {
  id: string
  name: string
  slug: string
  description: string
  content: string
  icon: string
  image?: string
  imageAlt?: string
  featured: boolean
  features: string[]
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
}

// Price Package Types
export interface PricePackage {
  id: string
  name: string
  price: number
  currency: string
  period?: string
  featured: boolean
  popular: boolean
  description: string
  buttonColor?: 'blue' | 'white' | 'gray'
  features: {
    text: string
    included: boolean
  }[]
  cta: {
    text: string
    link: string
  }
  seo?: {
    inStock: boolean
    validUntil?: string
  }
}

// Region Types
export interface Region {
  id: string
  name: string
  slug: string
  city: string
  district: string
  order: number
  featured: boolean
  description: string
  hero?: {
    title: string
    subtitle: string
  }
  content: {
    main: string
    seo: {
      title: string
      description: string
      keywords: string[]
    }
  }
  seo?: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
  services?: string[]
  prices?: string[]
  publishedDate?: string
  faq?: {
    question: string
    answer: string
  }[]
}

// Review Types
export interface Review {
  id: string
  name: string
  company?: string
  position?: string
  photo?: string
  rating: number
  comment: string
  date: string
  service?: string
  region?: string
  approved: boolean
  featured: boolean
  categories: string[]
  order: number
}

// FAQ Types
export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  region?: string
  active: boolean
  order: number
}

// Form Submission Types
export interface ContactFormData {
  name: string
  company?: string
  email: string
  phone: string
  service?: string
  budget?: string
  message: string
  privacy: boolean
}

export interface QuoteFormData extends ContactFormData {
  projectType: string
  deadline?: string
  features: string[]
}

export interface CalculatorFormData {
  projectType: string
  pages: number
  features: string[]
  design: string
  deadline: string
  budget: string
  contact: {
    name: string
    email: string
    phone: string
  }
}
