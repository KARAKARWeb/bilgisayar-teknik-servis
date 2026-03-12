# Özelleştirme Rehberi

Bu doküman, bilgisayar teknik servis web sitesinin farklı işletmeler için nasıl özelleştirileceğini açıklar.

## Domain Bağımsızlık Prensibi

Bu proje, **herhangi bir bilgisayar teknik servis işletmesi** için kullanılabilir şekilde tasarlanmıştır. Tüm site-specific bilgiler merkezi konfigürasyon dosyalarında tutulur.

## Hızlı Özelleştirme (5 Adım)

### 1. Site Bilgilerini Güncelle

`config/site.json` dosyasını düzenle:

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

### 2. Hizmetleri Tanımla

`content/services.json` dosyasını düzenle:

```json
[
  {
    "id": "bilgisayar-tamiri",
    "name": "Bilgisayar Tamiri",
    "slug": "bilgisayar-tamiri",
    "description": "Kısa açıklama",
    "icon": "Wrench",
    "featured": true,
    "content": "<p>Detaylı HTML içerik</p>",
    "features": ["Özellik 1", "Özellik 2"],
    "seo": {
      "title": "SEO Başlığı",
      "description": "SEO Açıklaması",
      "keywords": ["anahtar", "kelimeler"]
    }
  }
]
```

### 3. Hizmet Bölgelerini Ekle

`content/regions.json` dosyasını düzenle:

```json
[
  {
    "id": "merkez",
    "name": "Merkez",
    "slug": "merkez-bilgisayar-servisi",
    "city": "İstanbul",
    "district": "Merkez",
    "featured": true,
    "description": "Bölge açıklaması"
  }
]
```

### 4. Logo ve Görselleri Ekle

```bash
public/
  ├── logo.webp              # Ana logo
  ├── favicon.ico            # Favicon
  └── apple-touch-icon.png   # iOS icon
```

### 5. Environment Variables Ayarla

`.env.local` dosyasını oluştur:

```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=info@sizdomain.com
NEXT_PUBLIC_SITE_URL=https://sizdomain.com
```

## Detaylı Özelleştirme

### Site Konfigürasyonu

#### Temel Bilgiler

```json
{
  "site": {
    "name": "İşletme Adı",           // Site başlığında görünür
    "domain": "www.domain.com",       // Canonical URL için
    "district": "İlçe",               // Schema.org için
    "city": "Şehir",                  // Schema.org için
    "title": "Tam Başlık",            // Opsiyonel
    "country": "Türkiye"              // Opsiyonel
  }
}
```

#### İletişim Bilgileri

```json
{
  "contact": {
    "phone": "0XXX XXX XX XX",
    "phoneInternational": "+90XXXXXXXXXX",  // tel: link için
    "email": "info@domain.com",
    "website": "https://www.domain.com",
    "whatsapp": "https://wa.me/90XXXXXXXXXX?text=Merhaba",
    "liveSupport": "https://tawk.to/...",   // Opsiyonel
    
    "address": {
      "street": "Sokak Adı No:X",
      "district": "İlçe",
      "city": "Şehir",
      "postalCode": "34XXX",
      "country": "TR"
    },
    
    "geo": {
      "latitude": "40.XXXXX",
      "longitude": "29.XXXXX"
    },
    
    "workingHours": {
      "weekdays": "09:00-18:00",
      "saturday": "09:00-13:00",
      "sunday": "Kapalı"
    }
  }
}
```

#### SEO Ayarları

```json
{
  "seo": {
    "metaTitle": "Site Başlığı (max 60 karakter)",
    "metaDescription": "Site açıklaması (max 160 karakter)",
    "keywords": ["anahtar", "kelime", "listesi"],
    "ogImage": "/og-image.jpg",
    "favicon": "/favicon.ico",
    "logo": "/logo.webp"
  }
}
```

#### Analytics & Integrations

```json
{
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "googleTagManager": "GTM-XXXXXXX"
  },
  
  "searchConsole": {
    "verificationCode": "google-site-verification-code"
  },
  
  "integrations": {
    "googleMapsApiKey": "AIzaSy...",
    "facebookPixel": "XXXXXXXXX",
    "tawkTo": "https://embed.tawk.to/..."
  }
}
```

#### Schema.org Bilgileri

```json
{
  "schema": {
    "localBusiness": {
      "name": "İşletme Adı",
      "description": "İşletme açıklaması",
      "slogan": "Slogan",
      "award": "Ödüller",
      "priceRange": "₺₺-₺₺₺",
      "areaServed": "Hizmet verilen bölge",
      "knowsAbout": ["Bilgisayar", "Laptop", "Tablet"]
    },
    
    "organization": {
      "foundedYear": "2020",
      "employeeCount": "5-10",
      "legalName": "Yasal İşletme Adı"
    },
    
    "aggregateRating": {
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
}
```

### Hizmet Tanımlama

#### Temel Hizmet Yapısı

