# Kurulum Rehberi

Bu doküman, bilgisayar teknik servis web sitesi projesinin sıfırdan kurulumu için adım adım rehberdir.

## Sistem Gereksinimleri

### Minimum Gereksinimler
- **Node.js**: 20.x veya üzeri
- **npm**: 10.x veya üzeri
- **RAM**: 4GB minimum (8GB önerilir)
- **Disk**: 2GB boş alan

### Önerilen Geliştirme Ortamı
- **OS**: macOS, Linux, Windows 10/11
- **IDE**: VS Code, WebStorm, Cursor
- **Browser**: Chrome/Edge (DevTools için)
- **Git**: Version control

## Hızlı Başlangıç

### 1. Projeyi Klonlama

```bash
# Git ile klonlama
git clone <repository-url>
cd bilgisayar-teknik-servis

# Veya ZIP indirme
# Projeyi indirip extract edin
```

### 2. Bağımlılıkları Yükleme

```bash
# npm kullanarak
npm install

# Alternatif: yarn
yarn install

# Alternatif: pnpm
pnpm install
```

### 3. Environment Variables Ayarlama

```bash
# .env.example dosyasını kopyala
cp .env.example .env.local

# .env.local dosyasını düzenle
nano .env.local
```

**Gerekli Environment Variables:**

```env
# SMTP Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com

# Admin Panel
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-secure-password

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:1112
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Site Konfigürasyonu

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
  },
  "seo": {
    "metaTitle": "Site Başlığı",
    "metaDescription": "Site Açıklaması",
    "keywords": []
  },
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "googleTagManager": ""
  },
  "searchConsole": {
    "verificationCode": "google-site-verification-code"
  }
}
```

### 5. Development Server Başlatma

```bash
# Development mode
npm run dev

# Server http://localhost:1112 adresinde çalışacak
```

### 6. Tarayıcıda Açma

```
http://localhost:1112
```

## Detaylı Kurulum

### Gmail SMTP Ayarları

#### 1. Gmail App Password Oluşturma

1. Google Account'a giriş yapın
2. Security → 2-Step Verification'ı aktif edin
3. Security → App passwords
4. "Mail" ve "Other" seçin
5. Oluşturulan 16 haneli şifreyi kopyalayın
6. `.env.local` dosyasında `SMTP_PASS` olarak kullanın

#### 2. SMTP Konfigürasyonu

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # App password
```

### Özel SMTP Sunucusu

```env
SMTP_HOST=mail.yourdomain.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=noreply@yourdomain.com
SMTP_PASS=your-password
```

## İçerik Yönetimi

### Hizmetler (Services)

`content/services.json` dosyasını düzenleyin:

```json
[
  {
    "id": "bilgisayar-tamiri",
    "name": "Bilgisayar Tamiri",
    "slug": "bilgisayar-tamiri",
    "description": "Profesyonel bilgisayar tamir hizmeti",
    "icon": "Wrench",
    "featured": true,
    "content": "<p>Detaylı hizmet açıklaması HTML formatında</p>",
    "features": [
      "Donanım tamiri",
      "Yazılım kurulumu",
      "Veri kurtarma"
    ],
    "seo": {
      "title": "Bilgisayar Tamiri Hizmeti",
      "description": "SEO açıklaması",
      "keywords": ["bilgisayar tamiri", "pc tamiri"]
    }
  }
]
```

### Bölgeler (Regions)

`content/regions.json` dosyasını düzenleyin:

```json
[
  {
    "id": "merkez",
    "name": "Merkez",
    "slug": "merkez-bilgisayar-servisi",
    "city": "İstanbul",
    "district": "Merkez",
    "order": 1,
    "featured": true,
    "description": "Merkez bölgesi hizmet açıklaması",
    "content": {
      "main": "<p>Bölge detay içeriği</p>",
      "seo": {
        "title": "Merkez Bilgisayar Servisi",
        "description": "SEO açıklaması",
        "keywords": ["merkez bilgisayar", "merkez teknik servis"]
      }
    }
  }
]
```

### Fiyatlar (Prices)

`content/prices.json` dosyasını düzenleyin:

```json
[
  {
    "id": "basic",
    "name": "Temel Paket",
    "price": 500,
    "currency": "TRY",
    "period": "tek seferlik",
    "featured": false,
    "popular": false,
    "description": "Temel bakım ve onarım",
    "features": [
      {
        "text": "Yazılım kontrolü",
        "included": true
      },
      {
        "text": "Donanım testi",
        "included": true
      }
    ],
    "cta": {
      "text": "Hemen Başla",
      "link": "/iletisim"
    }
  }
]
```

### SSS (FAQ)

`content/faq.json` dosyasını düzenleyin:

```json
[
  {
    "id": "faq-1",
    "question": "Servis süresi ne kadar?",
    "answer": "Ortalama servis süresi 2-3 gündür.",
    "category": "genel",
    "active": true,
    "order": 1
  }
]
```

### Yorumlar (Reviews)

`content/reviews.json` dosyasını düzenleyin:

```json
[
  {
    "id": "review-1",
    "name": "Ahmet Yılmaz",
    "company": "ABC Şirketi",
    "position": "IT Müdürü",
    "rating": 5,
    "comment": "Çok memnun kaldık, teşekkürler!",
    "date": "2024-01-15",
    "approved": true,
    "featured": true,
    "categories": ["bilgisayar-tamiri"],
    "order": 1
  }
]
```

### Sayfa İçerikleri (Pages)

`content/pages.json` dosyasını düzenleyin:

```json
{
  "homepage": {
    "hero": {
      "title": "Profesyonel Bilgisayar Teknik Servis",
      "subtitle": "Hızlı, güvenilir ve uygun fiyatlı çözümler",
      "whatsappText": "WhatsApp",
      "phoneText": "Hemen Ara"
    },
    "seo": {
      "title": "Ana Sayfa SEO Başlığı",
      "description": "Ana sayfa SEO açıklaması",
      "keywords": ["bilgisayar servisi", "teknik servis"]
    },
    "seoContent1": "<p>SEO için ek içerik</p>",
    "seoContent2": "<p>SEO için ek içerik 2</p>"
  }
}
```

## Görsel Yönetimi

### Logo ve Favicon

```bash
# Logo dosyalarını public/ klasörüne ekleyin
public/
  ├── logo.webp          # Ana logo (önerilen: 200x60px)
  ├── logo-dark.webp     # Dark mode logo
  ├── favicon.ico        # Favicon (32x32px)
  └── apple-touch-icon.png  # iOS icon (180x180px)
