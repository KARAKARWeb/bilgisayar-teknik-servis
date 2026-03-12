'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function SSSduzenForm({ faq }: { faq: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      ...faq,
      question: formData.get('question'),
      answer: formData.get('answer'),
      category: formData.get('category'),
      region: formData.get('region') || null,
      active: formData.get('active') === 'on',
      order: Number(formData.get('order')) || 0,
    }

    try {
      const response = await fetch('/api/admin/faq', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/faq')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Bu SSS\'yi silmek istediğinizden emin misiniz?')) return

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/faq?id=${faq.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/admin/faq')
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black mb-8">SSS Düzenle</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Soru *</label>
          <Input name="question" defaultValue={faq.question} required />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Cevap *</label>
          <Textarea name="answer" defaultValue={faq.answer} required rows={5} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Kategori *</label>
            <Input name="category" defaultValue={faq.category} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Sıra</label>
            <Input name="order" type="number" defaultValue={faq.order} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Bölge</label>
          <select name="region" defaultValue={faq.region || ''} className="w-full rounded-lg border border-gray-200 px-3 py-2">
            <option value="">Genel (Tüm Bölgeler)</option>
            <option value="aydinli">Aydınlı</option>
            <option value="sifa">Şifa</option>
            <option value="yayla">Yayla</option>
            <option value="mimar-sinan">Mimar Sinan</option>
            <option value="aydintepe">Aydıntepe</option>
            <option value="istasyon">İstasyon</option>
            <option value="postane">Postane</option>
            <option value="evliya-celebi">Evliya Çelebi</option>
            <option value="icmeler">İçmeler</option>
            <option value="orta">Orta</option>
            <option value="tepeoren">Tepeören</option>
            <option value="cami">Cami</option>
            <option value="mescit">Mescit</option>
            <option value="akfirat">Akfırat</option>
            <option value="orhanli">Orhanlı</option>
            <option value="fatih">Fatih</option>
            <option value="anadolu">Anadolu</option>
            <option value="iayosb">İAYOSB</option>
            <option value="idosb">İDOSB</option>
            <option value="bosb">BOSB</option>
            <option value="kosb">KOSB</option>
            <option value="itosb">İTOSB</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="active" id="active" defaultChecked={faq.active} />
          <label htmlFor="active" className="text-sm font-medium text-black">Aktif</label>
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
