'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, X, Calculator, Sparkles, TrendingUp, Package } from 'lucide-react'
import type { SiteConfig } from '@/types'

interface CalculatorFormProps {
  config: SiteConfig
}

const projectTypes = [
  { id: 'landing', name: 'Landing Page', basePrice: 12000, icon: Package },
  { id: 'corporate', name: 'Kurumsal Site', basePrice: 24400, icon: TrendingUp },
  { id: 'ecommerce', name: 'E-Ticaret', basePrice: 38000, icon: Sparkles },
  { id: 'custom', name: 'Özel Proje', basePrice: 45000, icon: Calculator },
]

const features = [
  { id: 'responsive', name: 'Responsive Tasarım', price: 0, included: true },
  { id: 'seo', name: 'Temel SEO', price: 0, included: true },
  { id: 'cms', name: 'İçerik Yönetim Sistemi', price: 5000, included: false },
  { id: 'blog', name: 'Blog Sistemi', price: 3000, included: false },
  { id: 'multilang', name: 'Çoklu Dil', price: 4000, included: false },
  { id: 'payment', name: 'Ödeme Entegrasyonu', price: 6000, included: false },
  { id: 'custom-design', name: 'Özel Tasarım', price: 8000, included: false },
  { id: 'animation', name: 'Animasyonlar', price: 3500, included: false },
  { id: 'api', name: 'API Entegrasyonu', price: 5000, included: false },
  { id: 'analytics', name: 'Gelişmiş Analitik', price: 2500, included: false },
]

