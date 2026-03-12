'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { TiptapEditor } from '@/components/admin/tiptap-editor'

export function BolgeDuzenForm({ region }: { region: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(typeof region.content === 'string' ? region.content : region.content?.main || '')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      ...region,
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
      content: content,
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
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/regions')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Bu bölgeyi silmek istediğinizden emin misiniz?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/regions?id=${region.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/regions')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-8">Bölge Düzenle</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Bölge Adı *</label>
            <Input name="name" defaultValue={region.name} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Şehir *</label>
            <Input name="city" defaultValue={region.city} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Slug *</label>
          <Input name="slug" defaultValue={region.slug} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Latitude</label>
            <Input name="latitude" defaultValue={region.geo?.latitude} />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Longitude</label>
            <Input name="longitude" defaultValue={region.geo?.longitude} />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Hero Title</label>
              <Input name="heroTitle" defaultValue={region.hero?.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Hero Subtitle</label>
              <Input name="heroSubtitle" defaultValue={region.hero?.subtitle} />
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">İçerik</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">İçerik Editörü</label>
              <TiptapEditor 
                content={content}
                onChange={setContent}
              />
              <p className="text-xs text-gray-500 mt-1">Rich text editör ile içeriği düzenleyin. Link eklemek için metni seçip link butonuna tıklayın.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Hizmetler</label>
            <Input name="services" defaultValue={region.services?.join(', ')} />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Fiyat Paketleri</label>
            <Input name="prices" defaultValue={region.prices?.join(', ')} />
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-black mb-4">SEO</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Title</label>
              <Input name="seoTitle" defaultValue={region.seo?.title} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Description</label>
              <Textarea name="seoDescription" defaultValue={region.seo?.description} rows={3} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Keywords</label>
              <Input name="keywords" defaultValue={region.seo?.keywords?.join(', ')} />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            İptal
          </Button>
          <Button type="button" variant="outline" onClick={handleDelete} disabled={loading} className="ml-auto bg-red-50 text-red-600 hover:bg-red-100">
            Sil
          </Button>
        </div>
      </form>
    </div>
  )
}
