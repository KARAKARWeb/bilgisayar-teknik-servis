'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function YeniYorumPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      id: `review-${Date.now()}`,
      name: formData.get('name'),
      company: formData.get('company'),
      position: formData.get('position'),
      comment: formData.get('comment'),
      rating: Number(formData.get('rating')),
      date: new Date().toISOString().split('T')[0],
      approved: formData.get('approved') === 'on',
      featured: formData.get('featured') === 'on',
      order: Number(formData.get('order')) || 0,
    }

    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/reviews')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">Yeni Yorum Ekle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">İsim *</label>
            <Input name="name" required placeholder="" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Firma</label>
            <Input name="company" placeholder="" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Pozisyon</label>
          <Input name="position" placeholder="" />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Yorum *</label>
          <Textarea name="comment" required rows={5} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Puan (1-5) *</label>
            <Input name="rating" type="number" min="1" max="5" required defaultValue="5" />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Sıra</label>
            <Input name="order" type="number" defaultValue="0" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" name="approved" id="approved" defaultChecked />
            <label htmlFor="approved" className="text-sm font-medium text-black">Onaylı</label>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="featured" id="featured" />
            <label htmlFor="featured" className="text-sm font-medium text-black">Öne Çıkan</label>
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
