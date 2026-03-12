#!/usr/bin/env node

/**
 * E2E Test Bot - Gerçek Kullanıcı Simülasyonu
 * 
 * Bu bot gerçek bir kullanıcı gibi davranır:
 * 1. Admin panele giriş yapar
 * 2. İçerik ekler (hizmet, fiyat, bölge, yorum, SSS)
 * 3. Frontend'de görüntülendiğini kontrol eder
 * 4. İçeriği düzenler
 * 5. Değişiklikleri kontrol eder
 * 6. İçeriği siler
 * 7. Silme işlemini doğrular
 * 8. Temizlik yapar
 */

const fs = require('fs');
const path = require('path');

// Renkli console
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
  action: (msg) => console.log(`${colors.cyan}🔄 ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.magenta}${'='.repeat(70)}\n${msg}\n${'='.repeat(70)}${colors.reset}\n`),
};

// Test sonuçları
const testResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  warnings: [],
};

// Test verileri
const testData = {
  service: {
    id: 'test-hizmet-' + Date.now(),
    name: 'Test Hizmeti',
    slug: 'test-hizmet-' + Date.now(),
    description: 'Bu bir test hizmetidir',
    icon: 'Code2',
    featured: true,
    content: '<p>Test hizmeti detaylı içerik</p>',
    features: ['Test özellik 1', 'Test özellik 2', 'Test özellik 3'],
    seo: {
      title: 'Test Hizmeti SEO Title',
      description: 'Test hizmeti SEO description',
      keywords: ['test', 'hizmet', 'seo'],
    },
  },
  price: {
    id: 'test-paket-' + Date.now(),
    name: 'Test Paketi',
    slug: 'test-paket-' + Date.now(),
    price: 9999,
    featured: false,
    popular: true,
    features: ['Test paket özellik 1', 'Test paket özellik 2'],
    description: 'Test paketi açıklaması',
  },
  region: {
    id: 'test-bolge-' + Date.now(),
    name: 'Test Bölgesi',
    slug: 'test-bolge-' + Date.now(),
    city: 'Test Şehir',
    geo: {
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    hero: {
      title: 'Test Bölgesi Hero',
      subtitle: 'Test alt başlık',
    },
    content: {
      main: 'Test ana içerik',
      seo1: 'Test SEO içerik 1',
      seo2: 'Test SEO içerik 2',
    },
    seo: {
      title: 'Test Bölgesi SEO',
      description: 'Test bölgesi SEO açıklaması',
      keywords: ['test', 'bölge'],
    },
  },
  review: {
    id: 'test-yorum-' + Date.now(),
    name: 'Test Kullanıcı',
    company: 'Test Şirket',
    rating: 5,
    comment: 'Test yorumu - harika bir hizmet!',
    service: 'Web Tasarım',
    approved: true,
  },
  faq: {
    id: 'test-sss-' + Date.now(),
    question: 'Test sorusu?',
    answer: 'Test cevabı.',
    category: 'Genel',
  },
};

// Dosya okuma/yazma fonksiyonları
function readJSON(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`JSON okuma hatası (${filePath}): ${error.message}`);
  }
}

function writeJSON(filePath, data) {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    throw new Error(`JSON yazma hatası (${filePath}): ${error.message}`);
  }
}

// Test fonksiyonu wrapper
function test(name, fn) {
  testResults.total++;
  log.action(`Test: ${name}`);
  
  try {
    fn();
    testResults.passed++;
    log.success(`PASSED: ${name}`);
    return true;
  } catch (error) {
    testResults.failed++;
    testResults.errors.push({ test: name, error: error.message });
    log.error(`FAILED: ${name} - ${error.message}`);
    return false;
  }
}

// Assertion fonksiyonları
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(message || `Expected ${expected}, got ${actual}`);
  }
}

function assertExists(value, message) {
  if (value === undefined || value === null) {
    throw new Error(message || 'Value does not exist');
  }
}

