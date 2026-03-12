# Windsurf AI Kuralları - Bilgisayar Teknik Servis Projesi

## Proje Hakkında

Bu proje, **domain bağımsız** ve **global** bir bilgisayar teknik servis web sitesi şablonudur. Herhangi bir bilgisayar teknik servis işletmesi için kullanılabilir.

## Teknoloji Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 3.4.19 (Next.js.org design system)
- **Fonts**: Geist Sans & Geist Mono
- **Form**: React Hook Form + Zod validation
- **Email**: Nodemailer
- **Rich Text**: Tiptap
- **Icons**: Lucide React
- **Animation**: Framer Motion

## Kod Standartları

### TypeScript
- Strict mode aktif
- Tüm fonksiyonlar ve değişkenler type-safe olmalı
- `any` kullanımından kaçın
- Interface'ler `types/index.ts` dosyasında tanımlı

### React & Next.js
- Server Components varsayılan olarak kullanılmalı
- Client Components sadece gerektiğinde `'use client'` ile işaretle
- Async/await kullan (Promise.then yerine)
- Error boundaries kullan
- Loading states ekle

### Styling
- Tailwind CSS utility classes kullan
- Custom CSS sadece gerektiğinde
- Next.js.org color palette'i koru (#171717, #0070f3, etc.)
- Responsive design: mobile-first approach
- Breakpoints: sm(600px), md(768px), lg(960px), xl(1280px)

### Naming Conventions
- Components: PascalCase (`HeroSection.tsx`)
- Files: kebab-case (`user-profile.tsx`)
- Functions: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)
- CSS classes: kebab-case (`hero-section`)

### File Organization
```
app/          → Next.js pages & layouts
components/   → React components
lib/          → Utility functions
content/      → JSON data files
config/       → Configuration files
types/        → TypeScript types
public/       → Static assets
```

## Domain Bağımsızlık Kuralları

### 1. Hiçbir Zaman Hardcode Etme

❌ **YANLIŞ:**
```typescript
const siteName = "Pendik Web Tasarım"
const phone = "0545 181 4040"
```

✅ **DOĞRU:**
```typescript
const config = await getSiteConfig()
const siteName = config.site.name
const phone = config.contact.phone
```

### 2. Merkezi Konfigürasyon Kullan

Tüm site-specific bilgiler şu dosyalarda:
- `config/site.json` → Site bilgileri
- `content/*.json` → İçerik verileri

### 3. SEO & Schema.org

- Her sayfa için dinamik metadata
- Schema.org markup otomatik generate edilmeli
- `lib/schema.ts` fonksiyonlarını kullan

### 4. Çoklu Bölge Desteği

- Bölge bilgileri `content/regions.json` dosyasında
- Dinamik bölge sayfaları `/bolge/[slug]` route'unda
- Her bölge için ayrı SEO metadata

## Kod Yazma Kuralları

### Component Yapısı

```typescript
// 1. Imports
import type { SiteConfig } from '@/types'
import { Button } from '@/components/ui/button'

// 2. Types/Interfaces
interface ComponentProps {
  config: SiteConfig
  title?: string
}

// 3. Component
export function Component({ config, title }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState()
  
  // 5. Functions
  const handleClick = () => {}
  
  // 6. Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### API Routes

```typescript
// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema tanımla
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email()
})

export async function POST(request: NextRequest) {
  try {
    // Parse & validate
    const body = await request.json()
    const data = schema.parse(body)
    
    // Business logic
    const result = await processData(data)
    
    // Success response
    return NextResponse.json({ 
      success: true, 
      data: result 
    })
  } catch (error) {
    // Error handling
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 400 })
  }
}
```

### Data Loading

```typescript
// Server Component
export default async function Page() {
  // Load data
  const config = await getSiteConfig()
  const services = await getServices()
  
  // Render
  return <Component config={config} services={services} />
}
```

## Güvenlik Kuralları

### 1. Environment Variables
- Hassas bilgiler `.env.local` dosyasında
- Public variables `NEXT_PUBLIC_` prefix ile
- Production'da farklı değerler kullan

### 2. Input Validation
- Tüm user input'ları Zod ile validate et
- XSS koruması için sanitize et
- SQL injection koruması (eğer database varsa)

### 3. Rate Limiting
- API endpoint'leri rate limit ile koru
- Contact form: 5 request/15min per IP

### 4. Admin Panel
- Sadece localhost'ta erişilebilir
- Production'da otomatik kapalı
- Basic Authentication kullan

## Performance Kuralları

### 1. Image Optimization
- WebP/AVIF formatı kullan
- Next.js Image component kullan
- Lazy loading aktif
- Alt text ekle (SEO için)

```typescript
import Image from 'next/image'

<Image
  src="/image.webp"
  alt="Açıklayıcı alt text"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

### 2. Code Splitting
- Dynamic imports kullan
- Route-based splitting (otomatik)
- Component-based splitting (gerektiğinde)

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### 3. Caching
- `revalidate` kullan (ISR)
- API responses cache'le
- Static generation tercih et

