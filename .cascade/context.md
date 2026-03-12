# Cascade Context - Proje Bağlamı

## Proje Amacı

Bu proje, **bilgisayar teknik servis** sektöründe faaliyet gösteren işletmeler için **domain bağımsız** ve **global** bir web sitesi şablonudur.

## Hedef Kullanıcılar

### Birincil Hedef
- Bilgisayar teknik servis işletmeleri
- Laptop/PC tamir servisleri
- IT destek şirketleri
- Bilgisayar bakım ve onarım firmaları

### İkincil Hedef
- Yazılım geliştirme şirketleri (adaptasyon ile)
- Teknoloji danışmanlık firmaları
- IT çözüm sağlayıcıları

## Proje Özellikleri

### 1. Domain Bağımsızlık

**Sorun:** Geleneksel web siteleri belirli bir işletme için hardcode edilir.

**Çözüm:** Tüm site-specific bilgiler merkezi konfigürasyon dosyalarında tutulur.

```json
// config/site.json
{
  "site": {
    "name": "Herhangi Bir İşletme Adı",
    "domain": "www.herhangibirsite.com"
  }
}
```

### 2. Global Ölçeklenebilirlik

**Özellikler:**
- Çoklu bölge desteği (sınırsız)
- Dinamik hizmet yönetimi
- Esnek fiyat paketleri
- Çoklu dil desteği hazır (gelecek)

### 3. SEO Optimize

**Otomatik SEO:**
- Dinamik metadata generation
- Schema.org structured data
- Sitemap generation
- Robots.txt optimization
- Open Graph tags
- Twitter Cards

### 4. Performance First

**Optimizasyonlar:**
- React Compiler (otomatik memoization)
- Image optimization (Sharp)
- Code splitting (route-based)
- Critical CSS inlining
- LRU caching

### 5. Modern Tasarım

**Tasarım Sistemi:**
- Next.js.org exact color palette
- Vercel-style animations
- Responsive design (mobile-first)
- Accessibility (WCAG AA)

## Teknik Mimari

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Typography:** Geist Sans & Mono
- **Icons:** Lucide React
- **Animations:** Framer Motion

### Backend
- **API Routes:** Next.js API Routes
- **Email:** Nodemailer (SMTP)
- **Validation:** Zod
- **Forms:** React Hook Form

### Data Management
- **Configuration:** JSON files
- **Content:** JSON files
- **State:** React hooks
- **Caching:** LRU Cache

### Development
- **Language:** TypeScript
- **Linting:** ESLint
- **Formatting:** Prettier
- **Testing:** Jest + Playwright

## Proje Yapısı Mantığı

### App Router Structure
```
app/
├── (frontend)/        # Public pages
│   ├── page.tsx      # Homepage
│   ├── [slug]/       # Dynamic pages
│   └── bolge/        # Region pages
├── admin/            # Admin panel (localhost only)
└── api/              # API routes
```

**Neden bu yapı?**
- Route grouping ile temiz URL'ler
- Dynamic routes ile esnek sayfa yönetimi
- Admin panel izolasyonu

### Component Organization
```
components/
├── sections/         # Page sections (Hero, Features, etc.)
├── ui/              # UI primitives (Button, Input, etc.)
├── layout/          # Layout components (Header, Footer)
├── forms/           # Form components
└── shared/          # Shared utilities
```

**Neden bu yapı?**
- Separation of concerns
- Reusability
- Easy maintenance

### Content Management
```
content/
├── services.json    # Hizmetler
├── regions.json     # Bölgeler
├── prices.json      # Fiyatlar
├── faq.json         # SSS
├── reviews.json     # Yorumlar
└── pages.json       # Sayfa içerikleri
```

**Neden JSON?**
- Kolay düzenleme
- Version control friendly
- No database dependency
- Fast read operations

## Tasarım Kararları

### 1. Next.js.org Design System

**Neden?**
- Modern ve profesyonel görünüm
- Proven design patterns
- Accessibility built-in
- Performance optimized

**Renk Paleti:**
```css
Black: #171717    /* Not #000000 */
Blue: #0070f3     /* Primary */
Green: #26c941    /* Success */
Red: #ee0000      /* Error */
```

### 2. Server Components First

**Neden?**
- Better performance
- Smaller bundle size
- SEO friendly
- Automatic code splitting

**Ne zaman Client Component?**
- User interactions (onClick, onChange)
- Browser APIs (localStorage, window)
- React hooks (useState, useEffect)

### 3. TypeScript Strict Mode

**Neden?**
- Type safety
- Better IDE support
- Fewer runtime errors
- Self-documenting code

