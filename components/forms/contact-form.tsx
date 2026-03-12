'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactFormSchema, type ContactFormData } from '@/lib/validation'

interface ContactFormProps {
  services?: Array<{ id: string; name: string }>
}

export function ContactForm({ services = [] }: ContactFormProps) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormData) {
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
          Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Input {...register('name')} id="name" placeholder="Ad Soyad *" disabled={isSubmitting} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        
        <div>
          <Input {...register('company')} id="company" placeholder="Firma Adı" disabled={isSubmitting} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Input {...register('email')} id="email" type="email" placeholder="E-posta *" disabled={isSubmitting} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        
        <div>
          <Input {...register('phone')} id="phone" type="tel" placeholder="Telefon *" disabled={isSubmitting} />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      {services.length > 0 && (
        <div>
          <select
            {...register('service')}
            id="service"
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:opacity-50"
          >
            <option value="">Hizmet Seçin</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <Textarea {...register('message')} id="message" rows={5} placeholder="Mesajınız *" disabled={isSubmitting} />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          {...register('privacy')}
          type="checkbox"
          id="privacy"
          disabled={isSubmitting}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
        />
        <label htmlFor="privacy" className="text-sm text-gray-700">
          <a href="/gizlilik-politikasi" target="_blank" className="text-black underline hover:no-underline">
            Gizlilik Politikası
          </a>
          'nı okudum ve kabul ediyorum. *
        </label>
      </div>
      {errors.privacy && <p className="text-sm text-red-600">{errors.privacy.message}</p>}

      {/* Honeypot field - hidden from users */}
      <input
        {...register('website')}
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
      </Button>
    </form>
  )
}
