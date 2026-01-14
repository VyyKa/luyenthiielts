'use client'

import { useState, useEffect } from 'react'
import { topics, Vocabulary } from '@/data/vocabulary'
import { FiRotateCw, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function FlashcardsSection() {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('')
  const [currentVocab, setCurrentVocab] = useState<Vocabulary[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    // Check if topic was selected from modal
    if (typeof window !== 'undefined') {
      const savedTopic = localStorage.getItem('selectedTopic')
      if (savedTopic) {
        setSelectedTopicId(savedTopic)
        const topic = topics.find(t => t.id === savedTopic)
        if (topic) {
          setCurrentVocab(topic.vocabulary)
        }
        localStorage.removeItem('selectedTopic')
      }
    }
  }, [])

  useEffect(() => {
    if (selectedTopicId) {
      const topic = topics.find(t => t.id === selectedTopicId)
      if (topic) {
        setCurrentVocab(topic.vocabulary)
        setCurrentIndex(0)
        setIsFlipped(false)
      }
    }
  }, [selectedTopicId])

  const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTopicId(e.target.value)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      setIsFlipped(false)
    }
  }

  const handleNext = () => {
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
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
      
      // Update last study date
      const today = new Date().toDateString()
      const lastStudy = localStorage.getItem('lastStudyDate')
      if (lastStudy !== today) {
        localStorage.setItem('lastStudyDate', today)
        const streak = lastStudy && new Date(lastStudy).getTime() === new Date(today).getTime() - 86400000 
          ? parseInt(localStorage.getItem('streak') || '0') + 1 
          : 1
        localStorage.setItem('streak', String(streak))
      }
    }
    
    // Move to next card
    if (currentIndex < currentVocab.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    }
  }

  const currentWord = currentVocab[currentIndex]

  return (
    <section id="flashcards" className="flashcards-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flashcards học tập</h2>
          <p className="section-subtitle">Học từ vựng hiệu quả với phương pháp lặp lại ngắt quãng</p>
        </div>
        
        <div className="flashcard-container">
          <div className="flashcard-controls">
            <select 
              className="topic-select" 
              value={selectedTopicId}
              onChange={handleTopicChange}
            >
              <option value="">Chọn chủ đề...</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>
                  {topic.icon} {topic.name}
                </option>
              ))}
            </select>
            <div className="card-counter">
              <span>{currentVocab.length > 0 ? currentIndex + 1 : 0}</span> / <span>{currentVocab.length}</span>
            </div>
          </div>
          
          <div className="flashcard-wrapper">
            <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  {currentWord ? (
                    <>
                      <span className="word">{currentWord.word}</span>
                      <span className="phonetic">{currentWord.phonetic}</span>
                    </>
                  ) : (
                    <span className="word">Chọn chủ đề để bắt đầu</span>
                  )}
                </div>
                <div className="flashcard-back">
                  {currentWord ? (
                    <>
                      <span className="meaning">{currentWord.meaning}</span>
                      <span className="example">{currentWord.example}</span>
                    </>
                  ) : (
                    <span className="meaning">Nghĩa tiếng Việt</span>
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
            <button className="learn-btn hard" onClick={() => handleDifficulty('hard')} disabled={currentVocab.length === 0}>😓 Khó</button>
            <button className="learn-btn medium" onClick={() => handleDifficulty('medium')} disabled={currentVocab.length === 0}>🤔 Bình thường</button>
            <button className="learn-btn easy" onClick={() => handleDifficulty('easy')} disabled={currentVocab.length === 0}>😊 Dễ</button>
          </div>
        </div>
      </div>
    </section>
  )
}
