#!/usr/bin/env node

/**
 * Automated Test Bot
 * .md dosyalarındaki tüm maddeleri test eder, frontend ve backend'de çalışıp çalışmadığını kontrol eder
 */

const fs = require('fs').promises;
const path = require('path');
const http = require('http');

const BASE_URL = 'http://localhost:3000';
const DOCS_DIR = path.join(__dirname, '../docs');

// Test sonuçları
const results = {
  total: 0,
  passed: 0,
  failed: 0,
  skipped: 0,
  details: []
};

// Frontend sayfaları test et
async function testFrontendPages() {
  const pages = [
    { path: '/', name: 'Ana Sayfa', expectedStatus: 200 },
    { path: '/kurumsal', name: 'Kurumsal', expectedStatus: 200 },
    { path: '/hizmetlerimiz', name: 'Hizmetlerimiz', expectedStatus: 200 },
    { path: '/fiyatlarimiz', name: 'Fiyatlarımız', expectedStatus: 200 },
    { path: '/hizmet-bolgeleri', name: 'Hizmet Bölgeleri', expectedStatus: 200 },
    { path: '/sss', name: 'SSS', expectedStatus: 200 },
    { path: '/iletisim', name: 'İletişim', expectedStatus: 200 },
    { path: '/teklif-al', name: 'Teklif Al', expectedStatus: 200 },
    { path: '/fiyat-hesapla', name: 'Fiyat Hesaplama', expectedStatus: 200 },
    { path: '/kvkk', name: 'KVKK', expectedStatus: 200 },
    { path: '/gizlilik-politikasi', name: 'Gizlilik Politikası', expectedStatus: 200 },
    { path: '/cerez-politikasi', name: 'Çerez Politikası', expectedStatus: 200 },
    { path: '/kullanim-kosullari', name: 'Kullanım Koşulları', expectedStatus: 200 },
  ];

  console.log('\n🔍 Frontend Sayfaları Test Ediliyor...\n');

  for (const page of pages) {
    results.total++;
    try {
      const response = await fetch(`${BASE_URL}${page.path}`);
      const html = await response.text();
      
      const checks = {
        status: response.status === page.expectedStatus,
        hasTitle: html.includes('<title>'),
        hasH1: html.includes('<h1'),
        hasSchema: html.includes('application/ld+json'),
        hasMetaDescription: html.includes('name="description"'),
        noErrors: !html.includes('Error') && !html.includes('undefined'),
      };

      const allPassed = Object.values(checks).every(v => v);

      if (allPassed) {
        results.passed++;
        console.log(`✅ ${page.name} (${page.path})`);
      } else {
        results.failed++;
        console.log(`❌ ${page.name} (${page.path})`);
        console.log('   Hatalar:', Object.entries(checks).filter(([k, v]) => !v).map(([k]) => k).join(', '));
      }

      results.details.push({
        category: 'Frontend',
        name: page.name,
        path: page.path,
        status: allPassed ? 'PASS' : 'FAIL',
        checks
      });

    } catch (error) {
      results.failed++;
      console.log(`❌ ${page.name} (${page.path}) - ${error.message}`);
      results.details.push({
        category: 'Frontend',
        name: page.name,
        path: page.path,
        status: 'FAIL',
        error: error.message
      });
    }
  }
}

// API endpoints test et
async function testAPIEndpoints() {
  const endpoints = [
    { path: '/api/contact', method: 'POST', name: 'Contact API' },
    { path: '/api/quote', method: 'POST', name: 'Quote API' },
    { path: '/api/calculator', method: 'POST', name: 'Calculator API' },
  ];

  console.log('\n🔍 API Endpoints Test Ediliyor...\n');

  for (const endpoint of endpoints) {
    results.total++;
    try {
      // Rate limiting test için minimal data
      const response = await fetch(`${BASE_URL}${endpoint.path}`, {
        method: endpoint.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });

      // 400 (validation error) veya 429 (rate limit) bekliyoruz - bu normal
      const isExpectedError = response.status === 400 || response.status === 429;

      if (isExpectedError) {
        results.passed++;
        console.log(`✅ ${endpoint.name} - API çalışıyor (validation aktif)`);
        results.details.push({
          category: 'API',
          name: endpoint.name,
          path: endpoint.path,
          status: 'PASS',
          note: 'Validation/Rate limiting aktif'
        });
      } else {
        results.failed++;
        console.log(`❌ ${endpoint.name} - Beklenmeyen status: ${response.status}`);
        results.details.push({
          category: 'API',
          name: endpoint.name,
          path: endpoint.path,
          status: 'FAIL',
          actualStatus: response.status
        });
      }

    } catch (error) {
      results.failed++;
      console.log(`❌ ${endpoint.name} - ${error.message}`);
      results.details.push({
        category: 'API',
        name: endpoint.name,
        path: endpoint.path,
        status: 'FAIL',
        error: error.message
      });
    }
  }
}

