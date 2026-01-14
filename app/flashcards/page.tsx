'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { topics, topicGroups, topicMeta } from '@/data/vocabulary'
import TopicIcon from '@/components/TopicIcon'
import ScrollReveal from '@/components/ScrollReveal'
import { FiArrowLeft, FiBook, FiTrendingUp, FiTarget, FiEdit3, FiMic } from 'react-icons/fi'

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
      <div className="flashcards-container">
        <ScrollReveal>
          <div className="flashcards-header">
            <Link href="/" className="back-link">
              <FiArrowLeft /> Quay lại
            </Link>
            <div className="header-content">
              <h1 className="page-title">
                <FiBook className="title-icon" />
                Học Flashcards
              </h1>
              <p className="page-subtitle">Mỗi chủ đề ~150 từ, luyện cho cả Speaking & Writing</p>
              <p className="page-encouragement">Bắt đầu từ chủ đề bạn quan tâm, học đều đặn mỗi ngày nhé!</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Suggested Learning Path */}
        {mounted && suggestedTopics.length > 0 && (
          <ScrollReveal delay={80}>
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
          </ScrollReveal>
        )}

        <ScrollReveal delay={100}>
          <div className="flashcards-controls">
            <input
              type="text"
              placeholder="Tìm kiếm chủ đề..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

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
              <p>Không tìm thấy chủ đề phù hợp</p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .flashcards-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          padding: 20px;
          padding-top: 100px;
        }

        .flashcards-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .flashcards-header {
          margin-bottom: 40px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          margin-bottom: 20px;
          width: fit-content;
        }

        .back-link:hover {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .header-content {
          margin-bottom: 30px;
        }

        .page-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 36px;
          color: var(--text-primary);
          margin: 0 0 12px 0;
        }

        .title-icon {
          width: 40px;
          height: 40px;
          color: var(--accent-primary);
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 16px;
          margin: 0;
        }

        .flashcards-controls {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .search-input {
          padding: 14px 20px;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(224, 122, 95, 0.1);
        }

        .category-filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 20px;
          border: 2px solid var(--border-color);
          border-radius: 8px;
          background: var(--bg-secondary);
          color: var(--text-primary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: var(--accent-primary);
        }

        .filter-btn.active {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .topic-card-flashcards {
          display: flex;
          flex-direction: column;
          padding: 24px;
          background: var(--bg-secondary);
          border: 2px solid var(--border-color);
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: inherit;
          text-align: left;
        }

        .topic-card-flashcards:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--accent-primary);
          box-shadow: 0 12px 32px rgba(224, 122, 95, 0.2);
          background: var(--bg-tertiary);
        }

        .topic-card-flashcards:active {
          transform: translateY(-4px) scale(0.98);
        }

        .topic-icon-large {
          font-size: 48px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          color: var(--accent-secondary);
          transition: transform 0.3s ease, filter 0.3s ease, color 0.3s ease;
        }

        .topic-icon-large.category-writing {
          color: var(--accent-primary);
        }

        .topic-icon-large.category-speaking {
          color: var(--accent-tertiary);
        }

        .topic-icon-large.category-both {
          color: var(--accent-quaternary);
        }

        .topic-card-flashcards:hover .topic-icon-large {
          transform: translateY(-2px) scale(1.05);
          filter:
            drop-shadow(0 16px 26px color-mix(in srgb, currentColor 35%, transparent))
            drop-shadow(0 0 18px color-mix(in srgb, currentColor 25%, transparent));
        }

        .topic-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .topic-name {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary);
          margin: 0 0 4px 0;
        }

        .topic-name-vi {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px 0;
        }

        .topic-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .vocab-count {
          font-size: 12px;
          padding: 4px 12px;
          background: var(--bg-tertiary);
          border-radius: 6px;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .category-badge {
          font-size: 11px;
          padding: 4px 12px;
          border-radius: 6px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .category-badge.writing {
          background: rgba(224, 122, 95, 0.1);
          color: var(--accent-primary);
        }

        .category-badge.speaking {
          background: rgba(129, 178, 154, 0.1);
          color: var(--accent-tertiary);
        }

        .category-badge.both {
          background: rgba(242, 204, 143, 0.1);
          color: var(--accent-quaternary);
        }

        .band-level {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-quaternary));
          color: white;
          border-radius: 4px;
          width: fit-content;
          margin-top: auto;
        }

        .no-results {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .no-results p {
          font-size: 18px;
          margin: 0;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 26px;
            margin-bottom: 24px;
          }

          .intro-text {
            font-size: 15px;
            margin-bottom: 32px;
            padding: 0 16px;
          }

          /* Optimize grid for tablets/mobile */
          .topics-grid {
            gap: 16px;
            /* Keep auto-fill behavior but perhaps ensure 1 column on very small screens */
          }

          .category-filters {
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
          }

          .filter-btn {
            flex: initial;
            font-size: 13px;
            padding: 8px 16px;
          }
        }

        @media (max-width: 480px) {
          .topics-grid {
            grid-template-columns: 1fr;
          }
          
          .topic-card-flashcards {
             padding: 20px;
          }

          .topic-icon-large {
            font-size: 40px;
          }

          .topic-name {
            font-size: 17px;
          }
        }
      `}</style>
    </main>
  )
}
