'use client'

import { useState, useEffect } from 'react'
import { topics, Topic, topicGroups, topicMeta } from '@/data/vocabulary'
import TopicModal from './TopicModal'
import TopicIcon from './TopicIcon'
import ScrollReveal from './ScrollReveal'
import { FiFileText, FiTarget, FiTrendingUp, FiMic, FiEdit3, FiZap } from 'react-icons/fi'

export default function TopicsSection() {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    popular: true,
    speaking: false,
    writing: false,
    advanced: false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic)
    setIsModalOpen(true)
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const getProgress = (topicId: string) => {
    if (!mounted) return 0
    try {
      const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return 0
      
      const learnedInTopic = topic.vocabulary.filter(v => learningProgress[v.word]).length
      return topic.vocabulary.length > 0 
        ? Math.round((learnedInTopic / topic.vocabulary.length) * 100) 
        : 0
    } catch {
      return 0
    }
  }

  const getTopicsByGroup = (group: string[]) => {
    return topics.filter(t => group.includes(t.id))
  }

  const renderTopicCard = (topic: Topic, index: number) => {
    const progress = getProgress(topic.id)
    const meta = topicMeta[topic.id] || {}
    
    return (
      <ScrollReveal key={topic.id} delay={150 + (index % 6) * 50}>
        <div className="topic-card" onClick={() => handleTopicClick(topic)}>
          {(meta.badge || meta.difficulty) && (
            <div className="topic-badges">
              {meta.badge && <span className="topic-badge badge-hot">{meta.badge}</span>}
              {meta.difficulty && <span className={`topic-badge badge-difficulty badge-${meta.difficulty.toLowerCase()}`}>{meta.difficulty}</span>}
            </div>
          )}
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
              <span className="progress-text">{progress}%</span>
            </div>
          )}
          <div className="topic-cta">Học ngay →</div>
        </div>
      </ScrollReveal>
    )
  }

  return (
    <>
      <section id="topics" className="topics-section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="section-title">Chủ đề từ vựng IELTS</h2>
              <p className="section-subtitle">Chọn chủ đề phù hợp với mục tiêu của bạn</p>
            </div>
          </ScrollReveal>

          {/* Popular Topics */}
          <div className="topic-group topic-group-first">
            <ScrollReveal>
              <div className="topic-group-header">
                <div className="group-title-wrapper">
                  <FiTrendingUp className="group-icon" />
                  <h3 className="group-title">Chủ đề phổ biến IELTS</h3>
                </div>
                <p className="group-subtitle">Các chủ đề hay gặp nhất trong đề thi IELTS</p>
              </div>
            </ScrollReveal>
            
            <div className="topics-grid">
              {getTopicsByGroup(topicGroups.popular).slice(0, expandedSections.popular ? undefined : 6).map((topic, idx) => renderTopicCard(topic, idx))}
            </div>
            
            {getTopicsByGroup(topicGroups.popular).length > 6 && !expandedSections.popular && (
              <button className="btn-show-more" onClick={() => toggleSection('popular')}>
                Xem thêm {getTopicsByGroup(topicGroups.popular).length - 6} chủ đề
              </button>
            )}
          </div>

          {/* Speaking Topics */}
          <div className="topic-group topic-group-speaking">
            <ScrollReveal>
              <div className="topic-group-header">
                <div className="group-title-wrapper">
                  <FiMic className="group-icon" />
                  <h3 className="group-title">Chủ đề Speaking</h3>
                </div>
                <p className="group-subtitle">Từ vựng thiết yếu cho phần thi Speaking</p>
              </div>
            </ScrollReveal>
            
            <div className="topics-grid">
              {getTopicsByGroup(topicGroups.speaking).slice(0, expandedSections.speaking ? undefined : 6).map((topic, idx) => renderTopicCard(topic, idx))}
            </div>
            
            {!expandedSections.speaking && getTopicsByGroup(topicGroups.speaking).length > 6 && (
              <button className="btn-show-more" onClick={() => toggleSection('speaking')}>
                Xem thêm {getTopicsByGroup(topicGroups.speaking).length - 6} chủ đề
              </button>
            )}
          </div>

          {/* Writing Topics */}
          <div className="topic-group topic-group-writing">
            <ScrollReveal>
              <div className="topic-group-header">
                <div className="group-title-wrapper">
                  <FiEdit3 className="group-icon" />
                  <h3 className="group-title">Chủ đề Writing</h3>
                </div>
                <p className="group-subtitle">Từ vựng quan trọng cho bài luận IELTS Writing</p>
              </div>
            </ScrollReveal>
            
            <div className="topics-grid">
              {getTopicsByGroup(topicGroups.writing).slice(0, expandedSections.writing ? undefined : 6).map((topic, idx) => renderTopicCard(topic, idx))}
            </div>
            
            {!expandedSections.writing && getTopicsByGroup(topicGroups.writing).length > 6 && (
              <button className="btn-show-more" onClick={() => toggleSection('writing')}>
                Xem thêm {getTopicsByGroup(topicGroups.writing).length - 6} chủ đề
              </button>
            )}
          </div>

          {/* Advanced Topics */}
          <div className="topic-group topic-group-advanced">
            <ScrollReveal>
              <div className="topic-group-header">
                <div className="group-title-wrapper">
                  <FiZap className="group-icon" />
                  <h3 className="group-title">Nâng cao Band 7+</h3>
                </div>
                <p className="group-subtitle">Chủ đề chuyên sâu cho mục tiêu band điểm cao</p>
              </div>
            </ScrollReveal>
            
            <div className="topics-grid">
              {getTopicsByGroup(topicGroups.advanced).map((topic, idx) => renderTopicCard(topic, idx))}
            </div>
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
