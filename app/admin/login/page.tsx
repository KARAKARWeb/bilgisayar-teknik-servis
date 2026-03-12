import { LoginForm } from './form'

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">Admin Girişi</h1>
          <p className="text-gray-900 mt-2">Yönetim paneline giriş yapın</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
