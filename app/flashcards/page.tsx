'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { topics, topicGroups, topicMeta } from '@/data/vocabulary'
import TopicIcon from '@/components/TopicIcon'
import ScrollReveal from '@/components/ScrollReveal'
import { FiArrowLeft, FiBook, FiTrendingUp, FiTarget, FiEdit3, FiMic, FiSearch } from 'react-icons/fi'

export default function FlashcardsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'writing' | 'speaking' | 'both'>('all')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         topic.nameVi.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Get suggested topics based on popular topics
  const suggestedTopics = topics.filter(t => topicGroups.popular.includes(t.id)).slice(0, 3)

  const getCategoryColor = (category: string) => {
    if (category === 'speaking') return 'category-speaking'
    if (category === 'writing') return 'category-writing'
    return 'category-both'
  }

  return (
    <main className="flashcards-page">
      <header className="flashcards-page-header">
        <div className="flashcards-container flashcards-header-inner">
          <Link href="/" className="back-link">
            <FiArrowLeft /> Quay lại
          </Link>
          <div className="header-content">
            <h1 className="page-title">
              <FiBook className="title-icon" />
              Học Flashcards
            </h1>
            <p className="page-subtitle">Chọn chủ đề, lật thẻ và đánh dấu mức độ nhớ — luyện cả Speaking & Writing</p>
            <p className="page-encouragement">Bắt đầu từ chủ đề bạn quan tâm, học đều đặn mỗi ngày nhé!</p>
          </div>
        </div>
      </header>
      <div className="flashcards-container flashcards-content">

        <ScrollReveal delay={80}>
        {/* Suggested Learning Path */}
        {mounted && suggestedTopics.length > 0 && (
            <div className="suggested-path">
              <div className="suggested-header">
                <FiTrendingUp className="suggested-icon" />
                <span className="suggested-title">Gợi ý cho bạn:</span>
              </div>
              <div className="suggested-topics">
                {suggestedTopics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    onClick={() => router.push(`/study/${topic.id}`)}
                    className="suggested-topic-chip"
                  >
                    <span>{topic.nameVi}</span>
                    {idx < suggestedTopics.length - 1 && <span className="arrow">→</span>}
                  </button>
                ))}
              </div>
            </div>
        )}
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="flashcards-controls">
            <div className="search-wrap">
              <FiSearch className="search-icon" aria-hidden />
              <input
                type="text"
                placeholder="Tìm kiếm chủ đề..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Tìm kiếm chủ đề"
              />
            </div>

            <div className="category-filters">
              <button
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'writing' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('writing')}
              >
                <FiEdit3 /> Writing
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'speaking' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('speaking')}
              >
                <FiMic /> Speaking
              </button>
              <button
                className={`filter-btn ${selectedCategory === 'both' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('both')}
              >
                Cả hai
              </button>
            </div>
          </div>
        </ScrollReveal>

        {filteredTopics.length > 0 && (
          <p className="flashcards-results-count">
            {filteredTopics.length} chủ đề
          </p>
        )}

        <div className="topics-grid">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, index) => {
              const meta = topicMeta[topic.id] || {}
              return (
                <ScrollReveal key={topic.id} delay={150 + (index % 6) * 50}>
                  <button
                    onClick={() => router.push(`/study/${topic.id}`)}
                    className="topic-card-flashcards"
                  >
                    {meta.badge && (
                      <span className="flash-badge">{meta.badge}</span>
                    )}
                    <div className={`topic-icon-large category-${topic.category}`}>
                      <TopicIcon topicId={topic.id} />
                    </div>
                    <div className="topic-info">
                      <h3 className="topic-name">{topic.name}</h3>
                      <p className="topic-name-vi">{topic.nameVi}</p>
                      <div className="topic-meta">
                        <span className="vocab-count"><FiBook /> {topic.vocabulary.length} từ</span>
                        <span className={`category-badge ${getCategoryColor(topic.category)}`}>
                          {topic.category === 'both' ? 'Writing & Speaking' : topic.category === 'writing' ? 'Writing' : 'Speaking'}
                        </span>
                      </div>
                      <div className="band-level-badge">
                        <FiTarget className="band-icon" />
                        Band {topic.bandLevel}+
                      </div>
                    </div>
                    <div className="card-hover-cta">Bắt đầu học →</div>
                  </button>
                </ScrollReveal>
              )
            })
          ) : (
            <div className="no-results">
              <FiBook style={{ fontSize: '2.5rem', marginBottom: '12px', opacity: 0.5 }} aria-hidden />
              <p>Không tìm thấy chủ đề phù hợp</p>
              <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Thử đổi từ khóa hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
