import { test, expect } from '@playwright/test'

test.describe('Navigasyon', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('Hakkımızda sayfasına gidebilmeli', async ({ page }) => {
    await page.click('text=Hakkımızda')
    await expect(page).toHaveURL(/hakkimizda/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('Hizmetlerimiz sayfasına gidebilmeli', async ({ page }) => {
    await page.click('text=Hizmetlerimiz')
    await expect(page).toHaveURL(/hizmetlerimiz/)
  })

  test('Fiyatlarımız sayfasına gidebilmeli', async ({ page }) => {
    await page.click('text=Fiyatlarımız')
    await expect(page).toHaveURL(/fiyatlarimiz/)
  })

  test('Hizmet Bölgeleri sayfasına gidebilmeli', async ({ page }) => {
    await page.click('text=Hizmet Bölgeleri')
    await expect(page).toHaveURL(/hizmet-bolgeleri/)
  })

  test('İletişim sayfasına gidebilmeli', async ({ page }) => {
    await page.click('text=İletişim')
    await expect(page).toHaveURL(/iletisim/)
  })

  test('Logo tıklanınca ana sayfaya dönmeli', async ({ page }) => {
    await page.goto('http://localhost:3000/hakkimizda')
    await page.click('header img[alt="KARAKAR Web"]')
    await expect(page).toHaveURL('http://localhost:3000/')
  })
})
