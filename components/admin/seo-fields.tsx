import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface SEOFieldsProps {
  values?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  onChange?: (field: string, value: string) => void
}

export function SEOFields({ values, onChange }: SEOFieldsProps) {
  return (
    <div className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-black">SEO Ayarları</h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">
          SEO Başlık
        </label>
        <Input
          name="seoTitle"
          defaultValue={values?.title}
          placeholder=""
          onChange={(e) => onChange?.('title', e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-900">
          Önerilen: 50-60 karakter
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">
          SEO Açıklama
        </label>
        <Textarea
          name="seoDescription"
          defaultValue={values?.description}
          placeholder=""
          rows={3}
          onChange={(e) => onChange?.('description', e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-900">
          Önerilen: 150-160 karakter
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-black mb-2">
          Anahtar Kelimeler
        </label>
        <Input
          name="keywords"
          defaultValue={values?.keywords?.join(', ')}
          placeholder=""
          onChange={(e) => onChange?.('keywords', e.target.value)}
        />
        <p className="mt-1 text-xs text-gray-900">
          Virgülle ayırarak yazın
        </p>
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <p className="text-sm text-blue-800">
          <strong>İpucu:</strong> SEO başlığı ve açıklaması Google arama sonuçlarında görünür. 
          Anahtar kelimeleri doğal bir şekilde kullanın.
        </p>
      </div>
    </div>
  )
}
