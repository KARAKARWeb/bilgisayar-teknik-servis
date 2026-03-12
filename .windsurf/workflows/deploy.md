---
description: Production'a deployment workflow
---

# Production Deployment Workflow

Bu workflow, projeyi production ortamına deploy etmek için adım adım rehberdir.

## Pre-Deployment Kontrolleri

### 1. Konfigürasyon Kontrolü

```bash
# config/site.json dosyasını kontrol et
cat config/site.json

# Gerekli alanlar:
# - site.name
# - site.domain
# - contact.phone
# - contact.email
# - seo.metaTitle
# - seo.metaDescription
```

### 2. Environment Variables Kontrolü

```bash
# .env.local dosyasını kontrol et
cat .env.local

# Gerekli variables:
# - SMTP_HOST
# - SMTP_USER
# - SMTP_PASS
# - CONTACT_EMAIL
# - NEXT_PUBLIC_SITE_URL
# - NEXT_PUBLIC_GA_ID (opsiyonel)
```

### 3. Content Kontrolü

```bash
# Content dosyalarını kontrol et
ls -la content/

# Gerekli dosyalar:
# - services.json (en az 1 hizmet)
# - regions.json (en az 1 bölge)
# - prices.json (en az 1 paket)
# - faq.json (en az 3 SSS)
# - pages.json (homepage içeriği)
```

### 4. Build Test

// turbo
```bash
# Build testi
npm run build
```

Eğer build başarısız olursa:
```bash
# Cache temizle
rm -rf .next node_modules
npm install
npm run build
```

### 5. Lint & Format Kontrolü

```bash
# ESLint kontrolü
npm run lint

# Prettier kontrolü
npm run format:check

# Auto-fix
npm run format
```

### 6. Test Suite

```bash
# Unit tests
npm run test

# E2E tests (opsiyonel)
npm run test:e2e
```

## Deployment Platformları

### Vercel Deployment (Önerilen)

#### İlk Deployment

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Production Deployment

```bash
# Production deploy
vercel --prod
```

#### Environment Variables Ekleme

```bash
# Vercel dashboard'dan veya CLI ile
vercel env add SMTP_HOST production
vercel env add SMTP_USER production
vercel env add SMTP_PASS production
vercel env add CONTACT_EMAIL production
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add NEXT_PUBLIC_GA_ID production
```

#### Custom Domain Ekleme

1. Vercel Dashboard → Settings → Domains
2. Domain ekle: `yourdomain.com`
3. DNS kayıtlarını güncelle:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### GitHub Integration

```bash
# GitHub repository oluştur
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

Vercel Dashboard'dan:
1. New Project
2. Import Git Repository
3. Select repository
4. Configure & Deploy

### Netlify Deployment

```bash
# Netlify CLI kurulumu
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### Railway Deployment

1. Railway Dashboard → New Project
2. Deploy from GitHub
3. Environment variables ekle
4. Deploy

## Post-Deployment Kontrolleri

### 1. Site Erişim Kontrolü

```bash
# Site açılıyor mu?
curl -I https://yourdomain.com

# SSL sertifikası aktif mi?
curl -vI https://yourdomain.com 2>&1 | grep -i ssl
```

### 2. SEO Kontrolü

**Google Search Console:**
1. Property ekle: https://search.google.com/search-console
2. Ownership verify et
3. Sitemap gönder: `https://yourdomain.com/sitemap.xml`

**Schema.org Validation:**
```bash
# Browser'da aç
https://validator.schema.org/
# URL'i gir ve validate et
```

**Rich Results Test:**
```bash
https://search.google.com/test/rich-results
```

### 3. Performance Test

```bash
# Lighthouse test
npm install -g lighthouse
lighthouse https://yourdomain.com --view

# PageSpeed Insights
# https://pagespeed.web.dev/ adresinde test et
```

Hedef skorlar:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 4. Email Test

```bash
# Contact form test
curl -X POST http://localhost:1112/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "0532 123 45 67",
    "message": "Test message",
    "privacy": true
  }'

# Email geldi mi kontrol et
```

### 5. Analytics Kontrolü

```javascript
// Browser console'da
window.dataLayer // Google Analytics
window.gtag // Google Tag Manager
```

### 6. Mobile Test

- Chrome DevTools → Device Mode
- Gerçek cihazda test
- https://search.google.com/test/mobile-friendly

### 7. Cross-Browser Test

Test edilmesi gereken tarayıcılar:
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Monitoring Setup

### Uptime Monitoring

**UptimeRobot:**
```bash
# https://uptimerobot.com/
# Monitor ekle:
# - Type: HTTP(s)
# - URL: https://yourdomain.com
# - Interval: 5 minutes
```

### Error Tracking (Opsiyonel)

**Sentry:**
```bash
npm install @sentry/nextjs

# sentry.client.config.ts
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV
})
```

### Analytics

**Google Analytics:**
- Dashboard: https://analytics.google.com/
- Real-time kontrol et
- Events tracking test et

## Rollback Prosedürü

### Vercel Rollback

```bash
# Previous deployment'a dön
vercel rollback <deployment-url>

# Veya dashboard'dan:
# Deployments → Previous → Promote to Production
```

### Git Rollback

```bash
# Son commit'i geri al
git revert HEAD
git push origin main

# Specific commit'e dön
git reset --hard <commit-hash>
git push -f origin main
```

## Maintenance

### Düzenli Kontroller (Haftalık)

```bash
# Dependencies güncelleme kontrolü
npm outdated

# Security audit
npm audit

# Uptime kontrolü
# UptimeRobot dashboard kontrol et

# Analytics kontrolü
# Google Analytics dashboard kontrol et
```

### Backup (Aylık)

```bash
# Content backup
tar -czf backup-$(date +%Y%m%d).tar.gz content/ config/ public/

# Cloud storage'a yükle
# AWS S3, Google Drive, etc.
```

### Performance Monitoring (Aylık)

```bash
# Lighthouse test
lighthouse https://yourdomain.com --view

# Core Web Vitals
# Google Search Console → Experience → Core Web Vitals
```

## Troubleshooting

### Build Hatası

```bash
# Cache temizle
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Yüklenmedi

```bash
# Vercel
vercel env pull

# Netlify
netlify env:list

# Railway
# Dashboard'dan kontrol et
```

### 500 Error

1. Server logs kontrol et
2. Environment variables kontrol et
3. SMTP ayarları kontrol et
4. Database connection kontrol et (eğer varsa)

### Domain Yönlendirme Çalışmıyor

1. DNS propagation bekle (24-48 saat)
2. DNS kayıtları kontrol et
3. SSL sertifikası kontrol et
4. Vercel/Netlify domain settings kontrol et

## Support

Deployment sorunları için:
- Documentation: `/docs/DEPLOYMENT.md`
- Vercel Support: https://vercel.com/support
- GitHub Issues
- Email: support@yourdomain.com
