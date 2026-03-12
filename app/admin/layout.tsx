import { AdminSidebar } from '@/components/admin/sidebar'
import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {children}
        </div>
      </main>
      <Toaster position="top-right" richColors />
    </div>
  )
}
