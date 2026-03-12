'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ApproveButton({ reviewId, approved }: { reviewId: string; approved: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleToggle() {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: reviewId, approved: !approved }),
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleToggle}
      disabled={loading}
      size="sm"
      variant={approved ? 'outline' : 'primary'}
      className={approved ? 'bg-green-50 text-green-700 hover:bg-green-100' : ''}
    >
      {approved ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          Onaylı
        </>
      ) : (
        <>
          <X className="h-4 w-4 mr-1" />
          Onayla
        </>
      )}
    </Button>
  )
}
