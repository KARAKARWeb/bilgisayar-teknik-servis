'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function YeniHizmetPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      id: `service-${Date.now()}`,
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      icon: formData.get('icon') || 'layout',
      featured: formData.get('featured') === 'on',
      content: formData.get('content'),
      features: (formData.get('features') as string)?.split('\n').filter(Boolean) || [],
      seo: {
        title: formData.get('seoTitle'),
        description: formData.get('seoDescription'),
        keywords: (formData.get('keywords') as string)?.split(',').map(k => k.trim()) || [],
      },
    }

    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/services')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Yeni Hizmet Ekle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Hizmet Adı *</label>
          <Input name="name" required />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Slug *</label>
          <Input name="slug" required placeholder="" />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Kısa Açıklama *</label>
          <Textarea name="description" required rows={3} />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">İçerik</label>
          <Textarea name="content" rows={6} />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Özellikler (Her satıra bir özellik)</label>
          <Textarea name="features" rows={5} placeholder="" />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">İkon</label>
          <Input name="icon" placeholder="" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="featured" id="featured" />
          <label htmlFor="featured" className="text-sm font-medium text-black">Öne Çıkan</label>
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