export function CalculatorFormAdvanced({ config }: CalculatorFormProps) {
  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState('')
  const [pageCount, setPageCount] = useState(5)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['responsive', 'seo'])
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculatePrice = () => {
    const selectedProject = projectTypes.find(p => p.id === projectType)
    if (!selectedProject) return

    let price = selectedProject.basePrice
    price += (pageCount - 1) * 1500

    selectedFeatures.forEach(featureId => {
      const feature = features.find(f => f.id === featureId)
      if (feature && !feature.included) {
        price += feature.price
      }
    })

    setEstimatedPrice(price)
  }

  const handleContactSubmit = async () => {
    if (!contactInfo.name || !contactInfo.phone) return
    
    setIsSubmitting(true)
    try {
      const selectedProject = projectTypes.find(p => p.id === projectType)
      const selectedFeaturesData = selectedFeatures
        .filter(id => !features.find(f => f.id === id)?.included)
        .map(id => features.find(f => f.id === id)?.name)
        .filter(Boolean)

      await fetch('/api/calculator/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactInfo.name,
          phone: contactInfo.phone,
          projectType: selectedProject?.name,
          pageCount,
          features: selectedFeaturesData,
          estimatedPrice
        })
      })

      setStep(5)
    } catch (error) {
      console.error('Form gönderim hatası:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId)
    if (feature?.included) return

    setSelectedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center mb-8 mx-auto max-w-4xl">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`flex items-center ${s === 5 ? '' : 'flex-1'}`}>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              step >= s ? 'bg-black border-black text-white' : 'border-gray-300 text-gray-400'
            }`}>
              {step > s ? <Check className="h-5 w-5" /> : s}
            </div>
            {s < 5 && (
              <div className={`flex-1 h-1 mx-2 transition-all ${
                step > s ? 'bg-black' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Proje Tipi */}
      {step === 1 && (
        <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Proje Tipini Seçin</h2>
            <p className="text-gray-600">Hangi tür bir web sitesi istiyorsunuz?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projectTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setProjectType(type.id)}
                  className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                    projectType === type.id
                      ? 'border-black bg-gray-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      projectType === type.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-1">{type.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {type.basePrice.toLocaleString('tr-TR')}₺'den başlayan fiyatlar
                      </p>
                    </div>
                  </div>
                  {projectType === type.id && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <Button
            onClick={() => setStep(2)}
            disabled={!projectType}
            size="lg"
            className="w-full"
          >
            Devam Et
          </Button>
        </div>
      )}

      {/* Step 2: Sayfa Sayısı */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Kaç Sayfa Gerekiyor?</h2>
            <p className="text-gray-600">Web sitenizde kaç sayfa olmasını istiyorsunuz?</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-white p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-black text-white mb-4">
                <span className="text-4xl font-bold">{pageCount}</span>
              </div>
              <p className="text-lg text-gray-600">Sayfa</p>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={pageCount}
              onChange={(e) => setPageCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
            />
            
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1</span>
              <span>25</span>
              <span>50</span>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                💡 <strong>İpucu:</strong> Ortalama bir kurumsal site 5-10 sayfa arasındadır.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setStep(1)} variant="outline" size="lg" className="w-full">
              Geri
            </Button>
            <Button onClick={() => setStep(3)} size="lg" className="w-full">
              Devam Et
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Özellikler */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Özellikler Seçin</h2>
            <p className="text-gray-600">İhtiyacınız olan özellikleri işaretleyin</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => toggleFeature(feature.id)}
                disabled={feature.included}
                className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                  selectedFeatures.includes(feature.id)
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${feature.included ? 'opacity-75' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                    selectedFeatures.includes(feature.id)
                      ? 'bg-black border-black'
                      : 'border-gray-300'
                  }`}>
                    {selectedFeatures.includes(feature.id) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{feature.name}</h4>
                    <p className="text-sm text-gray-600">
                      {feature.included ? (
                        <span className="text-green-600 font-medium">Dahil</span>
                      ) : (
                        `+${feature.price.toLocaleString('tr-TR')}₺`
                      )}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setStep(2)} variant="outline" size="lg" className="w-full">
              Geri
            </Button>
            <Button onClick={() => { calculatePrice(); setStep(4); }} size="lg" className="w-full">
              Devam Et
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: İletişim Bilgileri */}
      {step === 4 && (
        <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">İletişim Bilgileriniz</h2>
            <p className="text-gray-600">Size ulaşabilmemiz için bilgilerinizi paylaşın</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-white p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  id="name"
                  value={contactInfo.name}
                  onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none transition-colors"
                  placeholder="0555 555 55 55"
                  required
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-700">
                🔒 Bilgileriniz güvende. Sadece size fiyat teklifi sunmak için kullanılacaktır.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={() => setStep(3)} variant="outline" size="lg" className="w-full">
              Geri
            </Button>
            <Button 
              onClick={handleContactSubmit} 
              disabled={!contactInfo.name || !contactInfo.phone || isSubmitting}
              size="lg" 
              className="w-full"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Devam Et'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 5: Sonuç */}
      {step === 5 && estimatedPrice > 0 && (
        <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Tahmini Fiyat</h2>
            <p className="text-gray-600">Projeniz için hesaplanan maliyet</p>
          </div>

          <div className="rounded-2xl border-2 border-black bg-gradient-to-br from-gray-50 to-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black text-white mb-6">
              <Calculator className="h-10 w-10" />
            </div>
            
            <p className="text-6xl font-bold text-black mb-2">
              {estimatedPrice.toLocaleString('tr-TR')}₺
            </p>
            <p className="text-gray-600 mb-8">Tahmini Maliyet</p>

            <div className="bg-white rounded-xl p-6 mb-6 text-left">
              <h3 className="font-semibold text-black mb-4">Seçimleriniz:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{projectTypes.find(p => p.id === projectType)?.name}</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{pageCount} Sayfa</span>
                </li>
                {selectedFeatures.filter(id => !features.find(f => f.id === id)?.included).map(featureId => {
                  const feature = features.find(f => f.id === featureId)
                  return feature ? (
                    <li key={featureId} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature.name}</span>
                    </li>
                  ) : null
                })}
              </ul>
            </div>

            <p className="text-sm text-gray-600 mb-6">
              ⚠️ Bu fiyat tahminidir. Kesin fiyat için lütfen bizimle iletişime geçin.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/teklif-al" className="flex-1">
                <Button size="lg" className="w-full">
                  Teklif Al
                </Button>
              </a>
              <a href={config.contact.whatsapp} target="_blank" className="flex-1">
                <Button size="lg" className="w-full bg-[#25D366] hover:bg-[#20BA5A]">
                  WhatsApp
                </Button>
              </a>
              <a href={`tel:${config.contact.phoneInternational || config.contact.phone.replace(/\s+/g, '')}`} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  {config.contact.phone}
                </Button>
              </a>
            </div>
          </div>

          <Button onClick={() => { setStep(1); setEstimatedPrice(0); setContactInfo({ name: '', phone: '' }); }} variant="outline" size="lg" className="w-full">
            Yeniden Hesapla
          </Button>
        </div>
      )}
    </div>
  )
}