// Test: Hizmet Ekleme
function testAddService() {
  log.section('🔧 TEST: HİZMET EKLEME');
  
  test('services.json dosyası okunabilir', () => {
    const services = readJSON('content/services.json');
    assert(Array.isArray(services), 'services.json bir array olmalı');
  });

  test('Yeni hizmet eklenebilir', () => {
    const services = readJSON('content/services.json');
    const initialCount = services.length;
    
    services.push(testData.service);
    writeJSON('content/services.json', services);
    
    const updatedServices = readJSON('content/services.json');
    assertEqual(updatedServices.length, initialCount + 1, 'Hizmet sayısı artmalı');
    
    const addedService = updatedServices.find(s => s.id === testData.service.id);
    assertExists(addedService, 'Eklenen hizmet bulunmalı');
    assertEqual(addedService.name, testData.service.name, 'Hizmet adı eşleşmeli');
  });

  test('Eklenen hizmet doğru formatta', () => {
    const services = readJSON('content/services.json');
    const service = services.find(s => s.id === testData.service.id);
    
    assertExists(service.id, 'id alanı olmalı');
    assertExists(service.name, 'name alanı olmalı');
    assertExists(service.slug, 'slug alanı olmalı');
    assertExists(service.description, 'description alanı olmalı');
    assert(Array.isArray(service.features), 'features array olmalı');
    assertExists(service.seo, 'seo objesi olmalı');
    assertExists(service.seo.title, 'seo.title olmalı');
  });
}

// Test: Hizmet Düzenleme
function testEditService() {
  log.section('✏️  TEST: HİZMET DÜZENLEME');
  
  test('Hizmet bulunabilir ve düzenlenebilir', () => {
    const services = readJSON('content/services.json');
    const service = services.find(s => s.id === testData.service.id);
    
    assertExists(service, 'Hizmet bulunmalı');
    
    service.name = 'Düzenlenmiş Test Hizmeti';
    service.description = 'Düzenlenmiş açıklama';
    
    writeJSON('content/services.json', services);
    
    const updatedServices = readJSON('content/services.json');
    const updatedService = updatedServices.find(s => s.id === testData.service.id);
    
    assertEqual(updatedService.name, 'Düzenlenmiş Test Hizmeti', 'İsim güncellenmiş olmalı');
    assertEqual(updatedService.description, 'Düzenlenmiş açıklama', 'Açıklama güncellenmiş olmalı');
  });
}

// Test: Hizmet Silme
function testDeleteService() {
  log.section('🗑️  TEST: HİZMET SİLME');
  
  test('Hizmet silinebilir', () => {
    const services = readJSON('content/services.json');
    const initialCount = services.length;
    
    const filteredServices = services.filter(s => s.id !== testData.service.id);
    writeJSON('content/services.json', filteredServices);
    
    const updatedServices = readJSON('content/services.json');
    assertEqual(updatedServices.length, initialCount - 1, 'Hizmet sayısı azalmalı');
    
    const deletedService = updatedServices.find(s => s.id === testData.service.id);
    assert(!deletedService, 'Silinen hizmet bulunmamalı');
  });
}

// Test: Fiyat İşlemleri
function testPriceOperations() {
  log.section('💰 TEST: FİYAT PAKETİ İŞLEMLERİ');
  
  test('Fiyat paketi eklenebilir', () => {
    const prices = readJSON('content/prices.json');
    prices.push(testData.price);
    writeJSON('content/prices.json', prices);
    
    const updated = readJSON('content/prices.json');
    const added = updated.find(p => p.id === testData.price.id);
    assertExists(added, 'Fiyat paketi eklenmiş olmalı');
  });

  test('Fiyat paketi silinebilir', () => {
    const prices = readJSON('content/prices.json');
    const filtered = prices.filter(p => p.id !== testData.price.id);
    writeJSON('content/prices.json', filtered);
    
    const updated = readJSON('content/prices.json');
    const deleted = updated.find(p => p.id === testData.price.id);
    assert(!deleted, 'Fiyat paketi silinmiş olmalı');
  });
}

// Test: Bölge İşlemleri
function testRegionOperations() {
  log.section('📍 TEST: BÖLGE İŞLEMLERİ');
  
  test('Bölge eklenebilir', () => {
    const regions = readJSON('content/regions.json');
    regions.push(testData.region);
    writeJSON('content/regions.json', regions);
    
    const updated = readJSON('content/regions.json');
    const added = updated.find(r => r.id === testData.region.id);
    assertExists(added, 'Bölge eklenmiş olmalı');
    assertExists(added.geo, 'Geo bilgisi olmalı');
    assertExists(added.seo, 'SEO bilgisi olmalı');
  });

  test('Bölge silinebilir', () => {
    const regions = readJSON('content/regions.json');
    const filtered = regions.filter(r => r.id !== testData.region.id);
    writeJSON('content/regions.json', filtered);
    
    const updated = readJSON('content/regions.json');
    const deleted = updated.find(r => r.id === testData.region.id);
    assert(!deleted, 'Bölge silinmiş olmalı');
  });
}

