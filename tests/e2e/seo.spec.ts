import { test, expect } from '@playwright/test'

test.describe('SEO & Meta Tags', () => {
  test('Ana sayfa meta tags doğru olmalı', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Title kontrolü
    const title = await page.title()
    expect(title.length).toBeGreaterThan(10)
    expect(title.length).toBeLessThan(70)
    
    // Meta description
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toBeTruthy()
    expect(description!.length).toBeGreaterThan(50)
    expect(description!.length).toBeLessThan(170)
    
    // OG tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content')
    expect(ogTitle).toBeTruthy()
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content')
    expect(ogDescription).toBeTruthy()
    
    // Twitter Card
    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content')
    expect(twitterCard).toBe('summary_large_image')
  })

  test('Hakkımızda sayfası meta tags doğru olmalı', async ({ page }) => {
    await page.goto('http://localhost:3000/hakkimizda')
    
    const title = await page.title()
    expect(title).toContain('Hakkımızda')
    
    // Canonical URL
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toContain('/hakkimizda')
  })

  test('Hizmetlerimiz sayfası meta tags doğru olmalı', async ({ page }) => {
    await page.goto('http://localhost:3000/hizmetlerimiz')
    
    const title = await page.title()
    expect(title).toContain('Hizmetlerimiz')
  })

  test('Robots meta tag doğru olmalı', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toContain('index')
    expect(robots).toContain('follow')
  })

  test('Structured data (Schema.org) mevcut olmalı', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const scripts = await page.locator('script[type="application/ld+json"]').count()
    expect(scripts).toBeGreaterThan(0)
  })
})