```

### Hizmet Görselleri

```bash
public/images/services/
  ├── bilgisayar-tamiri.webp
  ├── laptop-tamiri.webp
  └── veri-kurtarma.webp
```

### Optimizasyon

```bash
# Sharp otomatik olarak görselleri optimize eder
# Önerilen formatlar: WebP, AVIF
# Maksimum boyut: 1920x1080px
```

## Admin Panel

### Erişim (Sadece Localhost)

```
http://localhost:3000/admin
```

**Giriş Bilgileri:**
- Username: `.env.local` dosyasındaki `ADMIN_USERNAME`
- Password: `.env.local` dosyasındaki `ADMIN_PASSWORD`

### Özellikler

- ✅ Site konfigürasyonu düzenleme
- ✅ Hizmet yönetimi (CRUD)
- ✅ Bölge yönetimi (CRUD)
- ✅ Fiyat paketleri yönetimi
- ✅ Yorum yönetimi ve onaylama
- ✅ SSS yönetimi
- ✅ Sayfa içerik düzenleme

**Not:** Admin panel production'da otomatik olarak devre dışı kalır (güvenlik).

## Testing

### Unit Tests

```bash
# Jest ile unit test
npm run test

# Watch mode
npm run test:watch
```

### E2E Tests

```bash
# Playwright ile E2E test
npm run test:e2e

# UI mode
npm run test:e2e:ui
```

### Tüm Testler

```bash
npm run test:all
```

## Linting & Formatting

### ESLint

```bash
# Lint kontrolü
npm run lint

# Auto-fix
npm run lint -- --fix
```

### Prettier

```bash
# Format kontrolü
npm run format:check

# Auto-format
npm run format
```

## Build & Production

### Production Build

```bash
# Build oluşturma
npm run build

# Build çıktısı .next/ klasöründe oluşur
```

### Production Server

```bash
# Production mode başlatma
npm run start

# Server http://localhost:3000 adresinde çalışır
```

### Build Optimizasyonları

Build sırasında otomatik olarak:
- ✅ React Compiler optimizasyonu
- ✅ Console.log'lar kaldırılır
- ✅ CSS optimize edilir
- ✅ Images optimize edilir
- ✅ Code splitting yapılır
- ✅ Minification
- ✅ Tree shaking

## Deployment

### Vercel (Önerilen)

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Netlify dashboard'dan ekleyin
```

### Docker

```dockerfile
# Dockerfile örneği
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Docker build
docker build -t bilgisayar-servis .

# Docker run
docker run -p 3000:3000 bilgisayar-servis
```

### VPS/Dedicated Server

```bash
# PM2 ile production
npm install -g pm2

# Build
npm run build

# PM2 ile başlat
pm2 start npm --name "bilgisayar-servis" -- start

# Auto-restart on reboot
pm2 startup
pm2 save
```

## Troubleshooting

### Port Already in Use

```bash
# Port 1112 kullanımda ise
lsof -ti:1112 | xargs kill -9

# Veya farklı port kullan
PORT=1113 npm run dev
```

### Module Not Found

```bash
# node_modules silip yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

### Build Hatası

```bash
# Cache temizle
rm -rf .next
npm run build
```

### SMTP Hatası

```bash
# Gmail için App Password kullandığınızdan emin olun
# 2-Step Verification aktif olmalı
# SMTP_SECURE=false olmalı (port 587 için)
```

## Güncelleme

### Dependencies Güncelleme

```bash
# Outdated paketleri kontrol et
npm outdated

# Güvenli güncelleme
npm update

# Major version güncelleme
npm install <package>@latest
```

### Next.js Güncelleme

```bash
# Next.js ve React güncelleme
npm install next@latest react@latest react-dom@latest

# TypeScript types güncelleme
npm install -D @types/react@latest @types/react-dom@latest
```

## Yedekleme

### Önemli Dosyalar

```bash
# Yedeklenmesi gereken dosyalar
config/site.json
content/*.json
.env.local
public/images/
```

### Otomatik Yedekleme

```bash
# Backup script örneği
#!/bin/bash
DATE=$(date +%Y%m%d)
tar -czf backup-$DATE.tar.gz config/ content/ public/images/
```

## Destek

### Dokümantasyon
- **Architecture**: `/docs/ARCHITECTURE.md`
- **API**: `/docs/API.md`
- **Deployment**: `/docs/DEPLOYMENT.md`
- **Troubleshooting**: `/docs/TROUBLESHOOTING.md`

### Yardım Kaynakları
- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs

### İletişim
- GitHub Issues
- Email: support@yourdomain.com
- Documentation: /docs
