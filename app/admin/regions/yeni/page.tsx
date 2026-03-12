'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function YeniBolgePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      id: `region-${Date.now()}`,
      name: formData.get('name'),
      slug: formData.get('slug'),
      city: formData.get('city'),
      geo: {
        latitude: formData.get('latitude'),
        longitude: formData.get('longitude'),
      },
      hero: {
        title: formData.get('heroTitle'),
        subtitle: formData.get('heroSubtitle'),
      },
      content: {
        main: formData.get('contentMain'),
        seo1: formData.get('contentSeo1'),
        seo2: formData.get('contentSeo2'),
      },
      services: (formData.get('services') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
      prices: (formData.get('prices') as string)?.split(',').map(s => s.trim()).filter(Boolean) || [],
      seo: {
        title: formData.get('seoTitle'),
        description: formData.get('seoDescription'),
        keywords: (formData.get('keywords') as string)?.split(',').map(k => k.trim()) || [],
      },
    }

    try {
      const response = await fetch('/api/admin/regions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/regions')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Yeni Bölge Ekle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Bölge Adı *</label>
            <Input name="name" required placeholder="" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Şehir *</label>
            <Input name="city" required placeholder="" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Slug *</label>
          <Input name="slug" required placeholder="" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Latitude</label>
            <Input name="latitude" placeholder="" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Longitude</label>
            <Input name="longitude" placeholder="" />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Hero Title</label>
              <Input name="heroTitle" placeholder="" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Hero Subtitle</label>
              <Input name="heroSubtitle" placeholder="" />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">İçerik</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Ana İçerik</label>
              <Textarea name="contentMain" rows={4} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO İçerik 1</label>
              <Textarea name="contentSeo1" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO İçerik 2</label>
              <Textarea name="contentSeo2" rows={3} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Hizmetler (virgülle ayırın)</label>
            <Input name="services" placeholder="" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Fiyat Paketleri (virgülle ayırın)</label>
            <Input name="prices" placeholder="" />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">SEO</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Title</label>
              <Input name="seoTitle" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Description</label>
              <Textarea name="seoDescription" rows={3} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Keywords (virgülle ayırın)</label>
              <Input name="keywords" placeholder="" />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
        </div>
      </form>
    </div>
  )
}