### 4. Tailwind CSS

**Neden?**
- Utility-first approach
- Consistent design system
- Small bundle size (purge)
- Fast development

**Alternatif neden değil?**
- CSS Modules: Daha fazla dosya
- Styled Components: Runtime overhead
- CSS-in-JS: Performance issues

## Güvenlik Kararları

### 1. Admin Panel Localhost Only

**Neden?**
- Production'da saldırı yüzeyi yok
- No authentication complexity
- Simple and secure

**Nasıl?**
```typescript
// middleware.ts
if (!isLocalhost && pathname.startsWith('/admin')) {
  return NextResponse.redirect('/', 301)
}
```

### 2. Rate Limiting

**Neden?**
- Spam koruması
- DDoS prevention
- Resource protection

**Limitler:**
- Contact form: 5 req/15min per IP
- Admin API: 100 req/min per IP

### 3. Input Validation

**Neden?**
- XSS prevention
- SQL injection prevention
- Data integrity

**Nasıl?**
- Zod schemas
- Server-side validation
- Sanitization

### 4. Environment Variables

**Neden?**
- Sensitive data koruması
- Environment-specific config
- No hardcoded secrets

## Performance Kararları

### 1. React Compiler

**Neden?**
- Otomatik memoization
- No manual optimization
- Better performance

### 2. Image Optimization

**Neden?**
- Faster page loads
- Better Core Web Vitals
- Automatic format conversion

**Nasıl?**
- Next.js Image component
- Sharp processing
- WebP/AVIF formats

### 3. Code Splitting

**Neden?**
- Smaller initial bundle
- Faster first paint
- Better caching

**Nasıl?**
- Route-based (otomatik)
- Component-based (dynamic import)

### 4. Caching Strategy

**Neden?**
- Faster data access
- Reduced API calls
- Better UX

**Nasıl?**
- ISR (Incremental Static Regeneration)
- LRU Cache
- Browser caching

## SEO Stratejisi

### 1. Dynamic Metadata

**Neden?**
- Her sayfa için optimize
- Automatic generation
- Consistent format

### 2. Schema.org Markup

**Neden?**
- Rich snippets
- Better search visibility
- Voice search optimization

**Schemas:**
- LocalBusiness
- Service
- FAQ
- Review
- Breadcrumb

### 3. Sitemap Generation

**Neden?**
- Better crawlability
- Faster indexing
- Complete site coverage

### 4. Performance = SEO

**Core Web Vitals:**
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## Deployment Stratejisi

### Vercel (Önerilen)

**Neden?**
- Next.js optimize
- Zero-config
- Global CDN
- Automatic HTTPS
- Preview deployments

### Alternatifler

**Netlify:**
- Good alternative
- Similar features
- Different pricing

**Railway:**
- Full-stack platform
- Database support
- Good for complex apps

**VPS/Docker:**
- Full control
- Custom setup
- More maintenance

## Gelecek Planları

### Kısa Vadeli
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Blog system
- [ ] Advanced analytics

### Orta Vadeli
- [ ] CMS integration
- [ ] E-commerce features
- [ ] Appointment booking
- [ ] Live chat integration

### Uzun Vadeli
- [ ] Mobile app (React Native)
- [ ] PWA features
- [ ] AI chatbot
- [ ] Advanced automation

## Öğrenme Kaynakları

### Next.js
- Official Docs: https://nextjs.org/docs
- Learn Next.js: https://nextjs.org/learn

### React
- React Docs: https://react.dev
- React Patterns: https://reactpatterns.com

### TypeScript
- TypeScript Handbook: https://www.typescriptlang.org/docs
- Type Challenges: https://github.com/type-challenges/type-challenges

### Tailwind CSS
- Tailwind Docs: https://tailwindcss.com/docs
- Tailwind UI: https://tailwindui.com

### SEO
- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org

## Katkıda Bulunma

### Kod Standartları
- TypeScript strict mode
- ESLint rules
- Prettier formatting
- Conventional commits

### Testing
- Unit tests (Jest)
- E2E tests (Playwright)
- Performance tests (Lighthouse)

### Documentation
- Code comments
- README updates
- API documentation
- Architecture decisions

## Lisans & Kullanım

Bu proje, bilgisayar teknik servis işletmeleri için **domain bağımsız** ve **global** bir şablon olarak tasarlanmıştır. Herhangi bir işletme için kullanılabilir ve özelleştirilebilir.

## İletişim & Destek

- Documentation: `/docs`
- GitHub Issues
- Email: support@yourdomain.com
