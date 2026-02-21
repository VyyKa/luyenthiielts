'use client'

import { Topic } from '@/data/vocabulary'
import { useState } from 'react'
import TopicIcon from './TopicIcon'
import { FiLayers, FiFileText } from 'react-icons/fi'

interface TopicModalProps {
  topic: Topic
  isOpen: boolean
  onClose: () => void
}

export default function TopicModal({ topic, isOpen, onClose }: TopicModalProps) {
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set())

  const handleStartFlashcards = () => {
    // Store selected topic for flashcards
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedTopic', topic.id)
    }
    onClose()
    // Scroll to flashcards section
    setTimeout(() => {
      const element = document.getElementById('flashcards')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const toggleLearned = (word: string) => {
    const newSet = new Set(learnedWords)
    if (newSet.has(word)) {
      newSet.delete(word)
    } else {
      newSet.add(word)
    }
    setLearnedWords(newSet)
  }

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content modal-large">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <div className="topic-modal-header">
          <span className="topic-modal-icon"><TopicIcon topicId={topic.id} /></span>
          <h2 className="modal-title">{topic.name}</h2>
        </div>
        
        <div className="topic-modal-actions">
          <button className="btn btn-primary" onClick={handleStartFlashcards}>
            <FiLayers style={{ marginRight: '8px' }} /> Học Flashcard
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            <FiFileText style={{ marginRight: '8px' }} /> Làm Quiz
          </button>
        </div>
        
        <div className="vocabulary-list">
          {topic.vocabulary.map((vocab, index) => (
            <div key={index} className="vocab-item">
              <div>
                <div className="vocab-word">{vocab.word}</div>
                <div className="vocab-phonetic">{vocab.phonetic}</div>
              </div>
              <div className="vocab-meaning">{vocab.meaning}</div>
              <div 
                className={`vocab-status ${learnedWords.has(vocab.word) ? 'learned' : ''}`}
                onClick={() => toggleLearned(vocab.word)}
                style={{ cursor: 'pointer' }}
              >
                {learnedWords.has(vocab.word) ? '✓' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
