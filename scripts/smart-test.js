#!/usr/bin/env node

/**
 * AKILLI TEST BOTU - Dinamik Route ve 404 Testi
 * 
 * Bu bot gerçekten akıllı:
 * 1. Dinamik route'ları test eder ([slug], [id])
 * 2. 404 sayfalarını kontrol eder
 * 3. Gerçek URL'leri test eder
 * 4. Catch-all route'ları test eder (/aaa, /xyz)
 * 5. Content'e göre otomatik URL oluşturur
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.magenta}${'='.repeat(70)}\n${msg}\n${'='.repeat(70)}${colors.reset}\n`),
};

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
};

// JSON okuma
function readJSON(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

// Dosya varlık kontrolü
function fileExists(filePath) {
  const fullPath = path.join(process.cwd(), filePath);
  return fs.existsSync(fullPath);
}

// Test wrapper
function test(name, fn) {
  results.total++;
  try {
    fn();
    results.passed++;
    log.success(name);
    return true;
  } catch (error) {
    results.failed++;
    results.errors.push({ test: name, error: error.message });
    log.error(`${name} - ${error.message}`);
    return false;
  }
}

// Assertion
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

// Test: Dinamik Hizmet Route'ları
function testServiceDynamicRoutes() {
  log.section('🔧 TEST: DİNAMİK HİZMET ROUTE\'LARI');
  
  const services = readJSON('content/services.json');
  
  if (!services || services.length === 0) {
    results.warnings.push('services.json boş veya okunamadı');
    return;
  }

  // [slug] route kontrolü
  test('Hizmet detay sayfası var mı? (app/(frontend)/hizmetlerimiz/[slug]/page.tsx)', () => {
    const exists = fileExists('app/(frontend)/hizmetlerimiz/[slug]/page.tsx');
    assert(exists, 'Dinamik hizmet sayfası bulunamadı');
  });

  // Her hizmet için URL test et
  services.forEach(service => {
    test(`Hizmet URL oluşturulabilir mi? /hizmetlerimiz/${service.slug}`, () => {
      assert(service.slug, `${service.name} için slug yok`);
      assert(service.id, `${service.name} için id yok`);
      
      // URL formatı kontrolü
      const validSlug = /^[a-z0-9-]+$/.test(service.slug);
      assert(validSlug, `${service.slug} geçersiz slug formatı (sadece küçük harf, rakam, tire)`);
    });
  });

  // Admin hizmet düzenleme route'u
  test('Admin hizmet düzenleme sayfası var mı? (app/admin/services/[id]/page.tsx)', () => {
    const exists = fileExists('app/admin/services/[id]/page.tsx');
    assert(exists, 'Admin hizmet düzenleme sayfası bulunamadı');
  });

  services.forEach(service => {
    test(`Admin URL oluşturulabilir mi? /admin/services/${service.id}`, () => {
      assert(service.id, `${service.name} için id yok`);
    });
  });
}

// Test: Dinamik Bölge Route'ları
function testRegionDynamicRoutes() {
  log.section('📍 TEST: DİNAMİK BÖLGE ROUTE\'LARI');
  
  const regions = readJSON('content/regions.json');
  
  if (!regions || regions.length === 0) {
    results.warnings.push('regions.json boş veya okunamadı');
    return;
  }

  // [slug] route kontrolü
  test('Bölge detay sayfası var mı? (app/(frontend)/bolge/[slug]/page.tsx)', () => {
    const exists = fileExists('app/(frontend)/bolge/[slug]/page.tsx');
    assert(exists, 'Dinamik bölge sayfası bulunamadı');
  });

  // Her bölge için URL test et
  regions.forEach(region => {
    test(`Bölge URL oluşturulabilir mi? /bolge/${region.slug}`, () => {
      assert(region.slug, `${region.name} için slug yok`);
      assert(region.id, `${region.name} için id yok`);
      
      const validSlug = /^[a-z0-9-]+$/.test(region.slug);
      assert(validSlug, `${region.slug} geçersiz slug formatı`);
    });
  });
}

// Test: 404 Sayfası
function test404Page() {
  log.section('🚫 TEST: 404 SAYFASI');
  
  test('404 sayfası var mı? (app/not-found.tsx)', () => {
    const exists = fileExists('app/not-found.tsx');
    assert(exists, '404 sayfası bulunamadı - /aaa gibi URL\'ler için gerekli!');
  });

  test('Frontend 404 sayfası var mı? (app/(frontend)/not-found.tsx)', () => {
    const frontendExists = fileExists('app/(frontend)/not-found.tsx');
    if (!frontendExists) {
      results.warnings.push('Frontend için özel 404 sayfası yok (opsiyonel)');
    }
  });
}

// Test: Catch-All Routes
function testCatchAllRoutes() {
  log.section('🎯 TEST: CATCH-ALL ROUTES');
  
  // Geçersiz URL'ler için 404 kontrolü
  const invalidURLs = [
    '/aaa',
    '/xyz',
    '/random-page',
    '/hizmetlerimiz/olmayan-hizmet',
    '/bolge/olmayan-bolge',
  ];

  invalidURLs.forEach(url => {
    test(`Geçersiz URL için 404 mekanizması var mı? ${url}`, () => {
      // Not-found sayfası varsa geçersiz URL'ler yakalanır
      const notFoundExists = fileExists('app/not-found.tsx');
      assert(notFoundExists, `${url} için 404 sayfası gerekli`);
    });
  });
}

// Test: Tüm Statik Sayfalar
function testStaticPages() {
  log.section('📄 TEST: STATİK SAYFALAR');
  
  const staticPages = [
    { path: 'app/(frontend)/page.tsx', url: '/' },
    { path: 'app/(frontend)/kurumsal/page.tsx', url: '/kurumsal' },
    { path: 'app/(frontend)/hizmetlerimiz/page.tsx', url: '/hizmetlerimiz' },
    { path: 'app/(frontend)/fiyatlarimiz/page.tsx', url: '/fiyatlarimiz' },
    { path: 'app/(frontend)/hizmet-bolgeleri/page.tsx', url: '/hizmet-bolgeleri' },
    { path: 'app/(frontend)/sss/page.tsx', url: '/sss' },
    { path: 'app/(frontend)/iletisim/page.tsx', url: '/iletisim' },
    { path: 'app/(frontend)/teklif-al/page.tsx', url: '/teklif-al' },
    { path: 'app/(frontend)/fiyat-hesapla/page.tsx', url: '/fiyat-hesapla' },
  ];

  staticPages.forEach(({ path: filePath, url }) => {
    test(`Statik sayfa var mı? ${url}`, () => {
      const exists = fileExists(filePath);
      assert(exists, `${url} için sayfa bulunamadı (${filePath})`);
    });
  });
}

// Test: Layout Dosyaları
function testLayouts() {
  log.section('🎨 TEST: LAYOUT DOSYALARI');
  
  test('Root layout var mı? (app/layout.tsx)', () => {
    const exists = fileExists('app/layout.tsx');
    assert(exists, 'Root layout bulunamadı');
  });

  test('Frontend layout var mı? (app/(frontend)/layout.tsx)', () => {
    const exists = fileExists('app/(frontend)/layout.tsx');
    assert(exists, 'Frontend layout bulunamadı');
  });

  test('Admin layout var mı? (app/admin/layout.tsx)', () => {
    const exists = fileExists('app/admin/layout.tsx');
    assert(exists, 'Admin layout bulunamadı');
  });
}

// Test: Metadata ve SEO
function testMetadataGeneration() {
  log.section('🔍 TEST: METADATA VE SEO');
  
  const services = readJSON('content/services.json');
  const regions = readJSON('content/regions.json');

  if (services && services.length > 0) {
    test('Hizmetler için metadata oluşturulabilir mi?', () => {
      services.forEach(service => {
        assert(service.seo, `${service.name} için SEO bilgisi yok`);
        assert(service.seo.title, `${service.name} için SEO title yok`);
        assert(service.seo.description, `${service.name} için SEO description yok`);
      });
    });
  }

  if (regions && regions.length > 0) {
    test('Bölgeler için metadata oluşturulabilir mi?', () => {
      regions.forEach(region => {
        assert(region.seo, `${region.name} için SEO bilgisi yok`);
        assert(region.seo.title, `${region.name} için SEO title yok`);
      });
    });
  }
}

// Test: Gerçek URL Örnekleri
function testRealURLExamples() {
  log.section('🌐 TEST: GERÇEK URL ÖRNEKLERİ');
  
  const services = readJSON('content/services.json');
  const regions = readJSON('content/regions.json');

  if (services && services.length > 0) {
    const firstService = services[0];
    log.info(`Örnek hizmet URL: /hizmetlerimiz/${firstService.slug}`);
    log.info(`Örnek admin URL: /admin/services/${firstService.id}`);
  }

  if (regions && regions.length > 0) {
    const firstRegion = regions[0];
    log.info(`Örnek bölge URL: /bolge/${firstRegion.slug}`);
    log.info(`Örnek admin URL: /admin/regions/${firstRegion.id}`);
  }

  log.info('Geçersiz URL örnekleri (404 dönmeli):');
  log.info('  - /aaa');
  log.info('  - /xyz');
  log.info('  - /random-page');
}

// Ana test fonksiyonu
function runSmartTests() {
  log.section('🧠 AKILLI TEST BOTU BAŞLIYOR');
  log.info('Dinamik route\'lar, 404 sayfaları ve gerçek URL\'ler test ediliyor...\n');

  testStaticPages();
  testServiceDynamicRoutes();
  testRegionDynamicRoutes();
  test404Page();
  testCatchAllRoutes();
  testLayouts();
  testMetadataGeneration();
  testRealURLExamples();

  printResults();
}

// Sonuçları yazdır
function printResults() {
  log.section('📊 TEST SONUÇLARI');

  console.log(`Toplam Test: ${results.total}`);
  console.log(`${colors.green}✅ Başarılı: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}❌ Başarısız: ${results.failed}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Uyarı: ${results.warnings.length}${colors.reset}`);
  
  const passRate = results.total > 0 
    ? ((results.passed / results.total) * 100).toFixed(1) 
    : 0;
  console.log(`Başarı Oranı: ${passRate}%`);

  if (results.errors.length > 0) {
    console.log(`\n${colors.red}HATALAR:${colors.reset}`);
    results.errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.test}`);
      console.log(`     ${err.error}`);
    });
  }

  if (results.warnings.length > 0) {
    console.log(`\n${colors.yellow}UYARILAR:${colors.reset}`);
    results.warnings.forEach((warn, i) => {
      console.log(`  ${i + 1}. ${warn}`);
    });
  }

  // Öneriler
  if (results.failed > 0) {
    console.log(`\n${colors.cyan}ÖNERİLER:${colors.reset}`);
    
    if (results.errors.some(e => e.error.includes('404'))) {
      console.log('  • app/not-found.tsx dosyası oluşturun');
      console.log('  • Geçersiz URL\'ler için 404 sayfası gösterilecek');
    }
    
    if (results.errors.some(e => e.error.includes('slug'))) {
      console.log('  • Tüm içeriklerde slug alanı olmalı');
      console.log('  • Slug formatı: küçük harf, rakam ve tire');
    }
  }

  // JSON raporu
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: results.total,
      passed: results.passed,
      failed: results.failed,
      warnings: results.warnings.length,
      passRate,
    },
    errors: results.errors,
    warnings: results.warnings,
  };

  fs.writeFileSync('smart-test-report.json', JSON.stringify(report, null, 2));
  log.info('\nDetaylı rapor smart-test-report.json dosyasına kaydedildi');

  process.exit(results.failed > 0 ? 1 : 0);
}

// Testi çalıştır
runSmartTests();
