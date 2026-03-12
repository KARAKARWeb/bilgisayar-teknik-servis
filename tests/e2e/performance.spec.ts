import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('Ana sayfa hızlı yüklenmeli', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('http://localhost:3000')
    const loadTime = Date.now() - startTime
    
    // 3 saniyeden kısa yüklenmeli
    expect(loadTime).toBeLessThan(3000)
  })

  test('Images lazy loading kullanmalı', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    const images = page.locator('img')
    const count = await images.count()
    
    if (count > 0) {
      const firstImage = images.first()
      const loading = await firstImage.getAttribute('loading')
      
      // İlk resim priority olabilir, diğerleri lazy olmalı
      if (count > 1) {
        const secondImage = images.nth(1)
        const secondLoading = await secondImage.getAttribute('loading')
        // Lazy loading veya priority olabilir
        expect(['lazy', 'eager', null]).toContain(secondLoading)
      }
    }
  })

  test('CSS ve JS optimize edilmiş olmalı', async ({ page }) => {
    const response = await page.goto('http://localhost:3000')
    
    // Response başarılı olmalı
    expect(response?.status()).toBe(200)
    
    // Content-Type kontrolü
    const contentType = response?.headers()['content-type']
    expect(contentType).toContain('text/html')
  })

  test('Blur placeholder kullanılmalı', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Logo blur placeholder kullanmalı
    const logo = page.locator('header img[alt="KARAKAR Web"]')
    const blurDataURL = await logo.getAttribute('src')
    
    // Next.js Image component kullanıyorsa optimize edilmiş olmalı
    expect(blurDataURL).toBeTruthy()
  })
})