```json
{
  "id": "unique-id",                    // Benzersiz ID
  "name": "Hizmet Adı",                 // Görünen ad
  "slug": "hizmet-adi",                 // URL slug
  "description": "Kısa açıklama",       // Kart açıklaması
  "icon": "Wrench",                     // Lucide icon adı
  "image": "/images/service.webp",      // Opsiyonel görsel
  "imageAlt": "Görsel açıklaması",      // Alt text
  "featured": true,                     // Ana sayfada göster
  "order": 1,                           // Sıralama
  
  "content": "<h2>Başlık</h2><p>HTML içerik</p>",
  
  "features": [
    "Özellik 1",
    "Özellik 2",
    "Özellik 3"
  ],
  
  "seo": {
    "title": "SEO Başlığı (max 60)",
    "description": "SEO Açıklaması (max 160)",
    "keywords": ["anahtar", "kelimeler"],
    "ogImage": "/images/service-og.jpg"
  }
}
```

#### Icon Seçenekleri

Lucide React icon'ları kullanılır:

```javascript
// Popüler icon'lar
"Wrench"          // Tamir
"Laptop"          // Laptop
"Monitor"         // Masaüstü
"HardDrive"       // Donanım
"Database"        // Veri
"Shield"          // Güvenlik
"Zap"             // Hız
"Settings"        // Ayarlar
"Code"            // Yazılım
"Wifi"            // Network
```

Tüm icon listesi: https://lucide.dev/icons/

#### HTML İçerik Formatı

```html
<h2>Ana Başlık</h2>
<p>Paragraf metni. <strong>Kalın</strong> ve <em>italik</em> kullanabilirsiniz.</p>

<h3>Alt Başlık</h3>
<ul>
  <li>Liste öğesi 1</li>
  <li>Liste öğesi 2</li>
</ul>

<table>
  <thead>
    <tr>
      <th>Başlık 1</th>
      <th>Başlık 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Veri 1</td>
      <td>Veri 2</td>
    </tr>
  </tbody>
</table>
```

### Bölge Tanımlama

```json
{
  "id": "unique-id",
  "name": "Bölge Adı",
  "slug": "bolge-adi-bilgisayar-servisi",
  "city": "Şehir",
  "district": "İlçe",
  "order": 1,
  "featured": true,
  
  "description": "Kısa bölge açıklaması",
  
  "hero": {
    "title": "Bölge Adı Bilgisayar Servisi",
    "subtitle": "Hızlı ve güvenilir hizmet"
  },
  
  "content": {
    "main": "<p>Detaylı HTML içerik</p>",
    "seo": {
      "title": "SEO Başlığı",
      "description": "SEO Açıklaması",
      "keywords": ["bölge", "bilgisayar", "servis"]
    }
  },
  
  "services": ["service-id-1", "service-id-2"],
  "prices": ["price-id-1", "price-id-2"],
  
  "faq": [
    {
      "question": "Soru?",
      "answer": "Cevap"
    }
  ],
  
  "publishedDate": "2024-01-15T00:00:00.000Z"
}
```

### Fiyat Paketleri

```json
{
  "id": "basic",
  "name": "Temel Paket",
  "price": 500,
  "currency": "TRY",
  "period": "tek seferlik",
  "featured": false,
  "popular": true,
  "description": "Temel bakım ve onarım paketi",
  "buttonColor": "blue",  // "blue" | "white" | "gray"
  
  "features": [
    {
      "text": "Yazılım kontrolü",
      "included": true
    },
    {
      "text": "Donanım testi",
      "included": true
    },
    {
      "text": "Veri kurtarma",
      "included": false
    }
  ],
  
  "cta": {
    "text": "Hemen Başla",
    "link": "/iletisim"
  },
  
  "seo": {
    "inStock": true,
    "validUntil": "2024-12-31"
  }
}
```

### Yorumlar

```json
{
  "id": "review-1",
  "name": "Müşteri Adı",
  "company": "Şirket Adı",
  "position": "Pozisyon",
  "photo": "/images/customer.jpg",
  "rating": 5,
  "comment": "Yorum metni",
  "date": "2024-01-15",
  "service": "service-id",
  "region": "region-id",
  "approved": true,
  "featured": true,
  "categories": ["bilgisayar-tamiri"],
  "order": 1
}
```

### SSS (FAQ)

```json
{
  "id": "faq-1",
  "question": "Soru metni?",
  "answer": "Cevap metni. HTML kullanabilirsiniz.",
  "category": "genel",
  "region": "region-id",  // Opsiyonel
  "active": true,
  "order": 1
}
```

**Kategori Örnekleri:**
- `genel` - Genel sorular
- `fiyat` - Fiyatlandırma
- `hizmet` - Hizmetler
- `teknik` - Teknik detaylar
- `garanti` - Garanti ve iade

### Sayfa İçerikleri

