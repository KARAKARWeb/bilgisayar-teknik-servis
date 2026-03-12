'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    // Basit authentication - production'da JWT veya session kullan
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('admin_logged_in', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Kullanıcı adı veya şifre hatalı')
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Giriş Yap</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Kullanıcı Adı
            </label>
            <Input
              name="username"
              type="text"
              required
              placeholder=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Şifre
            </label>
            <Input
              name="password"
              type="password"
              required
              placeholder=""
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
