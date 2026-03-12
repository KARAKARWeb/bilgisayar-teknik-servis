import { getServices, getPrices, getRegions, getReviews, getFAQ } from '@/lib/content'
import { DashboardStats } from './stats'
import { FileText, DollarSign, MapPin, MessageSquare, HelpCircle, Settings, Plus } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const services = await getServices()
  const prices = await getPrices()
  const regions = await getRegions()
  const reviews = await getReviews()
  const faqs = await getFAQ()

  const quickLinks = [
    { title: 'Hizmetler', count: services.length, href: '/admin/services', icon: FileText, color: 'blue' },
    { title: 'Fiyat Paketleri', count: prices.length, href: '/admin/prices', icon: DollarSign, color: 'green' },
    { title: 'Hizmet Bölgeleri', count: regions.length, href: '/admin/regions', icon: MapPin, color: 'purple' },
    { title: 'Yorumlar', count: reviews.length, href: '/admin/reviews', icon: MessageSquare, color: 'orange' },
    { title: 'SSS', count: faqs.length, href: '/admin/faq', icon: HelpCircle, color: 'pink' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black">Dashboard</h1>
        <p className="text-gray-600 mt-2">İçerik yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats
        servicesCount={services.length}
        pricesCount={prices.length}
        regionsCount={regions.length}
        reviewsCount={reviews.length}
      />

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-6">Hızlı Erişim</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`rounded-lg p-3 bg-${link.color}-50`}>
                      <Icon className={`h-6 w-6 text-${link.color}-600`} />
                    </div>
                    <span className="text-2xl font-bold text-black">{link.count}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-black group-hover:text-blue-600 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Yönet ve düzenle</p>
                </div>
              </Link>
            )
          })}

          {/* Settings Card */}
          <Link href="/admin/config">
            <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="rounded-lg p-3 bg-gray-100">
                  <Settings className="h-6 w-6 text-gray-700" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-black group-hover:text-blue-600 transition-colors">
                Site Ayarları
              </h3>
              <p className="text-sm text-gray-600 mt-1">Genel ayarlar ve yapılandırma</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-black mb-6">Yeni İçerik Ekle</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/services/yeni">
            <div className="group rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-all hover:border-blue-500 hover:bg-blue-50">
              <Plus className="h-8 w-8 mx-auto mb-3 text-gray-400 group-hover:text-blue-600" />
              <p className="font-medium text-gray-700 group-hover:text-blue-600">Yeni Hizmet</p>
            </div>
          </Link>
          <Link href="/admin/prices/yeni">
            <div className="group rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-all hover:border-green-500 hover:bg-green-50">
              <Plus className="h-8 w-8 mx-auto mb-3 text-gray-400 group-hover:text-green-600" />
              <p className="font-medium text-gray-700 group-hover:text-green-600">Yeni Paket</p>
            </div>
          </Link>
          <Link href="/admin/regions/yeni">
            <div className="group rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-all hover:border-purple-500 hover:bg-purple-50">
              <Plus className="h-8 w-8 mx-auto mb-3 text-gray-400 group-hover:text-purple-600" />
              <p className="font-medium text-gray-700 group-hover:text-purple-600">Yeni Bölge</p>
            </div>
          </Link>
          <Link href="/admin/faq/yeni">
            <div className="group rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 text-center transition-all hover:border-orange-500 hover:bg-orange-50">
              <Plus className="h-8 w-8 mx-auto mb-3 text-gray-400 group-hover:text-orange-600" />
              <p className="font-medium text-gray-700 group-hover:text-orange-600">Yeni SSS</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
