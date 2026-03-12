'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

interface MinimalPageEditorProps {
  pageKey: string
  pageData: any
}

export function MinimalPageEditor({ pageKey, pageData }: MinimalPageEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [heroTitle, setHeroTitle] = useState(pageData?.hero?.title ?? '')
  const [heroDescription, setHeroDescription] = useState(pageData?.hero?.description ?? '')
  const [seoTitle, setSeoTitle] = useState(pageData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(pageData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(pageData?.seo?.keywords) 
      ? pageData.seo.keywords.join(', ') 
      : pageData?.seo?.keywords ?? ''
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageKey,
          data: {
            ...pageData,
            hero: {
              title: heroTitle,
              description: heroDescription,
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

      toast.success('Sayfa başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
