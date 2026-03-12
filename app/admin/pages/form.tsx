'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const pages = [
  { key: 'hizmetlerimiz', label: 'Hizmetlerimiz' },
  { key: 'fiyatlarimiz', label: 'Fiyatlarımız' },
  { key: 'fiyatHesapla', label: 'Fiyat Hesaplama' },
  { key: 'teklifAl', label: 'Teklif Al' },
  { key: 'hizmetBolgeleri', label: 'Hizmet Bölgeleri' },
  { key: 'iletisim', label: 'İletişim' },
]

export function PageSettingsForm({ config }: { config: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const pageSettings: any = {}

    pages.forEach(page => {
      pageSettings[page.key] = {
        title: formData.get(`${page.key}_title`),
        subtitle: formData.get(`${page.key}_subtitle`),
      }
    })

    const updatedConfig = {
      ...config,
      pageSettings,
    }

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConfig),
      })

      if (response.ok) {
        router.refresh()
        alert('Sayfa ayarları güncellendi!')
      }
    } catch (error) {
      console.error(error)
      alert('Bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      {pages.map(page => (
        <div key={page.key} className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-black mb-4">{page.label}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">Başlık</label>
              <Input 
                name={`${page.key}_title`}
                defaultValue={config.pageSettings?.[page.key]?.title ?? ''}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Alt Başlık / Açıklama</label>
              <Textarea 
                name={`${page.key}_subtitle`}
                defaultValue={config.pageSettings?.[page.key]?.subtitle ?? ''}
                rows={2}
                required
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Güncelleniyor...' : 'Güncelle'}
        </Button>
      </div>
    </form>
  )
}
