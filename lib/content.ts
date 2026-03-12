import fs from 'fs/promises'
import path from 'path'
import type { Service, PricePackage, Region, Review, FAQ } from '@/types'

// Config
export async function getConfig(): Promise<any> {
  const filePath = path.join(process.cwd(), 'config/site.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

// Pages
export async function getPages(): Promise<any> {
  const filePath = path.join(process.cwd(), 'content/pages.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

// Services
export async function getServices(): Promise<Service[]> {
  const filePath = path.join(process.cwd(), 'content/services.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices()
  return services.find((s) => s.slug === slug) || null
}

// Prices
export async function getPrices(): Promise<PricePackage[]> {
  const filePath = path.join(process.cwd(), 'content/prices.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

// Regions
export async function getRegions(): Promise<Region[]> {
  const filePath = path.join(process.cwd(), 'content/regions.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getRegionBySlug(slug: string): Promise<Region | null> {
  const regions = await getRegions()
  return regions.find((r) => r.slug === slug) || null
}

// Reviews
export async function getReviews(): Promise<Review[]> {
  const filePath = path.join(process.cwd(), 'content/reviews.json')
  try {
    const fileContents = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContents)
  } catch {
    return []
  }
}

export async function getApprovedReviews(): Promise<Review[]> {
  const reviews = await getReviews()
  return reviews.filter((r) => r.approved).sort((a, b) => a.order - b.order)
}

// FAQ
export async function getFAQ(): Promise<FAQ[]> {
  const filePath = path.join(process.cwd(), 'content/faq.json')
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export async function getActiveFAQ(): Promise<FAQ[]> {
  const faq = await getFAQ()
  return faq.filter((f) => f.active).sort((a, b) => a.order - b.order)
}

export async function getFAQByRegion(region: string): Promise<FAQ[]> {
  const allFaqs = await getFAQ()
  return allFaqs
    .filter((f: FAQ) => f.region === region && f.active)
    .sort((a: FAQ, b: FAQ) => a.order - b.order)
}
