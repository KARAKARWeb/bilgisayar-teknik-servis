'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SortableList } from '@/components/admin/sortable-list'
import { BulkActions, SelectableItem } from '@/components/admin/bulk-actions'

export function ServicesListClient({ services: initialServices }: { services: any[] }) {
  const [services, setServices] = useState(initialServices)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'normal'>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleReorder = async (reorderedServices: any[]) => {
    setServices(reorderedServices)
    
    try {
      await fetch('/api/admin/services/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: reorderedServices.map((s, index) => ({ id: s.id, order: index })) }),
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

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} hizmeti silmek istediğinize emin misiniz?`)) return

    try {
      await fetch('/api/admin/services/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds }),
      })

      setServices(prev => prev.filter(s => !selectedIds.includes(s.id)))
      setSelectedIds([])
    } catch (error) {
      console.error('Toplu silme hatası:', error)
    }
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterFeatured === 'all' ||
                         (filterFeatured === 'featured' && service.featured) ||
                         (filterFeatured === 'normal' && !service.featured)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-black">Hizmetler</h1>
          <p className="text-gray-600 mt-2">
            {filteredServices.length} / {services.length} hizmet görüntüleniyor
          </p>
        </div>
        <Link href="/admin/services/yeni">
          <Button size="lg" className="gap-2">
            <span className="text-lg">+</span>
            Yeni Hizmet Ekle
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
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterFeatured}
              onChange={(e) => setFilterFeatured(e.target.value as any)}
              className="h-11 rounded-lg border border-gray-200 px-4 py-2 bg-white"
            >
              <option value="all">Tüm Hizmetler</option>
              <option value="featured">Öne Çıkanlar</option>
              <option value="normal">Normal Hizmetler</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <SortableList
        items={filteredServices}
        onReorder={handleReorder}
        getId={(service) => service.id}
        renderItem={(service) => (
          <SelectableItem
            id={service.id}
            selected={selectedIds.includes(service.id)}
            onToggle={handleToggleSelect}
          >
            <div className="group rounded-xl border border-gray-200 bg-white p-6 pl-14 transition-all hover:border-gray-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-black">{service.name}</h3>
                    {service.featured && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
                        <Star className="h-3 w-3 fill-current" />
                        Öne Çıkan
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">{service.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm font-mono">
                      /{service.slug}
                    </span>
                    {service.icon && (
                      <span className="text-xs text-gray-500">Icon: {service.icon}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/services/${service.id}`}>
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
      {filteredServices.length === 0 && (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
          <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sonuç bulunamadı</h3>
          <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}
    </div>
  )
}
