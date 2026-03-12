'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function AyarlarForm({ config }: { config: any }) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const updatedConfig = {
      ...config,
      site: {
        ...config.site,
        name: formData.get('siteName'),
        title: formData.get('siteTitle'),
        city: formData.get('city'),
        district: formData.get('district'),
      },
      contact: {
        ...config.contact,
        phone: formData.get('phone'),
        email: formData.get('email'),
        website: formData.get('website'),
      },
      seo: {
        ...config.seo,
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
      },
    }

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      })

      if (response.ok) {
        alert('Ayarlar güncellendi!')
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
      alert('Hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Site Ayarları</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black">Genel Bilgiler</h2>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Site Adı</label>
            <Input name="siteName" defaultValue={config.site.name} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Site Başlığı</label>
            <Input name="siteTitle" defaultValue={config.site.title} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Şehir</label>
              <Input name="city" defaultValue={config.site.city} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">İlçe</label>
              <Input name="district" defaultValue={config.site.district} required />
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black">İletişim Bilgileri</h2>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Telefon</label>
            <Input name="phone" defaultValue={config.contact.phone} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">E-posta</label>
            <Input name="email" type="email" defaultValue={config.contact.email} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Website</label>
            <Input name="website" type="url" defaultValue={config.contact.website} required />
          </div>
        </div>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-black">SEO Ayarları</h2>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Meta Başlık</label>
            <Input name="metaTitle" defaultValue={config.seo.metaTitle} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Meta Açıklama</label>
            <Textarea name="metaDescription" defaultValue={config.seo.metaDescription} required rows={3} />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </div>
  )
}
