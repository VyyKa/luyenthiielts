/**
 * Parse "vocab adding" text file into structured vocabulary by topic.
 * Format: section "N. TOPIC NAME", then blocks of: word (1-2 lines) / phonetic / meaning
 */
import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const inputPath = join(root, 'data', 'vocab adding')
const outputPath = join(root, 'data', 'parsed-vocab-by-topic.json')

const raw = readFileSync(inputPath, 'utf-8')
const lines = raw.split(/\r?\n/)

// Skip header/footer lines
const skipPatterns = [
  /^IELTS Fighter/,
  /^Website:/,
  /^Fanpage:/,
  /^Group:/,
  /^https?:/,
  /^www\./,
  /^Các bạn cùng xem/,
  /^Khóa học/,
  /^Tài liệu IELTS/,
  /^Hiện IELTS Fighter/,
  /^NHỮNG BỘ TÀI LIỆU/,
  /^BIÊN SOẠN/,
  /^IELTS Fighter biết/,
  /^MỘT SỐ ĐẦU SÁCH/,
  /^Các bạn chỉ cần/,
  /^\d+\. DAY.*\.{10,}\d+$/,  // table of contents line with dots
  /^CHỦ ĐỀ$/,
  /^Fanpage: IELTS/,
  /^Youtube đọc/,
  /^Đồng hành/,
  /^2500 TỪ VỰNG/,
]
function shouldSkip(line) {
  const t = line.trim()
  if (!t) return true
  for (const p of skipPatterns) if (p.test(t)) return true
  if (/^\.{20,}$/.test(t)) return true
  return false
}

