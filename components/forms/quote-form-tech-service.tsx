'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Check, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

interface QuoteFormTechServiceProps {
  services: Array<{ id: string; name: string }>
}

const deviceTypes = [
  { id: 'laptop', name: 'Laptop / Dizüstü', description: 'Tüm marka dizüstü bilgisayarlar' },
  { id: 'desktop', name: 'Masaüstü / PC', description: 'Masaüstü bilgisayar sistemleri' },
  { id: 'macbook', name: 'MacBook / iMac', description: 'Apple bilgisayar ve dizüstüler' },
  { id: 'printer', name: 'Yazıcı', description: 'Lazer ve mürekkepli yazıcılar' },
  { id: 'modem', name: 'Modem / Router', description: 'İnternet modem ve router cihazları' },
  { id: 'switch', name: 'Switch / Ağ Cihazı', description: 'Ağ anahtarlama ve yönlendirme' },
  { id: 'nas', name: 'NAS / Yedekleme', description: 'Ağ depolama ve yedekleme sistemleri' },
  { id: 'server', name: 'Sunucu / Server', description: 'Kurumsal sunucu sistemleri' },
]

const issueTypes = [
  { id: 'not-starting', name: 'Açılmıyor', description: 'Cihaz hiç açılmıyor veya başlamıyor' },
  { id: 'slow', name: 'Yavaş Çalışıyor', description: 'Performans düşüklüğü, donma' },
  { id: 'overheating', name: 'Aşırı Isınma', description: 'Cihaz çok ısınıyor, fan sesi' },
  { id: 'blue-screen', name: 'Mavi Ekran / Hata', description: 'Sistem hataları, çökmeler' },
  { id: 'noise', name: 'Gürültü / Fan Sesi', description: 'Anormal ses, gürültü' },
  { id: 'charging', name: 'Şarj Olmuyor', description: 'Batarya veya şarj sorunu' },
  { id: 'screen', name: 'Ekran Sorunu', description: 'Görüntü yok, çizgiler, kırık ekran' },
  { id: 'data-recovery', name: 'Veri Kurtarma', description: 'Kayıp veya silinmiş veri kurtarma' },
  { id: 'maintenance', name: 'Genel Bakım', description: 'Temizlik, bakım, optimizasyon' },
  { id: 'format', name: 'Format / Kurulum', description: 'İşletim sistemi kurulumu' },
  { id: 'network', name: 'Ağ Sorunu', description: 'İnternet, ağ bağlantı sorunları' },
  { id: 'other', name: 'Diğer', description: 'Yukarıdakilerden farklı bir sorun' },
]

const urgencyLevels = [
  { id: 'urgent', name: 'Acil (Aynı Gün)', description: 'En kısa sürede müdahale gerekli' },
  { id: 'normal', name: 'Normal (2-3 Gün)', description: 'Standart servis süresi' },
  { id: 'flexible', name: 'Esnek (1 Hafta)', description: 'Acil değil, planlı servis' },
]

const serviceLocations = [
  { id: 'onsite', name: 'Yerinde Servis', description: 'Evinizde veya ofisinizde' },
  { id: 'workshop', name: 'Servise Getireceğim', description: 'Cihazı servise getireceğim' },
  { id: 'remote', name: 'Uzaktan Destek', description: 'Online uzaktan bağlantı ile' },
]

const cities = [
  { id: 'istanbul', name: 'İstanbul' },
  { id: 'kocaeli', name: 'Kocaeli' },
  { id: 'sakarya', name: 'Sakarya' },
  { id: 'duzce', name: 'Düzce' },
  { id: 'yalova', name: 'Yalova' },
]

