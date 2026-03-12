'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface SitemapEditorProps {
  pageData: any
}

export function SitemapEditor({ pageData }: SitemapEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [heroTitle, setHeroTitle] = useState(pageData?.hero?.title ?? '')
  const [heroSubtitle, setHeroSubtitle] = useState(pageData?.hero?.subtitle ?? '')
  const [seoTitle, setSeoTitle] = useState(pageData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(pageData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(pageData?.seo?.keywords) 
      ? pageData.seo.keywords.join(', ') 
      : pageData?.seo?.keywords ?? ''
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'sitemap',
          data: {
            hero: {
              title: heroTitle,
              subtitle: heroSubtitle,
            },
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: typeof seoKeywords === 'string'
                ? seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
                : seoKeywords,
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('Site haritası başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Hero Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder="Site Haritası"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder="Web sitemizde yer alan tüm sayfalara buradan kolayca ulaşabilirsiniz."
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
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
              placeholder="Site Haritası"
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
              placeholder="Sitedeki tüm sayfalara hızlıca erişin..."
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
              placeholder="site haritası, sayfa listesi, navigasyon"
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <Button type="submit" disabled={loading} className="shadow-lg">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
