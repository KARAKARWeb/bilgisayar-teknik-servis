'use client'

import React, { useState } from 'react'
import { Check, X, Info, Zap, Award, Shield, Clock } from 'lucide-react'

interface ComparisonFeature {
  category: string
  icon: 'zap' | 'award' | 'shield' | 'clock'
  features: {
    name: string
    description?: string
    starter: string | boolean
    professional: string | boolean
    business: string | boolean
    enterprise: string | boolean
  }[]
}

const comparisonData: ComparisonFeature[] = [
  {
    category: 'Temel Özellikler',
    icon: 'zap',
    features: [
      {
        name: 'Sayfa Sayısı',
        description: 'Web sitenizde yer alacak sayfa adedi',
        starter: '5 sayfa',
        professional: '10 sayfa',
        business: '15 sayfa',
        enterprise: 'Sınırsız'
      },
      {
        name: 'Responsive Tasarım',
        description: 'Tüm cihazlarda uyumlu görünüm',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Özel Tasarım',
        description: 'Size özel hazırlanmış tasarım',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Premium UI/UX',
        description: 'Gelişmiş kullanıcı deneyimi tasarımı',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Animasyonlar',
        description: 'Sayfa geçiş ve etkileşim animasyonları',
        starter: 'Temel',
        professional: 'Gelişmiş',
        business: 'Premium',
        enterprise: 'Özel'
      }
    ]
  },
  {
    category: 'SEO & Performans',
    icon: 'award',
    features: [
      {
        name: 'SEO Optimizasyonu',
        description: 'Arama motoru optimizasyonu',
        starter: 'Temel SEO',
        professional: 'Gelişmiş SEO',
        business: 'Profesyonel SEO',
        enterprise: 'Kurumsal SEO'
      },
      {
        name: 'Meta Etiketleri',
        description: 'SEO meta tag yönetimi',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Schema Markup',
        description: 'Yapılandırılmış veri işaretlemesi',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Sitemap XML',
        description: 'Otomatik site haritası',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Robots.txt',
        description: 'Arama motoru yönlendirme',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Hız Optimizasyonu',
        description: 'Sayfa yükleme hızı iyileştirme',
        starter: 'Temel',
        professional: 'Gelişmiş',
        business: 'Premium',
        enterprise: 'Maksimum'
      },
      {
        name: 'CDN Entegrasyonu',
        description: 'İçerik dağıtım ağı',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Image Optimization',
        description: 'Görsel optimizasyonu',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'İçerik Yönetimi',
    icon: 'shield',
    features: [
      {
        name: 'Admin Paneli',
        description: 'İçerik yönetim sistemi',
        starter: false,
        professional: 'Temel CMS',
        business: 'Gelişmiş CMS',
        enterprise: 'Özel CMS'
      },
      {
        name: 'Blog Sistemi',
        description: 'Blog yazıları yönetimi',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Haber Sistemi',
        description: 'Haber içerikleri yönetimi',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Galeri Yönetimi',
        description: 'Fotoğraf ve video galerisi',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Medya Kütüphanesi',
        description: 'Dosya ve medya yönetimi',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Entegrasyonlar',
    icon: 'zap',
    features: [
      {
        name: 'Google Analytics',
        description: 'Ziyaretçi analizi',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Google Tag Manager',
        description: 'Etiket yönetimi',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Sosyal Medya',
        description: 'Sosyal medya entegrasyonları',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'E-Ticaret',
        description: 'Online satış sistemi',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'Ödeme Sistemleri',
        description: 'Online ödeme altyapısı',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'CRM Entegrasyonu',
        description: 'Müşteri ilişkileri yönetimi',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'ERP Entegrasyonu',
        description: 'Kurumsal kaynak planlaması',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'API Geliştirme',
        description: 'Özel API entegrasyonları',
        starter: false,
        professional: false,
        business: 'Temel',
        enterprise: 'Gelişmiş'
      }
    ]
  },
  {
    category: 'Güvenlik & Altyapı',
    icon: 'shield',
    features: [
      {
        name: 'SSL Sertifikası',
        description: 'HTTPS güvenli bağlantı',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Hosting',
        description: 'Web barındırma hizmeti',
        starter: '1 yıl',
        professional: '1 yıl',
        business: '1 yıl',
        enterprise: '1 yıl premium'
      },
      {
        name: 'Domain',
        description: 'Alan adı hizmeti',
        starter: '1 yıl',
        professional: '1 yıl',
        business: '1 yıl',
        enterprise: '1 yıl'
      },
      {
        name: 'Otomatik Yedekleme',
        description: 'Düzenli veri yedekleme',
        starter: 'Haftalık',
        professional: 'Günlük',
        business: 'Günlük',
        enterprise: 'Saatlik'
      },
      {
        name: 'Firewall Koruması',
        description: 'Güvenlik duvarı',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'DDoS Koruması',
        description: 'Saldırı koruması',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Malware Tarama',
        description: 'Zararlı yazılım kontrolü',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Uptime Monitoring',
        description: 'Kesintisiz çalışma takibi',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Özelleşmiş Modüller',
    icon: 'award',
    features: [
      {
        name: 'İletişim Formu',
        description: 'Özelleştirilebilir iletişim formu',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Canlı Destek',
        description: 'Canlı sohbet modülü',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Randevu Sistemi',
        description: 'Online randevu alma',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Rezervasyon Sistemi',
        description: 'Rezervasyon yönetimi',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'Forum/Topluluk',
        description: 'Kullanıcı forumu',
        starter: false,
        professional: false,
        business: false,
        enterprise: true
      },
      {
        name: 'Anket & Oylama',
        description: 'Anket ve oylama sistemi',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      },
      {
        name: 'Referans Sistemi',
        description: 'Müşteri referansları',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'SSS Modülü',
        description: 'Sıkça sorulan sorular',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Arama Fonksiyonu',
        description: 'Site içi arama',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Çoklu Filtre',
        description: 'Gelişmiş filtreleme',
        starter: false,
        professional: false,
        business: true,
        enterprise: true
      }
    ]
  },
  {
    category: 'Destek & Eğitim',
    icon: 'clock',
    features: [
      {
        name: 'Teknik Destek',
        description: 'Teknik yardım hizmeti',
        starter: 'E-posta',
        professional: 'Öncelikli',
        business: '7/24',
        enterprise: 'Özel yönetici'
      },
      {
        name: 'Kullanım Eğitimi',
        description: 'Sistem kullanım eğitimi',
        starter: 'Video',
        professional: 'Canlı',
        business: 'Yerinde',
        enterprise: 'Özel'
      },
      {
        name: 'Dokümantasyon',
        description: 'Kullanım kılavuzu',
        starter: true,
        professional: true,
        business: true,
        enterprise: true
      },
      {
        name: 'Güncelleme Desteği',
        description: 'Yazılım güncellemeleri',
        starter: '6 ay',
        professional: '1 yıl',
        business: '2 yıl',
        enterprise: '3 yıl'
      },
      {
        name: 'Acil Müdahale',
        description: 'Acil durum desteği',
        starter: false,
        professional: false,
        business: '24 saat',
        enterprise: '2 saat'
      },
      {
        name: 'Kaynak Kod Teslimi',
        description: 'Proje kaynak kodları',
        starter: false,
        professional: true,
        business: true,
        enterprise: true
      }
    ]
  }
]

const categoryIcons = {
  zap: Zap,
  award: Award,
  shield: Shield,
  clock: Clock
}

export function PriceComparisonTable() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      )
    }
    return <span className="text-sm text-gray-900 text-center block">{value}</span>
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="sticky left-0 z-10 bg-gray-50 px-6 py-4 text-left">
                <span className="text-sm font-semibold text-gray-900">Özellikler</span>
              </th>
              <th className="px-6 py-4 text-center min-w-[160px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold text-black">Başlangıç</span>
                  <span className="text-2xl font-bold text-blue-600">12.000₺</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center min-w-[160px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold text-black">Profesyonel</span>
                  <span className="text-2xl font-bold text-blue-600">24.400₺</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center min-w-[160px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold text-black">İşletme</span>
                  <span className="text-2xl font-bold text-blue-600">38.000₺</span>
                </div>
              </th>
              <th className="px-6 py-4 text-center min-w-[160px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-lg font-bold text-black">Kurumsal</span>
                  <span className="text-2xl font-bold text-blue-600">65.000₺</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((category, catIdx) => {
              const IconComponent = categoryIcons[category.icon]
              return (
                <React.Fragment key={`category-${catIdx}`}>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="text-blue-600">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <span className="text-base font-bold text-gray-900">{category.category}</span>
                      </div>
                    </td>
                  </tr>
                  {category.features.map((feature, featIdx) => (
                    <tr
                      key={`feat-${catIdx}-${featIdx}`}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="sticky left-0 z-10 bg-white px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-900">{feature.name}</span>
                          {feature.description && (
                            <div className="relative">
                              <button
                                className="text-gray-400 hover:text-gray-600"
                                aria-label={`${feature.name} hakkında bilgi`}
                                onMouseEnter={() => setActiveTooltip(`${catIdx}-${featIdx}`)}
                                onMouseLeave={() => setActiveTooltip(null)}
                              >
                                <Info className="h-4 w-4" />
                              </button>
                              {activeTooltip === `${catIdx}-${featIdx}` && (
                                <div className="absolute left-6 top-0 z-20 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg">
                                  {feature.description}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">{renderValue(feature.starter)}</td>
                      <td className="px-6 py-4">{renderValue(feature.professional)}</td>
                      <td className="px-6 py-4">{renderValue(feature.business)}</td>
                      <td className="px-6 py-4">{renderValue(feature.enterprise)}</td>
                    </tr>
                  ))}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
