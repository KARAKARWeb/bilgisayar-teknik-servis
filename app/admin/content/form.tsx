'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { TiptapEditor } from '@/components/ui/tiptap-editor'

export function ContentManagementForm({ pages, pageSettings, initialPage }: { pages: any; pageSettings?: any; initialPage?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>(initialPage ?? 'homepage')
  const [seoContent1, setSeoContent1] = useState(pages.homepage?.seoContent1 ?? '')
  const [seoContent2, setSeoContent2] = useState(pages.homepage?.seoContent2 ?? '')
  const [privacyContent, setPrivacyContent] = useState(pages.privacy?.content ?? '')
  const [cookiesContent, setCookiesContent] = useState(pages.cookies?.content ?? '')
  
  // Karakter sayacı state'leri
  const [charCounts, setCharCounts] = useState<Record<string, number>>({})
  
  useEffect(() => {
    // initialPage varsa onu kullan, yoksa localStorage'dan oku
    if (initialPage) {
      setActiveTab(initialPage)
    } else {
      const savedTab = localStorage.getItem('admin-content-active-tab')
      if (savedTab) {
        setActiveTab(savedTab)
      }
    }
    
    // Başlangıç değerlerini ayarla
    const initialCounts: Record<string, number> = {
      'homepage_seo_title': pages.homepage?.seo?.title?.length || 0,
      'homepage_seo_description': pages.homepage?.seo?.description?.length || 0,
      'about_seo_title': pages.about?.seo?.title?.length || 0,
      'about_seo_description': pages.about?.seo?.description?.length || 0,
      'privacy_seo_title': pages.privacy?.seo?.title?.length || 0,
      'privacy_seo_description': pages.privacy?.seo?.description?.length || 0,
      'cookies_seo_title': pages.cookies?.seo?.title?.length || 0,
      'cookies_seo_description': pages.cookies?.seo?.description?.length || 0,
      'contact_seo_title': pages.contact?.seo?.title?.length || 0,
      'contact_seo_description': pages.contact?.seo?.description?.length || 0,
    }
    setCharCounts(initialCounts)
  }, [pages])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    
    // Sayfa Ayarlarını topla
    const updatedPageSettings: any = {}
    if (pageSettings) {
      Object.keys(pageSettings).forEach(key => {
        updatedPageSettings[key] = {
          title: formData.get(`page_${key}_title`) ?? pageSettings[key]?.title ?? '',
          subtitle: formData.get(`page_${key}_subtitle`) ?? pageSettings[key]?.subtitle ?? ''
        }
      })
    }

    const updatedPages = {
      homepage: {
        hero: {
          title: formData.get('homepage_hero_title') ?? pages.homepage?.hero?.title,
          subtitle: formData.get('homepage_hero_subtitle') ?? pages.homepage?.hero?.subtitle,
          whatsappText: formData.get('homepage_hero_whatsapp') ?? pages.homepage?.hero?.whatsappText,
          phoneText: formData.get('homepage_hero_phone') ?? pages.homepage?.hero?.phoneText,
          cta: {
            primary: formData.get('homepage_hero_cta_primary') ?? pages.homepage?.hero?.cta?.primary,
            secondary: formData.get('homepage_hero_cta_secondary') ?? pages.homepage?.hero?.cta?.secondary,
          }
        },
        seoContent1: seoContent1 || pages.homepage?.seoContent1,
        services: {
          title: formData.get('homepage_services_title') ?? pages.homepage?.services?.title,
          subtitle: formData.get('homepage_services_subtitle') ?? pages.homepage?.services?.subtitle,
          description: formData.get('homepage_services_description') ?? pages.homepage?.services?.description,
        },
        process: {
          title: formData.get('homepage_process_title') ?? pages.homepage?.process?.title,
          subtitle: formData.get('homepage_process_subtitle') ?? pages.homepage?.process?.subtitle,
          description: formData.get('homepage_process_description') ?? pages.homepage?.process?.description,
          steps: [
            { title: formData.get('homepage_process_step1_title') ?? pages.homepage?.process?.steps?.[0]?.title, description: formData.get('homepage_process_step1_desc') ?? pages.homepage?.process?.steps?.[0]?.description },
            { title: formData.get('homepage_process_step2_title') ?? pages.homepage?.process?.steps?.[1]?.title, description: formData.get('homepage_process_step2_desc') ?? pages.homepage?.process?.steps?.[1]?.description },
            { title: formData.get('homepage_process_step3_title') ?? pages.homepage?.process?.steps?.[2]?.title, description: formData.get('homepage_process_step3_desc') ?? pages.homepage?.process?.steps?.[2]?.description },
            { title: formData.get('homepage_process_step4_title') ?? pages.homepage?.process?.steps?.[3]?.title, description: formData.get('homepage_process_step4_desc') ?? pages.homepage?.process?.steps?.[3]?.description },
          ]
        },
        features: {
          title: formData.get('homepage_features_title') ?? pages.homepage?.features?.title,
          subtitle: formData.get('homepage_features_subtitle') ?? pages.homepage?.features?.subtitle,
          description: formData.get('homepage_features_description') ?? pages.homepage?.features?.description,
          items: [
            { title: formData.get('homepage_feature1_title') ?? pages.homepage?.features?.items?.[0]?.title, description: formData.get('homepage_feature1_desc') ?? pages.homepage?.features?.items?.[0]?.description },
            { title: formData.get('homepage_feature2_title') ?? pages.homepage?.features?.items?.[1]?.title, description: formData.get('homepage_feature2_desc') ?? pages.homepage?.features?.items?.[1]?.description },
            { title: formData.get('homepage_feature3_title') ?? pages.homepage?.features?.items?.[2]?.title, description: formData.get('homepage_feature3_desc') ?? pages.homepage?.features?.items?.[2]?.description },
            { title: formData.get('homepage_feature4_title') ?? pages.homepage?.features?.items?.[3]?.title, description: formData.get('homepage_feature4_desc') ?? pages.homepage?.features?.items?.[3]?.description },
            { title: formData.get('homepage_feature5_title') ?? pages.homepage?.features?.items?.[4]?.title, description: formData.get('homepage_feature5_desc') ?? pages.homepage?.features?.items?.[4]?.description },
            { title: formData.get('homepage_feature6_title') ?? pages.homepage?.features?.items?.[5]?.title, description: formData.get('homepage_feature6_desc') ?? pages.homepage?.features?.items?.[5]?.description },
          ]
        },
        pricing: {
          title: formData.get('homepage_pricing_title') ?? pages.homepage?.pricing?.title,
          subtitle: formData.get('homepage_pricing_subtitle') ?? pages.homepage?.pricing?.subtitle,
          description: formData.get('homepage_pricing_description') ?? pages.homepage?.pricing?.description,
        },
        technologies: {
          title: formData.get('homepage_technologies_title') ?? pages.homepage?.technologies?.title,
          subtitle: formData.get('homepage_technologies_subtitle') ?? pages.homepage?.technologies?.subtitle,
          description: formData.get('homepage_technologies_description') ?? pages.homepage?.technologies?.description,
        },
        reviews: {
          title: formData.get('homepage_reviews_title') ?? pages.homepage?.reviews?.title,
          subtitle: formData.get('homepage_reviews_subtitle') ?? pages.homepage?.reviews?.subtitle,
        },
        regions: {
          title: formData.get('homepage_regions_title') ?? pages.homepage?.regions?.title,
          subtitle: formData.get('homepage_regions_subtitle') ?? pages.homepage?.regions?.subtitle,
          description: formData.get('homepage_regions_description') ?? pages.homepage?.regions?.description,
        },
        faq: {
          title: formData.get('homepage_faq_title') ?? pages.homepage?.faq?.title,
          subtitle: formData.get('homepage_faq_subtitle') ?? pages.homepage?.faq?.subtitle,
        },
        seoContent2: seoContent2 || pages.homepage?.seoContent2,
        seo: {
          title: formData.get('homepage_seo_title') ?? pages.homepage?.seo?.title,
          description: formData.get('homepage_seo_description') ?? pages.homepage?.seo?.description,
          keywords: formData.get('homepage_seo_keywords') ?? pages.homepage?.seo?.keywords,
        }
      },
      about: {
        hero: {
          title: formData.get('about_hero_title') ?? pages.about?.hero?.title,
          subtitle: formData.get('about_hero_subtitle') ?? pages.about?.hero?.subtitle,
        },
        content: {
          description: formData.get('about_description') ?? pages.about?.content?.description,
          mission: formData.get('about_mission') ?? pages.about?.content?.mission,
          vision: formData.get('about_vision') ?? pages.about?.content?.vision,
          values: [
            {
              title: formData.get('about_value1_title') ?? pages.about?.content?.values?.[0]?.title ?? 'Güvenilirlik',
              description: formData.get('about_value1_desc') ?? pages.about?.content?.values?.[0]?.description ?? '',
              icon: formData.get('about_value1_icon') ?? pages.about?.content?.values?.[0]?.icon ?? 'shield-check'
            },
            {
              title: formData.get('about_value2_title') ?? pages.about?.content?.values?.[1]?.title ?? 'Kalite',
              description: formData.get('about_value2_desc') ?? pages.about?.content?.values?.[1]?.description ?? '',
              icon: formData.get('about_value2_icon') ?? pages.about?.content?.values?.[1]?.icon ?? 'award'
            },
            {
              title: formData.get('about_value3_title') ?? pages.about?.content?.values?.[2]?.title ?? 'Yenilikçilik',
              description: formData.get('about_value3_desc') ?? pages.about?.content?.values?.[2]?.description ?? '',
              icon: formData.get('about_value3_icon') ?? pages.about?.content?.values?.[2]?.icon ?? 'lightbulb'
            },
            {
              title: formData.get('about_value4_title') ?? pages.about?.content?.values?.[3]?.title ?? 'Müşteri Memnuniyeti',
              description: formData.get('about_value4_desc') ?? pages.about?.content?.values?.[3]?.description ?? '',
              icon: formData.get('about_value4_icon') ?? pages.about?.content?.values?.[3]?.icon ?? 'heart'
            }
          ],
        },
        seo: {
          title: formData.get('about_seo_title') ?? pages.about?.seo?.title,
          description: formData.get('about_seo_description') ?? pages.about?.seo?.description,
          keywords: formData.get('about_seo_keywords') ?? pages.about?.seo?.keywords,
        }
      },
      privacy: {
        hero: {
          title: formData.get('privacy_hero_title') ?? pages.privacy?.hero?.title,
          subtitle: formData.get('privacy_hero_subtitle') ?? pages.privacy?.hero?.subtitle,
        },
        content: privacyContent || pages.privacy?.content,
        seo: {
          title: formData.get('privacy_seo_title') ?? pages.privacy?.seo?.title,
          description: formData.get('privacy_seo_description') ?? pages.privacy?.seo?.description,
          keywords: formData.get('privacy_seo_keywords') ?? pages.privacy?.seo?.keywords,
        }
      },
      cookies: {
        hero: {
          title: formData.get('cookies_hero_title') ?? pages.cookies?.hero?.title,
          subtitle: formData.get('cookies_hero_subtitle') ?? pages.cookies?.hero?.subtitle,
        },
        content: cookiesContent || pages.cookies?.content,
        seo: {
          title: formData.get('cookies_seo_title') ?? pages.cookies?.seo?.title,
          description: formData.get('cookies_seo_description') ?? pages.cookies?.seo?.description,
          keywords: formData.get('cookies_seo_keywords') ?? pages.cookies?.seo?.keywords,
        }
      },
      contact: {
        hero: {
          title: formData.get('contact_hero_title') ?? pages.contact?.hero?.title,
          subtitle: formData.get('contact_hero_subtitle') ?? pages.contact?.hero?.subtitle,
        },
        info: {
          description: formData.get('contact_info_description') ?? pages.contact?.info?.description,
        },
        form: {
          description: formData.get('contact_form_description') ?? pages.contact?.form?.description,
        },
        seo: {
          title: formData.get('contact_seo_title') ?? pages.contact?.seo?.title,
          description: formData.get('contact_seo_description') ?? pages.contact?.seo?.description,
          keywords: formData.get('contact_seo_keywords') ?? pages.contact?.seo?.keywords,
        }
      },
      footer: {
        title: formData.get('footer_title') ?? pages.footer?.title,
        description: formData.get('footer_description') ?? pages.footer?.description,
      }
    }

    try {
      // pages.json güncelle
      const pagesResponse = await fetch('/api/admin/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPages),
      })

      // page-settings.json güncelle
      const settingsResponse = await fetch('/api/admin/page-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPageSettings),
      })

      if (pagesResponse.ok && settingsResponse.ok) {
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

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem('admin-content-active-tab', value)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="homepage">Ana Sayfa</TabsTrigger>
          <TabsTrigger value="about">Hakkımızda</TabsTrigger>
          <TabsTrigger value="contact">İletişim</TabsTrigger>
          <TabsTrigger value="privacy">Gizlilik</TabsTrigger>
          <TabsTrigger value="cookies">Çerez</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="page-settings">Sayfa Ayarları</TabsTrigger>
        </TabsList>

        {/* Ana Sayfa */}
        <TabsContent value="homepage" className="space-y-6">
          {/* Hero Section */}
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
                  <label className="block text-sm font-medium text-black mb-2">WhatsApp Buton Metni</label>
                  <Input name="homepage_hero_whatsapp" defaultValue={pages.homepage?.hero?.whatsappText} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-2">Telefon Buton Metni</label>
                  <Input name="homepage_hero_phone" defaultValue={pages.homepage?.hero?.phoneText} />
                </div>
              </div>
            </div>
          </div>

          {/* SEO İçerik Alanı 1 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO İçerik Alanı 1 (Hero Sonrası)</h3>
            <TiptapEditor 
              content={seoContent1}
              onChange={setSeoContent1}
              placeholder=""
            />
            <p className="text-xs text-gray-500 mt-2">Rich text editör ile içerik oluşturun. Frontend'de aynı şekilde görünecek.</p>
          </div>

          {/* Hizmetler Section */}
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
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama</label>
                <Textarea name="homepage_services_description" defaultValue={pages.homepage?.services?.description} rows={2} />
              </div>
            </div>
          </div>

          {/* Süreç Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Çalışma Süreci Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_process_title" defaultValue={pages.homepage?.process?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_process_subtitle" defaultValue={pages.homepage?.process?.subtitle} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Açıklama</label>
                <Textarea name="homepage_process_description" defaultValue={pages.homepage?.process?.description} rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="border border-gray-100 rounded p-3">
                    <h4 className="text-sm font-medium mb-2">Adım {num}</h4>
                    <Input 
                      name={`homepage_process_step${num}_title`} 
                      defaultValue={pages.homepage?.process?.steps?.[num-1]?.title}
                      placeholder=""
                      className="mb-2"
                    />
                    <Textarea 
                      name={`homepage_process_step${num}_desc`} 
                      defaultValue={pages.homepage?.process?.steps?.[num-1]?.description}
                      placeholder=""
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Özellikler Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Özellikler Section (Neden Biz?)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_features_title" defaultValue={pages.homepage?.features?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_features_subtitle" defaultValue={pages.homepage?.features?.subtitle} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Açıklama</label>
                <Textarea name="homepage_features_description" defaultValue={pages.homepage?.features?.description} rows={3} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="border border-gray-100 rounded p-3">
                    <h4 className="text-sm font-medium mb-2">Özellik {num}</h4>
                    <Input 
                      name={`homepage_feature${num}_title`} 
                      defaultValue={pages.homepage?.features?.items?.[num-1]?.title}
                      placeholder=""
                      className="mb-2"
                    />
                    <Textarea 
                      name={`homepage_feature${num}_desc`} 
                      defaultValue={pages.homepage?.features?.items?.[num-1]?.description}
                      placeholder=""
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fiyatlar Section */}
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
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama</label>
                <Textarea name="homepage_pricing_description" defaultValue={pages.homepage?.pricing?.description} rows={2} />
              </div>
            </div>
          </div>

          {/* Teknolojiler Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Teknolojiler Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_technologies_title" defaultValue={pages.homepage?.technologies?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_technologies_subtitle" defaultValue={pages.homepage?.technologies?.subtitle} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama</label>
                <Textarea name="homepage_technologies_description" defaultValue={pages.homepage?.technologies?.description} rows={3} />
              </div>
            </div>
          </div>

          {/* Yorumlar Section */}
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

          {/* SSS Section */}
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

          {/* Bölgeler Section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hizmet Bölgeleri Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="homepage_regions_title" defaultValue={pages.homepage?.regions?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="homepage_regions_subtitle" defaultValue={pages.homepage?.regions?.subtitle} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama (Kartların Altında)</label>
                <Textarea name="homepage_regions_description" defaultValue={pages.homepage?.regions?.description} rows={2} />
              </div>
            </div>
          </div>

          {/* SEO İçerik Alanı 2 */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO İçerik Alanı 2 (Bölgeler Sonrası)</h3>
            <TiptapEditor 
              content={seoContent2}
              onChange={setSeoContent2}
              placeholder=""
            />
            <p className="text-xs text-gray-500 mt-2">Rich text editör ile içerik oluşturun. Frontend'de aynı şekilde görünecek.</p>
          </div>

          {/* SEO Meta Alanları - Ana Sayfa */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları (Ana Sayfa)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Title</label>
                <Input 
                  name="homepage_seo_title" 
                  defaultValue={pages.homepage?.seo?.title}
                  maxLength={60}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'homepage_seo_title': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['homepage_seo_title'] || 0}/60 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Description</label>
                <Textarea 
                  name="homepage_seo_description" 
                  defaultValue={pages.homepage?.seo?.description}
                  rows={3}
                  maxLength={160}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'homepage_seo_description': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['homepage_seo_description'] || 0}/160 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Keywords (virgülle ayırın)</label>
                <Input 
                  name="homepage_seo_keywords" 
                  defaultValue={pages.homepage?.seo?.keywords}
                  placeholder=""
                />
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

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Değerlerimiz</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="border border-gray-100 rounded p-4">
                  <h4 className="text-sm font-medium mb-3">Değer {num}</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Başlık</label>
                      <Input 
                        name={`about_value${num}_title`} 
                        defaultValue={pages.about?.content?.values?.[num-1]?.title}
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Açıklama</label>
                      <Textarea 
                        name={`about_value${num}_desc`} 
                        defaultValue={pages.about?.content?.values?.[num-1]?.description}
                        placeholder=""
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">İkon</label>
                      <select
                        name={`about_value${num}_icon`}
                        defaultValue={pages.about?.content?.values?.[num-1]?.icon ?? 'shield-check'}
                        className="w-full h-10 rounded-lg border border-gray-200 px-3 py-2 text-sm"
                      >
                        <option value="shield-check">🛡️ Güvenilirlik (Shield)</option>
                        <option value="award">⭐ Kalite (Award)</option>
                        <option value="lightbulb">💡 Yenilikçilik (Lightbulb)</option>
                        <option value="heart">❤️ Müşteri Memnuniyeti (Heart)</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Meta Alanları - Hakkımızda */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları (Hakkımızda)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Title</label>
                <Input 
                  name="about_seo_title" 
                  defaultValue={pages.about?.seo?.title}
                  maxLength={60}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'about_seo_title': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['about_seo_title'] || 0}/60 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Description</label>
                <Textarea 
                  name="about_seo_description" 
                  defaultValue={pages.about?.seo?.description}
                  rows={3}
                  maxLength={160}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'about_seo_description': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['about_seo_description'] || 0}/160 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Keywords (virgülle ayırın)</label>
                <Input 
                  name="about_seo_keywords" 
                  defaultValue={pages.about?.seo?.keywords}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* İletişim */}
        <TabsContent value="contact" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Hero Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Başlık</label>
                <Input name="contact_hero_title" defaultValue={pages.contact?.hero?.title} />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Alt Başlık</label>
                <Textarea name="contact_hero_subtitle" defaultValue={pages.contact?.hero?.subtitle} rows={2} />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">İçerik Alanları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">İletişim Bilgileri Açıklaması</label>
                <Textarea name="contact_info_description" defaultValue={pages.contact?.info?.description} rows={2} placeholder="" />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Form Açıklaması</label>
                <Textarea name="contact_form_description" defaultValue={pages.contact?.form?.description} rows={2} placeholder="" />
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları (İletişim)</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Title</label>
                <Input 
                  name="contact_seo_title" 
                  defaultValue={pages.contact?.seo?.title}
                  maxLength={60}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'contact_seo_title': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['contact_seo_title'] || 0}/60 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Description</label>
                <Textarea 
                  name="contact_seo_description" 
                  defaultValue={pages.contact?.seo?.description}
                  rows={3}
                  maxLength={160}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'contact_seo_description': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['contact_seo_description'] || 0}/160 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Keywords (virgülle ayırın)</label>
                <Input 
                  name="contact_seo_keywords" 
                  defaultValue={pages.contact?.seo?.keywords}
                  placeholder=""
                />
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
            <h3 className="text-lg font-semibold text-black mb-4">İçerik</h3>
            <TiptapEditor 
              content={privacyContent}
              onChange={setPrivacyContent}
              placeholder=""
            />
          </div>

          {/* SEO Meta Alanları */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Title</label>
                <Input 
                  name="privacy_seo_title" 
                  defaultValue={pages.privacy?.seo?.title}
                  maxLength={60}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'privacy_seo_title': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['privacy_seo_title'] || 0}/60 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Description</label>
                <Textarea 
                  name="privacy_seo_description" 
                  defaultValue={pages.privacy?.seo?.description}
                  rows={3}
                  maxLength={160}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'privacy_seo_description': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['privacy_seo_description'] || 0}/160 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Keywords (virgülle ayırın)</label>
                <Input 
                  name="privacy_seo_keywords" 
                  defaultValue={pages.privacy?.seo?.keywords}
                  placeholder=""
                />
              </div>
            </div>
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
            <h3 className="text-lg font-semibold text-black mb-4">İçerik</h3>
            <TiptapEditor 
              content={cookiesContent}
              onChange={setCookiesContent}
              placeholder=""
            />
          </div>

          {/* SEO Meta Alanları */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">SEO Ayarları</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Title</label>
                <Input 
                  name="cookies_seo_title" 
                  defaultValue={pages.cookies?.seo?.title}
                  maxLength={60}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'cookies_seo_title': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['cookies_seo_title'] || 0}/60 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Description</label>
                <Textarea 
                  name="cookies_seo_description" 
                  defaultValue={pages.cookies?.seo?.description}
                  rows={3}
                  maxLength={160}
                  onChange={(e) => {
                    setCharCounts(prev => ({ ...prev, 'cookies_seo_description': e.target.value.length }))
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">{charCounts['cookies_seo_description'] || 0}/160 karakter</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Meta Keywords (virgülle ayırın)</label>
                <Input 
                  name="cookies_seo_keywords" 
                  defaultValue={pages.cookies?.seo?.keywords}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Footer */}
        <TabsContent value="footer" className="space-y-6">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Footer İlk Sütun</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">Site Adı</label>
                <Input 
                  name="footer_title" 
                  defaultValue={pages.footer?.title} 
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">Açıklama</label>
                <Textarea 
                  name="footer_description" 
                  defaultValue={pages.footer?.description ?? ''} 
                  rows={3}
                  placeholder=""
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Sayfa Ayarları */}
        <TabsContent value="page-settings" className="space-y-6">
          {pageSettings && Object.entries(pageSettings).map(([key, value]: [string, any]) => (
            <div key={key} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-black mb-4 capitalize">
                {key === 'hizmetlerimiz' ? 'Hizmetlerimiz' : 
                 key === 'fiyatlarimiz' ? 'Fiyatlarımız' : 
                 key === 'hizmet-bolgeleri' ? 'Hizmet Bölgeleri' :
                 key === 'teklif-al' ? 'Teklif Al' :
                 key === 'fiyat-hesapla' ? 'Fiyat Hesaplama' :
                 key === 'gizlilik-politikasi' ? 'Gizlilik Politikası' :
                 key === 'cerez-politikasi' ? 'Çerez Politikası' : key}
              </h3>
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

      <div className="fixed bottom-0 left-64 right-0 z-50 bg-white border-t border-gray-200 shadow-lg px-8 py-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Güncelleniyor...' : 'Tümünü Güncelle'}
        </Button>
      </div>
    </form>
  )
}
