import { test, expect } from '@playwright/test'

test.describe('Mobil Görünüm', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('http://localhost:3000')
  })

  test('Mobil menü butonu görünür olmalı', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Menu"]')
    await expect(menuButton).toBeVisible()
  })

  test('Mobil menü açılıp kapanmalı', async ({ page }) => {
    const menuButton = page.locator('button[aria-label="Menu"]')
    await menuButton.click()
    
    // Menü açık olmalı
    const nav = page.locator('nav').last()
    await expect(nav).toBeVisible()
    
    // Menüyü kapat
    await menuButton.click()
    await page.waitForTimeout(500)
  })

  test('Sticky bottom bar scroll ile görünmeli', async ({ page }) => {
    // Sayfayı aşağı kaydır
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(500)
    
    // Sticky bar görünür olmalı
    const stickyBar = page.locator('.sticky-bottom-bar')
    await expect(stickyBar).toBeVisible()
  })

  test('Fiyat Hesapla butonu mobilde görünür olmalı', async ({ page }) => {
    const fiyatHesaplaButton = page.locator('a[href="/fiyat-hesapla"]').first()
    await expect(fiyatHesaplaButton).toBeVisible()
  })

  test('Logo mobilde doğru boyutta olmalı', async ({ page }) => {
    const logo = page.locator('header img[alt="KARAKAR Web"]')
    await expect(logo).toBeVisible()
    
    const boundingBox = await logo.boundingBox()
    expect(boundingBox?.height).toBeLessThan(50)
  })
})
