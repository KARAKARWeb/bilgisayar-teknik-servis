'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { SiteConfig } from '@/types'

interface CalculatorFormProps {
  config: SiteConfig
}

export function CalculatorForm({ config }: CalculatorFormProps) {
  const [pageCount, setPageCount] = useState(5)
  const [features, setFeatures] = useState({
    responsive: true,
    seo: true,
    cms: false,
    ecommerce: false,
    blog: false,
    multilanguage: false,
    customDesign: false,
  })
  const [estimatedPrice, setEstimatedPrice] = useState(0)

  const calculatePrice = () => {
    const basePrice = 10000
    let price = basePrice + (pageCount * 1500)

    if (features.responsive) price += 0 // Included
    if (features.seo) price += 0 // Included
    if (features.cms) price += 5000
    if (features.ecommerce) price += 15000
    if (features.blog) price += 3000
    if (features.multilanguage) price += 4000
    if (features.customDesign) price += 8000

    setEstimatedPrice(price)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-xl font-semibold text-black mb-4">Sayfa Sayısı</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="1"
            max="50"
            value={pageCount}
            onChange={(e) => setPageCount(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-900">
            <span>1 sayfa</span>
            <span className="font-semibold text-black">{pageCount} sayfa</span>
            <span>50 sayfa</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="text-xl font-semibold text-black mb-4">Özellikler</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.responsive}
              disabled
              className="h-4 w-4"
            />
            <span className="text-gray-900">Responsive Tasarım (Dahil)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.seo}
              disabled
              className="h-4 w-4"
            />
            <span className="text-gray-900">Temel SEO (Dahil)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.cms}
              onChange={(e) => setFeatures({ ...features, cms: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-gray-900">İçerik Yönetim Sistemi (+5.000₺)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.ecommerce}
              onChange={(e) => setFeatures({ ...features, ecommerce: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-gray-900">E-Ticaret Entegrasyonu (+15.000₺)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.blog}
              onChange={(e) => setFeatures({ ...features, blog: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-gray-900">Blog Sistemi (+3.000₺)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.multilanguage}
              onChange={(e) => setFeatures({ ...features, multilanguage: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-gray-900">Çoklu Dil Desteği (+4.000₺)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={features.customDesign}
              onChange={(e) => setFeatures({ ...features, customDesign: e.target.checked })}
              className="h-4 w-4"
            />
            <span className="text-gray-900">Özel Tasarım (+8.000₺)</span>
          </label>
        </div>
      </div>

      <Button onClick={calculatePrice} size="lg" className="w-full">
        Fiyat Hesapla
      </Button>

      {estimatedPrice > 0 && (
        <div className="rounded-lg border-2 border-black bg-gray-50 p-8 text-center">
          <p className="text-sm text-gray-900 mb-2">Tahmini Maliyet</p>
          <p className="text-5xl font-bold text-black mb-4">
            {estimatedPrice.toLocaleString('tr-TR')}₺
          </p>
          <p className="text-sm text-gray-900 mb-6">
            Bu fiyat tahminidir. Kesin fiyat için teklif alın.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a href="/teklif-al">
              <Button size="lg" className="w-full sm:w-auto">
                Teklif Al
              </Button>
            </a>
            <a href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {config.contact.phone}
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