```json
{
  "homepage": {
    "hero": {
      "title": "Ana Başlık",
      "subtitle": "Alt başlık",
      "whatsappText": "WhatsApp",
      "phoneText": "Hemen Ara"
    },
    
    "seo": {
      "title": "Ana Sayfa SEO Başlığı",
      "description": "Ana sayfa açıklaması",
      "keywords": ["anahtar", "kelimeler"]
    },
    
    "seoContent1": "<p>SEO için ek içerik 1</p>",
    "seoContent2": "<p>SEO için ek içerik 2</p>",
    
    "sections": {
      "services": {
        "title": "Hizmetlerimiz",
        "subtitle": "Profesyonel çözümler"
      },
      "features": {
        "title": "Neden Biz?",
        "items": [
          {
            "title": "Özellik 1",
            "description": "Açıklama"
          }
        ]
      }
    }
  },
  
  "about": {
    "hero": {
      "title": "Hakkımızda",
      "subtitle": "Hikayemiz"
    },
    "content": "<p>Hakkımızda içeriği</p>"
  }
}
```

## Tasarım Özelleştirme

### Renk Paleti

`tailwind.config.ts` dosyasında renkleri özelleştirin:

```typescript
colors: {
  // Brand renkleri
  primary: {
    DEFAULT: '#0070f3',
    light: '#3291ff',
    dark: '#0761d1'
  },
  
  // Özel renkler ekle
  brand: {
    500: '#YOUR_COLOR',
    600: '#YOUR_COLOR_DARK'
  }
}
```

### Typography

```typescript
fontSize: {
  'hero': ['4rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
  'custom': ['2rem', { lineHeight: '1.2' }]
}
```

### Logo Boyutları

```css
/* components/layout/header.tsx */
.logo {
  width: 200px;   /* Desktop */
  height: 60px;
}

@media (max-width: 768px) {
  .logo {
    width: 150px;  /* Mobile */
    height: 45px;
  }
}
```

### Custom CSS

`app/globals.css` dosyasına ekleyin:

```css
/* Özel stiller */
.custom-section {
  background: linear-gradient(to right, #color1, #color2);
  padding: 4rem 0;
}

.custom-button {
  background: var(--brand-color);
  border-radius: 8px;
  padding: 12px 24px;
}
```

## Component Özelleştirme

### Hero Section

`components/sections/hero.tsx` dosyasını düzenle:

```typescript
// Arka plan rengi değiştir
<div className="bg-gradient-to-b from-blue-50 to-white">

// Animasyon hızı ayarla
<div className="animate-pulse" style={{ animationDuration: '3s' }}>

// Grid pattern boyutu
backgroundSize: '100px 100px'  // Varsayılan: 80px
```

### Button Stilleri

`components/ui/button.tsx`:

```typescript
// Yeni variant ekle
{
  'bg-brand-600 text-white hover:bg-brand-700': variant === 'brand',
}

// Yeni boyut ekle
{
  'h-14 px-8 text-lg rounded-lg': size === 'xl',
}
```

### Footer

`components/layout/footer.tsx`:

```typescript
// Footer rengi
<footer className="bg-gray-900 text-white">

// Footer içeriği
{
  title: "Hakkımızda",
  links: [
    { name: "Kurumsal", href: "/kurumsal" },
    { name: "Ekibimiz", href: "/ekibimiz" }
  ]
}
```

## Email Template Özelleştirme

`lib/email.ts` dosyasını düzenle:

```typescript
const emailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; }
    .header { background: #0070f3; color: white; padding: 20px; }
    .content { padding: 20px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${config.site.name}</h1>
  </div>
  <div class="content">
    <h2>Yeni İletişim Formu</h2>
    <p><strong>Ad:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Mesaj:</strong> ${data.message}</p>
  </div>
</body>
</html>
`;
```

## Multi-Language Support (Gelecek)

Çoklu dil desteği için yapı hazır:

```typescript
// lib/i18n.ts (oluşturulacak)
export const translations = {
  tr: {
    hero: {
      title: "Profesyonel Bilgisayar Servisi"
    }
  },
  en: {
    hero: {
      title: "Professional Computer Service"
    }
  }
};
```

## Performance Optimizasyonu

### Image Optimization

```typescript
// next.config.ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200],
  imageSizes: [16, 32, 48, 64, 96]
}
```

### Font Loading

```typescript
// app/layout.tsx
const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',      // FOUT önleme
  preload: true,        // Preload
  fallback: ['system-ui', 'sans-serif']
});
```

## Testing Özelleştirmeleri

```bash
# Değişiklikleri test et
npm run dev

# Build test
npm run build

# Production test
npm start

# Lighthouse test
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

## Deployment Öncesi Checklist

- [ ] Tüm config dosyaları güncellendi
- [ ] Content dosyaları dolduruldu
- [ ] Logo ve görseller eklendi
- [ ] Environment variables ayarlandı
- [ ] SEO metadata kontrol edildi
- [ ] Analytics ID'leri eklendi
- [ ] Email testi yapıldı
- [ ] Mobil responsive test edildi
- [ ] Performance test yapıldı
- [ ] Cross-browser test yapıldı

## Destek

Özelleştirme ile ilgili sorular için:
- Documentation: `/docs`
- Email: support@yourdomain.com
- GitHub Issues
