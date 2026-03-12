# Deployment Rehberi

Bu doküman, bilgisayar teknik servis web sitesinin production ortamına deploy edilmesi için detaylı rehberdir.

## Pre-Deployment Checklist

### 1. Konfigürasyon Kontrolü

- [ ] `config/site.json` dosyası güncellendi
- [ ] Domain bilgileri doğru
- [ ] İletişim bilgileri güncel
- [ ] SEO metadata tamamlandı
- [ ] Analytics ID'leri eklendi
- [ ] Search Console verification code eklendi

### 2. İçerik Kontrolü

- [ ] `content/services.json` dolduruldu
- [ ] `content/regions.json` dolduruldu
- [ ] `content/prices.json` dolduruldu
- [ ] `content/faq.json` dolduruldu
- [ ] `content/reviews.json` dolduruldu (onaylı yorumlar)
- [ ] `content/pages.json` tamamlandı

### 3. Görsel Kontrolü

- [ ] Logo dosyaları yüklendi (`logo.webp`)
- [ ] Favicon eklendi
- [ ] Apple touch icon eklendi
- [ ] OG image eklendi
- [ ] Hizmet görselleri optimize edildi
- [ ] Tüm görseller WebP/AVIF formatında

### 4. Environment Variables

- [ ] Production `.env` dosyası hazırlandı
- [ ] SMTP ayarları yapıldı
- [ ] Admin credentials güçlü şifre ile ayarlandı
- [ ] Google Analytics ID eklendi
- [ ] Site URL production domain olarak ayarlandı

### 5. SEO & Performance

- [ ] Meta tags kontrol edildi
- [ ] Schema.org markup test edildi
- [ ] Sitemap oluşturuldu
- [ ] Robots.txt yapılandırıldı
- [ ] Lighthouse score kontrol edildi (90+ hedef)
- [ ] Core Web Vitals optimize edildi

### 6. Security

- [ ] HTTPS sertifikası hazır
- [ ] Security headers aktif
- [ ] Rate limiting yapılandırıldı
- [ ] CORS ayarları yapıldı
- [ ] Admin panel production'da kapalı

### 7. Testing

- [ ] Unit testler geçti
- [ ] E2E testler geçti
- [ ] Form submission test edildi
- [ ] Email gönderimi test edildi
- [ ] Mobil responsive test edildi
- [ ] Cross-browser test yapıldı

## Deployment Platformları

## 1. Vercel (Önerilen)

### Avantajları
- ✅ Next.js için optimize
- ✅ Otomatik HTTPS
- ✅ Global CDN
- ✅ Otomatik preview deployments
- ✅ Zero-config deployment
- ✅ Edge Functions
- ✅ Image optimization

### Deployment Adımları

#### A. Vercel CLI ile

```bash
# Vercel CLI kurulumu
npm i -g vercel

# Login
vercel login

# İlk deployment
vercel

# Production deployment
vercel --prod
```

#### B. GitHub Integration ile

1. **GitHub Repository Oluştur**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Vercel Dashboard**
- https://vercel.com/new adresine git
- GitHub repository'yi seç
- Import et

3. **Environment Variables Ekle**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@yourdomain.com
CONTACT_EMAIL=info@yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure-password
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

4. **Deploy**
- "Deploy" butonuna tıkla
- Deployment tamamlanınca domain'i al

### Custom Domain Ekleme

1. **Vercel Dashboard → Settings → Domains**
2. Domain ekle: `yourdomain.com`
3. DNS kayıtlarını güncelle:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. SSL otomatik aktif olur

### Environment Variables Güncelleme

```bash
# Vercel CLI ile
vercel env add SMTP_HOST production
vercel env add SMTP_USER production

# Veya dashboard'dan ekle
```

### Redeployment

```bash
# Otomatik: Git push ile
git push origin main

# Manuel: CLI ile
vercel --prod

# Rollback
vercel rollback <deployment-url>
```

## 2. Netlify

### Deployment Adımları

1. **Build Settings**
```
Build command: npm run build
Publish directory: .next
```

2. **netlify.toml Oluştur**
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

3. **Environment Variables**
- Netlify Dashboard → Site settings → Environment variables
- Tüm environment variables'ı ekle

4. **Deploy**
```bash
# Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Custom Domain
- Site settings → Domain management
- Add custom domain
- DNS kayıtlarını güncelle

## 3. Railway

### Deployment

1. **Railway Dashboard**
- https://railway.app/new
- GitHub repository'yi bağla

2. **Environment Variables Ekle**
- Settings → Variables
- Tüm variables'ı ekle

3. **Deploy Settings**
```
Build Command: npm run build
Start Command: npm start
```

4. **Custom Domain**
- Settings → Domains
- Add custom domain

## 4. DigitalOcean App Platform

### Deployment

1. **App Oluştur**
- Apps → Create App
- GitHub repository seç

2. **Build & Deploy Settings**
```
Build Command: npm run build
Run Command: npm start
HTTP Port: 1112
```

3. **Environment Variables**
- Settings → App-Level Environment Variables
- Variables'ı ekle

4. **Domain**
- Settings → Domains
- Add domain

## 5. AWS (EC2 + PM2)

### Server Kurulumu

```bash
# EC2 instance'a bağlan
ssh -i your-key.pem ubuntu@your-ip

# Node.js kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 kurulumu
sudo npm install -g pm2

# Nginx kurulumu
sudo apt-get install nginx
```

### Proje Deployment

```bash
# Projeyi klonla
git clone <your-repo>
cd bilgisayar-teknik-servis

# Dependencies
npm install

# Environment variables
nano .env.local
# Variables'ı ekle

# Build
npm run build

# PM2 ile başlat
pm2 start npm --name "bilgisayar-servis" -- start

