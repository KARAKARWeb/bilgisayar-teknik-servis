'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { IconSelector } from '@/components/ui/icon-selector'
import { CharacterCounter } from '@/components/ui/character-counter'
import { Editor } from '@/components/admin/editor'
import { generateSlug } from '@/lib/utils/slug'

export function HizmetDuzenForm({ service }: { service: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(service.name ?? '')
  const [slug, setSlug] = useState(service.slug ?? '')
  const [icon, setIcon] = useState(service.icon ?? 'Layout')
  const [content, setContent] = useState(service.content ?? '')
  const [seoTitle, setSeoTitle] = useState(service.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(service.seo?.description ?? '')

  useEffect(() => {
    if (name && !slug) {
      setSlug(generateSlug(name))
    }
  }, [name, slug])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      ...service,
      name,
      slug,
      description: formData.get('description'),
      icon,
      featured: formData.get('featured') === 'on',
      content,
      features: (formData.get('features') as string)?.split('\n').filter(Boolean) || [],
      seo: {
        title: seoTitle,
        description: seoDescription,
        keywords: (formData.get('keywords') as string)?.split(',').map(k => k.trim()) || [],
      },
    }

    try {
      const response = await fetch('/api/admin/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/services')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/services?id=${service.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/services')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-black">Hizmet Düzenle</h1>
        <p className="text-gray-600 mt-2">Hizmet bilgilerini güncelleyin</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Genel Bilgiler */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black mb-6">Genel Bilgiler</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Hizmet Adı *</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required className="h-11" />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Slug *</label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} required className="h-11" />
              <p className="text-xs text-gray-500 mt-1">Otomatik oluşturulur, gerekirse düzenleyebilirsiniz</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Kısa Açıklama *</label>
              <Textarea name="description" defaultValue={service.description} required rows={3} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">İkon</label>
              <IconSelector value={icon} onChange={setIcon} />
            </div>

            <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50">
              <input type="checkbox" name="featured" id="featured" defaultChecked={service.featured} className="h-4 w-4" />
              <label htmlFor="featured" className="text-sm font-medium text-black">Bu hizmeti öne çıkan olarak işaretle</label>
            </div>
          </div>
        </div>

        {/* İçerik */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black mb-6">Detaylı İçerik</h2>
          <Editor content={content} onChange={setContent} placeholder="" />
        </div>

        {/* Özellikler */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black mb-6">Özellikler</h2>
          <div>
            <label className="block text-sm font-medium text-black mb-2">Her satıra bir özellik yazın</label>
            <Textarea name="features" defaultValue={service.features?.join('\n')} rows={6} placeholder="" />
          </div>
        </div>

        {/* SEO */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black mb-6">SEO Ayarları</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Title</label>
              <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} maxLength={60} />
              <CharacterCounter current={seoTitle.length} max={60} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">SEO Description</label>
              <Textarea value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} maxLength={155} />
              <CharacterCounter current={seoDescription.length} max={155} />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Keywords</label>
              <Input name="keywords" defaultValue={service.seo?.keywords?.join(', ')} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6">
          <Button type="button" variant="outline" onClick={handleDelete} disabled={loading} className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">
            Hizmeti Sil
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} size="lg">
              İptal
            </Button>
            <Button type="submit" disabled={loading} size="lg" className="min-w-[120px]">
              {loading ? 'Kaydediliyor...' : 'Güncelle'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
