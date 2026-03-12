'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { quoteFormSchema, type QuoteFormData } from '@/lib/validation'

interface QuoteFormProps {
  services: Array<{ id: string; name: string }>
}

export function QuoteForm({ services }: QuoteFormProps) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      features: [],
    },
  })

  async function onSubmit(data: QuoteFormData) {
    setError('')
    setSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        reset()
      } else {
        setError(result.message || 'Bir hata oluştu')
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
          Teklif talebiniz alındı! En kısa sürede size detaylı teklif göndereceğiz.
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
            Ad Soyad *
          </label>
          <Input {...register('name')} id="name" disabled={isSubmitting} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
            Firma Adı
          </label>
          <Input {...register('company')} id="company" disabled={isSubmitting} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
            E-posta *
          </label>
          <Input {...register('email')} id="email" type="email" disabled={isSubmitting} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
            Telefon *
          </label>
          <Input {...register('phone')} id="phone" type="tel" disabled={isSubmitting} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-black mb-2">
          Hizmet Seçin *
        </label>
        <select
          {...register('projectType')}
          id="projectType"
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
        >
          <option value="">Seçiniz</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>}
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-black mb-2">
          Bütçe Aralığı
        </label>
        <select
          {...register('budget')}
          id="budget"
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
        >
          <option value="">Seçiniz</option>
          <option value="0-10000">0 - 10.000 TL</option>
          <option value="10000-25000">10.000 - 25.000 TL</option>
          <option value="25000-50000">25.000 - 50.000 TL</option>
          <option value="50000+">50.000 TL ve üzeri</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
          Proje Detayları *
        </label>
        <Textarea 
          {...register('message')}
          id="message" 
          rows={6} 
          disabled={isSubmitting}
          placeholder="Projeniz hakkında detaylı bilgi verin..." 
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      {/* Honeypot field */}
      <input
        {...register('website')}
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Gönderiliyor...' : 'Teklif Talep Et'}
      </Button>
    </form>
  )
}
