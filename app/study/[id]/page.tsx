'use client'

import { useState, useEffect } from 'react'
import { topics, Vocabulary } from '@/data/vocabulary'
import { FiRotateCw, FiChevronLeft, FiChevronRight, FiArrowLeft, FiBook, FiXCircle, FiMeh, FiSmile, FiAward, FiZap, FiStar, FiTrendingUp, FiFileText, FiGrid } from 'react-icons/fi'
import Link from 'next/link'
import TopicIcon from '@/components/TopicIcon'
import { useParams } from 'next/navigation'

export default function StudyPage() {
  const params = useParams()
  const topicId = params.id as string

  const [topic, setTopic] = useState<typeof topics[0] | null>(null)
  const [currentVocab, setCurrentVocab] = useState<Vocabulary[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [milestoneToast, setMilestoneToast] = useState<{ show: boolean; message: string; emoji: string }>({ show: false, message: '', emoji: '' })
  const [sessionWordsCount, setSessionWordsCount] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [topicLearnedCount, setTopicLearnedCount] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (topicId) {
      const foundTopic = topics.find(t => t.id === topicId)
      if (foundTopic) {
        setTopic(foundTopic)
        setCurrentVocab(foundTopic.vocabulary)
        setCurrentIndex(0)
        setIsFlipped(false)
      }
    }
  }, [topicId])

  // Sync topic learned count from localStorage (client-only, avoids hydration mismatch)
  useEffect(() => {
    if (!mounted || !topic) return
    try {
      const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      const learned = topic.vocabulary.filter((v: Vocabulary) => progress[v.word]).length
      setTopicLearnedCount(learned)
    } catch {
      setTopicLearnedCount(0)
    }
  }, [mounted, topic, currentIndex, sessionWordsCount])

  const showMilestoneToast = (count: number) => {
    let message = ''
    let iconName = ''
    
    if (count === 10) {
      message = 'Bạn đã học 10 từ - Rất tốt!'
      iconName = 'award'
    } else if (count === 25) {
      message = 'Xuất sắc! 25 từ rồi - Tiếp tục nhé!'
      iconName = 'zap'
    } else if (count === 50) {
      message = 'Đỉnh cao! 50 từ hoàn thành!'
      iconName = 'star'
    } else if (count === 100) {
      message = 'Không thể tin được! 100 từ trong một lần!'
      iconName = 'trending-up'
    } else {
      return
    }
    
    setMilestoneToast({ show: true, message, emoji: iconName })
    setTimeout(() => {
      setMilestoneToast({ show: false, message: '', emoji: '' })
    }, 3000)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      if (isFlipped) {
        setIsFlipped(false)
        setTimeout(() => {
          setCurrentIndex(currentIndex - 1)
        }, 150)
      } else {
        setCurrentIndex(currentIndex - 1)
      }
    }
  }

  const handleNext = () => {
    if (currentIndex < currentVocab.length - 1) {
      if (isFlipped) {
        setIsFlipped(false)
        setTimeout(() => {
          setCurrentIndex(currentIndex + 1)
        }, 150)
      } else {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    if (!currentWord || currentVocab.length === 0) return
    
    // Save learning progress
    const word = currentWord.word
    if (typeof window !== 'undefined') {
      const progress = JSON.parse(localStorage.getItem('learningProgress') || '{}')
      progress[word] = { difficulty, date: new Date().toISOString() }
      localStorage.setItem('learningProgress', JSON.stringify(progress))
      
      // Update study time
      const currentTime = parseInt(localStorage.getItem('studyTime') || '0')
      localStorage.setItem('studyTime', String(currentTime + 1))
      
      // Update last study date and today's word count
      const today = new Date().toDateString()
      const lastStudy = localStorage.getItem('lastStudyDate')
      if (lastStudy !== today) {
        localStorage.setItem('lastStudyDate', today)
        localStorage.setItem('todayWordsCount', '1')
        const streak = lastStudy && new Date(lastStudy).getTime() === new Date(today).getTime() - 86400000 
          ? parseInt(localStorage.getItem('streak') || '0') + 1 
          : 1
        localStorage.setItem('streak', String(streak))
      } else {
        const todayCount = parseInt(localStorage.getItem('todayWordsCount') || '0') + 1
        localStorage.setItem('todayWordsCount', String(todayCount))
      }
      
      // Track session words and show milestone
      const newSessionCount = sessionWordsCount + 1
      setSessionWordsCount(newSessionCount)
      showMilestoneToast(newSessionCount)
      setTopicLearnedCount(prev => prev + 1)
    }
    
    // Move to next card
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const currentWord = currentVocab[currentIndex]

  if (!topic) {
    return (
      <main className="study-page">
        <div className="study-container">
          <div className="study-header">
            <Link href="/" className="back-link">
              <FiArrowLeft /> Quay lại
            </Link>
          </div>
          <div className="loading">Đang tải...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="study-page">
      <div className="study-container">
        <div className="study-header">
          <div className="study-header-top">
            <Link href="/" className="back-link">
              <FiArrowLeft /> Quay lại
            </Link>
            <div className="study-header-links">
              <Link href="/flashcards" className="study-header-link">
                <FiGrid /> Chọn chủ đề khác
              </Link>
              <Link href={`/quiz/${topic.id}`} className="study-header-link study-header-link-quiz">
                <FiFileText /> Làm Quiz
              </Link>
            </div>
          </div>
          <div className="study-title-block">
            <span className="study-icon"><TopicIcon topicId={topic.id} /></span>
            <div className="study-title-text">
              <h1 className="study-topic-name">{topic.name}</h1>
              {topic.nameVi && <span className="study-topic-name-vi">{topic.nameVi}</span>}
              {mounted && (
                <span className="study-topic-progress-badge">
                  Đã học {topicLearnedCount}/{topic.vocabulary.length} từ
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flashcard-container study-full">
          <div className="flashcard-controls">
            <div className="card-counter">
              <span>{currentVocab.length > 0 ? currentIndex + 1 : 0}</span> / <span>{currentVocab.length}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${currentVocab.length > 0 ? (currentIndex + 1) / currentVocab.length * 100 : 0}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flashcard-wrapper study-large">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  {currentWord ? (
                    <>
                      <span className="word">{currentWord.word}</span>
                      <span className="phonetic">{currentWord.phonetic}</span>
                    </>
                  ) : (
                    <span className="word">Không có từ</span>
                  )}
                </div>
                <div className="flashcard-back">
                  {currentWord ? (
                    <>
                      <span className="meaning">{currentWord.meaning}</span>
                      <span className="example">&ldquo;{currentWord.example}&rdquo;</span>
                    </>
                  ) : (
                    <span className="meaning">Ý nghĩa</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flashcard-actions">
            <button className="fc-btn" onClick={handlePrev} disabled={currentIndex === 0 || currentVocab.length === 0}>
              <FiChevronLeft style={{ marginRight: '8px' }} /> Trước
            </button>
            <button className="fc-btn flip-btn" onClick={handleFlip} disabled={currentVocab.length === 0}>
              <FiRotateCw style={{ marginRight: '8px' }} /> Lật thẻ
            </button>
            <button className="fc-btn" onClick={handleNext} disabled={currentIndex === currentVocab.length - 1 || currentVocab.length === 0}>
              Sau <FiChevronRight style={{ marginLeft: '8px' }} />
            </button>
          </div>
          
          <div className="learning-buttons">
            <button className="learn-btn hard" onClick={() => handleDifficulty('hard')} disabled={currentVocab.length === 0}><FiXCircle /> Khó</button>
            <button className="learn-btn medium" onClick={() => handleDifficulty('medium')} disabled={currentVocab.length === 0}><FiMeh /> Bình thường</button>
            <button className="learn-btn easy" onClick={() => handleDifficulty('easy')} disabled={currentVocab.length === 0}><FiSmile /> Dễ</button>
          </div>
        </div>
        
        {/* Session Progress Counter */}
        {sessionWordsCount > 0 && (
          <div className="session-counter">
            <FiBook className="counter-icon" />
            <span className="counter-text">Phiên này: {sessionWordsCount} từ</span>
          </div>
        )}
      </div>

      {/* Milestone Toast */}
      {milestoneToast.show && (
        <div className="milestone-toast">
          <span className="milestone-emoji">
            {milestoneToast.emoji === 'award' && <FiAward size={64} />}
            {milestoneToast.emoji === 'zap' && <FiZap size={64} />}
            {milestoneToast.emoji === 'star' && <FiStar size={64} />}
            {milestoneToast.emoji === 'trending-up' && <FiTrendingUp size={64} />}
          </span>
          <span className="milestone-message">{milestoneToast.message}</span>
        </div>
      )}

      <style jsx>{`
        .study-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          padding: 20px;
          padding-top: 100px;
        }

        .study-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .study-header {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 28px;
        }

        .study-header-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .study-header-links {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .back-link,
        .study-header-link {
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
          transition: all 0.2s ease;
          width: fit-content;
        }

        .back-link:hover,
        .study-header-link:hover {
          background: var(--accent-primary);
          color: white;
          border-color: var(--accent-primary);
        }

        .study-header-link-quiz {
          background: var(--card-bg);
          border-color: var(--accent-primary);
          color: var(--accent-primary);
        }

        .study-header-link-quiz:hover {
          background: var(--accent-primary);
          color: white;
        }

        .study-title-block {
          display: flex;
          align-items: flex-start;
          gap: 20px;
        }

        .study-icon {
          font-size: 48px;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .study-title-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .study-topic-name {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-primary);
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .study-topic-name-vi {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .study-topic-progress-badge {
          display: inline-block;
          margin-top: 8px;
          padding: 6px 12px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          width: fit-content;
        }

        .flashcard-container.study-full {
          max-width: 100%;
        }

        .flashcard-wrapper.study-large {
          min-height: 480px;
          max-height: 580px;
        }

        .progress-bar {
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          overflow: hidden;
          margin-top: 12px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
          transition: width 0.3s ease;
        }

        /* Enhanced Flashcard Styles */
        .flashcard {
          cursor: pointer;
          position: relative;
        }

        .flashcard-inner {
          transform-style: preserve-3d;
          transition: transform 0.45s ease-in-out;
        }

        .flashcard.flipped .flashcard-inner {
          transform: rotateY(180deg);
        }

        .flashcard-front,
        .flashcard-back {
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
          border-radius: 12px;
          text-align: center;
          min-height: 480px;
        }

        .flashcard-front {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #fdb833 100%);
          color: white;
          box-shadow: 0 20px 60px rgba(255, 107, 53, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .flashcard-back {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          color: white;
          transform: rotateY(180deg);
          box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .flashcard .word {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 16px;
          letter-spacing: -0.02em;
          line-height: 1.1;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .flashcard .phonetic {
          font-size: 1.3rem;
          opacity: 0.95;
          margin-bottom: 24px;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .flashcard .meaning {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .flashcard .example {
          font-size: 1.05rem;
          opacity: 0.92;
          font-style: italic;
          max-width: 380px;
          line-height: 1.6;
          margin-bottom: 16px;
          font-weight: 400;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: var(--text-secondary);
          font-size: 16px;
        }

        /* Session Counter */
        .session-counter {
          position: fixed;
          top: 100px;
          right: 32px;
          background: var(--card-bg);
          border: 2px solid var(--accent-tertiary);
          border-radius: 12px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: var(--shadow-md);
          z-index: 100;
          animation: slideInRight 0.4s ease-out;
        }

        .counter-icon {
          font-size: 1.3rem;
        }

        .counter-text {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.95rem;
        }

        /* Milestone Toast */
        .milestone-toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          padding: 32px 48px;
          border-radius: 20px;
          box-shadow: 0 16px 48px rgba(255, 107, 53, 0.5);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          animation: milestoneAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .milestone-emoji {
          font-size: 4rem;
          animation: bounceEmoji 0.6s ease-out;
        }

        .milestone-message {
          font-size: 1.5rem;
          font-weight: 700;
          text-align: center;
          line-height: 1.4;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes milestoneAppear {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        @keyframes bounceEmoji {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2) rotate(-10deg);
          }
          50% {
            transform: scale(0.9) rotate(10deg);
          }
          75% {
            transform: scale(1.1) rotate(-5deg);
          }
        }

        @media (max-width: 768px) {
          .study-page {
            padding-bottom: 220px;
            padding-left: 16px;
            padding-right: 16px;
            padding-top: 88px;
          }

          .study-container {
            padding-bottom: 24px;
          }

          .study-header-top {
            flex-direction: column;
            align-items: stretch;
          }

          .study-header-links {
            justify-content: flex-start;
          }

          .study-header-link {
            padding: 8px 14px;
            font-size: 13px;
          }

          .study-title-block {
            flex-direction: row;
            align-items: flex-start;
            gap: 14px;
          }

          .study-topic-name {
            font-size: 22px;
          }

          .study-topic-name-vi {
            font-size: 0.9rem;
          }

          .study-topic-progress-badge {
            font-size: 0.8rem;
            padding: 5px 10px;
          }

          .study-icon {
            font-size: 36px;
          }

          .flashcard-wrapper.study-large {
            min-height: 220px;
            max-height: 320px;
          }

          .flashcard-front,
          .flashcard-back {
            min-height: 220px;
            padding: 24px 20px;
          }

          .flashcard .word {
            font-size: 2rem;
          }

          .flashcard .phonetic {
            font-size: 1rem;
          }

          .flashcard .meaning {
            font-size: 1.4rem;
          }

          .flashcard .example {
            font-size: 0.9rem;
          }

          .flashcard-actions {
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-top: 16px;
          }

          .learning-buttons {
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
            margin-top: 12px;
          }

          .fc-btn,
          .learn-btn {
            min-height: 44px;
          }

          .session-counter {
            top: 72px;
            right: 12px;
            padding: 8px 12px;
            font-size: 0.85rem;
          }

          .milestone-toast {
            padding: 24px 32px;
          }

          .milestone-emoji {
            font-size: 3rem;
          }

          .milestone-message {
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .study-page {
            padding-bottom: 200px;
          }

          .flashcard-wrapper.study-large {
            min-height: 200px;
            max-height: 280px;
          }

          .flashcard-front,
          .flashcard-back {
            min-height: 200px;
            padding: 20px 16px;
          }

          .flashcard .word {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </main>
  )
}
