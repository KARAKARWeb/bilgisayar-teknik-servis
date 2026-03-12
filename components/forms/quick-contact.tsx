'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, Mail } from 'lucide-react'

interface QuickContactProps {
  config: any
}

export function QuickContact({ config }: QuickContactProps) {
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Basit callback request - sadece telefon numarası
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Hızlı İletişim',
        phone,
        message: 'Hızlı iletişim formu üzerinden arama talebi',
        honeypot: '',
      }),
    })

    if (response.ok) {
      setSubmitted(true)
      setPhone('')
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Phone className="h-5 w-5 text-black" />
        <h3 className="text-lg font-semibold text-black">Hızlı İletişim</h3>
      </div>

      {submitted ? (
        <div className="rounded-lg bg-green-50 p-4 text-center">
          <p className="text-green-800 font-medium">
            Talebiniz alındı! En kısa sürede sizi arayacağız.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefon Numaranız
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0555 555 55 55"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Beni Arayın
          </Button>

          <div className="flex items-center gap-2 text-sm text-gray-900">
            <Mail className="h-4 w-4" />
            <span>veya</span>
            <a
              href={`mailto:${config.contact.email}`}
              className="text-black hover:underline"
            >
              {config.contact.email}
            </a>
          </div>
        </form>
      )}
    </div>
  )
}
