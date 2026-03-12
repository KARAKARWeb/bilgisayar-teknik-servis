'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface AboutEditorProps {
  aboutData: any
}

export function AboutEditor({ aboutData }: AboutEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Hero Section
  const [heroTitle, setHeroTitle] = useState(aboutData?.hero?.title ?? '')
  const [heroSubtitle, setHeroSubtitle] = useState(aboutData?.hero?.subtitle ?? '')
  
  // Content Section
  const [description, setDescription] = useState(aboutData?.content?.description ?? '')
  const [mission, setMission] = useState(aboutData?.content?.mission ?? '')
  const [vision, setVision] = useState(aboutData?.content?.vision ?? '')
  const [valuesSubtitle, setValuesSubtitle] = useState(aboutData?.content?.valuesSubtitle ?? '')
  const [values, setValues] = useState(aboutData?.content?.values ?? [])
  
  // SEO
  const [seoTitle, setSeoTitle] = useState(aboutData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(aboutData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(aboutData?.seo?.keywords) 
      ? aboutData.seo.keywords.join(', ') 
      : aboutData?.seo?.keywords ?? ''
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey: 'about',
          data: {
            ...aboutData,
            hero: {
              title: heroTitle,
              subtitle: heroSubtitle,
            },
            content: {
              ...aboutData?.content,
              description,
              mission,
              vision,
              valuesSubtitle,
              values,
            },
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: typeof seoKeywords === 'string' 
                ? seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
                : seoKeywords,
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('Hakkımızda sayfası başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Hero Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder=""
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">İçerik Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Hakkımızda Açıklama</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Misyon</label>
            <Textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              placeholder=""
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Vizyon</label>
            <Textarea
              value={vision}
              onChange={(e) => setVision(e.target.value)}
              placeholder=""
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Değerlerimiz</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={valuesSubtitle}
              onChange={(e) => setValuesSubtitle(e.target.value)}
              placeholder="Çalışma prensipleri ve değerlerimiz..."
              rows={2}
            />
          </div>
          {values.map((value: any, index: number) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Değer {index + 1}</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setValues(values.filter((_: any, i: number) => i !== index))}
                >
                  Sil
                </Button>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Başlık</label>
                <Input
                  value={value.title}
                  onChange={(e) => {
                    const newValues = [...values]
                    newValues[index] = { ...value, title: e.target.value }
                    setValues(newValues)
                  }}
                  placeholder=""
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Açıklama</label>
                <Textarea
                  value={value.description}
                  onChange={(e) => {
                    const newValues = [...values]
                    newValues[index] = { ...value, description: e.target.value }
                    setValues(newValues)
                  }}
                  placeholder=""
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">İkon</label>
                <select
                  value={value.icon}
                  onChange={(e) => {
                    const newValues = [...values]
                    newValues[index] = { ...value, icon: e.target.value }
                    setValues(newValues)
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="shield-check">Güvenlik (Shield)</option>
                  <option value="award">Ödül (Award)</option>
                  <option value="lightbulb">Yenilikçilik (Lightbulb)</option>
                  <option value="heart">Müşteri Odaklılık (Heart)</option>
                </select>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => setValues([...values, { title: '', description: '', icon: 'shield-check' }])}
          >
            + Yeni Değer Ekle
          </Button>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">SEO</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Başlık
              <span className="ml-2 text-xs text-gray-500">
                ({seoTitle.length}/60 karakter)
              </span>
            </label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder=""
              maxLength={60}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Açıklama
              <span className="ml-2 text-xs text-gray-500">
                ({seoDescription.length}/160 karakter)
              </span>
            </label>
            <Textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder=""
              maxLength={160}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Anahtar Kelimeler
              <span className="ml-2 text-xs text-gray-500">(virgülle ayırın)</span>
            </label>
            <Input
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <Button type="submit" disabled={loading} className="shadow-lg">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
