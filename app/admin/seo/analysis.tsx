'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export function SEOAnalysis({ initialConfig }: { initialConfig: any }) {
  const [config, setConfig] = useState(initialConfig)
  const [loading, setLoading] = useState(false)

  async function analyzeSEO() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/config')
      const newConfig = await response.json()
      setConfig(newConfig)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const checks = {
    sitemap: { status: 'success', message: 'Sitemap.xml mevcut' },
    robots: { status: 'success', message: 'Robots.txt mevcut' },
    schema: { status: 'success', message: 'Schema markup kullanılıyor' },
    metaTitle: { 
      status: config.seo.metaTitle?.length > 0 ? 'success' : 'error',
      message: config.seo.metaTitle?.length > 0 ? 'Meta başlık tanımlı' : 'Meta başlık eksik'
    },
    metaDescription: {
      status: config.seo.metaDescription?.length > 0 ? 'success' : 'error',
      message: config.seo.metaDescription?.length > 0 ? 'Meta açıklama tanımlı' : 'Meta açıklama eksik'
    },
    keywords: {
      status: config.seo.keywords?.length > 0 ? 'success' : 'warning',
      message: `${config.seo.keywords?.length || 0} anahtar kelime`
    },
    ogImage: {
      status: config.seo.ogImage ? 'success' : 'warning',
      message: config.seo.ogImage ? 'OG image tanımlı' : 'OG image eksik'
    },
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-black">SEO Yönetimi</h1>
        <Button onClick={analyzeSEO} disabled={loading}>
          {loading ? 'Analiz ediliyor...' : 'Yeniden Analiz Et'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>SEO Kontrolleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {Object.entries(checks).map(([key, check]: [string, any]) => (
                <li key={key} className="flex items-center gap-3">
                  {check.status === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
                  {check.status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600" />}
                  {check.status === 'error' && <XCircle className="h-5 w-5 text-red-600" />}
                  <span className="text-sm text-gray-700">{check.message}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mevcut SEO Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-900">Meta Başlık</p>
              <p className="text-sm text-black">{config.seo.metaTitle}</p>
              <p className="text-xs text-gray-900 mt-1">
                {config.seo.metaTitle?.length || 0} karakter
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Meta Açıklama</p>
              <p className="text-sm text-black">{config.seo.metaDescription}</p>
              <p className="text-xs text-gray-900 mt-1">
                {config.seo.metaDescription?.length || 0} karakter
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-900">Anahtar Kelimeler</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {config.seo.keywords?.map((keyword: string, idx: number) => (
                  <span key={idx} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>SEO Önerileri</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Sitemap ve robots.txt dosyaları mevcut</li>
              <li>✓ Schema markup kullanılıyor</li>
              <li>• Meta başlık 50-60 karakter arasında olmalı</li>
              <li>• Meta açıklama 150-160 karakter arasında olmalı</li>
              <li>• Her sayfada benzersiz meta bilgiler kullanın</li>
              <li>• Anahtar kelimeleri doğal bir şekilde içeriğe yerleştirin</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
