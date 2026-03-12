# Proje Mimarisi

## Genel Bakış

Bu proje, **domain bağımsız** ve **global** bir bilgisayar teknik servis web sitesi şablonudur. Next.js 16 App Router, React 19 ve TypeScript ile geliştirilmiştir. Next.js.org tasarım sistemini temel alarak modern, hızlı ve SEO optimize bir yapı sunar.

## Teknoloji Stack

### Core Framework
- **Next.js 16.1.6** - React framework (App Router)
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 3.4.19** - Utility-first CSS framework
- **Next.js.org Design System** - Color palette ve typography
- **Geist Font** - Sans ve Mono font family
- **Custom CSS Modules** - Component-specific styles

### Form & Validation
- **React Hook Form 7.71.2** - Form management
- **Zod 4.3.6** - Schema validation
- **@hookform/resolvers 5.2.2** - Form validation integration

### Rich Text Editor
- **Tiptap 3.20** - Headless editor framework
- **Lowlight 3.3.0** - Code highlighting
- Extensions: Image, Link, Table, Text Align, Underline

### Email & Communication
- **Nodemailer 8.0.1** - Email sending
- **SMTP Configuration** - Gmail/custom SMTP support

### UI Components & Interactions
- **Lucide React 0.575.0** - Icon library
- **Framer Motion 12.34.3** - Animation library
- **@dnd-kit** - Drag and drop functionality
- **React Swipeable 7.0.2** - Touch gestures
- **Sonner 2.0.7** - Toast notifications

### Performance & Optimization
- **Sharp 0.34.5** - Image optimization
- **Critters 0.0.23** - Critical CSS inlining
- **LRU Cache 11.2.6** - Caching mechanism

### Testing
- **Playwright 1.58.2** - E2E testing
- **Jest** - Unit testing

### Development Tools
- **ESLint 9** - Code linting
- **Prettier 3.2.5** - Code formatting
- **Babel React Compiler 1.0.0** - React optimization

## Proje Yapısı

```
bilgisayar-teknik-servis/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Public pages
│   │   ├── [slug]/              # Dynamic pages
│   │   ├── bolge/               # Region pages
│   │   ├── hizmetlerimiz/       # Services pages
│   │   ├── iletisim/            # Contact page
│   │   └── page.tsx             # Homepage
│   ├── admin/                   # Admin panel (localhost only)
│   ├── api/                     # API routes
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── hero-nextjs.css          # Hero section styles
│
├── components/                   # React components
│   ├── admin/                   # Admin components
│   ├── forms/                   # Form components
│   ├── layout/                  # Layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── mobile-nav.tsx
│   │   └── sticky-bottom-bar.tsx
│   ├── sections/                # Page sections
│   │   ├── hero.tsx
│   │   ├── foundation.tsx
│   │   ├── features.tsx
│   │   ├── pricing.tsx
│   │   ├── reviews.tsx
│   │   └── faq.tsx
│   ├── shared/                  # Shared components
│   └── ui/                      # UI primitives
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       └── modal.tsx
│
├── lib/                         # Utility functions
│   ├── config.ts               # Site config loader
│   ├── content.ts              # Content loader
│   ├── schema.ts               # Schema.org generators
│   ├── seo.ts                  # SEO utilities
│   ├── validation.ts           # Zod schemas
│   ├── email.ts                # Email templates
│   └── utils/                  # Helper functions
│
├── content/                     # JSON data files
│   ├── services.json           # Service definitions
│   ├── regions.json            # Service regions
│   ├── prices.json             # Pricing packages
│   ├── faq.json                # FAQ items
│   ├── reviews.json            # Customer reviews
│   └── pages.json              # Page content
│
├── config/                      # Configuration
│   └── site.json               # Site-specific config
│
├── types/                       # TypeScript types
│   └── index.ts                # Type definitions
│
├── public/                      # Static assets
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
│
├── middleware/                  # Middleware
│   └── rate-limit.ts
│
├── middleware.ts                # Next.js middleware
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## Mimari Prensipler

### 1. Domain Bağımsızlık

Proje, herhangi bir bilgisayar teknik servis sitesi için kullanılabilir şekilde tasarlanmıştır:

- **Merkezi Konfigürasyon**: Tüm site bilgileri `config/site.json` dosyasında
- **İçerik Yönetimi**: Tüm içerikler `content/` klasöründe JSON formatında
- **Dinamik SEO**: Her sayfa için otomatik SEO meta tag üretimi
- **Schema.org**: Dinamik structured data generation

### 2. Global Ölçeklenebilirlik

- **Çoklu Dil Desteği**: Türkçe karakter desteği ve slug generation
- **Bölge Yönetimi**: Dinamik hizmet bölgeleri sistemi
- **Servis Yönetimi**: Esnek hizmet tanımlama ve kategorileme
- **Fiyat Paketleri**: Özelleştirilebilir paket yapısı

### 3. Performans Optimizasyonu

- **React Compiler**: Otomatik memoization
- **Image Optimization**: Sharp ile otomatik resim optimizasyonu
- **Code Splitting**: Otomatik route-based splitting
- **Critical CSS**: Critters ile critical CSS inlining
- **Caching**: LRU cache ile veri önbellekleme

### 4. SEO & Schema.org

- **Metadata Generation**: Otomatik meta tag üretimi
- **Structured Data**: LocalBusiness, Service, FAQ, Review schemas
- **Sitemap**: Dinamik sitemap generation
- **Robots.txt**: SEO-friendly robot directives
- **Open Graph**: Social media preview optimization

### 5. Güvenlik

- **Rate Limiting**: API endpoint koruması
- **Honeypot Fields**: Bot koruması
- **CSRF Protection**: Form güvenliği
- **Admin Protection**: Production'da admin panel kapalı
- **Environment Variables**: Hassas bilgilerin korunması

## Data Flow

### 1. Configuration Loading

```typescript
config/site.json → lib/config.ts → Components
```

### 2. Content Loading

```typescript
content/*.json → lib/content.ts → Pages/Components
```

### 3. Schema Generation

```typescript
Data → lib/schema.ts → JSON-LD → HTML Head
```

### 4. Form Submission

```typescript
Form → Validation (Zod) → API Route → Email (Nodemailer) → Response
```

## Tasarım Sistemi

### Color Palette (Next.js.org Exact)

```css
/* Grayscale - LAB to HEX converted */
--ds-gray-50: #fafafa
--ds-gray-100: #f2f2f2
--ds-gray-200: #ebebeb
--ds-gray-300: #e6e6e6
--ds-gray-400: #eaeaea
--ds-gray-1000: #171717 (black)

