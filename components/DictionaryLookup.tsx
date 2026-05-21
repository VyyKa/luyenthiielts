"use client"

import { useEffect, useState } from 'react'
import { FiX, FiSearch } from 'react-icons/fi'

type DictionaryPhonetic = {
  text?: string
  audio?: string
}

type DictionaryDefinition = {
  definition: string
  example?: string
}

type DictionaryMeaning = {
  partOfSpeech?: string
  definitions?: DictionaryDefinition[]
}

type DictionaryEntry = {
  word?: string
  phonetics?: DictionaryPhonetic[]
  meanings?: DictionaryMeaning[]
}

type SavedWord = {
  word: string
  savedAt: string
}

const STORAGE_KEY = 'ieltsvocab.saved-words'

export default function DictionaryLookup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DictionaryEntry | null>(null)
  const [savedWords, setSavedWords] = useState<SavedWord[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setSavedWords(JSON.parse(raw) as SavedWord[])
      }
    } catch {
      setSavedWords([])
    }
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedWords))
    } catch {
      // ignore storage errors
    }
  }, [savedWords])

  if (!isOpen) return null

  const searchWord = async (word?: string) => {
    const q = (word ?? query).trim().toLowerCase()
    if (!q) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(q)}`)
      if (!res.ok) {
        if (res.status === 404) throw new Error('Không tìm thấy từ này')
        throw new Error('Lỗi khi gọi API')
      }
      const payload: DictionaryEntry[] = await res.json()
      setResult(payload[0] ?? null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void searchWord()
  }

  const saveCurrentWord = () => {
    const word = (result?.word || query).trim().toLowerCase()
    if (!word) return

    setSavedWords((current) => {
      if (current.some((item) => item.word === word)) return current
      return [{ word, savedAt: new Date().toISOString() }, ...current].slice(0, 50)
    })
  }

  return (
    <div className="lookup-overlay">
      <div className="lookup-card">
        <header className="lookup-header">
          <h3>Tra từ nhanh</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Đóng"><FiX /></button>
        </header>

        <div className="lookup-body">
          <form className="lookup-controls" onSubmit={handleSubmit}>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Nhập từ tiếng Anh..." />
            <button className="btn" type="submit" disabled={loading}><FiSearch /> Tra</button>
          </form>

          <div className="lookup-result">
            {loading && <div className="muted">Đang tìm...</div>}
            {error && <div className="error">{error}</div>}
            {result && (
              <div className="result-panel">
                <h4>{result.word}</h4>
                <button className="save-btn" type="button" onClick={saveCurrentWord}>
                  Lưu từ này
                </button>
                {(result.phonetics || []).map((p: DictionaryPhonetic, i: number) => (
                  <div key={i} className="muted">{p.text} {p.audio ? (<a href={p.audio} target="_blank" rel="noreferrer">(play)</a>) : null}</div>
                ))}

                {(result.meanings || []).map((m: DictionaryMeaning, mi: number) => (
                  <section key={mi} className="section-card">
                    <div className="namespace">{m.partOfSpeech}</div>
                    {m.definitions && m.definitions.map((d: DictionaryDefinition, di: number) => (
                      <div key={di} className="definition-item">
                        <p><strong>{d.definition}</strong></p>
                        {d.example && <p className="muted">“{d.example}”</p>}
                      </div>
                    ))}
                  </section>
                ))}
              </div>
            )}

            <div className="saved-section">
              <h4>Từ đã lưu</h4>
              {savedWords.length === 0 ? (
                <div className="muted">Chưa có từ nào được lưu.</div>
              ) : (
                <div className="saved-list">
                  {savedWords.map((item) => (
                    <button
                      key={item.word}
                      type="button"
                      className="saved-item"
                      onClick={() => {
                        setQuery(item.word)
                        void searchWord(item.word)
                      }}
                    >
                      <span>{item.word}</span>
                      <small>{new Date(item.savedAt).toLocaleDateString('vi-VN')}</small>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lookup-overlay{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(2,6,23,0.6);z-index:1200}
        .lookup-card{width:min(720px,95%);background:var(--card-bg,#071126);border-radius:12px;padding:14px;border:1px solid rgba(255,255,255,0.04)}
        .lookup-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .lookup-controls{display:flex;gap:8px}
        .lookup-controls input{flex:1;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:var(--text,#eaeef6)}
        .btn{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:8px;background:linear-gradient(90deg,#f6b84d,#55c8d9);border:none}
        .result-panel{margin-top:12px}
        .save-btn{margin:8px 0 12px;padding:8px 12px;border:none;border-radius:8px;background:rgba(85,200,217,0.16);color:var(--text,#eaeef6)}
        .saved-section{margin-top:20px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.08)}
        .saved-list{display:grid;gap:8px;margin-top:10px}
        .saved-item{display:flex;justify-content:space-between;align-items:center;width:100%;padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit;text-align:left}
        .saved-item:hover{background:rgba(255,255,255,0.04)}
        .muted{color:#9aa9bf}
        .error{color:#ff8b8b}
        .section-card{margin-top:12px}
      `}</style>
    </div>
  )
}