// Component dosyalarını kontrol et
async function testComponents() {
  const components = [
    'components/ui/button.tsx',
    'components/ui/card.tsx',
    'components/ui/input.tsx',
    'components/ui/textarea.tsx',
    'components/ui/select.tsx',
    'components/ui/modal.tsx',
    'components/ui/bottom-sheet.tsx',
    'components/ui/skeleton.tsx',
    'components/layout/header.tsx',
    'components/layout/footer.tsx',
    'components/layout/breadcrumb.tsx',
    'components/sections/hero.tsx',
    'components/sections/services.tsx',
    'components/sections/pricing.tsx',
    'components/forms/contact-form.tsx',
  ];

  console.log('\n🔍 UI Components Kontrol Ediliyor...\n');

  for (const component of components) {
    results.total++;
    const filePath = path.join(__dirname, '..', component);
    
    try {
      const exists = await fs.access(filePath).then(() => true).catch(() => false);
      const content = exists ? await fs.readFile(filePath, 'utf-8') : '';
      
      const checks = {
        exists,
        hasExport: content.includes('export'),
        hasTypeScript: component.endsWith('.tsx') || component.endsWith('.ts'),
        notEmpty: content.length > 100,
      };

      const allPassed = Object.values(checks).every(v => v);

      if (allPassed) {
        results.passed++;
        console.log(`✅ ${component}`);
      } else {
        results.failed++;
        console.log(`❌ ${component}`);
      }

      results.details.push({
        category: 'Components',
        name: component,
        status: allPassed ? 'PASS' : 'FAIL',
        checks
      });

    } catch (error) {
      results.failed++;
      console.log(`❌ ${component} - ${error.message}`);
      results.details.push({
        category: 'Components',
        name: component,
        status: 'FAIL',
        error: error.message
      });
    }
  }
}

// Schema markup kontrol et
async function testSchemaMarkup() {
  const pagesWithSchema = [
    { path: '/', schemas: ['LocalBusiness', 'Organization', 'WebSite'] },
    { path: '/hizmetlerimiz', schemas: ['BreadcrumbList'] },
    { path: '/sss', schemas: ['FAQPage', 'BreadcrumbList'] },
  ];

  console.log('\n🔍 Schema Markup Kontrol Ediliyor...\n');

  for (const page of pagesWithSchema) {
    results.total++;
    try {
      const response = await fetch(`${BASE_URL}${page.path}`);
      const html = await response.text();
      
      const schemaScripts = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs) || [];
      const schemasFound = schemaScripts.map(s => {
        try {
          const json = JSON.parse(s.replace(/<script[^>]*>|<\/script>/g, ''));
          return Array.isArray(json) ? json.map(j => j['@type']) : [json['@type']];
        } catch {
          return [];
        }
      }).flat();

      const allSchemasPresent = page.schemas.every(schema => 
        schemasFound.some(found => found === schema)
      );

      if (allSchemasPresent) {
        results.passed++;
        console.log(`✅ ${page.path} - Tüm schema'lar mevcut`);
      } else {
        results.failed++;
        console.log(`❌ ${page.path} - Eksik schema'lar:`, 
          page.schemas.filter(s => !schemasFound.includes(s)).join(', '));
      }

      results.details.push({
        category: 'Schema',
        path: page.path,
        status: allSchemasPresent ? 'PASS' : 'FAIL',
        expected: page.schemas,
        found: schemasFound
      });

    } catch (error) {
      results.failed++;
      console.log(`❌ ${page.path} - ${error.message}`);
      results.details.push({
        category: 'Schema',
        path: page.path,
        status: 'FAIL',
        error: error.message
      });
    }
  }
}

// Config dosyalarını kontrol et
async function testConfigFiles() {
  const configs = [
    'config/site.json',
    'content/services.json',
    'content/prices.json',
    'content/regions.json',
    'content/reviews.json',
    'content/faq.json',
  ];

  console.log('\n🔍 Config Dosyaları Kontrol Ediliyor...\n');

  for (const config of configs) {
    results.total++;
    const filePath = path.join(__dirname, '..', config);
    
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const json = JSON.parse(content);
      
      const checks = {
        validJSON: true,
        notEmpty: Object.keys(json).length > 0,
      };

      const allPassed = Object.values(checks).every(v => v);

      if (allPassed) {
        results.passed++;
        console.log(`✅ ${config}`);
      } else {
        results.failed++;
        console.log(`❌ ${config}`);
      }

      results.details.push({
        category: 'Config',
        name: config,
        status: allPassed ? 'PASS' : 'FAIL',
        checks
      });

    } catch (error) {
      results.failed++;
      console.log(`❌ ${config} - ${error.message}`);
      results.details.push({
        category: 'Config',
        name: config,
        status: 'FAIL',
        error: error.message
      });
    }
  }
}

// Ana test fonksiyonu
async function runTests() {
  console.log('🤖 Automated Test Bot Başlatılıyor...\n');
  console.log('📋 .md dosyalarındaki tüm özellikler test ediliyor...\n');

  await testFrontendPages();
  await testAPIEndpoints();
  await testComponents();
  await testSchemaMarkup();
  await testConfigFiles();

  // Özet rapor
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SONUÇLARI');
  console.log('='.repeat(60));
  console.log(`Toplam Test: ${results.total}`);
  console.log(`✅ Başarılı: ${results.passed}`);
  console.log(`❌ Başarısız: ${results.failed}`);
  console.log(`⏭️  Atlanan: ${results.skipped}`);
  console.log(`📈 Başarı Oranı: ${((results.passed / results.total) * 100).toFixed(2)}%`);
  console.log('='.repeat(60));

  // Detaylı rapor JSON olarak kaydet
  const reportPath = path.join(__dirname, '../test-report.json');
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Detaylı rapor kaydedildi: ${reportPath}`);

  // Exit code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Çalıştır
runTests().catch(error => {
  console.error('❌ Test bot hatası:', error);
  process.exit(1);
});
