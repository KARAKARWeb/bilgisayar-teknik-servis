'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function AdminTeklifAlPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [pageSettings, setPageSettings] = useState<any>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')

  useEffect(() => {
    fetch('/api/admin/page-settings')
      .then(res => res.json())
      .then(data => {
        setPageSettings(data)
        const teklifAlData = data?.['teklif-al'] || {}
        setTitle(teklifAlData.title || '')
        setDescription(teklifAlData.description || '')
        setSeoTitle(teklifAlData.seo?.title || '')
        setSeoDescription(teklifAlData.seo?.description || '')
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading page settings:', error)
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const updatedSettings = {
        ...pageSettings,
        'teklif-al': {
          title,
          description,
          seo: {
            title: seoTitle,
            description: seoDescription,
            keywords: pageSettings?.['teklif-al']?.seo?.keywords || []
          }
        }
      }

      const response = await fetch('/api/admin/page-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedSettings),
      })

      if (response.ok) {
        alert('Teklif Al sayfasi basariyla guncellendi!')
      } else {
        alert('Kaydetme sirasinda bir hata olustu.')
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('Kaydetme sirasinda bir hata olustu.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Yukleniyor...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Teklif Al Sayfasi Ayarlari</h1>
        <p className="mt-2 text-gray-600">
          Teklif Al sayfasinin iceriklerini ve SEO ayarlarini duzenleyin.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        {/* Sayfa Icerigi */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sayfa Icerigi</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Baslik</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Orn: Ucretsiz Teklif Alin"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">Aciklama</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Sayfa aciklamasi..."
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* SEO Ayarlari */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">SEO Ayarlari</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">SEO Baslik</label>
              <Input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Arama motorlarinda gorunecek baslik"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">SEO Aciklama</label>
              <Textarea
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Arama motorlarinda gorunecek aciklama"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </div>
  )
}
