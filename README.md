# Bilgisayar Teknik Servis Web Sitesi

**Domain bağımsız** ve **global** bir bilgisayar teknik servis web sitesi şablonu. Herhangi bir bilgisayar teknik servis işletmesi için kullanılabilir.

## 🚀 Özellikler

### ✨ Domain Bağımsızlık
- Merkezi konfigürasyon sistemi
- Tüm site bilgileri JSON dosyalarında
- Herhangi bir işletme için kullanılabilir
- Hızlı kurulum ve özelleştirme

### 🎨 Modern Tasarım
- Next.js.org tasarım sistemi
- Vercel-style animasyonlar
- Responsive design (mobile-first)
- Accessibility (WCAG AA)
- Geist Sans & Geist Mono fontları

### ⚡ Performans
- React Compiler optimizasyonu
- Image optimization (Sharp)
- Code splitting
- Critical CSS inlining
- LRU caching
- Lighthouse score 90+

### 🔍 SEO Optimize
- Dinamik metadata generation
- Schema.org structured data
- Otomatik sitemap generation
- Open Graph & Twitter Cards
- Google Analytics entegrasyonu

### 🔒 Güvenlik
- Rate limiting
- Input validation (Zod)
- CSRF protection
- Admin panel (localhost only)
- Environment variables

### 📱 Responsive
- Mobile-first design
- Touch-friendly UI
- iOS safe areas
- Cross-browser support

## 🛠️ Teknoloji Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.x
- **Styling:** Tailwind CSS 3.4.19
- **Fonts:** Geist Sans & Geist Mono
- **Form:** React Hook Form + Zod
- **Email:** Nodemailer
- **Rich Text:** Tiptap
- **Icons:** Lucide React
- **Animation:** Framer Motion
- **Testing:** Jest + Playwright

## 📋 Gereksinimler

- Node.js 20.x veya üzeri
- npm 10.x veya üzeri
- 4GB RAM (8GB önerilir)

## 🚀 Hızlı Başlangıç

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd bilgisayar-teknik-servis
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Variables Ayarlayın

```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_SITE_URL=http://localhost:1112
```

### 4. Site Konfigürasyonunu Düzenleyin

`config/site.json` dosyasını düzenleyin:

```json
{
  "site": {
    "name": "Sizin Bilgisayar Teknik Servis",
    "domain": "www.sizdomain.com",
    "district": "İlçe Adı",
    "city": "Şehir Adı"
  },
  "contact": {
    "phone": "0XXX XXX XX XX",
    "email": "info@sizdomain.com",
    "whatsapp": "https://wa.me/90XXXXXXXXXX",
    "address": "Tam Adres Bilgisi"
  }
}
```

### 5. Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda açın: http://localhost:1112

## 📁 Proje Yapısı

```
bilgisayar-teknik-servis/
├── app/                      # Next.js App Router
│   ├── (frontend)/          # Public pages
│   ├── admin/               # Admin panel (localhost only)
│   └── api/                 # API routes
├── components/              # React components
│   ├── sections/           # Page sections
│   ├── ui/                 # UI primitives
│   └── layout/             # Layout components
├── lib/                     # Utilities
│   ├── config.ts           # Config loader
│   ├── content.ts          # Content loader
│   ├── schema.ts           # Schema.org generators
│   └── validation.ts       # Zod schemas
├── content/                 # JSON data files
│   ├── services.json       # Hizmetler
│   ├── regions.json        # Bölgeler
│   ├── prices.json         # Fiyatlar
│   ├── faq.json            # SSS
│   └── pages.json          # Sayfa içerikleri
├── config/                  # Configuration
│   └── site.json           # Site config
├── types/                   # TypeScript types
├── public/                  # Static assets
└── docs/                    # Documentation
```

## 🎯 Özelleştirme

### Hizmet Ekleme

`content/services.json` dosyasını düzenleyin:

```json
{
  "id": "bilgisayar-tamiri",
  "name": "Bilgisayar Tamiri",
  "slug": "bilgisayar-tamiri",
  "description": "Profesyonel bilgisayar tamir hizmeti",
  "icon": "Wrench",
  "featured": true,
  "content": "<p>Detaylı açıklama</p>",
  "features": ["Özellik 1", "Özellik 2"],
  "seo": {
    "title": "SEO Başlığı",
    "description": "SEO Açıklaması"
  }
}
```

### Bölge Ekleme

`content/regions.json` dosyasını düzenleyin:

```json
{
  "id": "merkez",
  "name": "Merkez",
  "slug": "merkez-bilgisayar-servisi",
  "city": "İstanbul",
  "district": "Merkez",
  "featured": true,
  "description": "Bölge açıklaması"
}
```

### Logo Değiştirme

```bash
public/
  ├── logo.webp              # Ana logo (200x60px)
  ├── favicon.ico            # Favicon (32x32px)
  └── apple-touch-icon.png   # iOS icon (180x180px)
```

## 🔧 Komutlar

