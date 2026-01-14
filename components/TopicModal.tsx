'use client'

import { Topic } from '@/data/vocabulary'
import { useState } from 'react'
import Link from 'next/link'
import TopicIcon from './TopicIcon'
import { FiLayers, FiFileText } from 'react-icons/fi'

interface TopicModalProps {
  topic: Topic
  isOpen: boolean
  onClose: () => void
}

export default function TopicModal({ topic, isOpen, onClose }: TopicModalProps) {
  const [learnedWords, setLearnedWords] = useState<Set<string>>(new Set())

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
          <Link href={`/study/${topic.id}`} className="btn btn-primary" onClick={onClose}>
            <FiLayers style={{ marginRight: '8px' }} /> Học Flashcard
          </Link>
          <Link href={`/quiz/${topic.id}`} className="btn btn-secondary" onClick={onClose}>
            <FiFileText style={{ marginRight: '8px' }} /> Làm Quiz
          </Link>
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
