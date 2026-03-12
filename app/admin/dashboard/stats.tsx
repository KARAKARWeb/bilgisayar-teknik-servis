'use client'

import { TrendingUp, Users, Star, FileText } from 'lucide-react'

interface StatsProps {
  servicesCount: number
  pricesCount: number
  regionsCount: number
  reviewsCount: number
}

export function DashboardStats({ servicesCount, pricesCount, regionsCount, reviewsCount }: StatsProps) {
  const stats = [
    {
      title: 'Toplam Hizmet',
      value: servicesCount,
      icon: FileText,
      color: 'bg-blue-50 text-blue-600',
      trend: '+12%',
    },
    {
      title: 'Fiyat Paketleri',
      value: pricesCount,
      icon: TrendingUp,
      color: 'bg-green-50 text-green-600',
      trend: '+8%',
    },
    {
      title: 'Hizmet Bölgeleri',
      value: regionsCount,
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
      trend: '+5%',
    },
    {
      title: 'Müşteri Yorumları',
      value: reviewsCount,
      icon: Star,
      color: 'bg-orange-50 text-orange-600',
      trend: '+15%',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.title} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className={`rounded-lg p-3 ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-green-600">{stat.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-black">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
