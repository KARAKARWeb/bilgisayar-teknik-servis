'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function ServicesPageSettings({ pageSettings }: { pageSettings: any }) {
  const router = useRouter()
  const [pageTitle, setPageTitle] = useState(pageSettings?.title || '')
  const [pageDescription, setPageDescription] = useState(pageSettings?.description || '')
  const [seoTitle, setSeoTitle] = useState(pageSettings?.seo?.title || '')
  const [seoDescription, setSeoDescription] = useState(pageSettings?.seo?.description || '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(pageSettings?.seo?.keywords)
      ? pageSettings.seo.keywords.join(', ')
      : ''
  )
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/page-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'hizmetlerimiz',
          settings: {
            title: pageTitle,
            description: pageDescription,
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('Ayarlar kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
      <h2 className="text-2xl font-bold text-black mb-6">Hizmetler Sayfası Ayarları</h2>
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-semibold text-black mb-4">Sayfa İçeriği</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Sayfa Başlığı (H1)
              </label>
              <Input
                value={pageTitle}
                onChange={(e) => setPageTitle(e.target.value)}
                placeholder="Hizmetlerimiz"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Açıklama
              </label>
              <Textarea
                value={pageDescription}
                onChange={(e) => setPageDescription(e.target.value)}
                placeholder="Web Tasarım, yazılım, SEO ve altyapıyı tek süreçte birleştirir; teslimi ölçülebilir garantili sonuçlara dönüştürürüz."
                rows={3}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                SEO Başlık
                <span className="ml-2 text-xs text-gray-500">
                  ({seoTitle.length}/60 karakter)
                </span>
              </label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder=""
                maxLength={60}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                SEO Açıklama
                <span className="ml-2 text-xs text-gray-500">
                  ({seoDescription.length}/160 karakter)
                </span>
              </label>
              <Textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder=""
                maxLength={160}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                SEO Anahtar Kelimeler
                <span className="ml-2 text-xs text-gray-500">(virgülle ayırın)</span>
              </label>
              <Input
                value={seoKeywords}
                onChange={(e) => setSeoKeywords(e.target.value)}
                placeholder=""
              />
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 right-8 z-50">
          <Button onClick={handleSave} disabled={saving} className="shadow-lg">
            {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
          </Button>
        </div>
      </div>
    </div>
  )
}
