# API Dokümantasyonu

Bu doküman, bilgisayar teknik servis web sitesinin API endpoint'lerini ve kullanımını açıklar.

## Genel Bilgiler

### Base URL
```
Development: http://localhost:1112/api
Production: https://yourdomain.com/api
```

### Response Format
Tüm API response'ları JSON formatındadır:

```json
{
  "success": true,
  "message": "İşlem başarılı",
  "data": {}
}
```

Hata durumunda:
```json
{
  "success": false,
  "error": "Hata mesajı",
  "details": {}
}
```

### Rate Limiting
- **Contact Form**: 5 request / 15 dakika per IP
- **Admin API**: 100 request / dakika per IP (localhost only)

### Authentication
Admin API endpoint'leri Basic Authentication kullanır:
```
Authorization: Basic base64(username:password)
```

## Public API Endpoints

### 1. Contact Form

İletişim formu gönderimi.

**Endpoint:** `POST /api/contact`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Ahmet Yılmaz",
  "company": "ABC Şirketi",
  "email": "ahmet@example.com",
  "phone": "0532 123 45 67",
  "service": "bilgisayar-tamiri",
  "budget": "1000-5000",
  "message": "Bilgisayarım açılmıyor, yardımcı olabilir misiniz?",
  "privacy": true,
  "website": ""
}
```

**Request Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | ✅ | Ad soyad (min: 2 karakter) |
| company | string | ❌ | Şirket adı |
| email | string | ✅ | Email adresi (valid email) |
| phone | string | ✅ | Telefon numarası (min: 10 karakter) |
| service | string | ❌ | Hizmet ID'si |
| budget | string | ❌ | Bütçe aralığı |
| message | string | ✅ | Mesaj (min: 10 karakter) |
| privacy | boolean | ✅ | Gizlilik politikası onayı (true olmalı) |
| website | string | ❌ | Honeypot field (boş olmalı) |

**Success Response:**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız."
}
```

**Error Responses:**

```json
// Validation hatası
{
  "success": false,
  "error": "Validation error",
  "details": {
    "name": "Ad en az 2 karakter olmalı",
    "email": "Geçerli bir email giriniz"
  }
}

// Rate limit
{
  "success": false,
  "error": "Too many requests. Please try again later."
}

// Honeypot triggered
{
  "success": false,
  "error": "Invalid submission"
}

// Email gönderim hatası
{
  "success": false,
  "error": "Email gönderilemedi. Lütfen tekrar deneyin."
}
```

**cURL Example:**
```bash
curl -X POST https://yourdomain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ahmet Yılmaz",
    "email": "ahmet@example.com",
    "phone": "0532 123 45 67",
    "message": "Test mesajı",
    "privacy": true
  }'
```

**JavaScript Example:**
```javascript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '0532 123 45 67',
    message: 'Test mesajı',
    privacy: true,
  }),
});

const data = await response.json();
console.log(data);
```

## Admin API Endpoints

**Not:** Admin API endpoint'leri sadece localhost'ta çalışır. Production'da 404 döner.

### Authentication

Tüm admin endpoint'leri Basic Authentication gerektirir:

```javascript
const username = process.env.ADMIN_USERNAME;
const password = process.env.ADMIN_PASSWORD;
const credentials = btoa(`${username}:${password}`);

fetch('/api/admin/config', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
```

### 1. Site Configuration

#### GET /api/admin/config

Site konfigürasyonunu getirir.

**Response:**
```json
{
  "success": true,
  "data": {
    "site": {
      "name": "Bilgisayar Teknik Servis",
      "domain": "www.example.com",
      "district": "Merkez",
      "city": "İstanbul"
    },
    "contact": {
      "phone": "0532 123 45 67",
      "email": "info@example.com",
      "whatsapp": "https://wa.me/905321234567",
      "address": "Adres bilgisi"
    },
    "seo": {
      "metaTitle": "Site Başlığı",
      "metaDescription": "Site açıklaması",
      "keywords": []
    }
  }
}
```

#### POST /api/admin/config

Site konfigürasyonunu günceller.

