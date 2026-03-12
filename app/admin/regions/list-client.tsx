'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, MapPin, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { SortableList } from '@/components/admin/sortable-list'
import { BulkActions, SelectableItem } from '@/components/admin/bulk-actions'
import { toast } from 'sonner'

export function RegionsListClient({ regions: initialRegions, pageSettings: initialPageSettings }: { regions: any[], pageSettings: any }) {
  const router = useRouter()
  const [regions, setRegions] = useState(initialRegions)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  
  // Page Settings
  const [title, setTitle] = useState(initialPageSettings?.title ?? '')
  const [subtitle, setSubtitle] = useState(initialPageSettings?.subtitle ?? '')
  const [seoTitle, setSeoTitle] = useState(initialPageSettings?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(initialPageSettings?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(initialPageSettings?.seo?.keywords)
      ? initialPageSettings.seo.keywords.join(', ')
      : ''
  )
  const [savingSettings, setSavingSettings] = useState(false)

  const handleReorder = async (reorderedRegions: any[]) => {
    setRegions(reorderedRegions)
    
    try {
      await fetch('/api/admin/regions/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ regions: reorderedRegions.map((r, index) => ({ id: r.id, order: index })) }),
      })
    } catch (error) {
      console.error('Sıralama kaydedilemedi:', error)
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedIds(filteredRegions.map(r => r.id))
  }

  const handleClearSelection = () => {
    setSelectedIds([])
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} bölgeyi silmek istediğinize emin misiniz?`)) return

    try {
      await fetch('/api/admin/regions/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setRegions(prev => prev.filter(r => !selectedIds.includes(r.id)))
      setSelectedIds([])
      router.refresh()
    } catch (error) {
      console.error('Toplu silme hatası:', error)
    }
  }

  const filteredRegions = regions.filter(region => {
    const matchesSearch = region.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         region.slug.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleSaveSettings = async () => {
    setSavingSettings(true)
    try {
      const response = await fetch('/api/admin/page-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 'hizmet-bolgeleri',
          settings: {
            title,
            subtitle,
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('Sayfa ayarları kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setSavingSettings(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Settings */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-black mb-6">Hizmet Bölgeleri Sayfa Ayarları</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Sayfa Başlığı</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Sayfa Alt Başlığı</label>
            <Textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
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
          <div className="fixed bottom-8 right-8 z-50">
            <Button onClick={handleSaveSettings} disabled={savingSettings} className="shadow-lg">
              {savingSettings ? 'Kaydediliyor...' : 'Sayfa Ayarlarını Kaydet'}
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Hizmet Bölgeleri</h1>
          <p className="text-gray-600 mt-2">
            {filteredRegions.length} / {regions.length} bölge görüntüleniyor
          </p>
        </div>
        <Link href="/admin/regions/yeni">
          <Button size="lg" className="gap-2">
            <span className="text-lg">+</span>
            Yeni Bölge Ekle
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder=""
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={filteredRegions.length === 0}
            >
              Tümünü Seç ({filteredRegions.length})
            </Button>
            <Button
              variant="outline"
              onClick={handleClearSelection}
              disabled={selectedIds.length === 0}
            >
              Seçimi Temizle
            </Button>
          </div>
        </div>
      </div>

      {/* Regions Grid */}
      <SortableList
        items={filteredRegions}
        onReorder={handleReorder}
        getId={(region) => region.id}
        renderItem={(region) => (
          <SelectableItem
            id={region.id}
            selected={selectedIds.includes(region.id)}
            onToggle={handleToggleSelect}
          >
            <div className="group rounded-xl border border-gray-200 bg-white p-6 pl-14 transition-all hover:border-gray-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <h3 className="text-xl font-semibold text-black">{region.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{region.city}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-mono">
                      /{region.slug}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/regions/${region.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Düzenle
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SelectableItem>
        )}
      />

      {/* Bulk Actions */}
      <BulkActions
        selectedIds={selectedIds}
        onDelete={handleBulkDelete}
        onClear={() => setSelectedIds([])}
      />

      {/* Empty State */}
      {filteredRegions.length === 0 && (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  )
}
