'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { SiteConfig } from '@/types'

export function EntegrasyonlarForm({ config }: { config: SiteConfig }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    googleAnalytics: config.integrations?.googleAnalytics ?? '',
    googleSearchConsole: config.integrations?.googleSearchConsole ?? '',
    facebookPixel: config.integrations?.facebookPixel ?? '',
    tawkTo: config.integrations?.tawkTo ?? '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          integrations: formData,
        }),
      })

      if (response.ok) {
        alert('Entegrasyonlar kaydedildi')
        router.refresh()
      }
    } catch (error) {
      alert('Hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
      <div>
        <label className="block text-sm font-medium mb-2">Google Analytics ID</label>
        <Input
          value={formData.googleAnalytics}
          onChange={(e) => setFormData({ ...formData, googleAnalytics: e.target.value })}
          placeholder=""
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Google Search Console</label>
        <Input
          value={formData.googleSearchConsole}
          onChange={(e) => setFormData({ ...formData, googleSearchConsole: e.target.value })}
          placeholder=""
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Facebook Pixel ID</label>
        <Input
          value={formData.facebookPixel}
          onChange={(e) => setFormData({ ...formData, facebookPixel: e.target.value })}
          placeholder=""
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Tawk.to Widget ID</label>
        <Input
          value={formData.tawkTo}
          onChange={(e) => setFormData({ ...formData, tawkTo: e.target.value })}
          placeholder=""
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Kaydediliyor...' : 'Kaydet'}
      </Button>
    </form>
  )
}