/* Brand Colors */
--ds-blue-600: #0070f3
--ds-green-600: #26c941
--ds-red-600: #ee0000
--ds-amber-600: #f5a623
--ds-purple-600: #7928ca
```

### Typography

```css
/* Font Family */
font-sans: Geist Sans
font-mono: Geist Mono

/* Responsive Sizes */
h1-desktop: 56px / -0.04em
h1-mobile: 32px / -0.04em
h2-desktop: 32px / -0.04em
h2-mobile: 24px / -0.04em
body: 16px / 1.6
```

### Breakpoints

```css
sm: 600px   /* Mobile */
md: 768px   /* Tablet */
lg: 960px   /* Desktop small */
xl: 1280px  /* Desktop large */
```

### Spacing & Layout

```css
--ds-page-width: 1400px
--geist-page-margin: 24px (mobile) / 48px (desktop)
--geist-space-gap: 24px
```

## API Routes

### Contact Form
- **POST** `/api/contact` - İletişim formu gönderimi
- Rate limit: 5 request/15min per IP

### Admin API (Localhost Only)
- **GET/POST** `/api/admin/config` - Site config yönetimi
- **GET/POST** `/api/admin/services` - Hizmet yönetimi
- **GET/POST** `/api/admin/regions` - Bölge yönetimi
- **GET/POST** `/api/admin/prices` - Fiyat yönetimi
- **GET/POST** `/api/admin/reviews` - Yorum yönetimi
- **GET/POST** `/api/admin/faq` - SSS yönetimi

## Environment Variables

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@domain.com
CONTACT_EMAIL=info@domain.com

# Admin Panel (Localhost Only)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:1112
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Deployment

### Build Process

```bash
npm run build
```

Build optimizasyonları:
- React Compiler aktif
- Console.log'lar production'da kaldırılır
- CSS optimizasyonu
- Image optimization
- Code splitting

### Production Checklist

1. ✅ Environment variables ayarlandı
2. ✅ `config/site.json` güncellendi
3. ✅ `content/*.json` dosyaları dolduruldu
4. ✅ Images optimize edildi
5. ✅ SEO metadata kontrol edildi
6. ✅ Schema.org markup test edildi
7. ✅ Performance test yapıldı (Lighthouse)
8. ✅ Security headers aktif

## Özelleştirme

### Yeni Site Kurulumu

1. **Site Config**: `config/site.json` dosyasını düzenle
2. **İçerik**: `content/` klasöründeki JSON dosyalarını doldur
3. **Görseller**: `public/` klasörüne logo ve görselleri ekle
4. **Environment**: `.env.local` dosyasını oluştur
5. **Build & Deploy**: `npm run build && npm start`

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

## Bakım & Güncellemeler

### Düzenli Bakım
- Dependencies güncelleme (aylık)
- Security audit (haftalık)
- Performance monitoring
- SEO ranking takibi
- Broken link kontrolü

### Monitoring
- Google Analytics
- Google Search Console
- Core Web Vitals
- Error tracking
- Uptime monitoring

## Destek & Dokümantasyon

- **Teknik Dokümantasyon**: `/docs` klasörü
- **API Dokümantasyonu**: `/docs/API.md`
- **Deployment Guide**: `/docs/DEPLOYMENT.md`
- **Troubleshooting**: `/docs/TROUBLESHOOTING.md`
