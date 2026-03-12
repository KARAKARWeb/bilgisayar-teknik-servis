const fs = require('fs');

const regions = JSON.parse(fs.readFileSync('./content/regions.json', 'utf8'));

// Her bölge için TAMAMEN FARKLI anchor text
const uniqueAnchors = {
  'aydinli': 'Tuzla Web Tasarım',
  'sifa': 'profesyonel web tasarım hizmetleri',
  'yayla': 'Pendik Web Tasarım Ajansı',
  'mimar-sinan': 'dijital çözümler sunan ajans',
  'aydintepe': 'web tasarım ve yazılım hizmetleri',
  'istasyon': 'kurumsal web tasarım ajansı',
  'postane': 'SEO ve web tasarım uzmanları',
  'evliya-celebi': 'dijital pazarlama çözümleri',
  'icmeler': 'web sitesi tasarım hizmetleri',
  'orta': 'e-ticaret web çözümleri',
  'tepeoren': 'profesyonel web yazılım',
  'cami': 'dijital dönüşüm danışmanlığı',
  'mescit': 'web tasarım ajansı olarak',
  'akfirat': 'kurumsal dijital çözüm ortağı',
  'orhanli': 'profesyonel SEO hizmetleri',
  'fatih': 'web tasarım ve SEO ajansı',
  'anadolu': 'güçlü dijital varlık',
  'iayosb': 'B2B web tasarım çözümleri',
  'idosb': 'sanayi web tasarım hizmetleri',
  'bosb': 'organize sanayi dijital çözümleri',
  'kosb': 'kurumsal web yazılım geliştirme',
  'itosb': 'endüstriyel web tasarım hizmetleri'
};

let updated = [];

regions.forEach(r => {
  const anchor = uniqueAnchors[r.id];
  if (anchor && r.content?.main) {
    let content = r.content.main;
    
    // Önceki linkleri temizle
    content = content.replace(/<a href="https:\/\/www\.tuzlawebtasarim\.com\/">([^<]+)<\/a>/g, '$1');
    
    // Yeni anchor text'i bul ve linkle
    if (content.includes(anchor)) {
      content = content.replace(anchor, `<a href="https://www.tuzlawebtasarim.com/">${anchor}</a>`);
      r.content.main = content;
      updated.push(`${r.name}: ${anchor}`);
    }
  }
});

fs.writeFileSync('./content/regions.json', JSON.stringify(regions, null, 2));
console.log(updated.join('\n'));
console.log(`\nToplam: ${updated.length} bölge`);
