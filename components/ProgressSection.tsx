'use client'

import { useState, useEffect } from 'react'
import { topics } from '@/data/vocabulary'
import TopicIcon from './TopicIcon'
import ScrollReveal from './ScrollReveal'
import { FiBook, FiZap, FiClock, FiTarget } from 'react-icons/fi'

export default function ProgressSection() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState({
    total: 0,
    learned: 0,
    streak: 0,
    time: 0,
    accuracy: 0
  })

  useEffect(() => {
    setMounted(true)

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

  // Get motivational message
  const getMotivationalMessage = () => {
    if (progressPercent === 0) return "Bắt đầu hành trình học tập của bạn ngay hôm nay! 🚀"
    if (progressPercent < 25) return `Bạn đã hoàn thành ${progressPercent}% - Bước đầu tuyệt vời! Tiếp tục nhé! 💪`
    if (progressPercent < 50) return `Tuyệt vời! ${progressPercent}% rồi đấy! Bạn đang tiến bộ từng ngày!`
    if (progressPercent < 75) return `Xuất sắc! ${progressPercent}% hoàn thành! Bạn đang rất gần mục tiêu! 🌟`
    if (progressPercent < 100) return `Đỉnh cao! ${progressPercent}%! Chỉ còn ${100 - progressPercent}% nữa thôi! 🔥`
    return "Hoàn thành 100%! Bạn thật tuyệt vời! 🎉"
  }

  // Get target band message
  const getTargetMessage = () => {
    const completedTopics = topics.filter(t => getTopicProgress(t.id) === 100).length
    const totalTopics = topics.length
    const remaining = totalTopics - completedTopics
    
    if (remaining === 0) return "Bạn đã hoàn thành tất cả chủ đề! 🏆"
    if (remaining <= 3) return `Còn ${remaining} chủ đề để chạm Band 7.0+! Bạn sắp thành công rồi! 🎖️`
    if (remaining <= 10) return `Còn ${remaining} chủ đề nữa để đạt mục tiêu Band 6.5+! Cố lên! 💫`
    return `${completedTopics}/${totalTopics} chủ đề đã hoàn thành. Hãy tiếp tục học đều đặn! 📚`
  }

  const getTopicProgress = (topicId: string) => {
    if (!mounted) return 0
    try {
      const learningProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const topic = topics.find(t => t.id === topicId)
      if (!topic) return 0
      
      const learnedInTopic = topic.vocabulary.filter(v => learningProgress[v.word]).length
      return topic.vocabulary.length > 0 ? Math.round((learnedInTopic / topic.vocabulary.length) * 100) : 0
    } catch {
      return 0
    }
  }

  // Get current learning topic (topic with partial progress)
  const currentTopic = topics.find(t => {
    const p = getTopicProgress(t.id)
    return p > 0 && p < 100
  })

  // Get suggested next topic (not started yet)
  const suggestedNextTopic = topics.find(t => getTopicProgress(t.id) === 0)

  // Get today's goal status
  const getTodayGoalMessage = () => {
    const profile = typeof window !== 'undefined' 
      ? JSON.parse(localStorage.getItem('profile') || '{"studyGoal": 20}') 
      : { studyGoal: 20 }
    const goal = profile.studyGoal || 20
    
    const lastStudy = localStorage.getItem('lastStudyDate')
    const today = new Date().toDateString()
    
    if (lastStudy === today) {
      // Already studied today
      const todayProgress = parseInt(localStorage.getItem('todayWordsCount') || '0')
      if (todayProgress >= goal) {
        return { message: `🎉 Hoàn thành mục tiêu hôm nay (${todayProgress}/${goal} từ)!`, achieved: true }
      }
      return { message: `Hôm nay: ${todayProgress}/${goal} từ - Tiếp tục nào!`, achieved: false }
    }
    
    return { message: `Mục tiêu hôm nay: Học ${goal} từ mới`, achieved: false }
  }

  const todayGoal = mounted ? getTodayGoalMessage() : { message: '', achieved: false }

  return (
    <section id="progress" className="progress-section">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Tiến độ học tập của bạn</h2>
            <p className="motivational-message">{getMotivationalMessage()}</p>
            <p className="target-message">{getTargetMessage()}</p>
            <div className={`today-goal-banner ${todayGoal.achieved ? 'achieved' : ''}`}>
              <FiTarget className="goal-icon" />
              <span className="goal-text">{todayGoal.message}</span>
            </div>
          </div>
        </ScrollReveal>
        
        <div className="progress-grid">
          <ScrollReveal delay={100}>
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
          </ScrollReveal>
          
          <ScrollReveal delay={150}>
            <div className="progress-card">
              <div className="progress-icon"><FiBook /></div>
              <div className="progress-info">
                <span className="progress-value">{progress.learned}</span>
                <span className="progress-title">Từ đã học</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <div className="progress-card">
              <div className="progress-icon"><FiZap /></div>
              <div className="progress-info">
                <span className="progress-value">{progress.streak}</span>
                <span className="progress-title">Ngày liên tiếp</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={250}>
            <div className="progress-card">
              <div className="progress-icon"><FiClock /></div>
              <div className="progress-info">
                <span className="progress-value">{progress.time}</span>
                <span className="progress-title">Phút học</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300}>
            <div className="progress-card">
              <div className="progress-icon"><FiTarget /></div>
              <div className="progress-info">
                <span className="progress-value">{progress.accuracy}%</span>
                <span className="progress-title">Độ chính xác</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
        
        <ScrollReveal delay={350}>
          <div className="topics-progress">
            <h3>Tiến độ theo chủ đề</h3>
            
            {/* Action Hub - Next Steps */}
            <div className="action-hub">
              {currentTopic && (
                <div className="action-card action-continue">
                  <div className="action-header">
                    <span className="action-badge">Đang học</span>
                    <span className="action-priority">Ưu tiên</span>
                  </div>
                  <div className="action-content">
                    <span className="action-icon"><TopicIcon topicId={currentTopic.id} /></span>
                    <div className="action-info">
                      <span className="action-title">Tiếp tục: {currentTopic.nameVi}</span>
                      <span className="action-detail">{getTopicProgress(currentTopic.id)}% hoàn thành - Còn {currentTopic.vocabulary.length - Math.round(currentTopic.vocabulary.length * getTopicProgress(currentTopic.id) / 100)} từ</span>
                    </div>
                  </div>
                  <button 
                    className="btn-action-primary"
                    onClick={() => window.location.href = `/study/${currentTopic.id}`}
                  >
                    Tiếp tục học →
                  </button>
                </div>
              )}
              
              {suggestedNextTopic && (
                <div className="action-card action-suggest">
                  <div className="action-header">
                    <span className="action-badge suggest">Gợi ý hôm nay</span>
                  </div>
                  <div className="action-content">
                    <span className="action-icon"><TopicIcon topicId={suggestedNextTopic.id} /></span>
                    <div className="action-info">
                      <span className="action-title">Chủ đề mới: {suggestedNextTopic.nameVi}</span>
                      <span className="action-detail">{suggestedNextTopic.vocabulary.length} từ - Band {suggestedNextTopic.bandLevel}</span>
                    </div>
                  </div>
                  <button 
                    className="btn-action-secondary"
                    onClick={() => window.location.href = `/study/${suggestedNextTopic.id}`}
                  >
                    Bắt đầu học
                  </button>
                </div>
              )}
            </div>
            
            <div className="topics-progress-list">
              {topics.map(topic => {
                const topicProgress = getTopicProgress(topic.id)
                const isCompleted = topicProgress === 100
                const isCurrent = currentTopic && currentTopic.id === topic.id
                
                return (
                  <div 
                    key={topic.id} 
                    className={`topic-progress-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                  >
                    <span className="topic-icon"><TopicIcon topicId={topic.id} /></span>
                    <span className="topic-name">
                      {topic.name}
                      {isCompleted && <span className="check-icon"> ✓</span>}
                    </span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${topicProgress}%` }}></div>
                    </div>
                    <span className="progress-text">{topicProgress}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
