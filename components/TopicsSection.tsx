'use client'

import { useState, useMemo, useEffect } from 'react'
import { topics, Topic, type Vocabulary } from '@/data/vocabulary'
import TopicModal from './TopicModal'
import TopicIcon from './TopicIcon'
import { FiFileText, FiTarget } from 'react-icons/fi'

export default function TopicsSection() {
  const [filter, setFilter] = useState<'all' | 'writing' | 'speaking' | 'band7'>('all')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredTopics = useMemo(() => {
    if (filter === 'all') return topics
    if (filter === 'writing') return topics.filter(t => t.category === 'writing' || t.category === 'both')
    if (filter === 'speaking') return topics.filter(t => t.category === 'speaking' || t.category === 'both')
    if (filter === 'band7') return topics.filter(t => t.bandLevel >= 7)
    return topics
  }, [filter])

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic)
    setIsModalOpen(true)
  }

  const getProgress = (topicId: string) => {
    if (typeof window === 'undefined') return 0
    try {
      const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return 0
      
      const learnedInTopic = topic.vocabulary.filter((v: Vocabulary) => learningProgress[v.word]).length
      return topic.vocabulary.length > 0 
        ? Math.round((learnedInTopic / topic.vocabulary.length) * 100) 
        : 0
    } catch {
      return 0
    }
  }

  return (
    <>
      <section id="topics" className="topics-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Chủ đề từ vựng</h2>
            <p className="section-subtitle">Chọn chủ đề bạn muốn học để bắt đầu</p>
          </div>
          
          <div className="topics-filter">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tất cả</button>
            <button className={`filter-btn ${filter === 'writing' ? 'active' : ''}`} onClick={() => setFilter('writing')}>Writing</button>
            <button className={`filter-btn ${filter === 'speaking' ? 'active' : ''}`} onClick={() => setFilter('speaking')}>Speaking</button>
            <button className={`filter-btn ${filter === 'band7' ? 'active' : ''}`} onClick={() => setFilter('band7')}>Band 7+</button>
          </div>
          
          <div className="topics-grid">
            {filteredTopics.map((topic) => {
              const progress = mounted ? getProgress(topic.id) : 0
              return (
                <div key={topic.id} className="topic-card" onClick={() => handleTopicClick(topic)}>
                  <span className="topic-icon"><TopicIcon topicId={topic.id} /></span>
                  <h3 className="topic-name">{topic.name}</h3>
                  <p className="topic-name-vi">{topic.nameVi}</p>
                  <div className="topic-meta">
                    <span><FiFileText style={{ marginRight: '4px', verticalAlign: 'middle' }} /> {topic.vocabulary.length} từ</span>
                    <span><FiTarget style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Band {topic.bandLevel}</span>
                  </div>
                  {progress > 0 && (
                    <div className="topic-progress-bar">
                      <div className="topic-progress-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {selectedTopic && (
        <TopicModal 
          topic={selectedTopic} 
          isOpen={isModalOpen} 
          onClose={() => {
            setIsModalOpen(false)
            setSelectedTopic(null)
          }} 
        />
      )}
    </>
  )
}