```typescript
export const revalidate = 3600 // 1 saat
```

## SEO Kuralları

### 1. Metadata
- Her sayfa için unique title & description
- Max 60 karakter title
- Max 160 karakter description
- Keywords ekle

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sayfa Başlığı",
    description: "Sayfa açıklaması",
    keywords: ["anahtar", "kelimeler"]
  }
}
```

### 2. Schema.org
- LocalBusiness schema ekle
- Service schema ekle
- FAQ schema ekle
- Review schema ekle

### 3. Sitemap & Robots
- Dinamik sitemap generate et
- Robots.txt optimize et
- Canonical URL'ler ekle

## Testing Kuralları

### Unit Tests
```typescript
// Component test
import { render, screen } from '@testing-library/react'

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />)
    expect(screen.getByText('Text')).toBeInTheDocument()
  })
})
```

### E2E Tests
```typescript
// Playwright test
test('contact form submission', async ({ page }) => {
  await page.goto('/iletisim')
  await page.fill('[name="name"]', 'Test User')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

## Git Workflow

### Commit Messages
```
feat: Add new service page
fix: Fix contact form validation
docs: Update API documentation
style: Format code with Prettier
refactor: Refactor schema generation
test: Add E2E tests for contact form
chore: Update dependencies
```

### Branch Strategy
- `main` → Production
- `develop` → Development
- `feature/*` → New features
- `fix/*` → Bug fixes

## Deployment Kuralları

### Pre-Deployment Checklist
- [ ] Tüm testler geçti
- [ ] Build başarılı
- [ ] Environment variables ayarlandı
- [ ] SEO metadata kontrol edildi
- [ ] Performance test yapıldı
- [ ] Security audit yapıldı

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```env
# Production .env
SMTP_HOST=smtp.gmail.com
SMTP_USER=production@domain.com
NEXT_PUBLIC_SITE_URL=https://domain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Hata Yönetimi

### Error Boundaries
```typescript
// app/error.tsx
'use client'

export default function Error({ error, reset }: {
  error: Error
  reset: () => void
}) {
  return (
    <div>
      <h2>Bir hata oluştu</h2>
      <button onClick={reset}>Tekrar Dene</button>
    </div>
  )
}
```

### API Error Handling
```typescript
try {
  const result = await apiCall()
  return { success: true, data: result }
} catch (error) {
  console.error('API Error:', error)
  return { 
    success: false, 
    error: error instanceof Error ? error.message : 'Unknown error' 
  }
}
```

## Accessibility (a11y)

- Semantic HTML kullan
- ARIA labels ekle
- Keyboard navigation destekle
- Color contrast kontrol et (WCAG AA)
- Alt text ekle (images)
- Focus states ekle

```typescript
<button
  aria-label="İletişim formu gönder"
  className="focus:ring-2 focus:ring-blue-600"
>
  Gönder
</button>
```

## Documentation

### Code Comments
```typescript
/**
 * Kullanıcı verilerini getirir
 * @param userId - Kullanıcı ID'si
 * @returns User object veya null
 */
async function getUser(userId: string): Promise<User | null> {
  // Implementation
}
```

### README Updates
- Yeni feature eklendiğinde README'yi güncelle
- API değişikliklerini dokümante et
- Breaking changes'i belirt

## AI Yardımcı Kuralları

### Kod Üretirken
1. Mevcut kod stilini takip et
2. TypeScript types ekle
3. Error handling ekle
4. Comments ekle (gerektiğinde)
5. Test edilebilir kod yaz

### Refactoring Yaparken
1. Önce testleri çalıştır
2. Küçük adımlarla ilerle
3. Her adımda test et
4. Breaking changes'den kaçın

### Debug Yaparken
1. Error mesajlarını oku
2. Console logs ekle
3. Network tab kontrol et
4. React DevTools kullan

## Önemli Notlar

⚠️ **ASLA YAPMA:**
- Hardcoded site bilgileri
- Inline styles (Tailwind kullan)
- `any` type kullanımı
- Console.log'ları production'da bırakma
- Sensitive data'yı commit etme

✅ **HER ZAMAN YAP:**
- Config dosyalarını kullan
- TypeScript types ekle
- Error handling ekle
- Responsive design yap
- SEO optimize et
- Performance test yap
- Security kontrol et

## Yardım & Kaynaklar

- **Dokümantasyon**: `/docs` klasörü
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs
- **React Docs**: https://react.dev

## Son Kontrol Listesi

Kod yazmadan önce:
- [ ] Hangi component/file'ı değiştireceğimi biliyorum
- [ ] Type definitions'ı kontrol ettim
- [ ] Benzer kod örneklerine baktım
- [ ] Error handling planladım

Kod yazdıktan sonra:
- [ ] TypeScript hataları yok
- [ ] ESLint uyarıları yok
- [ ] Responsive design test ettim
- [ ] Browser console'da hata yok
- [ ] Performance kabul edilebilir
