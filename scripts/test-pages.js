#!/usr/bin/env node

/**
 * Frontend ve Admin Panel Test Script
 * Tüm sayfaları test eder, 404 ve hataları tespit eder
 */

const fs = require('fs');
const path = require('path');

// Renkli console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
};

const log = {
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ️  ${msg}${colors.reset}`),
  section: (msg) => console.log(`\n${colors.magenta}${'='.repeat(60)}\n${msg}\n${'='.repeat(60)}${colors.reset}\n`),
};

// Test sonuçları
const results = {
  frontend: { total: 0, passed: 0, failed: 0, errors: [] },
  admin: { total: 0, passed: 0, failed: 0, errors: [] },
  content: { total: 0, passed: 0, failed: 0, errors: [] },
  api: { total: 0, passed: 0, failed: 0, errors: [] },
};

// Frontend sayfaları
const frontendPages = [
  '/',
  '/kurumsal',
  '/hizmetlerimiz',
  '/fiyatlarimiz',
  '/hizmet-bolgeleri',
  '/sss',
  '/iletisim',
  '/teklif-al',
  '/fiyat-hesapla',
  '/kvkk',
  '/gizlilik-politikasi',
  '/cerez-politikasi',
  '/kullanim-kosullari',
];

// Admin sayfaları
const adminPages = [
  '/admin',
  '/admin/dashboard',
  '/admin/services',
  '/admin/prices',
  '/admin/regions',
  '/admin/reviews',
  '/admin/faq',
  '/admin/config',
  '/admin/schema',
  '/admin/entegrasyonlar',
];

// Content JSON dosyaları
const contentFiles = [
  'content/services.json',
  'content/prices.json',
  'content/regions.json',
  'content/reviews.json',
  'content/faq.json',
  'config/site.json',
];

// API routes
const apiRoutes = [
  'app/api/contact/route.ts',
  'app/api/og/route.tsx',
  'app/api/admin/services/route.ts',
  'app/api/admin/prices/route.ts',
  'app/api/admin/regions/route.ts',
  'app/api/admin/reviews/route.ts',
  'app/api/admin/faq/route.ts',
  'app/api/admin/config/route.ts',
];

// Dosya kontrolü
function checkFile(filePath, category) {
  const fullPath = path.join(process.cwd(), filePath);
  results[category].total++;

  if (!fs.existsSync(fullPath)) {
    results[category].failed++;
    results[category].errors.push({
      file: filePath,
      error: 'Dosya bulunamadı',
    });
    log.error(`${filePath} - Dosya bulunamadı`);
    return false;
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    
    // JSON dosyaları için parse kontrolü
    if (filePath.endsWith('.json')) {
      JSON.parse(content);
      
      // Boş array kontrolü
      if (content.trim() === '[]') {
        results[category].failed++;
        results[category].errors.push({
          file: filePath,
          error: 'JSON dosyası boş (empty array)',
        });
        log.warning(`${filePath} - Boş JSON array`);
        return false;
      }
    }

    results[category].passed++;
    log.success(`${filePath} - OK`);
    return true;
  } catch (error) {
    results[category].failed++;
    results[category].errors.push({
      file: filePath,
      error: error.message,
    });
    log.error(`${filePath} - ${error.message}`);
    return false;
  }
}

// Page component kontrolü
function checkPageComponent(route, category) {
  const possiblePaths = [
    `app/(frontend)${route}/page.tsx`,
    `app${route}/page.tsx`,
    `app/(frontend)${route === '/' ? '' : route}/page.tsx`,
  ];

  results[category].total++;
  
  for (const pagePath of possiblePaths) {
    const fullPath = path.join(process.cwd(), pagePath);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        
        // Syntax hataları kontrolü
        if (content.includes('export default') || content.includes('export async function')) {
          results[category].passed++;
          log.success(`${route} - ${pagePath} OK`);
          return true;
        }
      } catch (error) {
        results[category].failed++;
        results[category].errors.push({
          page: route,
          file: pagePath,
          error: error.message,
        });
        log.error(`${route} - ${error.message}`);
        return false;
      }
    }
  }

  results[category].failed++;
  results[category].errors.push({
    page: route,
    error: 'Page component bulunamadı',
    tried: possiblePaths,
  });
  log.error(`${route} - Page component bulunamadı`);
  return false;
}

// Ana test fonksiyonu
function runTests() {
  log.section('🧪 FRONTEND VE ADMIN PANEL TEST BAŞLIYOR');

  // Frontend sayfaları testi
  log.section('📄 FRONTEND SAYFALARI TEST EDİLİYOR');
  frontendPages.forEach((page) => checkPageComponent(page, 'frontend'));

  // Admin sayfaları testi
  log.section('🔐 ADMIN SAYFALARI TEST EDİLİYOR');
  adminPages.forEach((page) => checkPageComponent(page, 'admin'));

  // Content dosyaları testi
  log.section('📦 CONTENT DOSYALARI TEST EDİLİYOR');
  contentFiles.forEach((file) => checkFile(file, 'content'));

  // API routes testi
  log.section('🔌 API ROUTES TEST EDİLİYOR');
  apiRoutes.forEach((file) => checkFile(file, 'api'));

  // Sonuçları yazdır
  printResults();
}

// Sonuçları yazdır
function printResults() {
  log.section('📊 TEST SONUÇLARI');

  const categories = ['frontend', 'admin', 'content', 'api'];
  const categoryNames = {
    frontend: 'Frontend Sayfaları',
    admin: 'Admin Sayfaları',
    content: 'Content Dosyaları',
    api: 'API Routes',
  };

  categories.forEach((cat) => {
    const result = results[cat];
    const passRate = result.total > 0 ? ((result.passed / result.total) * 100).toFixed(1) : 0;
    
    console.log(`\n${categoryNames[cat]}:`);
    console.log(`  Toplam: ${result.total}`);
    console.log(`  ${colors.green}Başarılı: ${result.passed}${colors.reset}`);
    console.log(`  ${colors.red}Başarısız: ${result.failed}${colors.reset}`);
    console.log(`  Başarı Oranı: ${passRate}%`);

    if (result.errors.length > 0) {
      console.log(`\n  ${colors.red}Hatalar:${colors.reset}`);
      result.errors.forEach((err, i) => {
        console.log(`    ${i + 1}. ${err.file || err.page}: ${err.error}`);
      });
    }
  });

  // Genel özet
  const totalTests = categories.reduce((sum, cat) => sum + results[cat].total, 0);
  const totalPassed = categories.reduce((sum, cat) => sum + results[cat].passed, 0);
  const totalFailed = categories.reduce((sum, cat) => sum + results[cat].failed, 0);
  const overallPassRate = totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(1) : 0;

  log.section('🎯 GENEL ÖZET');
  console.log(`Toplam Test: ${totalTests}`);
  console.log(`${colors.green}Başarılı: ${totalPassed}${colors.reset}`);
  console.log(`${colors.red}Başarısız: ${totalFailed}${colors.reset}`);
  console.log(`Genel Başarı Oranı: ${overallPassRate}%`);

  // JSON raporu oluştur
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      total: totalTests,
      passed: totalPassed,
      failed: totalFailed,
      passRate: overallPassRate,
    },
    details: results,
  };

  fs.writeFileSync('test-report.json', JSON.stringify(report, null, 2));
  log.info('Detaylı rapor test-report.json dosyasına kaydedildi');
}

// Testi çalıştır
runTests();
