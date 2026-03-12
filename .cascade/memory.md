# Cascade Memory - Bilgisayar Teknik Servis Projesi

## Proje Özeti

Bu proje, **domain bağımsız** ve **global** bir bilgisayar teknik servis web sitesi şablonudur. Herhangi bir bilgisayar teknik servis işletmesi için kullanılabilir.

## Temel Bilgiler

### Teknoloji Stack
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 3.4.19 (Next.js.org design system)
- Geist Sans & Geist Mono fonts

### Proje Yapısı
```
app/          → Next.js pages & routes
components/   → React components (sections, ui, layout)
lib/          → Utilities, validation, schema
content/      → JSON data files
config/       → Site configuration
types/        → TypeScript definitions
```

## Domain Bağımsızlık

### Merkezi Konfigürasyon
Tüm site-specific bilgiler şu dosyalarda:
- `config/site.json` → Site bilgileri, iletişim, SEO
- `content/services.json` → Hizmetler
- `content/regions.json` → Hizmet bölgeleri
- `content/prices.json` → Fiyat paketleri
- `content/faq.json` → SSS
- `content/reviews.json` → Müşteri yorumları
- `content/pages.json` → Sayfa içerikleri

### Asla Hardcode Etme
```typescript
// ❌ YANLIŞ
const siteName = "Pendik Web Tasarım"

// ✅ DOĞRU
const config = await getSiteConfig()
const siteName = config.site.name
```

## Tasarım Sistemi

### Color Palette (Next.js.org Exact)
```css
--ds-gray-1000: #171717  /* Black */
--ds-blue-600: #0070f3   /* Primary */
--ds-green-600: #26c941  /* Success */
--ds-red-600: #ee0000    /* Error */
```

### Breakpoints
```css
sm: 600px   /* Mobile */
md: 768px   /* Tablet */
lg: 960px   /* Desktop small */
xl: 1280px  /* Desktop large */
```

### Typography
```css
font-sans: Geist Sans
font-mono: Geist Mono
h1-desktop: 56px / -0.04em
h2-desktop: 32px / -0.04em
body: 16px / 1.6
```

## Önemli Dosyalar

### Configuration Loaders
- `lib/config.ts` → getSiteConfig()
- `lib/content.ts` → getServices(), getRegions(), etc.
- `lib/schema.ts` → Schema.org generators
- `lib/seo.ts` → SEO utilities
- `lib/validation.ts` → Zod schemas

### Type Definitions
- `types/index.ts` → SiteConfig, Service, Region, etc.

### Components
- `components/sections/` → Hero, Foundation, Features, etc.
- `components/ui/` → Button, Input, Card, Modal, etc.
- `components/layout/` → Header, Footer, Mobile Nav

## API Endpoints

### Public
- `POST /api/contact` → Contact form submission
  - Rate limit: 5 requests/15min per IP
  - Validation: Zod schema
  - Email: Nodemailer

### Admin (Localhost Only)
- `/api/admin/config` → Site config CRUD
- `/api/admin/services` → Services CRUD
- `/api/admin/regions` → Regions CRUD
- `/api/admin/prices` → Prices CRUD
- `/api/admin/reviews` → Reviews CRUD
- `/api/admin/faq` → FAQ CRUD

## SEO & Schema.org

### Metadata Generation
Her sayfa için dinamik metadata:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig()
  return {
    title: config.seo.metaTitle,
    description: config.seo.metaDescription,
    // ...
  }
}
```

### Schema.org Markup
Otomatik generate edilen schemas:
- LocalBusiness
- Organization
- WebSite
- Service
- FAQ
- Review
- Breadcrumb

## Performance

### Optimizations
- React Compiler aktif
- Image optimization (Sharp)
- Code splitting (otomatik)
- CSS optimization (Critters)
- Caching (LRU Cache)

### Build
```bash
npm run build  # Production build
npm start      # Production server
```

## Security

### Admin Panel
- Sadece localhost'ta erişilebilir
- Production'da otomatik kapalı (middleware.ts)
- Basic Authentication

### Rate Limiting
- Contact form: 5 req/15min per IP
- Admin API: 100 req/min per IP

### Input Validation
- Zod schemas
- Honeypot field (bot koruması)
- CSRF protection

## Environment Variables

### Required
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@domain.com
CONTACT_EMAIL=info@domain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
NEXT_PUBLIC_SITE_URL=https://domain.com
```