// Topic name to id and icon mapping (for new topics)
const topicMeta = {
  'DAY – WEEK - MONTH': { id: 'time-calendar', nameVi: 'Ngày – Tuần – Tháng', icon: '📅' },
  'SUBJECTS': { id: 'subjects', nameVi: 'Môn học', icon: '📖' },
  'MARKETING': { id: 'marketing', nameVi: 'Marketing', icon: '📢' },
  'CONTINENTS - OCEANS': { id: 'geography', nameVi: 'Châu lục - Đại dương', icon: '🌐' },
  'MONEY': { id: 'money', nameVi: 'Tiền bạc', icon: '💰' },
  'NATURE': { id: 'nature', nameVi: 'Thiên nhiên', icon: '🌿' },
  'COUNTRIES': { id: 'countries', nameVi: 'Quốc gia', icon: '🏳️' },
  'LANGUAGES': { id: 'languages', nameVi: 'Ngôn ngữ', icon: '🗣️' },
  'VERBS': { id: 'verbs', nameVi: 'Động từ', icon: '▶️' },
  'ADJECTIVES': { id: 'adjectives', nameVi: 'Tính từ', icon: '📝' },
  'SHAPES': { id: 'shapes', nameVi: 'Hình khối', icon: '⬜' },
  'COLOR': { id: 'color', nameVi: 'Màu sắc', icon: '🎨' },
  'TIME': { id: 'time', nameVi: 'Thời gian', icon: '⏰' },
  'CITY': { id: 'city', nameVi: 'Thành phố', icon: '🏙️' },
  'HEALTH': { id: 'health', nameVi: 'Sức khỏe', icon: '💪' },
  'PLACES': { id: 'places', nameVi: 'Địa điểm', icon: '📍' },
  'HOMES': { id: 'homes', nameVi: 'Nhà cửa', icon: '🏠' },
  'RATING - QUALITIES': { id: 'qualities', nameVi: 'Đánh giá - Phẩm chất', icon: '⭐' },
  'ARCHITECTURE - BUILDINGS': { id: 'architecture', nameVi: 'Kiến trúc - Công trình', icon: '🏛️' },
  'EDUCATION': { id: 'education', nameVi: 'Giáo dục', icon: '📚' },
  'HOBBIES': { id: 'hobbies', nameVi: 'Sở thích', icon: '🎯' },
  'MATERIALS': { id: 'materials', nameVi: 'Chất liệu', icon: '🧱' },
  'ENVIRONMENT': { id: 'environment', nameVi: 'Môi trường', icon: '🌍' },
  'TOURING': { id: 'touring', nameVi: 'Du lịch', icon: '🧳' },
  'ARTS - MEDIA': { id: 'arts-media', nameVi: 'Nghệ thuật - Truyền thông', icon: '🎬' },
  'SPORTS': { id: 'sports', nameVi: 'Thể thao', icon: '⚽' },
  'EQUIPMENT - TOOLS': { id: 'equipment', nameVi: 'Thiết bị - Công cụ', icon: '🔧' },
  'WORKS': { id: 'works', nameVi: 'Công việc', icon: '💼' },
  'TRANSPORTATIONS': { id: 'transport', nameVi: 'Giao thông', icon: '🚗' },
  'OTHERS': { id: 'others', nameVi: 'Khác', icon: '📦' },
  'LITERATURE': { id: 'literature', nameVi: 'Văn học', icon: '📜' },
  'PSYCHOLOGY': { id: 'psychology', nameVi: 'Tâm lý học', icon: '🧠' },
  'BIOLOGY': { id: 'biology', nameVi: 'Sinh học', icon: '🧬' },
  'LINGUISTICS': { id: 'linguistics', nameVi: 'Ngôn ngữ học', icon: '🔤' },
  'SCIENCE': { id: 'science', nameVi: 'Khoa học', icon: '🔬' },
  'ANTHROPOLOGY': { id: 'anthropology', nameVi: 'Nhân chủng học', icon: '👥' },
  'PHILOSOPHY': { id: 'philosophy', nameVi: 'Triết học', icon: '🤔' },
  'ECONOMICS': { id: 'economics', nameVi: 'Kinh tế học', icon: '📈' },
  'FINANCE - BANKING': { id: 'finance', nameVi: 'Tài chính - Ngân hàng', icon: '🏦' },
  'ASTROPHYSICS': { id: 'astrophysics', nameVi: 'Vật lý thiên văn', icon: '🌌' },
  'HISTORY': { id: 'history', nameVi: 'Lịch sử', icon: '📜' },
  'COSMOLOGY': { id: 'cosmology', nameVi: 'Vũ trụ học', icon: '🌠' },
  'ART': { id: 'art', nameVi: 'Nghệ thuật', icon: '🎨' },
  'CRIMINOLOGY': { id: 'criminology', nameVi: 'Tội phạm học', icon: '⚖️' },
  'POLITICS': { id: 'politics', nameVi: 'Chính trị', icon: '🏛️' },
  'FORENSICS': { id: 'forensics', nameVi: 'Pháp y', icon: '🔍' },
  'AVIANTION': { id: 'aviation', nameVi: 'Hàng không', icon: '✈️' },
  'ENGINEERING': { id: 'engineering', nameVi: 'Kỹ thuật', icon: '⚙️' },
  'CHEMISTRY': { id: 'chemistry', nameVi: 'Hóa học', icon: '🧪' },
  'INFORMATION TECHNOLOGY': { id: 'technology', nameVi: 'Công nghệ thông tin', icon: '💻' },
  'ORNITHOLOGY': { id: 'ornithology', nameVi: 'Điểu học', icon: '🦅' },
  'INSURANCE': { id: 'insurance', nameVi: 'Bảo hiểm', icon: '🛡️' },
  'ARCHAEOLOGY': { id: 'archaeology', nameVi: 'Khảo cổ học', icon: '🏺' },
  'LAW': { id: 'law', nameVi: 'Luật', icon: '⚖️' },
  'REAL ESTATE': { id: 'real-estate', nameVi: 'Bất động sản', icon: '🏘️' },
  'AGRICULTURE': { id: 'agriculture', nameVi: 'Nông nghiệp', icon: '🌾' },
  'CINEMATOGRAPHY': { id: 'cinematography', nameVi: 'Điện ảnh', icon: '🎞️' },
  'ACCOUNTING': { id: 'accounting', nameVi: 'Kế toán', icon: '📒' },
  'HUMAN RESOURCES': { id: 'hr', nameVi: 'Nhân sự', icon: '👔' },
}

const phoneticRegex = /^\/.+\/$/
const sectionRegex = /^(\d+)\.\s+(.+)$/

const sections = []
let currentSection = null
let pendingWord = []
let i = 0