export function QuoteFormTechService({ services }: QuoteFormTechServiceProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    deviceType: '',
    issueType: '',
    urgency: '',
    serviceLocation: '',
    city: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setStep(5)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.deviceType !== ''
      case 2:
        return formData.issueType !== ''
      case 3:
        return formData.urgency !== '' && formData.serviceLocation !== '' && formData.city !== ''
      case 4:
        return formData.name !== '' && formData.email !== '' && formData.phone !== ''
      default:
        return false
    }
  }

  return (
    <div className="space-y-8">
      {!success && (
        <>
          {/* Progress Bar */}
          <div className="flex items-center mb-8 mx-auto max-w-4xl">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex items-center ${s === 4 ? '' : 'flex-1'}`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                  step >= s ? 'bg-black border-black text-white' : 'border-gray-300 text-gray-400'
                }`}>
                  {step > s ? <Check className="h-5 w-5" /> : s}
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 transition-all ${
                    step > s ? 'bg-black' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Cihaz Tipi */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Cihaz Tipiniz Nedir?</h2>
                <p className="text-gray-600">Hangi cihaz için teknik servis talep ediyorsunuz?</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {deviceTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateField('deviceType', type.id)}
                    className={`relative p-6 rounded-xl border-2 transition-all text-left ${
                      formData.deviceType === type.id
                        ? 'border-black bg-gray-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-black mb-1">{type.name}</h3>
                    <p className="text-sm text-gray-600">{type.description}</p>
                    {formData.deviceType === type.id && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-black text-white rounded-full p-1">
                          <Check className="h-4 w-4" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!canProceed()}
                size="lg"
                className="w-full"
              >
                Devam Et <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Arıza Türü */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Arıza veya Hizmet Türü</h2>
                <p className="text-gray-600">Cihazınızda ne gibi bir sorun var?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {issueTypes.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => updateField('issueType', issue.id)}
                    className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                      formData.issueType === issue.id
                        ? 'border-black bg-gray-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="text-base font-semibold text-black mb-1">{issue.name}</h3>
                    <p className="text-sm text-gray-600">{issue.description}</p>
                    {formData.issueType === issue.id && (
                      <div className="absolute top-3 right-3">
                        <div className="bg-black text-white rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Geri
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canProceed()} size="lg" className="w-full">
                  Devam Et <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Aciliyet ve Lokasyon */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">Servis Tercihleri</h2>
                <p className="text-gray-600">Aciliyet durumu ve servis lokasyonunu belirleyin</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Aciliyet Durumu</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {urgencyLevels.map((urgency) => (
                      <button
                        key={urgency.id}
                        onClick={() => updateField('urgency', urgency.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.urgency === urgency.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h3 className="font-semibold text-black text-sm mb-1">{urgency.name}</h3>
                        <p className="text-xs text-gray-600">{urgency.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Servis Lokasyonu</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {serviceLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => updateField('serviceLocation', location.id)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          formData.serviceLocation === location.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <h3 className="font-semibold text-black text-sm mb-1">{location.name}</h3>
                        <p className="text-xs text-gray-600">{location.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-black mb-3">Şehir</label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {cities.map((city) => (
                      <button
                        key={city.id}
                        onClick={() => updateField('city', city.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-center ${
                          formData.city === city.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="font-medium text-black text-sm">{city.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Geri
                </Button>
                <Button onClick={() => setStep(4)} disabled={!canProceed()} size="lg" className="w-full">
                  Devam Et <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: İletişim Bilgileri */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500 mx-auto max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-black mb-2">İletişim Bilgileriniz</h2>
                <p className="text-gray-600">Size nasıl ulaşabiliriz?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                    Ad Soyad *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Adınız ve soyadınız"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    E-posta *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                    Telefon *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="05xxxxxxxxx"
                    className="w-full"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    Ek Açıklama (Opsiyonel)
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    placeholder="Sorun hakkında detaylı bilgi verebilirsiniz..."
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-black mb-2">Talep Özeti:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li><strong>Cihaz:</strong> {deviceTypes.find(d => d.id === formData.deviceType)?.name}</li>
                  <li><strong>Sorun:</strong> {issueTypes.find(i => i.id === formData.issueType)?.name}</li>
                  <li><strong>Aciliyet:</strong> {urgencyLevels.find(u => u.id === formData.urgency)?.name}</li>
                  <li><strong>Lokasyon:</strong> {serviceLocations.find(l => l.id === formData.serviceLocation)?.name}</li>
                  <li><strong>Şehir:</strong> {cities.find(c => c.id === formData.city)?.name}</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(3)} variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="mr-2 h-5 w-5" /> Geri
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!canProceed() || isSubmitting} 
                  size="lg" 
                  className="w-full"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Teklif Talep Et'}
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {/* Step 5: Başarılı */}
      {success && (
        <div className="text-center py-12 animate-in fade-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle className="h-12 w-12" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Talebiniz Alındı!</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            Servis talebiniz başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğiz.
          </p>
          <Button onClick={() => window.location.href = '/'} size="lg">
            Ana Sayfaya Dön
          </Button>
        </div>
      )}
    </div>
  )
}
