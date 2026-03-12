'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, HelpCircle, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SortableList } from '@/components/admin/sortable-list'
import { BulkActions, SelectableItem } from '@/components/admin/bulk-actions'

export function FAQListClient({ faqs: initialFaqs }: { faqs: any[] }) {
  const router = useRouter()
  const [faqs, setFaqs] = useState(initialFaqs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const handleReorder = async (reorderedFaqs: any[]) => {
    setFaqs(reorderedFaqs)
    
    try {
      await fetch('/api/admin/faq/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faqs: reorderedFaqs.map((f, index) => ({ id: f.id, order: index })) }),
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
    setSelectedIds(filteredFaqs.map(f => f.id))
  }

  const handleClearSelection = () => {
    setSelectedIds([])
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} soruyu silmek istediğinize emin misiniz?`)) return

    try {
      await fetch('/api/admin/faq/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setFaqs(prev => prev.filter(f => !selectedIds.includes(f.id)))
      setSelectedIds([])
      router.refresh()
    } catch (error) {
      console.error('Toplu silme hatası:', error)
    }
  }

  const categories = Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-600 mt-2">
            {filteredFaqs.length} / {faqs.length} soru görüntüleniyor
          </p>
        </div>
        <Link href="/admin/faq/yeni">
          <Button size="lg" className="gap-2">
            <span className="text-lg">+</span>
            Yeni Soru Ekle
          </Button>
        </Link>
      </div>

      {/* Search & Filter Bar */}
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
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="h-11 rounded-lg border border-gray-200 px-4 py-2 bg-white"
          >
            <option value="all">Tüm Kategoriler</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={filteredFaqs.length === 0}
            >
              Tümünü Seç ({filteredFaqs.length})
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

      {/* FAQ List */}
      <SortableList
        items={filteredFaqs}
        onReorder={handleReorder}
        getId={(faq) => faq.id}
        renderItem={(faq) => (
          <SelectableItem
            id={faq.id}
            selected={selectedIds.includes(faq.id)}
            onToggle={handleToggleSelect}
          >
            <div className="group rounded-xl border border-gray-200 bg-white p-6 pl-14 transition-all hover:border-gray-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <HelpCircle className="h-5 w-5 text-blue-600" />
                    <h3 className="text-xl font-semibold text-black">{faq.question}</h3>
                  </div>
                  <p className="text-gray-700 mb-3">{faq.answer}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm">
                      {faq.category}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm">
                      Sıra: {faq.order}
                    </span>
                    {faq.active && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                        Aktif
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/faq/${faq.id}`}>
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
      {filteredFaqs.length === 0 && (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  )
}
