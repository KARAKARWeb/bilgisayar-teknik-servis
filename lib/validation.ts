import { z } from 'zod'

// Contact Form Schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ad en az 2 karakter olmalı'),
  company: z.string().optional(),
  email: z.string().email('Geçerli bir email giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalı'),
  privacy: z.boolean().refine(val => val === true, 'Gizlilik politikasını kabul etmelisiniz'),
  website: z.string().optional(), // Honeypot field
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Quote Form Schema
export const quoteFormSchema = contactFormSchema.extend({
  projectType: z.string().min(1, 'Proje tipi seçiniz'),
  deadline: z.string().optional(),
  features: z.array(z.string()),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>

// Site Config Schema
export const siteConfigSchema = z.object({
  site: z.object({
    domain: z.string().regex(/^[a-z0-9.-]+\.[a-z]{2,}$/, 'Geçerli domain giriniz'),
    name: z.string().min(2, 'Site adı en az 2 karakter olmalı'),
    title: z.string().min(5, 'Başlık en az 5 karakter olmalı'),
    city: z.string().min(2, 'Şehir adı en az 2 karakter olmalı'),
    district: z.string(),
    country: z.string(),
  }),
  contact: z.object({
    phone: z.string().regex(/^\+90 5\d{2} \d{3} \d{2} \d{2}$/, 'Geçerli telefon giriniz'),
    email: z.string().email('Geçerli email giriniz'),
    website: z.string().url('Geçerli URL giriniz'),
    whatsapp: z.string().url('Geçerli WhatsApp linki giriniz'),
    liveSupport: z.string().url().optional(),
    address: z.object({
      street: z.string(),
      district: z.string(),
      city: z.string(),
      postalCode: z.string(),
      country: z.string(),
    }),
    geo: z.object({
      latitude: z.string(),
      longitude: z.string(),
    }),
    workingHours: z.object({
      weekdays: z.string(),
      saturday: z.string(),
      sunday: z.string(),
    }),
  }),
  social: z.object({
    facebook: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    youtube: z.string().url().optional().or(z.literal('')),
  }),
  seo: z.object({
    metaTitle: z.string().max(60, 'Title en fazla 60 karakter olabilir'),
    metaDescription: z.string().max(155, 'Description en fazla 155 karakter olabilir'),
    keywords: z.array(z.string()),
    ogImage: z.string(),
    favicon: z.string(),
    logo: z.string(),
  }),
  schema: z.object({
    localBusiness: z.object({
      name: z.string(),
      description: z.string(),
      slogan: z.string(),
      award: z.string(),
      priceRange: z.string(),
      areaServed: z.string(),
      knowsAbout: z.array(z.string()),
    }),
    organization: z.object({
      foundedYear: z.string(),
      employeeCount: z.string(),
      legalName: z.string(),
    }),
    aggregateRating: z.object({
      ratingValue: z.string(),
      reviewCount: z.string(),
      bestRating: z.string(),
      worstRating: z.string(),
    }),
  }),
  business: z.object({
    projectCount: z.string(),
    clientCount: z.string(),
    satisfactionRate: z.string(),
    experienceYears: z.string(),
  }),
  integrations: z.object({
    googleAnalytics: z.string().optional().or(z.literal('')),
    googleSearchConsole: z.string().optional().or(z.literal('')),
    googleMapsApiKey: z.string().optional().or(z.literal('')),
    facebookPixel: z.string().optional().or(z.literal('')),
    tawkTo: z.string().optional().or(z.literal('')),
  }),
})

export type SiteConfigSchema = z.infer<typeof siteConfigSchema>

// Service Schema
export const serviceSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Hizmet adı en az 2 karakter olmalı'),
  slug: z.string().min(2, 'Slug en az 2 karakter olmalı').regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalı'),
  content: z.string().min(50, 'İçerik en az 50 karakter olmalı'),
  icon: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  seo: z.object({
    title: z.string().max(60, 'SEO başlığı en fazla 60 karakter olabilir').optional(),
    description: z.string().max(160, 'SEO açıklaması en fazla 160 karakter olabilir').optional(),
    keywords: z.string().optional(),
  }).optional(),
})

export type ServiceSchema = z.infer<typeof serviceSchema>

// Price Schema
export const priceSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Paket adı en az 2 karakter olmalı'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalı'),
  price: z.string().min(1, 'Fiyat giriniz'),
  period: z.string().optional(),
  features: z.array(z.string()).min(1, 'En az 1 özellik ekleyin'),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  cta: z.object({
    text: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
})

export type PriceSchema = z.infer<typeof priceSchema>

// Region Schema
export const regionSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Bölge adı en az 2 karakter olmalı'),
  slug: z.string().min(2, 'Slug en az 2 karakter olmalı').regex(/^[a-z0-9-]+$/, 'Slug sadece küçük harf, rakam ve tire içerebilir'),
  city: z.string().min(2, 'Şehir adı en az 2 karakter olmalı'),
  description: z.string().min(10, 'Açıklama en az 10 karakter olmalı'),
  content: z.string().min(50, 'İçerik en az 50 karakter olmalı'),
  image: z.string().optional(),
  order: z.number().optional(),
  seo: z.object({
    title: z.string().max(60, 'SEO başlığı en fazla 60 karakter olabilir').optional(),
    description: z.string().max(160, 'SEO açıklaması en fazla 160 karakter olabilir').optional(),
    keywords: z.string().optional(),
  }).optional(),
})

export type RegionSchema = z.infer<typeof regionSchema>

// Review Schema
export const reviewSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  company: z.string().min(2, 'Firma adı en az 2 karakter olmalı'),
  position: z.string().min(2, 'Pozisyon en az 2 karakter olmalı'),
  comment: z.string().min(20, 'Yorum en az 20 karakter olmalı'),
  rating: z.number().min(1, 'Puan en az 1 olmalı').max(5, 'Puan en fazla 5 olabilir'),
  image: z.string().optional(),
  date: z.string(),
  approved: z.boolean().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
})

export type ReviewSchema = z.infer<typeof reviewSchema>

// FAQ Schema
export const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(10, 'Soru en az 10 karakter olmalı'),
  answer: z.string().min(20, 'Cevap en az 20 karakter olmalı'),
  category: z.string().min(2, 'Kategori seçiniz'),
  order: z.number().optional(),
  active: z.boolean().optional(),
})

export type FAQSchema = z.infer<typeof faqSchema>
