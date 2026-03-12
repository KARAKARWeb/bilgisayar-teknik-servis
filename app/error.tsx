'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertCircle, Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-black mb-2">Bir Hata Oluştu</h1>
          <p className="text-lg text-gray-700">
            Üzgünüz, beklenmeyen bir hata oluştu.
          </p>
        </div>

        {error.message && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} size="lg">
            <RefreshCw className="mr-2 h-5 w-5" />
            Tekrar Dene
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-600">
          Sorun devam ederse lütfen{' '}
          <Link href="/iletisim" className="text-blue-600 hover:underline">
            bizimle iletişime geçin
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