while (i < lines.length) {
  const line = lines[i]
  const trimmed = line.trim()

  // Section header: "6. NATURE" or "6. NATURE ........ 15"
  const sectionMatch = trimmed.match(sectionRegex)
  if (sectionMatch && trimmed.length < 100) {
    const num = sectionMatch[1]
    let name = sectionMatch[2].trim().replace(/\s*\.{5,}.*$/, '').trim()
    if (name && (topicMeta[name] || /^(DAY|SUBJECTS|MARKETING|CONTINENTS|MONEY|NATURE|COUNTRIES|LANGUAGES|VERBS|ADJECTIVES|SHAPES|COLOR|TIME|CITY|HEALTH|PLACES|HOMES|RATING|ARCHITECTURE|EDUCATION|HOBBIES|MATERIALS|ENVIRONMENT|TOURING|ARTS|SPORTS|EQUIPMENT|WORKS|TRANSPORTATIONS|OTHERS|LITERATURE|PSYCHOLOGY|BIOLOGY|LINGUISTICS|SCIENCE|ANTHROPOLOGY|PHILOSOPHY|ECONOMICS|FINANCE|ASTROPHYSICS|HISTORY|COSMOLOGY|ART|CRIMINOLOGY|POLITICS|FORENSICS|AVIANTION|ENGINEERING|CHEMISTRY|INFORMATION|ORNITHOLOGY|INSURANCE|ARCHAEOLOGY|LAW|REAL ESTATE|AGRICULTURE|CINEMATOGRAPHY|ACCOUNTING|HUMAN)/i.test(name))) {
      if (currentSection && currentSection.vocabulary.length > 0) {
        sections.push(currentSection)
      }
      const meta = topicMeta[name] || topicMeta[name.replace(/\s*-\s*.*/, '')] || { id: name.toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-'), nameVi: name, icon: '📌' }
      currentSection = {
        num: parseInt(num, 10),
        name,
        id: meta.id,
        nameVi: meta.nameVi,
        icon: meta.icon,
        vocabulary: []
      }
      pendingWord = []
      i++
      continue
    }
  }

  if (shouldSkip(line)) {
    i++
    continue
  }

  // Phonetic line
  if (phoneticRegex.test(trimmed)) {
    const phonetic = trimmed
    const word = pendingWord.map(l => l.trim()).join(' ').trim()
    let meaning = ''
    let j = i + 1
    while (j < lines.length) {
      const nj = lines[j].trim()
      if (nj === '') { j++; continue }
      if (phoneticRegex.test(nj) || sectionRegex.test(nj)) break
      meaning = nj
      break
    }
    if (word && meaning && currentSection) {
      const normalizedPhonetic = phonetic.includes('\n') ? phonetic.replace(/\s*\n\s*/, ' ') : phonetic
      currentSection.vocabulary.push({
        word: word.replace(/\s+/g, ' '),
        phonetic: normalizedPhonetic.startsWith('/') ? normalizedPhonetic : `/${normalizedPhonetic}/`,
        meaning,
        example: `${word.charAt(0).toUpperCase() + word.slice(1)} is commonly used in IELTS.`
      })
    }
    pendingWord = []
    i = j + 1
    continue
  }

  // Skip all-caps subheaders (e.g. CONTINENTS, OCEANS) so they don't become "words"
  if (trimmed.length <= 40 && /^[A-Z][A-Z\s\-]+$/.test(trimmed) && !/^[a-z]/.test(trimmed)) {
    pendingWord = []
    i++
    continue
  }

  // Sub-section header (all caps, no numbers) - skip or use as part of topic
  if (/^[A-Z][A-Z\s\-]+$/.test(trimmed) && trimmed.length < 50 && !trimmed.match(/^\d/)) {
    if (trimmed !== 'CONTINENTS' && trimmed !== 'OCEANS' && trimmed !== 'DAYS OF THE WEEK' && trimmed !== 'MONTHS OF THE YEAR' && trimmed !== 'MONEY MATTERS' && trimmed !== 'MARKETING') {
      // treat as potential word only if not a known subheader
    }
  }

  // Accumulate as word (until we see phonetic)
  if (currentSection && /^[a-zA-Z\s\-']+$/.test(trimmed) && !phoneticRegex.test(trimmed)) {
    pendingWord.push(trimmed)
  } else if (currentSection && trimmed && !phoneticRegex.test(trimmed)) {
    const hasVietnamese = /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(trimmed)
    if (!hasVietnamese) pendingWord.push(trimmed)
  }

  i++
}

if (currentSection && currentSection.vocabulary.length > 0) {
  sections.push(currentSection)
}

// Dedupe by word within each topic
sections.forEach(s => {
  const seen = new Set()
  s.vocabulary = s.vocabulary.filter(v => {
    const key = v.word.toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
})

writeFileSync(outputPath, JSON.stringify(sections, null, 2), 'utf-8')
console.log('Parsed', sections.length, 'sections. Sample:', sections[0]?.name, sections[0]?.vocabulary?.length, 'words')
console.log('Output:', outputPath)
