/**
 * Türkçe karakterleri İngilizce karakterlere çevirir ve slug oluşturur
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Türkçe karakterleri değiştir
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/Ş/g, 's')
    .replace(/Ğ/g, 'g')
    .replace(/Ü/g, 'u')
    .replace(/Ö/g, 'o')
    .replace(/Ç/g, 'c')
    // Özel karakterleri temizle
    .replace(/[^a-z0-9\s-]/g, '')
    // Boşlukları tire ile değiştir
    .replace(/\s+/g, '-')
    // Birden fazla tireyi tek tireye indir
    .replace(/-+/g, '-')
    // Baş ve sondaki tireleri kaldır
    .replace(/^-+|-+$/g, '')
}

/**
 * Karakter sayısını hesaplar ve limit kontrolü yapar
 */
export function getCharacterCount(text: string, limit: number): {
  count: number
  remaining: number
  isOverLimit: boolean
} {
  const count = text.length
  const remaining = limit - count
  const isOverLimit = count > limit

  return {
    count,
    remaining,
    isOverLimit,
  }
}
