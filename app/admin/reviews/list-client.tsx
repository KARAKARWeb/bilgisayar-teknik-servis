'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Star, Edit, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SortableList } from '@/components/admin/sortable-list'
import { BulkActions, SelectableItem } from '@/components/admin/bulk-actions'

export function ReviewsListClient({ reviews: initialReviews }: { reviews: any[] }) {
  const router = useRouter()
  const [reviews, setReviews] = useState(initialReviews)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all')

  const handleReorder = async (reorderedReviews: any[]) => {
    setReviews(reorderedReviews)
    
    try {
      await fetch('/api/admin/reviews/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviews: reorderedReviews.map((r, index) => ({ id: r.id, order: index })) }),
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
    setSelectedIds(filteredReviews.map(r => r.id))
  }

  const handleClearSelection = () => {
    setSelectedIds([])
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} yorumu silmek istediğinize emin misiniz?`)) return

    try {
      await fetch('/api/admin/reviews/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setReviews(prev => prev.filter(r => !selectedIds.includes(r.id)))
      setSelectedIds([])
      router.refresh()
    } catch (error) {
      console.error('Toplu silme hatası:', error)
    }
  }

  const handleBulkApprove = async () => {
    try {
      await fetch('/api/admin/reviews/bulk-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setReviews(prev => prev.map(r => 
        selectedIds.includes(r.id) ? { ...r, approved: true } : r
      ))
      setSelectedIds([])
    } catch (error) {
      console.error('Toplu onaylama hatası:', error)
    }
  }

  const handleBulkReject = async () => {
    try {
      await fetch('/api/admin/reviews/bulk-reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setReviews(prev => prev.map(r => 
        selectedIds.includes(r.id) ? { ...r, approved: false } : r
      ))
      setSelectedIds([])
    } catch (error) {
      console.error('Toplu reddetme hatası:', error)
    }
  }

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'approved' && review.approved) ||
                         (filterStatus === 'pending' && !review.approved)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Müşteri Yorumları</h1>
          <p className="text-gray-600 mt-2">
            {filteredReviews.length} / {reviews.length} yorum görüntüleniyor
          </p>
        </div>
        <Link href="/admin/reviews/yeni">
          <Button size="lg" className="gap-2">
            <span className="text-lg">+</span>
            Yeni Yorum Ekle
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
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="h-11 rounded-lg border border-gray-200 px-4 py-2 bg-white"
          >
            <option value="all">Tüm Yorumlar</option>
            <option value="approved">Onaylı</option>
            <option value="pending">Onay Bekleyen</option>
          </select>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSelectAll}
              disabled={filteredReviews.length === 0}
            >
              Tümünü Seç ({filteredReviews.length})
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

      {/* Reviews List */}
      <SortableList
        items={filteredReviews}
        onReorder={handleReorder}
        getId={(review) => review.id}
        renderItem={(review) => (
          <SelectableItem
            id={review.id}
            selected={selectedIds.includes(review.id)}
            onToggle={handleToggleSelect}
          >
            <div className="group rounded-xl border border-gray-200 bg-white p-6 pl-14 transition-all hover:border-gray-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-black">{review.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{review.company} - {review.position}</p>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-2">
                    {review.approved ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium">
                        <Check className="h-3 w-3" />
                        Onaylı
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium">
                        <X className="h-3 w-3" />
                        Onay Bekliyor
                      </span>
                    )}
                    {review.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                        <Star className="h-3 w-3 fill-current" />
                        Öne Çıkan
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/reviews/${review.id}`}>
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
        onApprove={handleBulkApprove}
        onReject={handleBulkReject}
        onClear={() => setSelectedIds([])}
      />

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  )
}
