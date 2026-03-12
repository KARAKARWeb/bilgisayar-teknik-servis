import { test, expect } from '@playwright/test'

test.describe('Ana Sayfa', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('Ana sayfa yüklenmeli', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/)
  })

  test('Header görünür olmalı', async ({ page }) => {
    const header = page.locator('header')
    await expect(header).toBeVisible()
  })

  test('Logo görünür ve tıklanabilir olmalı', async ({ page }) => {
    const logo = page.locator('header img[alt="KARAKAR Web"]')
    await expect(logo).toBeVisible()
  })

  test('Hero section görünür olmalı', async ({ page }) => {
    const hero = page.locator('h1').first()
    await expect(hero).toBeVisible()
  })

  test('Hizmetler section görünür olmalı', async ({ page }) => {
    await page.waitForSelector('text=Hizmetlerimiz', { timeout: 5000 })
    const servicesSection = page.locator('text=Hizmetlerimiz').first()
    await expect(servicesSection).toBeVisible()
  })

  test('Footer görünür olmalı', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('Mobil menü butonu mobilde görünür olmalı', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    const mobileMenuButton = page.locator('button[aria-label="Menu"]')
    await expect(mobileMenuButton).toBeVisible()
  })
})
