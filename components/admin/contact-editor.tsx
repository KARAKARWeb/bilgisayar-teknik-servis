'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface ContactEditorProps {
  contactData: any
}

export function ContactEditor({ contactData }: ContactEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Hero Section
  const [heroTitle, setHeroTitle] = useState(contactData?.hero?.title ?? '')
  const [heroSubtitle, setHeroSubtitle] = useState(contactData?.hero?.subtitle ?? '')
  
  // Info Section
  const [infoDescription, setInfoDescription] = useState(contactData?.info?.description ?? '')
  
  // Form Section
  const [formDescription, setFormDescription] = useState(contactData?.form?.description ?? '')
  
  // Maps iframe
  const [mapsIframe, setMapsIframe] = useState(contactData?.maps?.iframe ?? '')
  
  // SEO
  const [seoTitle, setSeoTitle] = useState(contactData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(contactData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(contactData?.seo?.keywords) 
      ? contactData.seo.keywords.join(', ') 
      : ''
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: {
            hero: {
              title: heroTitle,
              subtitle: heroSubtitle,
            },
            info: {
              description: infoDescription,
            },
            form: {
              description: formDescription,
            },
            maps: {
              iframe: mapsIframe,
            },
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('İletişim sayfası başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">Hero Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* İletişim Bilgileri Bölümü */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri Bölümü</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Açıklama</label>
          <Textarea
            value={infoDescription}
            onChange={(e) => setInfoDescription(e.target.value)}
            placeholder=""
            rows={2}
          />
        </div>
      </div>

      {/* Mesaj Gönderin Bölümü */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">Mesaj Gönderin Bölümü</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Açıklama</label>
          <Textarea
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            placeholder=""
            rows={2}
          />
        </div>
      </div>

      {/* Google Maps iframe */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">Google Maps</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Maps iframe Kodu</label>
          <Textarea
            value={mapsIframe}
            onChange={(e) => setMapsIframe(e.target.value)}
            placeholder=""
            rows={4}
          />
          <p className="text-xs text-gray-500">
            Google Maps'ten "Paylaş" → "Haritayı göm" seçeneğinden iframe kodunu kopyalayıp buraya yapıştırın.
          </p>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
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
        <Button type="submit" disabled={loading} className="shadow-lg">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
