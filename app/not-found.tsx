import Link from 'next/link'
import { Home, ArrowRight, Sparkles } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full">
          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* 404 Number with Gradient */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-32 w-32 text-gray-200 animate-pulse" />
              </div>
              <h1 className="relative text-[12rem] md:text-[16rem] font-black leading-none">
                <span className="bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                  404
                </span>
              </h1>
            </div>

            {/* Message */}
            <div className="space-y-4 px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Sayfa Bulunamadı
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-4 text-base font-semibold text-white hover:bg-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Home className="h-5 w-5" />
                Ana Sayfaya Dön
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/hizmetlerimiz"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-black hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Hizmetlerimiz
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Popular Links */}
            <div className="pt-12">
              <div className="inline-block rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200 px-8 py-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-900 mb-4">Popüler Sayfalar</p>
                <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
                  <Link 
                    href="/hakkimizda" 
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all"
                  >
                    Hakkımızda
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link 
                    href="/fiyatlarimiz" 
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all"
                  >
                    Fiyatlarımız
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link 
                    href="/hizmet-bolgeleri" 
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all"
                  >
                    Hizmet Bölgeleri
                  </Link>
                  <span className="text-gray-300">•</span>
                  <Link 
                    href="/iletisim" 
                    className="text-sm font-medium text-gray-700 hover:text-black transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-black after:transition-all"
                  >
                    İletişim
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
