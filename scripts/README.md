# Test Bot Kullanım Kılavuzu

## Kurulum

```bash
# Node.js kurulu olmalı (v18+)
node --version

# Test bot'u çalıştırmadan önce dev server'ı başlat
npm run dev
```

## Kullanım

```bash
# Test bot'u çalıştır
node scripts/test-bot.js

# Veya package.json'a script ekleyerek
npm run test:bot
```

## Ne Test Eder?

### 1. Frontend Sayfaları (13 sayfa)
- HTTP status kontrolü (200 OK)
- Title tag varlığı
- H1 tag varlığı
- Schema markup varlığı
- Meta description varlığı
- Error mesajı kontrolü

### 2. API Endpoints (3 endpoint)
- POST request testi
- Validation kontrolü
- Rate limiting kontrolü
- Error handling

### 3. UI Components (15+ component)
- Dosya varlığı
- Export kontrolü
- TypeScript kullanımı
- Dosya boyutu

### 4. Schema Markup (10 schema tipi)
- LocalBusiness
- Organization
- WebSite
- BreadcrumbList
- FAQPage
- Service
- Product
- Review
- Article
- HowTo

### 5. Config Dosyaları (6 dosya)
- JSON geçerliliği
- Boş olmama kontrolü
- Yapı kontrolü

## Çıktı

Test sonuçları konsola yazdırılır ve `test-report.json` dosyasına kaydedilir.

### Örnek Çıktı:

```
🤖 Automated Test Bot Başlatılıyor...

🔍 Frontend Sayfaları Test Ediliyor...

✅ Ana Sayfa (/)
✅ Kurumsal (/kurumsal)
❌ Hizmetlerimiz (/hizmetlerimiz)
   Hatalar: hasSchema

...

📊 TEST SONUÇLARI
============================================================
Toplam Test: 45
✅ Başarılı: 42
❌ Başarısız: 3
⏭️  Atlanan: 0
📈 Başarı Oranı: 93.33%
============================================================
```

## Package.json'a Ekleme

```json
{
  "scripts": {
    "test:bot": "node scripts/test-bot.js",
    "test:full": "npm run build && npm run test:bot"
  }
}
```

## CI/CD Entegrasyonu

GitHub Actions için `.github/workflows/test.yml`:

```yaml
name: Automated Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run dev &
      - run: sleep 10
      - run: npm run test:bot
```
