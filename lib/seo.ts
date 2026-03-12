import type { Metadata } from 'next'
import type { SiteConfig } from '@/types'

export function generatePageMetadata(
  config: SiteConfig,
  page: {
    title: string
    description: string
    keywords?: string[]
    path: string
    image?: string
  }
): Metadata {
  const baseUrl = `https://${config.site.domain}`
  const url = `${baseUrl}${page.path}`
  const image = page.image || config.seo.ogImage || '/bilgisayar-teknik-servis.webp'

  return {
    title: `${page.title} | ${config.site.name}`,
    description: page.description,
    keywords: page.keywords || config.seo.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: config.site.name,
      images: [
        {
          url: `${baseUrl}${image}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'tr_TR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [`${baseUrl}${image}`],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateSlug(text: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  }

  return text
    .split('')
    .map(char => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function extractKeywords(text: string, count: number = 5): string[] {
  const stopWords = new Set([
    've', 'veya', 'ile', 'için', 'bir', 'bu', 'şu', 'o', 'da', 'de',
    'mi', 'mu', 'mı', 'mü', 'gibi', 'kadar', 'daha', 'en', 'çok',
  ])

  const words = text
    .toLowerCase()
    .replace(/[^\wığüşöçĞÜŞÖÇİ\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word))

  const frequency: Record<string, number> = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })

  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => word)
}

export function validateMetadata(metadata: {
  title?: string
  description?: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!metadata.title) {
    errors.push('Başlık boş olamaz')
  } else if (metadata.title.length < 30) {
    errors.push('Başlık en az 30 karakter olmalı')
  } else if (metadata.title.length > 60) {
    errors.push('Başlık en fazla 60 karakter olmalı')
  }

  if (!metadata.description) {
    errors.push('Açıklama boş olamaz')
  } else if (metadata.description.length < 120) {
    errors.push('Açıklama en az 120 karakter olmalı')
  } else if (metadata.description.length > 160) {
    errors.push('Açıklama en fazla 160 karakter olmalı')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

export function generateBreadcrumbPath(pathname: string, config: SiteConfig) {
  const baseUrl = `https://${config.site.domain}`
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: baseUrl },
  ]

  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      name,
      url: `${baseUrl}${currentPath}`,
    })
  })

  return breadcrumbs
}
