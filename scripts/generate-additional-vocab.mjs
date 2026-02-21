import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const jsonPath = join(root, 'data', 'parsed-vocab-by-topic.json')
const outPath = join(root, 'data', 'additional-vocabulary.ts')

const sections = JSON.parse(readFileSync(jsonPath, 'utf-8'))
const existingIds = new Set(['environment', 'health', 'technology', 'education', 'travel', 'sports', 'family', 'food', 'work', 'crime', 'social-media', 'art', 'weather'])

function esc(s) {
  if (s == null) return ''
  return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ')
}

const lines = []
lines.push('import type { Vocabulary, Topic } from \'./vocabulary\';')
lines.push('')
lines.push('export const additionalTopics: Topic[] = [')

for (const s of sections) {
  if (existingIds.has(s.id)) continue
  const vocab = s.vocabulary.map(v => ({
    word: esc(v.word),
    phonetic: esc(v.phonetic),
    meaning: esc(v.meaning),
    example: esc(v.example || `${v.word} is commonly used in IELTS.`)
  }))
  lines.push('  {')
  lines.push(`    id: '${esc(s.id)}',`)
  lines.push(`    name: '${esc(s.name)}',`)
  lines.push(`    nameVi: '${esc(s.nameVi || s.name)}',`)
  lines.push(`    icon: '${s.icon || '📌'}',`)
  lines.push("    category: 'both',")
  lines.push('    bandLevel: 6,')
  lines.push('    vocabulary: [')
  for (const v of vocab) {
    lines.push(`      { word: '${v.word}', phonetic: '${v.phonetic}', meaning: '${v.meaning}', example: '${v.example}' },`)
  }
  lines.push('    ]')
  lines.push('  },')
}

lines.push('];')
writeFileSync(outPath, lines.join('\n'), 'utf-8')
console.log('Wrote', outPath, 'with', sections.filter(s => !existingIds.has(s.id)).length, 'topics')
