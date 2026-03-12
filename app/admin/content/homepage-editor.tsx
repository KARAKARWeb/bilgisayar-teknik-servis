'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { TiptapEditor } from '@/components/ui/tiptap-editor'

interface HomepageEditorProps {
  homepageData: any
  pageSettings: any
}

export function HomepageEditor({ homepageData, pageSettings }: HomepageEditorProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // Hero Section
  const [heroTitle, setHeroTitle] = useState(homepageData?.hero?.title ?? '')
  const [heroSubtitle, setHeroSubtitle] = useState(homepageData?.hero?.subtitle ?? '')
  const [heroCities, setHeroCities] = useState(homepageData?.hero?.cities ?? [
    { name: 'İstanbul', enabled: true },
    { name: 'Kocaeli', enabled: true },
    { name: 'Sakarya', enabled: true },
    { name: 'Düzce', enabled: true },
    { name: 'Yalova', enabled: true }
  ])
  const [trustBadges, setTrustBadges] = useState(homepageData?.hero?.trustBadges ?? [])
  
  // Devices Section
  const [devicesTitle, setDevicesTitle] = useState(homepageData?.devices?.title ?? '')
  const [devicesSubtitle, setDevicesSubtitle] = useState(homepageData?.devices?.subtitle ?? '')
  const [devicesItems, setDevicesItems] = useState(homepageData?.devices?.items ?? [])
  
  // Services Section
  const [servicesTitle, setServicesTitle] = useState(homepageData?.services?.title ?? '')
  const [servicesSubtitle, setServicesSubtitle] = useState(homepageData?.services?.subtitle ?? '')
  const [servicesDescription, setServicesDescription] = useState(homepageData?.services?.description ?? '')
  const [servicesKeywords, setServicesKeywords] = useState(
    Array.isArray(homepageData?.services?.keywords) 
      ? homepageData.services.keywords.join(', ') 
      : ''
  )
  
  // Process Section
  const [processTitle, setProcessTitle] = useState(homepageData?.process?.title ?? '')
  const [processSubtitle, setProcessSubtitle] = useState(homepageData?.process?.subtitle ?? '')
  const [processDescription, setProcessDescription] = useState(homepageData?.process?.description ?? '')
  const [processSteps, setProcessSteps] = useState(homepageData?.process?.steps ?? [])
  
  // Features Section
  const [featuresTitle, setFeaturesTitle] = useState(homepageData?.features?.title ?? '')
  const [featuresSubtitle, setFeaturesSubtitle] = useState(homepageData?.features?.subtitle ?? '')
  const [featuresDescription, setFeaturesDescription] = useState(homepageData?.features?.description ?? '')
  const [featuresItems, setFeaturesItems] = useState(homepageData?.features?.items ?? [])
  
  // Pricing Section
  const [pricingTitle, setPricingTitle] = useState(homepageData?.pricing?.title ?? '')
  const [pricingSubtitle, setPricingSubtitle] = useState(homepageData?.pricing?.subtitle ?? '')
  const [pricingDescription, setPricingDescription] = useState(homepageData?.pricing?.description ?? '')
  
  // Technologies Section
  const [technologiesTitle, setTechnologiesTitle] = useState(homepageData?.technologies?.title ?? '')
  const [technologiesSubtitle, setTechnologiesSubtitle] = useState(homepageData?.technologies?.subtitle ?? '')
  const [technologiesDescription, setTechnologiesDescription] = useState(homepageData?.technologies?.description ?? '')
  
  // Reviews Section
  const [reviewsTitle, setReviewsTitle] = useState(homepageData?.reviews?.title ?? '')
  const [reviewsSubtitle, setReviewsSubtitle] = useState(homepageData?.reviews?.subtitle ?? '')
  
  // Regions Section
  const [regionsTitle, setRegionsTitle] = useState(homepageData?.regions?.title ?? '')
  const [regionsSubtitle, setRegionsSubtitle] = useState(homepageData?.regions?.subtitle ?? '')
  const [regionsDescription, setRegionsDescription] = useState(homepageData?.regions?.description ?? '')
  
  // FAQ Section
  const [faqTitle, setFaqTitle] = useState(homepageData?.faq?.title ?? '')
  const [faqSubtitle, setFaqSubtitle] = useState(homepageData?.faq?.subtitle ?? '')
  
  // CTA Section
  const [ctaTitle, setCtaTitle] = useState(homepageData?.cta?.title ?? '')
  const [ctaDescription, setCtaDescription] = useState(homepageData?.cta?.description ?? '')
  const [ctaPrimaryButtonText, setCtaPrimaryButtonText] = useState(homepageData?.cta?.primaryButtonText ?? '')
  
  // SEO Content
  const [seoContent1, setSeoContent1] = useState(homepageData?.seoContent1 ?? '')
  const [seoContent2, setSeoContent2] = useState(homepageData?.seoContent2 ?? '')
  const [seoTitle, setSeoTitle] = useState(homepageData?.seo?.title ?? '')
  const [seoDescription, setSeoDescription] = useState(homepageData?.seo?.description ?? '')
  const [seoKeywords, setSeoKeywords] = useState(
    Array.isArray(homepageData?.seo?.keywords) 
      ? homepageData.seo.keywords.join(', ') 
      : ''
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          homepage: {
            ...homepageData,
            hero: {
              ...homepageData?.hero,
              title: heroTitle,
              subtitle: heroSubtitle,
              cities: heroCities,
              trustBadges: trustBadges,
            },
            services: {
              title: servicesTitle,
              subtitle: servicesSubtitle,
              description: servicesDescription,
              keywords: servicesKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
            },
            devices: {
              title: devicesTitle,
              subtitle: devicesSubtitle,
              items: devicesItems,
            },
            process: {
              ...homepageData?.process,
              title: processTitle,
              subtitle: processSubtitle,
              description: processDescription,
              steps: processSteps,
            },
            features: {
              ...homepageData?.features,
              title: featuresTitle,
              subtitle: featuresSubtitle,
              description: featuresDescription,
              items: featuresItems,
            },
            pricing: {
              title: pricingTitle,
              subtitle: pricingSubtitle,
              description: pricingDescription,
            },
            technologies: {
              title: technologiesTitle,
              subtitle: technologiesSubtitle,
              description: technologiesDescription,
            },
            reviews: {
              title: reviewsTitle,
              subtitle: reviewsSubtitle,
            },
            regions: {
              title: regionsTitle,
              subtitle: regionsSubtitle,
              description: regionsDescription,
            },
            faq: {
              title: faqTitle,
              subtitle: faqSubtitle,
            },
            cta: {
              title: ctaTitle,
              description: ctaDescription,
              primaryButtonText: ctaPrimaryButtonText,
            },
            seoContent1,
            seoContent2,
            seo: {
              title: seoTitle,
              description: seoDescription,
              keywords: seoKeywords.split(',').map((k: string) => k.trim()).filter(Boolean),
            },
          },
        }),
      })

      if (!response.ok) throw new Error('Kaydetme başarısız')

      toast.success('Ana sayfa başarıyla kaydedildi')
      router.refresh()
    } catch (error) {
      toast.error('Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. Hero Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">1. Hero Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              placeholder=""
              rows={3}
            />
          </div>
          <div className="space-y-4 mt-6">
            <label className="text-sm font-medium text-gray-900">Hizmet Verilen İller</label>
            <p className="text-xs text-gray-600">Hero bölümünün altında gösterilecek iller</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {heroCities.map((city: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">{city.name}</h3>
                    <Button
                      type="button"
                      variant={city.enabled ? "primary" : "outline"}
                      size="sm"
                      onClick={() => {
                        const newCities = [...heroCities]
                        newCities[index] = { ...city, enabled: !city.enabled }
                        setHeroCities(newCities)
                      }}
                    >
                      {city.enabled ? 'Aktif' : 'Pasif'}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">İl Adı</label>
                    <Input
                      value={city.name}
                      onChange={(e) => {
                        const newCities = [...heroCities]
                        newCities[index] = { ...city, name: e.target.value }
                        setHeroCities(newCities)
                      }}
                      placeholder="İl adı"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Güven Kartları</label>
                <p className="text-xs text-gray-600">Hero bölümünün altında gösterilecek güven kartları</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setTrustBadges([...trustBadges, { title: '', description: '', icon: 'map-pin' }])
                }}
              >
                + Kart Ekle
              </Button>
            </div>
            {trustBadges.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trustBadges.map((badge: any, index: number) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Kart {index + 1}</h3>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setTrustBadges(trustBadges.filter((_: any, i: number) => i !== index))
                        }}
                        className="text-red-600 hover:bg-red-50"
                      >
                        Sil
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Başlık</label>
                      <Input
                        value={badge.title}
                        onChange={(e) => {
                          const newBadges = [...trustBadges]
                          newBadges[index] = { ...badge, title: e.target.value }
                          setTrustBadges(newBadges)
                        }}
                        placeholder="Örn: Yerinde Destek"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">Açıklama</label>
                      <Textarea
                        value={badge.description}
                        onChange={(e) => {
                          const newBadges = [...trustBadges]
                          newBadges[index] = { ...badge, description: e.target.value }
                          setTrustBadges(newBadges)
                        }}
                        placeholder="Örn: Ofis veya evinizde yerinde teknik destek"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-900">İkon</label>
                      <select
                        value={badge.icon}
                        onChange={(e) => {
                          const newBadges = [...trustBadges]
                          newBadges[index] = { ...badge, icon: e.target.value }
                          setTrustBadges(newBadges)
                        }}
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      >
                        <option value="map-pin">📍 Konum (map-pin)</option>
                        <option value="monitor">💻 Monitör (monitor)</option>
                        <option value="clock">⏰ Saat (clock)</option>
                        <option value="users">👥 Kullanıcılar (users)</option>
                        <option value="briefcase">💼 Çanta (briefcase)</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. SEO İçerik 1 */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">2. SEO İçerik 1</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">SEO İçerik 1</label>
          <TiptapEditor
            content={seoContent1}
            onChange={setSeoContent1}
            placeholder=""
          />
        </div>
      </div>

      {/* 3. Services Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">3. Hizmetler Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={servicesTitle}
              onChange={(e) => setServicesTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={servicesSubtitle}
              onChange={(e) => setServicesSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-2 mt-6">
            <label className="text-sm font-medium text-gray-900">SEO Anahtar Kelimeler</label>
            <p className="text-xs text-gray-600">Virgülle ayırarak girin (Örn: Bilgisayar Tamiri, Laptop Onarımı, SSD Yükseltme)</p>
            <Textarea
              value={servicesKeywords}
              onChange={(e) => setServicesKeywords(e.target.value)}
              placeholder="Bilgisayar Tamiri, Laptop Onarımı, Anakart Tamiri, SSD Yükseltme..."
              rows={3}
            />
            {servicesKeywords && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Önizleme:</p>
                <div className="flex flex-wrap gap-2">
                  {servicesKeywords.split(',').map((k: string) => k.trim()).filter(Boolean).map((keyword: string, index: number) => (
                    <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={servicesDescription}
              onChange={(e) => setServicesDescription(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 4. Devices Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">4. Hangi Cihazlara Hizmet Veriyoruz?</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={devicesTitle}
              onChange={(e) => setDevicesTitle(e.target.value)}
              placeholder="Hangi Cihazlara Hizmet Veriyoruz?"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={devicesSubtitle}
              onChange={(e) => setDevicesSubtitle(e.target.value)}
              placeholder="Tüm marka ve modellerde profesyonel teknik destek"
              rows={2}
            />
          </div>
          
          <div className="space-y-4 mt-6">
            <label className="text-sm font-medium text-gray-900">Cihazlar</label>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {devicesItems.map((device: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Cihaz {index + 1}</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDevicesItems(devicesItems.filter((_: any, i: number) => i !== index))}
                      className="text-red-600 hover:text-red-700"
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Cihaz Adı</label>
                    <Input
                      value={device.name}
                      onChange={(e) => {
                        const newDevices = [...devicesItems]
                        newDevices[index] = { ...device, name: e.target.value }
                        setDevicesItems(newDevices)
                      }}
                      placeholder="Laptop"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Açıklama</label>
                    <Textarea
                      value={device.description}
                      onChange={(e) => {
                        const newDevices = [...devicesItems]
                        newDevices[index] = { ...device, description: e.target.value }
                        setDevicesItems(newDevices)
                      }}
                      placeholder="Tüm marka dizüstü bilgisayarlar"
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">İkon</label>
                    <select
                      value={device.icon}
                      onChange={(e) => {
                        const newDevices = [...devicesItems]
                        newDevices[index] = { ...device, icon: e.target.value }
                        setDevicesItems(newDevices)
                      }}
                      className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
                    >
                      <option value="laptop">Laptop</option>
                      <option value="desktop">Masaüstü</option>
                      <option value="all-in-one">All in One</option>
                      <option value="apple">Apple</option>
                      <option value="printer">Yazıcı</option>
                      <option value="modem">Modem</option>
                      <option value="switch">Switch</option>
                      <option value="nas">NAS</option>
                      <option value="server">Sunucu</option>
                      <option value="workstation">Workstation</option>
                      <option value="monitor">Monitör</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDevicesItems([...devicesItems, { name: '', description: '', icon: 'laptop' }])}
            >
              + Yeni Cihaz Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* 5. Regions Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">5. Hizmet Bölgeleri</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={regionsTitle}
              onChange={(e) => setRegionsTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={regionsSubtitle}
              onChange={(e) => setRegionsSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={regionsDescription}
              onChange={(e) => setRegionsDescription(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 6. Features Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">6. Özellikler Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={featuresTitle}
              onChange={(e) => setFeaturesTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={featuresSubtitle}
              onChange={(e) => setFeaturesSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={featuresDescription}
              onChange={(e) => setFeaturesDescription(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-4 mt-6">
            <label className="text-sm font-medium text-gray-900">Özellikler</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuresItems.map((item: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Özellik {index + 1}</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFeaturesItems(featuresItems.filter((_: any, i: number) => i !== index))}
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Başlık</label>
                    <Input
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...featuresItems]
                        newItems[index] = { ...item, title: e.target.value }
                        setFeaturesItems(newItems)
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Açıklama</label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...featuresItems]
                        newItems[index] = { ...item, description: e.target.value }
                        setFeaturesItems(newItems)
                      }}
                      placeholder=""
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFeaturesItems([...featuresItems, { title: '', description: '' }])}
            >
              + Yeni Özellik Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* 7. Process Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">7. Süreç Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={processTitle}
              onChange={(e) => setProcessTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={processSubtitle}
              onChange={(e) => setProcessSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={processDescription}
              onChange={(e) => setProcessDescription(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-4 mt-6">
            <label className="text-sm font-medium text-gray-900">Adımlar</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {processSteps.map((step: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Adım {index + 1}</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setProcessSteps(processSteps.filter((_: any, i: number) => i !== index))}
                    >
                      Sil
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Başlık</label>
                    <Input
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...processSteps]
                        newSteps[index] = { ...step, title: e.target.value }
                        setProcessSteps(newSteps)
                      }}
                      placeholder=""
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Açıklama</label>
                    <Textarea
                      value={step.description}
                      onChange={(e) => {
                        const newSteps = [...processSteps]
                        newSteps[index] = { ...step, description: e.target.value }
                        setProcessSteps(newSteps)
                      }}
                      placeholder=""
                      rows={2}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setProcessSteps([...processSteps, { title: '', description: '' }])}
            >
              + Yeni Adım Ekle
            </Button>
          </div>
        </div>
      </div>

      {/* 8. Brands Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">8. Markalar Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={technologiesTitle}
              onChange={(e) => setTechnologiesTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={technologiesSubtitle}
              onChange={(e) => setTechnologiesSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={technologiesDescription}
              onChange={(e) => setTechnologiesDescription(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 9. FAQ Section */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">9. SSS Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={faqTitle}
              onChange={(e) => setFaqTitle(e.target.value)}
              placeholder=""
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Alt Başlık</label>
            <Textarea
              value={faqSubtitle}
              onChange={(e) => setFaqSubtitle(e.target.value)}
              placeholder=""
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* 10. SEO İçerik 2 */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">10. SEO İçerik 2</h2>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">SEO İçerik 2</label>
          <TiptapEditor
            content={seoContent2}
            onChange={setSeoContent2}
            placeholder=""
          />
        </div>
      </div>

      {/* 11. CTA Bölümü */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">11. CTA (Harekete Geçirici) Bölümü</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Başlık</label>
            <Input
              value={ctaTitle}
              onChange={(e) => setCtaTitle(e.target.value)}
              placeholder="Projenizi Hayata Geçirelim"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Açıklama</label>
            <Textarea
              value={ctaDescription}
              onChange={(e) => setCtaDescription(e.target.value)}
              placeholder="Ücretsiz danışmanlık için hemen iletişime geçin..."
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">Birincil Buton Metni</label>
            <Input
              value={ctaPrimaryButtonText}
              onChange={(e) => setCtaPrimaryButtonText(e.target.value)}
              placeholder="Ücretsiz Teklif Al"
            />
          </div>
        </div>
      </div>

      {/* SEO Metadata */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold mb-4">SEO Metadata</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Başlık
              <span className="ml-2 text-xs text-gray-500">
                ({seoTitle.length}/60 karakter)
              </span>
            </label>
            <Input
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder=""
              maxLength={60}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Açıklama
              <span className="ml-2 text-xs text-gray-500">
                ({seoDescription.length}/160 karakter)
              </span>
            </label>
            <Textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder=""
              maxLength={160}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              SEO Anahtar Kelimeler
              <span className="ml-2 text-xs text-gray-500">(virgülle ayırın)</span>
            </label>
            <Input
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder=""
            />
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50">
        <Button type="submit" disabled={loading} className="shadow-lg">
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}
