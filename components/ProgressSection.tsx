'use client'

import { useState, useEffect } from 'react'
import { topics, type Vocabulary } from '@/data/vocabulary'
import TopicIcon from './TopicIcon'
import { FiBook, FiZap, FiClock, FiTarget } from 'react-icons/fi'

export default function ProgressSection() {
  const [progress, setProgress] = useState({
    total: 0,
    learned: 0,
    streak: 0,
    time: 0,
    accuracy: 0
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      // Calculate progress from localStorage
      const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const learnedWords = Object.keys(learningProgress).length
      const totalWords = topics.reduce((sum, topic) => sum + topic.vocabulary.length, 0)
      
      // Calculate streak (simplified - check last study date)
      const lastStudy = localStorage.getItem('lastStudyDate')
      const today = new Date().toDateString()
      let streak = parseInt(localStorage.getItem('streak') || '0')
      if (lastStudy !== today && lastStudy) {
        // Reset streak if not studied today
        const lastStudyDate = new Date(lastStudy)
        const todayDate = new Date(today)
        const diffTime = todayDate.getTime() - lastStudyDate.getTime()
        const diffDays = diffTime / (1000 * 60 * 60 * 24)
        if (diffDays > 1) {
          streak = 0
        }
      }

      // Calculate accuracy (simplified)
      const difficulties = Object.values(learningProgress) as Array<{ difficulty: string }>
      const easyCount = difficulties.filter(d => d.difficulty === 'easy').length
      const accuracy = difficulties.length > 0 ? Math.round((easyCount / difficulties.length) * 100) : 0

      setProgress({
        total: totalWords,
        learned: learnedWords,
        streak,
        time: parseInt(localStorage.getItem('studyTime') || '0'),
        accuracy
      })
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }, [])

  const progressPercent = progress.total > 0 ? Math.round((progress.learned / progress.total) * 100) : 0
  const circumference = 2 * Math.PI * 54
  const offset = circumference - (progressPercent / 100) * circumference

  const getTopicProgress = (topicId: string) => {
    if (typeof window === 'undefined') return 0
    try {
      const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return 0
      
      const learnedInTopic = topic.vocabulary.filter((v: Vocabulary) => learningProgress[v.word]).length
      return topic.vocabulary.length > 0 ? Math.round((learnedInTopic / topic.vocabulary.length) * 100) : 0
    } catch {
      return 0
    }
  }

  return (
    <section id="progress" className="progress-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Tiến độ học tập</h2>
          <p className="section-subtitle">Theo dõi quá trình học của bạn</p>
        </div>
        
        <div className="progress-grid">
          <div className="progress-card main-progress">
            <div className="progress-ring-container">
              <svg className="progress-ring" viewBox="0 0 120 120">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="var(--accent-tertiary)" />
                  </linearGradient>
                </defs>
                <circle className="progress-ring-bg" cx="60" cy="60" r="54"/>
                <circle 
                  className="progress-ring-fill" 
                  cx="60" 
                  cy="60" 
                  r="54"
                  style={{ strokeDashoffset: offset }}
                />
              </svg>
              <div className="progress-text">
                <span className="progress-percent">{progressPercent}%</span>
                <span className="progress-label">Hoàn thành</span>
              </div>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-icon"><FiBook /></div>
            <div className="progress-info">
              <span className="progress-value">{progress.learned}</span>
              <span className="progress-title">Từ đã học</span>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-icon"><FiZap /></div>
            <div className="progress-info">
              <span className="progress-value">{progress.streak}</span>
              <span className="progress-title">Ngày liên tiếp</span>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-icon"><FiClock /></div>
            <div className="progress-info">
              <span className="progress-value">{progress.time}</span>
              <span className="progress-title">Phút học</span>
            </div>
          </div>
          
          <div className="progress-card">
            <div className="progress-icon"><FiTarget /></div>
            <div className="progress-info">
              <span className="progress-value">{progress.accuracy}%</span>
              <span className="progress-title">Độ chính xác</span>
            </div>
          </div>
        </div>
        
        <div className="topics-progress">
          <h3>Tiến độ theo chủ đề</h3>
          <div className="topics-progress-list">
            {topics.map(topic => {
              const topicProgress = getTopicProgress(topic.id)
              return (
                <div key={topic.id} className="topic-progress-item">
                  <span className="topic-icon"><TopicIcon topicId={topic.id} /></span>
                  <span className="topic-name">{topic.name}</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${topicProgress}%` }}></div>
                  </div>
                  <span className="progress-text">{topicProgress}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
