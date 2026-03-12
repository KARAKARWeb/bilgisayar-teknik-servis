'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ImageUploadProps {
  onUpload: (url: string) => void
  currentImage?: string
  label?: string
}

export function ImageUpload({ onUpload, currentImage, label = 'Resim Yükle' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentImage || '')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setPreview(result.url)
        onUpload(result.url)
      } else {
        setError(result.message || 'Yükleme başarısız')
      }
    } catch (err) {
      setError('Bir hata oluştu')
    } finally {
      setUploading(false)
    }
  }

  function handleRemove() {
    setPreview('')
    onUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-black">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <Image src={preview} alt="Preview" width={128} height={128} loading="lazy" className="h-32 w-32 object-cover rounded-lg border border-gray-200" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-900">
              {uploading ? 'Yükleniyor...' : 'Resim seçmek için tıklayın'}
            </p>
            <p className="mt-1 text-xs text-gray-900">PNG, JPG, GIF, WEBP (max 5MB)</p>
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
