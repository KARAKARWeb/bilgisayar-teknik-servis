'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="tr">
      <body>
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <h1 className="text-4xl font-bold text-black mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Sunucu Hatası
            </h2>
            <p className="text-gray-700 mb-8">
              Üzgünüz, sunucu tarafında bir hata oluştu. Lütfen daha sonra tekrar deneyin.
            </p>
            <button
              onClick={() => reset()}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Tekrar Dene
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
