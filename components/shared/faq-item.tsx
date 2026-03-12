'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItemProps {
  faq: {
    id: string
    question: string
    answer: string
  }
  defaultOpen?: boolean
}

export function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-gray-50"
      >
        <h3 className="text-base font-semibold text-black pr-4">{faq.question}</h3>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-gray-900 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="border-t border-gray-100 p-4">
          <div 
            className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: faq.answer }}
          />
        </div>
      )}
    </div>
  )
}
