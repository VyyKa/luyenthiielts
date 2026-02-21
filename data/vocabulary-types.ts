export interface Vocabulary {
  word: string
  phonetic: string
  meaning: string
  example: string
}

export interface Topic {
  id: string
  name: string
  nameVi: string
  icon: string
  category: 'writing' | 'speaking' | 'both'
  bandLevel: number
  vocabulary: Vocabulary[]
}
