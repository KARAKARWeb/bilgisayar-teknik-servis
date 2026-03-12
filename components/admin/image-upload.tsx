'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (data.url) {
        setPreview(data.url)
        onChange(data.url)
      }
    } catch (error) {
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

      {preview ? (
        <div className="relative rounded-lg border border-gray-200 overflow-hidden">
          <Image
            src={preview}
            alt="Preview"
            width={400}
            height={300}
            className="w-full h-auto object-cover"
          />
          <button
            onClick={() => {
              setPreview(undefined)
              onRemove?.()
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 p-12 hover:border-gray-400 transition-colors disabled:opacity-50"
        >
          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-900">Görsel yükle</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, WebP (Max 2MB)</p>
                </div>
              </>
            )}
          </div>
        </button>
      )}
    </div>
  )
}