# Auto-restart
pm2 startup
pm2 save
```

### Nginx Konfigürasyonu

```nginx
# /etc/nginx/sites-available/bilgisayar-servis
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:1112;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Nginx enable
sudo ln -s /etc/nginx/sites-available/bilgisayar-servis /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL Sertifikası (Let's Encrypt)

```bash
# Certbot kurulumu
sudo apt-get install certbot python3-certbot-nginx

# SSL sertifikası al
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

## 6. Docker Deployment

### Dockerfile

```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 1112

ENV PORT 1112
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "1112:1112"
    environment:
      - NODE_ENV=production
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
    restart: unless-stopped
```

### Build & Run

```bash
# Build
docker build -t bilgisayar-servis .

# Run
docker run -p 1112:1112 --env-file .env.local bilgisayar-servis

# Docker Compose
docker-compose up -d
```

## Post-Deployment

### 1. DNS Propagation Kontrolü

```bash
# DNS kontrolü
dig yourdomain.com
nslookup yourdomain.com

# Propagation check
https://www.whatsmydns.net/
```

### 2. SSL Sertifikası Kontrolü

```bash
# SSL test
https://www.ssllabs.com/ssltest/

# Sertifika bilgisi
openssl s_client -connect yourdomain.com:443
```

### 3. Performance Test

```bash
# Lighthouse
npm install -g lighthouse
lighthouse http://localhost:1112 --view

# PageSpeed Insights
https://pagespeed.web.dev/
```

### 4. SEO Kontrolü

- **Google Search Console**
  - Property ekle
  - Sitemap gönder: `https://yourdomain.com/sitemap.xml`
  - URL inspection

- **Schema.org Validation**
  - https://validator.schema.org/
  - Rich Results Test: https://search.google.com/test/rich-results

- **Meta Tags Kontrolü**
  - https://metatags.io/
  - Open Graph: https://www.opengraph.xyz/

### 5. Analytics Kurulumu

```javascript
// Google Analytics kontrol
// Browser console'da:
window.dataLayer

// Google Tag Manager
window.google_tag_manager
```

### 6. Monitoring Kurulumu

**Uptime Monitoring:**
- UptimeRobot: https://uptimerobot.com/
- Pingdom: https://www.pingdom.com/
- StatusCake: https://www.statuscake.com/

**Error Tracking:**
- Sentry: https://sentry.io/
- LogRocket: https://logrocket.com/
- Rollbar: https://rollbar.com/

**Performance Monitoring:**
- Vercel Analytics (Vercel kullanıyorsanız)
- Google Analytics
- New Relic

## Maintenance

### Güncellemeler

```bash
# Dependencies güncelleme
npm update

# Security audit
npm audit
npm audit fix

# Rebuild & redeploy
npm run build
# Deploy komutunu çalıştır
```

### Backup

```bash
# Database backup (eğer varsa)
# Content backup
tar -czf backup-$(date +%Y%m%d).tar.gz content/ config/ public/

# Upload to cloud storage
# AWS S3, Google Cloud Storage, etc.
```

### Log Monitoring

```bash
# Vercel logs
vercel logs

# PM2 logs
pm2 logs bilgisayar-servis

# Docker logs
docker logs <container-id>
```

## Troubleshooting

### Build Hatası

```bash
# Cache temizle
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Yüklenmedi

```bash
# Vercel
vercel env pull

# Netlify
netlify env:list

# Manuel kontrol
echo $SMTP_HOST
```

### 500 Internal Server Error

1. Server logs kontrol et
2. Environment variables kontrol et
3. Database connection kontrol et (eğer varsa)
4. SMTP ayarları kontrol et

### Domain Yönlendirme Çalışmıyor

1. DNS propagation bekle (24-48 saat)
2. DNS kayıtları kontrol et
3. SSL sertifikası kontrol et
4. Nginx/Apache config kontrol et

## Rollback

### Vercel

```bash
# Previous deployment'a dön
vercel rollback <deployment-url>

# Veya dashboard'dan
# Deployments → Previous deployment → Promote to Production
```

### Git-based Deployment

```bash
# Previous commit'e dön
git revert HEAD
git push origin main

# Veya specific commit
git reset --hard <commit-hash>
git push -f origin main
```

### PM2

```bash
# Restart
pm2 restart bilgisayar-servis

# Previous version deploy
git checkout <previous-commit>
npm run build
pm2 restart bilgisayar-servis
```

## Security Best Practices

1. **HTTPS Zorunlu**: Her zaman SSL kullan
2. **Environment Variables**: Hassas bilgileri kod içine yazma
3. **Rate Limiting**: API endpoint'leri koru
4. **CORS**: Sadece gerekli origin'lere izin ver
5. **Security Headers**: CSP, X-Frame-Options, etc.
6. **Admin Panel**: Production'da kapat
7. **Dependencies**: Düzenli güncelle ve audit yap
8. **Backup**: Düzenli yedek al
9. **Monitoring**: Error tracking ve uptime monitoring
10. **Firewall**: Server firewall aktif et

## Performance Optimization

1. **Image Optimization**: WebP/AVIF kullan
2. **Code Splitting**: Otomatik (Next.js)
3. **Caching**: CDN ve browser cache
4. **Compression**: Gzip/Brotli aktif
5. **Lazy Loading**: Images ve components
6. **Minification**: CSS/JS minify
7. **Critical CSS**: Inline critical CSS
8. **Preload**: Critical resources
9. **Service Worker**: PWA için (opsiyonel)
10. **Database**: Query optimization (eğer varsa)

## Support

Deployment sorunları için:
- Platform dokümantasyonu
- GitHub Issues
- Email: support@yourdomain.com
