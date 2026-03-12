'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'
import { Footer } from './footer'
import { StickyBottomBar } from './sticky-bottom-bar'
import { ScrollToTop } from './scroll-to-top'

export function LayoutContent({ 
  config, 
  services = [],
  regions = [],
  pages,
  children 
}: { 
  config: any
  services?: any[]
  regions?: any[]
  pages?: any
  children: React.ReactNode 
}) {
  const pathname = usePathname()
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

  return (
    <>
      <Header config={config} services={services} />
      <main className="pt-20">
        {children}
      </main>
      <Footer config={config} services={services} regions={regions} pages={pages} />
      <StickyBottomBar config={config} />
      <ScrollToTop />
    </>
  )
}
