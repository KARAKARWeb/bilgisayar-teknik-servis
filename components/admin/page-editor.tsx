'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { TiptapEditor } from '@/components/ui/tiptap-editor'

interface PageEditorProps {
  pageKey: string
  pageData: any
}

export function PageEditor({ pageKey, pageData }: PageEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState(pageData?.content ?? '')
  const [seoTitle, setSeoTitle] = useState(pageData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(pageData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(pageData?.seo?.keywords) 
      ? pageData.seo.keywords.join(', ') 
      : ''
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
          content,
          seo: {
            title: seoTitle,
            description: seoDescription,
            keywords: seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
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
      {/* İçerik */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-900">İçerik</label>
        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder=""
        />
      </div>

      {/* SEO Başlık */}
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

      {/* SEO Açıklama */}
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

      {/* SEO Anahtar Kelimeler */}
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

      <div className="fixed bottom-8 right-8 z-50">
        <Button type="submit" disabled={loading} className="shadow-lg">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