### Optional
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment

### Vercel (Önerilen)
```bash
vercel login
vercel --prod
```

### Netlify
```bash
netlify login
netlify deploy --prod
```

### Docker
```bash
docker build -t bilgisayar-servis .
docker run -p 3000:3000 bilgisayar-servis
```

## Testing

### Unit Tests
```bash
npm run test
npm run test:watch
```

### E2E Tests
```bash
npm run test:e2e
npm run test:e2e:ui
```

## Common Tasks

### Yeni Site Kurulumu
1. `config/site.json` düzenle
2. `content/*.json` dosyalarını doldur
3. Logo ve görselleri ekle (`public/`)
4. `.env.local` oluştur
5. `npm run build && npm start`

### Yeni Hizmet Ekleme
1. `content/services.json` dosyasına ekle
2. Icon ve görsel ekle
3. SEO metadata tanımla
4. Build ve deploy

### Yeni Bölge Ekleme
1. `content/regions.json` dosyasına ekle
2. SEO content hazırla
3. FAQ ekle (opsiyonel)
4. Build ve deploy

## Troubleshooting

### Build Hatası
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Kullanımda
```bash
lsof -ti:3000 | xargs kill -9
# Veya
PORT=3001 npm run dev
```

### SMTP Hatası
- Gmail için App Password kullan
- 2-Step Verification aktif olmalı
- SMTP_SECURE=false (port 587 için)

## Best Practices

### ✅ Her Zaman Yap
- Config dosyalarını kullan
- TypeScript types ekle
- Error handling ekle
- Responsive design yap
- SEO optimize et
- Performance test yap

### ❌ Asla Yapma
- Hardcoded site bilgileri
- Inline styles (Tailwind kullan)
- `any` type kullanımı
- Console.log'ları production'da bırakma
- Sensitive data'yı commit etme

## Kod Standartları

### Naming
- Components: PascalCase
- Files: kebab-case
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### File Organization
- Server Components varsayılan
- Client Components: `'use client'`
- Async/await kullan
- Error boundaries ekle

### Styling
- Tailwind utility classes
- Next.js.org color palette
- Mobile-first approach
- Responsive breakpoints

## Documentation

### Mevcut Dokümanlar
- `/docs/ARCHITECTURE.md` → Mimari detayları
- `/docs/SETUP.md` → Kurulum rehberi
- `/docs/DEPLOYMENT.md` → Deployment rehberi
- `/docs/API.md` → API dokümantasyonu
- `/docs/CUSTOMIZATION.md` → Özelleştirme rehberi
- `/.windsurf/rules.md` → AI kuralları
- `/.windsurf/workflows/deploy.md` → Deployment workflow

## Önemli Notlar

### Domain Bağımsızlık
Bu proje **herhangi bir bilgisayar teknik servis** işletmesi için kullanılabilir. Tüm site-specific bilgiler merkezi konfigürasyon dosyalarında tutulur.

### Global Ölçeklenebilirlik
- Çoklu bölge desteği
- Dinamik hizmet yönetimi
- Esnek fiyat paketleri
- SEO optimize yapı

### Performance First
- React Compiler
- Image optimization
- Code splitting
- Caching strategies

### SEO Optimized
- Dinamik metadata
- Schema.org markup
- Sitemap generation
- Robots.txt

### Security First
- Rate limiting
- Input validation
- Admin protection
- Environment variables

## Quick Reference

### Data Loading
```typescript
const config = await getSiteConfig()
const services = await getServices()
const regions = await getRegions()
const prices = await getPrices()
const faqs = await getFAQ()
const reviews = await getApprovedReviews()
```

### Schema Generation
```typescript
const schemas = generateAllSchemas(config, reviews)
const faqSchema = generateFAQPageSchema(faqs, config)
const serviceSchema = generateServiceSchema(service, config)
```

### Validation
```typescript
import { contactFormSchema } from '@/lib/validation'
const data = contactFormSchema.parse(formData)
```

## Support

- Documentation: `/docs`
- GitHub Issues
- Email: support@yourdomain.com