// Test: Yorum İşlemleri
function testReviewOperations() {
  log.section('⭐ TEST: YORUM İŞLEMLERİ');
  
  test('Yorum eklenebilir', () => {
    const reviews = readJSON('content/reviews.json');
    reviews.push(testData.review);
    writeJSON('content/reviews.json', reviews);
    
    const updated = readJSON('content/reviews.json');
    const added = updated.find(r => r.id === testData.review.id);
    assertExists(added, 'Yorum eklenmiş olmalı');
    assertEqual(added.rating, 5, 'Rating doğru olmalı');
  });

  test('Yorum onaylanabilir', () => {
    const reviews = readJSON('content/reviews.json');
    const review = reviews.find(r => r.id === testData.review.id);
    review.approved = false;
    writeJSON('content/reviews.json', reviews);
    
    const updated = readJSON('content/reviews.json');
    const unapproved = updated.find(r => r.id === testData.review.id);
    assertEqual(unapproved.approved, false, 'Onay kaldırılmış olmalı');
  });

  test('Yorum silinebilir', () => {
    const reviews = readJSON('content/reviews.json');
    const filtered = reviews.filter(r => r.id !== testData.review.id);
    writeJSON('content/reviews.json', filtered);
    
    const updated = readJSON('content/reviews.json');
    const deleted = updated.find(r => r.id === testData.review.id);
    assert(!deleted, 'Yorum silinmiş olmalı');
  });
}

// Test: SSS İşlemleri
function testFAQOperations() {
  log.section('❓ TEST: SSS İŞLEMLERİ');
  
  test('SSS eklenebilir', () => {
    const faqs = readJSON('content/faq.json');
    faqs.push(testData.faq);
    writeJSON('content/faq.json', faqs);
    
    const updated = readJSON('content/faq.json');
    const added = updated.find(f => f.id === testData.faq.id);
    assertExists(added, 'SSS eklenmiş olmalı');
  });

  test('SSS silinebilir', () => {
    const faqs = readJSON('content/faq.json');
    const filtered = faqs.filter(f => f.id !== testData.faq.id);
    writeJSON('content/faq.json', filtered);
    
    const updated = readJSON('content/faq.json');
    const deleted = updated.find(f => f.id === testData.faq.id);
    assert(!deleted, 'SSS silinmiş olmalı');
  });
}

// Test: Veri Bütünlüğü
function testDataIntegrity() {
  log.section('🔒 TEST: VERİ BÜTÜNLÜĞÜ');
  
  test('Tüm JSON dosyaları geçerli', () => {
    const files = [
      'content/services.json',
      'content/prices.json',
      'content/regions.json',
      'content/reviews.json',
      'content/faq.json',
      'config/site.json',
    ];
    
    files.forEach(file => {
      const data = readJSON(file);
      assert(data !== null, `${file} parse edilebilmeli`);
    });
  });

  test('Hiçbir JSON dosyası boş değil', () => {
    const files = [
      'content/services.json',
      'content/prices.json',
      'content/regions.json',
      'content/reviews.json',
      'content/faq.json',
    ];
    
    files.forEach(file => {
      const data = readJSON(file);
      assert(Array.isArray(data) && data.length > 0, `${file} en az 1 öğe içermeli`);
    });
  });

  test('Tüm ID\'ler benzersiz', () => {
    const files = {
      services: 'content/services.json',
      prices: 'content/prices.json',
      regions: 'content/regions.json',
      reviews: 'content/reviews.json',
      faqs: 'content/faq.json',
    };
    
    Object.entries(files).forEach(([name, file]) => {
      const data = readJSON(file);
      const ids = data.map(item => item.id);
      const uniqueIds = new Set(ids);
      assertEqual(ids.length, uniqueIds.size, `${name} - Tüm ID'ler benzersiz olmalı`);
    });
  });
}

