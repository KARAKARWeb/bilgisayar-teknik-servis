'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface ContentAreaExpandableProps {
  content: string
  className?: string
  previewPercentage?: number
  desktopFullContent?: boolean
}

export function ContentAreaExpandable({ 
  content, 
  className = '',
  previewPercentage = 50,
  desktopFullContent = false
}: ContentAreaExpandableProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [previewContent, setPreviewContent] = useState('')
  
  // Background rengini className'den çıkar - gradient için
  const bgColor = className.includes('rgb(250') ? 'rgb(250,250,250)' : 'white'
  const gradientFrom = bgColor === 'white' ? 'from-white via-white/80' : 'from-[rgb(250,250,250)] via-[rgb(250,250,250)]/80'

  // İçeriği parse et ve ilk %50'sini hesapla - Client-side only
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = content
    const textLength = tempDiv.textContent?.length || 0
    const previewLength = Math.floor(textLength * (previewPercentage / 100))
    
    let currentLength = 0
    let previewHtml = ''
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const elements = Array.from(doc.body.children)
    
    for (const element of elements) {
      const elementText = element.textContent || ''
      if (currentLength + elementText.length <= previewLength) {
        previewHtml += element.outerHTML
        currentLength += elementText.length
      } else {
        // Son elementi de kısaltarak ekle
        if (previewHtml === '' && elementText.length > 0) {
          const truncatedText = elementText.substring(0, previewLength) + '...'
          const clonedElement = element.cloneNode(true) as HTMLElement
          clonedElement.textContent = truncatedText
          previewHtml += clonedElement.outerHTML
        }
        break
      }
    }
    
    // Eğer hiç içerik yoksa, ilk 2 elementi al
    if (previewHtml === '' && elements.length > 0) {
      previewHtml = elements.slice(0, 2).map(el => el.outerHTML).join('')
    }
    
    setPreviewContent(previewHtml)
  }, [content, previewPercentage])

  return (
    <section className={`bg-white py-16 md:py-24 ${className}`}>
      <div className="container">
        <div className="prose max-w-none [&_table]:border-collapse [&_table]:w-full [&_table]:border [&_table]:border-gray-300 [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2">
          {desktopFullContent ? (
            <>
              {/* Desktop - Tam içerik */}
              <div className="hidden md:block" dangerouslySetInnerHTML={{ __html: content }} />
              
              {/* Mobil - Expandable */}
              <div className="md:hidden">
                {/* Tüm içerik - Expanded durumda */}
                <div 
                  className={isExpanded ? '' : 'hidden'}
                  dangerouslySetInnerHTML={{ __html: content }} 
                />
                
                {/* Preview içerik - Collapsed durumda */}
                {!isExpanded && previewContent && (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                    <div className="relative mt-8">
                      <div className={`absolute inset-x-0 -top-32 h-32 bg-gradient-to-t ${gradientFrom} to-transparent pointer-events-none`} />
                    </div>
                  </>
                )}
              </div>
              
              {/* Load More Butonu - Sadece Mobil */}
              {!isExpanded && (
                <div className="flex justify-center mt-8 md:hidden">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-2 text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span>Devamını Yükle...</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Tüm Cihazlar - Expandable */}
              <div 
                className={isExpanded ? '' : 'hidden'}
                dangerouslySetInnerHTML={{ __html: content }} 
              />
              
              {/* Preview içerik - Collapsed durumda */}
              {!isExpanded && previewContent && (
                <>
                  <div dangerouslySetInnerHTML={{ __html: previewContent }} />
                  <div className="relative mt-8">
                    <div className={`absolute inset-x-0 -top-32 h-32 bg-gradient-to-t ${gradientFrom} to-transparent pointer-events-none`} />
                  </div>
                </>
              )}
              
              {/* Load More Butonu - Tüm Cihazlar */}
              {!isExpanded && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="inline-flex items-center gap-2 text-base font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                  >
                    <span>Devamını Yükle...</span>
                    <ChevronDown className="h-5 w-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* SEO için gizli tam içerik - Google görecek ama kullanıcı görmeyecek */}
        <div className="sr-only" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </section>
  )
}
