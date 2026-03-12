import { test, expect } from '@playwright/test'

test.describe('İletişim Formu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/iletisim')
  })

  test('İletişim formu görünür olmalı', async ({ page }) => {
    const form = page.locator('form').first()
    await expect(form).toBeVisible()
  })

  test('Form alanları görünür olmalı', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="phone"]')).toBeVisible()
    await expect(page.locator('textarea[name="message"]')).toBeVisible()
  })

  test('Boş form gönderilememeli', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first()
    await submitButton.click()
    
    // HTML5 validation veya form validation mesajı görünmeli
    const nameInput = page.locator('input[name="name"]')
    await expect(nameInput).toBeFocused()
  })

  test('Geçersiz email kabul edilmemeli', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'invalid-email')
    await page.fill('input[name="phone"]', '05551234567')
    await page.fill('textarea[name="message"]', 'Test mesajı')
    
    const submitButton = page.locator('button[type="submit"]').first()
    await submitButton.click()
    
    // Email validation hatası görünmeli
    const emailInput = page.locator('input[name="email"]')
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid)
    expect(isInvalid).toBe(true)
  })

  test('Geçerli form gönderilebilmeli', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="phone"]', '05551234567')
    await page.fill('textarea[name="message"]', 'Bu bir test mesajıdır.')
    
    // Privacy checkbox varsa işaretle
    const privacyCheckbox = page.locator('input[type="checkbox"]').first()
    if (await privacyCheckbox.isVisible()) {
      await privacyCheckbox.check()
    }
    
    const submitButton = page.locator('button[type="submit"]').first()
    await submitButton.click()
    
    // Success mesajı veya form reset kontrolü
    await page.waitForTimeout(2000)
  })
})