```bash
# Development
npm run dev              # Dev server başlat
npm run build            # Production build
npm run start            # Production server

# Testing
npm run test             # Unit tests
npm run test:watch       # Watch mode
npm run test:e2e         # E2E tests
npm run test:all         # Tüm testler

# Linting & Formatting
npm run lint             # ESLint
npm run format           # Prettier format
npm run format:check     # Format kontrolü
```

## 🌐 Deployment

### Vercel (Önerilen)

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Netlify

```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

### Docker

```bash
docker build -t bilgisayar-servis .
docker run -p 1112:1112 bilgisayar-servis
```

Detaylı deployment rehberi: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

## 📚 Dokümantasyon

- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Mimari detayları
- **[SETUP.md](docs/SETUP.md)** - Kurulum rehberi
- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment rehberi
- **[API.md](docs/API.md)** - API dokümantasyonu
- **[CUSTOMIZATION.md](docs/CUSTOMIZATION.md)** - Özelleştirme rehberi

## 🔐 Admin Panel

Admin panel sadece **localhost**'ta erişilebilir:

```
http://localhost:1112/admin
```

**Giriş Bilgileri:**
- Username: `.env.local` dosyasındaki `ADMIN_USERNAME`
- Password: `.env.local` dosyasındaki `ADMIN_PASSWORD`

**Özellikler:**
- Site konfigürasyonu düzenleme
- Hizmet yönetimi (CRUD)
- Bölge yönetimi (CRUD)
- Fiyat paketleri yönetimi
- Yorum yönetimi ve onaylama
- SSS yönetimi

**Not:** Production'da admin panel otomatik olarak devre dışı kalır.

## 🎨 Tasarım Sistemi

### Color Palette (Next.js.org Exact)

```css
Black: #171717
Blue: #0070f3
Green: #26c941
Red: #ee0000
Gray-100: #f2f2f2
Gray-200: #ebebeb
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
Font Family: Geist Sans, Geist Mono
H1 Desktop: 56px / -0.04em
H2 Desktop: 32px / -0.04em
Body: 16px / 1.6
```

## 🔒 Güvenlik

### Rate Limiting
- Contact form: 5 request/15min per IP
- Admin API: 100 request/min per IP

### Input Validation
- Zod schemas
- Server-side validation
- Honeypot field (bot koruması)

### Admin Protection
- Localhost only
- Basic Authentication
- Production'da otomatik kapalı

## 📊 Performance

### Optimizations
- React Compiler aktif
- Image optimization (Sharp)
- Code splitting (otomatik)
- Caching (LRU Cache)

### Target Scores
- Lighthouse http://localhost:1112 --view: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

## SEO

### Otomatik Features
- Dinamik metadata generation
- Schema.org markup (LocalBusiness, Service, FAQ, Review)
- Sitemap generation
- Robots.txt optimization
- Open Graph tags
- Twitter Cards

### Schema.org Types
- LocalBusiness
- Organization
- WebSite
- Service
- FAQ
- Review
- Breadcrumb

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm run test
npm run test:watch
```

### E2E Tests (Playwright)

```bash
npm run test:e2e
npm run test:e2e:ui
```

## 🐛 Troubleshooting

### Build Hatası

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Port Kullanımda

```bash
lsof -ti:1112 | xargs kill -9
# Veya
PORT=1113 npm run dev
```

### SMTP Hatası

- Gmail için App Password kullanın
- 2-Step Verification aktif olmalı
- `SMTP_SECURE=false` (port 587 için)

## 📝 Changelog

### v1.0.0 (2024-01-15)
- ✨ İlk sürüm
- ✨ Domain bağımsız yapı
- ✨ Next.js 16 App Router
- ✨ React 19
- ✨ TypeScript strict mode
- ✨ Tailwind CSS (Next.js.org design)
- ✨ SEO optimize
- ✨ Admin panel
- ✨ Email integration

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

### Commit Convention

```
feat: Yeni özellik
fix: Bug fix
docs: Dokümantasyon
style: Code formatting
refactor: Code refactoring
test: Test ekleme
chore: Maintenance
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 💬 Destek

- **Dokümantasyon:** `/docs` klasörü
- **GitHub Issues:** [Issues](https://github.com/yourusername/bilgisayar-teknik-servis/issues)
- **Email:** support@yourdomain.com

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Geist Font](https://vercel.com/font) - Typography

## 🌟 Özellikler (Detaylı)

### ✅ Domain Bağımsızlık
- Merkezi konfigürasyon sistemi
- JSON-based content management
- Herhangi bir işletme için kullanılabilir
- Hızlı kurulum (5 dakika)

### ✅ SEO Optimize
- Dinamik metadata
- Schema.org structured data
- Sitemap generation
- Robots.txt
- Open Graph & Twitter Cards

### ✅ Performance
- React Compiler
- Image optimization
- Code splitting
- Caching
- Lighthouse 90+

### ✅ Security
- Rate limiting
- Input validation
- CSRF protection
- Admin protection
- Environment variables

### ✅ Responsive
- Mobile-first design
- Touch-friendly
- iOS safe areas
- Cross-browser

### ✅ Modern Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Geist Fonts

---

**Made with ❤️ for Bilgisayar Teknik Servis işletmeleri**

**Domain bağımsız • Global • SEO optimize • Performance first**
