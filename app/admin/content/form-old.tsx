'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export function ContentManagementForm({ pages, pageSettings }: { pages: any; pageSettings?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    const updatedPages = {
      homepage: {
        hero: {
          title: formData.get('homepage_hero_title'),
          subtitle: formData.get('homepage_hero_subtitle'),
          cta: {
            primary: formData.get('homepage_hero_cta_primary'),
            secondary: formData.get('homepage_hero_cta_secondary'),
          }
        },
        services: {
          title: formData.get('homepage_services_title'),
          subtitle: formData.get('homepage_services_subtitle'),
        },
        stats: {
          title: formData.get('homepage_stats_title'),
          subtitle: formData.get('homepage_stats_subtitle'),
        },
        pricing: {
          title: formData.get('homepage_pricing_title'),
          subtitle: formData.get('homepage_pricing_subtitle'),
        },
        reviews: {
          title: formData.get('homepage_reviews_title'),
          subtitle: formData.get('homepage_reviews_subtitle'),
        },
        regions: {
          title: formData.get('homepage_regions_title'),
          subtitle: formData.get('homepage_regions_subtitle'),
        },
        faq: {
          title: formData.get('homepage_faq_title'),
          subtitle: formData.get('homepage_faq_subtitle'),
        },
        seoContent1: formData.get('homepage_seoContent1'),
        seoContent2: formData.get('homepage_seoContent2'),
      },
      about: {
        hero: {
          title: formData.get('about_hero_title'),
          subtitle: formData.get('about_hero_subtitle'),
        },
        content: {
          description: formData.get('about_description'),
          mission: formData.get('about_mission'),
          vision: formData.get('about_vision'),
        }
      },
      privacy: {
        hero: {
          title: formData.get('privacy_hero_title'),
          subtitle: formData.get('privacy_hero_subtitle'),
        },
        content: formData.get('privacy_content'),
      },
      cookies: {
        hero: {
          title: formData.get('cookies_hero_title'),
          subtitle: formData.get('cookies_hero_subtitle'),
        },
        content: formData.get('cookies_content'),
      }
    }

    try {
      const response = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPages),
      })

      if (response.ok) {
        toast.success('İçerik başarıyla güncellendi!')
        router.refresh()
      } else {
        toast.error('İçerik güncellenirken bir hata oluştu!')
      }
    } catch (error) {
      console.error(error)
      toast.error('Bir hata oluştu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Tabs defaultValue="homepage" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="homepage">Ana Sayfa</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
          <TabsTrigger value="cookies">Çerez</TabsTrigger>
          <TabsTrigger value="pages">Sayfa Ayarları</TabsTrigger>
        </TabsList>

        {/* Ana Sayfa */}
        <TabsContent value="homepage" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_hero_title" defaultValue={pages.homepage?.hero?.title} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_hero_subtitle" defaultValue={pages.homepage?.hero?.subtitle} rows={2} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Birincil CTA</label>
                  <Input name="homepage_hero_cta_primary" defaultValue={pages.homepage?.hero?.cta?.primary} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">İkincil CTA</label>
                  <Input name="homepage_hero_cta_secondary" defaultValue={pages.homepage?.hero?.cta?.secondary} />
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hizmetler Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_services_title" defaultValue={pages.homepage?.services?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_services_subtitle" defaultValue={pages.homepage?.services?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">İstatistikler Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_stats_title" defaultValue={pages.homepage?.stats?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_stats_subtitle" defaultValue={pages.homepage?.stats?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Fiyatlar Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_pricing_title" defaultValue={pages.homepage?.pricing?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_pricing_subtitle" defaultValue={pages.homepage?.pricing?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Yorumlar Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_reviews_title" defaultValue={pages.homepage?.reviews?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_reviews_subtitle" defaultValue={pages.homepage?.reviews?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Bölgeler Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_regions_title" defaultValue={pages.homepage?.regions?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_regions_subtitle" defaultValue={pages.homepage?.regions?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SSS Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_faq_title" defaultValue={pages.homepage?.faq?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_faq_subtitle" defaultValue={pages.homepage?.faq?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO İçerik Alanı 1 (Hero Sonrası)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">HTML İçerik</label>
                <Textarea 
                  name="homepage_seoContent1" 
                  defaultValue={pages.homepage?.seoContent1} 
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">HTML formatında içerik girin (Hero section sonrası ilk içerik alanı)</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO İçerik Alanı 2 (Bölgeler Sonrası)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">HTML İçerik</label>
                <Textarea 
                  name="homepage_seoContent2" 
                  defaultValue={pages.homepage?.seoContent2} 
                  rows={15}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">HTML formatında içerik girin (Bölgeler section sonrası içerik alanı)</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Hakkımızda */}
        <TabsContent value="about" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="about_hero_title" defaultValue={pages.about?.hero?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="about_hero_subtitle" defaultValue={pages.about?.hero?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">İçerik</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama</label>
                <Textarea name="about_description" defaultValue={pages.about?.content?.description} rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Misyon</label>
                <Textarea name="about_mission" defaultValue={pages.about?.content?.mission} rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Vizyon</label>
                <Textarea name="about_vision" defaultValue={pages.about?.content?.vision} rows={3} />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Gizlilik Politikası */}
        <TabsContent value="privacy" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="privacy_hero_title" defaultValue={pages.privacy?.hero?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="privacy_hero_subtitle" defaultValue={pages.privacy?.hero?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">İçerik (HTML)</h3>
            <Textarea 
              name="privacy_content" 
              defaultValue={pages.privacy?.content} 
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">HTML formatında içerik girin</p>
          </div>
        </TabsContent>

        {/* Çerez Politikası */}
        <TabsContent value="cookies" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="cookies_hero_title" defaultValue={pages.cookies?.hero?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="cookies_hero_subtitle" defaultValue={pages.cookies?.hero?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">İçerik (HTML)</h3>
            <Textarea 
              name="cookies_content" 
              defaultValue={pages.cookies?.content} 
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">HTML formatında içerik girin</p>
          </div>
        </TabsContent>

        {/* Sayfa Ayarları */}
        <TabsContent value="pages" className="space-y-6">
          {pageSettings && Object.entries(pageSettings).map(([key, value]: [string, any]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4 capitalize">{key}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                  <Input 
                    name={`page_${key}_title`}
                    defaultValue={value?.title ?? ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Alt Başlık / Açıklama</label>
                  <Textarea 
                    name={`page_${key}_subtitle`}
                    defaultValue={value?.subtitle ?? ''}
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 mt-8">
        <Button type="submit" disabled={loading}>
          {loading ? 'Güncelleniyor...' : 'Tümünü Güncelle'}
        </Button>
      </div>
    </form>
  )
}