**Request Body:**
```json
{
  "site": {
    "name": "Yeni Site Adı",
    "domain": "www.newdomain.com"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Konfigürasyon güncellendi"
}
```

### 2. Services

#### GET /api/admin/services

Tüm hizmetleri getirir.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "bilgisayar-tamiri",
      "name": "Bilgisayar Tamiri",
      "slug": "bilgisayar-tamiri",
      "description": "Profesyonel bilgisayar tamir hizmeti",
      "featured": true,
      "content": "<p>Detaylı içerik</p>",
      "features": ["Özellik 1", "Özellik 2"],
      "seo": {
        "title": "SEO Başlığı",
        "description": "SEO Açıklaması"
      }
    }
  ]
}
```

#### POST /api/admin/services

Yeni hizmet ekler.

**Request Body:**
```json
{
  "id": "laptop-tamiri",
  "name": "Laptop Tamiri",
  "slug": "laptop-tamiri",
  "description": "Laptop tamir hizmeti",
  "icon": "Laptop",
  "featured": true,
  "content": "<p>İçerik</p>",
  "features": ["Özellik 1"],
  "seo": {
    "title": "Laptop Tamiri",
    "description": "Profesyonel laptop tamiri"
  }
}
```

#### PUT /api/admin/services/:id

Hizmeti günceller.

**Request Body:**
```json
{
  "name": "Güncellenmiş Ad",
  "description": "Güncellenmiş açıklama"
}
```

#### DELETE /api/admin/services/:id

Hizmeti siler.

**Response:**
```json
{
  "success": true,
  "message": "Hizmet silindi"
}
```

### 3. Regions

#### GET /api/admin/regions

Tüm bölgeleri getirir.

#### POST /api/admin/regions

Yeni bölge ekler.

**Request Body:**
```json
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
    "main": "<p>Detaylı içerik</p>",
    "seo": {
      "title": "Merkez Bilgisayar Servisi",
      "description": "SEO açıklaması",
      "keywords": ["merkez", "bilgisayar"]
    }
  }
}
```

#### PUT /api/admin/regions/:id

Bölgeyi günceller.

#### DELETE /api/admin/regions/:id

Bölgeyi siler.

### 4. Prices

#### GET /api/admin/prices

Tüm fiyat paketlerini getirir.

#### POST /api/admin/prices

Yeni paket ekler.

**Request Body:**
```json
{
  "id": "basic",
  "name": "Temel Paket",
  "price": 500,
  "currency": "TRY",
  "period": "tek seferlik",
  "featured": false,
  "popular": false,
  "description": "Temel bakım paketi",
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
```

#### PUT /api/admin/prices/:id

Paketi günceller.

#### DELETE /api/admin/prices/:id

Paketi siler.

### 5. Reviews

#### GET /api/admin/reviews

Tüm yorumları getirir.

**Query Parameters:**
- `approved`: boolean - Sadece onaylı yorumlar (opsiyonel)

#### POST /api/admin/reviews

Yeni yorum ekler.

**Request Body:**
```json
{
  "id": "review-1",
  "name": "Ahmet Yılmaz",
  "company": "ABC Şirketi",
  "position": "IT Müdürü",
  "rating": 5,
  "comment": "Çok memnun kaldık!",
  "date": "2024-01-15",
  "approved": false,
  "featured": false,
  "categories": ["bilgisayar-tamiri"],
  "order": 1
}
```

#### PUT /api/admin/reviews/:id

Yorumu günceller (onaylama için kullanılabilir).

**Request Body:**
```json
{
  "approved": true,
  "featured": true
}
```

#### DELETE /api/admin/reviews/:id

Yorumu siler.

### 6. FAQ

#### GET /api/admin/faq

Tüm SSS'leri getirir.

#### POST /api/admin/faq

Yeni SSS ekler.

**Request Body:**
```json
{
  "id": "faq-1",
  "question": "Servis süresi ne kadar?",
  "answer": "Ortalama 2-3 gündür.",
  "category": "genel",
  "active": true,
  "order": 1
}
```

#### PUT /api/admin/faq/:id

SSS'yi günceller.

#### DELETE /api/admin/faq/:id

SSS'yi siler.

### 7. Pages

#### GET /api/admin/pages

Tüm sayfa içeriklerini getirir.

#### PUT /api/admin/pages

Sayfa içeriklerini günceller.

**Request Body:**
```json
{
  "homepage": {
    "hero": {
      "title": "Yeni Başlık",
      "subtitle": "Yeni Alt Başlık"
    },
    "seo": {
      "title": "SEO Başlığı",
      "description": "SEO Açıklaması"
    }
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Authentication failed |
| 403 | Forbidden - Admin panel disabled in production |
| 404 | Not Found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Rate Limiting

### Contact Form
```javascript
// 5 requests per 15 minutes per IP
const limit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many requests. Please try again later.'
});
```

### Admin API
```javascript
// 100 requests per minute per IP
const limit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100
});
```

## Webhook Integration (Opsiyonel)

Form gönderimlerini webhook ile başka servislere iletebilirsiniz:

```javascript
// .env.local
WEBHOOK_URL=https://your-webhook-endpoint.com/contact

// Form submission sonrası
await fetch(process.env.WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

## Email Templates

Contact form email template:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Yeni İletişim Formu</title>
</head>
<body>
  <h2>Yeni İletişim Formu Mesajı</h2>
  
  <p><strong>Ad Soyad:</strong> {{name}}</p>
  <p><strong>Email:</strong> {{email}}</p>
  <p><strong>Telefon:</strong> {{phone}}</p>
  <p><strong>Şirket:</strong> {{company}}</p>
  <p><strong>Hizmet:</strong> {{service}}</p>
  <p><strong>Bütçe:</strong> {{budget}}</p>
  
  <h3>Mesaj:</h3>
  <p>{{message}}</p>
  
  <hr>
  <p><small>Gönderim Tarihi: {{date}}</small></p>
</body>
</html>
```

## Testing

### Contact Form Test

```bash
# Success case
curl -X POST http://localhost:1112/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0532 123 45 67",
    "message": "Test message",
    "privacy": true
  }'

# Validation error
curl -X POST http://localhost:1112/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "A",
    "email": "invalid-email",
    "phone": "123",
    "message": "Short",
    "privacy": false
  }'

# Rate limit test
for i in {1..10}; do
  curl -X POST http://localhost:1112/api/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@example.com","phone":"0532123456","message":"Test message","privacy":true}'
done
```

### Admin API Test

```bash
# Get config
curl -X GET http://localhost:1112/api/admin/config \
  -H "Authorization: Basic $(echo -n 'admin:admin123' | base64)"

# Update config
curl -X POST http://localhost:1112/api/admin/config \
  -H "Authorization: Basic $(echo -n 'admin:admin123' | base64)" \
  -H "Content-Type: application/json" \
  -d '{"site":{"name":"New Name"}}'
```

## Security

### CORS

```javascript
// next.config.ts
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
        { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
      ],
    },
  ]
}
```

### CSRF Protection

Form submission'larda honeypot field kullanılır:

```javascript
// Honeypot field - bot koruması
if (formData.website) {
  return { success: false, error: 'Invalid submission' }
}
```

### Input Sanitization

Tüm input'lar Zod ile validate edilir ve sanitize edilir:

```javascript
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000)
})
```

## Best Practices

1. **Always validate input** - Zod schemas kullan
2. **Rate limiting** - Abuse'i önle
3. **Error handling** - Detaylı error messages
4. **Logging** - Tüm API calls'ları logla
5. **Authentication** - Admin endpoints'i koru
6. **HTTPS** - Production'da sadece HTTPS
7. **CORS** - Sadece gerekli origin'lere izin ver
8. **Sanitization** - XSS ve injection saldırılarını önle
9. **Monitoring** - API performance'ı izle
10. **Documentation** - API değişikliklerini dokümante et

## Support

API ile ilgili sorular için:
- Documentation: `/docs/API.md`
- Email: support@yourdomain.com
- GitHub Issues
