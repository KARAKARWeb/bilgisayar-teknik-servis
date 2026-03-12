'use client'

import { Suspense, lazy } from 'react'

export function LazySection({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Suspense fallback={fallback || <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />}>
      {children}
    </Suspense>
  )
}

// Dynamic imports for heavy components
export const DynamicEditor = lazy(() => import('@/components/admin/editor').then(mod => ({ default: mod.Editor })))
// export const DynamicMap = lazy(() => import('@/components/ui/map').then(mod => ({ default: mod.Map })))
// export const DynamicChart = lazy(() => import('@/components/ui/chart').then(mod => ({ default: mod.Chart })))