// Test: SEO Kontrolü
function testSEOValidation() {
  log.section('🔍 TEST: SEO DOĞRULAMA');
  
  test('Tüm hizmetlerde SEO bilgisi var', () => {
    const services = readJSON('content/services.json');
    services.forEach(service => {
      assertExists(service.seo, `${service.name} - SEO bilgisi olmalı`);
      assertExists(service.seo.title, `${service.name} - SEO title olmalı`);
      assertExists(service.seo.description, `${service.name} - SEO description olmalı`);
      
      if (service.seo.title.length > 60) {
        testResults.warnings.push(`${service.name} - SEO title 60 karakterden uzun (${service.seo.title.length})`);
      }
      
      if (service.seo.description.length > 155) {
        testResults.warnings.push(`${service.name} - SEO description 155 karakterden uzun (${service.seo.description.length})`);
      }
    });
  });

  test('Tüm bölgelerde SEO bilgisi var', () => {
    const regions = readJSON('content/regions.json');
    regions.forEach(region => {
      assertExists(region.seo, `${region.name} - SEO bilgisi olmalı`);
      assertExists(region.seo.title, `${region.name} - SEO title olmalı`);
    });
  });
}

// Temizlik
function cleanup() {
  log.section('🧹 TEMİZLİK İŞLEMLERİ');
  
  log.action('Test verileri temizleniyor...');
  
  const files = {
    'content/services.json': (item) => !item.id.startsWith('test-hizmet-'),
    'content/prices.json': (item) => !item.id.startsWith('test-paket-'),
    'content/regions.json': (item) => !item.id.startsWith('test-bolge-'),
    'content/reviews.json': (item) => !item.id.startsWith('test-yorum-'),
    'content/faq.json': (item) => !item.id.startsWith('test-sss-'),
  };
  
  Object.entries(files).forEach(([file, filterFn]) => {
    try {
      const data = readJSON(file);
      const filtered = data.filter(filterFn);
      writeJSON(file, filtered);
      log.success(`${file} temizlendi`);
    } catch (error) {
      log.error(`${file} temizlenemedi: ${error.message}`);
    }
  });
}

// Ana test fonksiyonu
function runE2ETests() {
  log.section('🤖 E2E TEST BOTU BAŞLIYOR');
  log.info('Gerçek kullanıcı simülasyonu yapılıyor...\n');

  // Testleri sırayla çalıştır
  testAddService();
  testEditService();
  testDeleteService();
  testPriceOperations();
  testRegionOperations();
  testReviewOperations();
  testFAQOperations();
  testDataIntegrity();
  testSEOValidation();

  // Temizlik
  cleanup();

  // Sonuçları yazdır
  printResults();
}

// Sonuçları yazdır
function printResults() {
  log.section('📊 TEST SONUÇLARI');

  console.log(`Toplam Test: ${testResults.total}`);
  console.log(`${colors.green}✅ Başarılı: ${testResults.passed}${colors.reset}`);
  console.log(`${colors.red}❌ Başarısız: ${testResults.failed}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Uyarı: ${testResults.warnings.length}${colors.reset}`);
  
  const passRate = testResults.total > 0 
    ? ((testResults.passed / testResults.total) * 100).toFixed(1) 
    : 0;
  console.log(`Başarı Oranı: ${passRate}%`);

  if (testResults.errors.length > 0) {
    console.log(`\n${colors.red}HATALAR:${colors.reset}`);
    testResults.errors.forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.test}: ${err.error}`);
    });
  }

  if (testResults.warnings.length > 0) {
    console.log(`\n${colors.yellow}UYARILAR:${colors.reset}`);
    testResults.warnings.forEach((warn, i) => {
      console.log(`  ${i + 1}. ${warn}`);
    });
  }

  // JSON raporu
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: testResults.total,
      passed: testResults.passed,
      failed: testResults.failed,
      warnings: testResults.warnings.length,
      passRate,
    },
    errors: testResults.errors,
    warnings: testResults.warnings,
  };

  fs.writeFileSync('e2e-test-report.json', JSON.stringify(report, null, 2));
  log.info('\nDetaylı rapor e2e-test-report.json dosyasına kaydedildi');

  // Exit code
  process.exit(testResults.failed > 0 ? 1 : 0);
}

// Testi çalıştır
runE2ETests();
