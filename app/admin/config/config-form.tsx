'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useToast, ToastContainer } from '@/components/ui/toast'

export function ConfigForm({ config, footerData }: { config: any, footerData: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toasts, showToast, removeToast } = useToast()
  const [formData, setFormData] = useState({
    site: {
      name: config.site.name,
      domain: config.site.domain,
      district: config.site.district ?? '',
      city: config.site.city,
    },
    contact: {
      phone: config.contact.phone,
      email: config.contact.email,
      whatsapp: config.contact.whatsapp,
      address: config.contact.address ?? '',
    },
    seo: {
      metaTitle: config.seo.metaTitle,
      metaDescription: config.seo.metaDescription,
      keywords: config.seo.keywords.join(', '),
    },
    analytics: {
      googleAnalytics: config.analytics?.googleAnalytics ?? '',
      googleTagManager: config.analytics?.googleTagManager ?? '',
    },
    searchConsole: {
      verificationCode: config.searchConsole?.verificationCode ?? '',
    },
    footer: {
      title: footerData?.title ?? '',
      description: footerData?.description ?? '',
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          seo: {
            ...formData.seo,
            keywords: formData.seo.keywords.split(',').map((k: string) => k.trim()),
          }
        }),
      })

      if (response.ok) {
        showToast('Ayarlar başarıyla kaydedildi!', 'success')
        router.refresh()
      } else {
        showToast('Ayarlar kaydedilemedi!', 'error')
      }
    } catch (error) {
      showToast('Bir hata oluştu!', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Genel Bilgiler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Site Adı</label>
              <input 
                type="text" 
                value={formData.site.name}
                onChange={(e) => setFormData({ ...formData, site: { ...formData.site, name: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Domain</label>
              <input 
                type="text" 
                value={formData.site.domain}
                onChange={(e) => setFormData({ ...formData, site: { ...formData.site, domain: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">İlçe</label>
              <input 
                type="text" 
                value={formData.site.district}
                onChange={(e) => setFormData({ ...formData, site: { ...formData.site, district: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">İl</label>
              <input 
                type="text" 
                value={formData.site.city}
                onChange={(e) => setFormData({ ...formData, site: { ...formData.site, city: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Telefon</label>
              <input 
                type="tel" 
                value={formData.contact.phone}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, phone: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">E-posta</label>
              <input 
                type="email" 
                value={formData.contact.email}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, email: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">WhatsApp</label>
              <input 
                type="text" 
                value={formData.contact.whatsapp}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, whatsapp: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Adres</label>
              <textarea 
                value={formData.contact.address}
                onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact, address: e.target.value } })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Ayarları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Meta Başlık</label>
              <input 
                type="text" 
                value={formData.seo.metaTitle}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Meta Açıklama</label>
              <textarea 
                value={formData.seo.metaDescription}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                rows={3} 
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Anahtar Kelimeler (virgülle ayırın)</label>
              <input 
                type="text" 
                value={formData.seo.keywords}
                onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, keywords: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Analytics & Tag Manager</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Google Analytics ID</label>
              <input 
                type="text" 
                value={formData.analytics.googleAnalytics}
                onChange={(e) => setFormData({ ...formData, analytics: { ...formData.analytics, googleAnalytics: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
              <p className="text-xs text-gray-500 mt-1">Örnek: G-XXXXXXXXXX</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Google Tag Manager ID</label>
              <input 
                type="text" 
                value={formData.analytics.googleTagManager}
                onChange={(e) => setFormData({ ...formData, analytics: { ...formData.analytics, googleTagManager: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
              <p className="text-xs text-gray-500 mt-1">Örnek: GTM-XXXXXXX</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Footer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Footer Başlık</label>
              <input 
                type="text" 
                value={formData.footer.title}
                onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, title: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-2">Footer Açıklama</label>
              <textarea 
                value={formData.footer.description}
                onChange={(e) => setFormData({ ...formData, footer: { ...formData.footer, description: e.target.value } })}
                placeholder=""
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Google Search Console</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Verification Code</label>
              <input 
                type="text" 
                value={formData.searchConsole.verificationCode}
                onChange={(e) => setFormData({ ...formData, searchConsole: { ...formData.searchConsole, verificationCode: e.target.value } })}
                placeholder=""
                className="w-full px-3 py-2 border border-gray-200 rounded-lg" 
              />
              <p className="text-xs text-gray-500 mt-1">Meta tag içindeki content değerini yapıştırın</p>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bottom-8 right-8 z-50 flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} className="shadow-lg">İptal</Button>
          <Button type="submit" disabled={loading} className="shadow-lg">
            {loading ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
        </div>
      </form>
    </>
  )
}
