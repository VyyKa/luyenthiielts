'use client'

import { useState, useEffect } from 'react'
import { topics, Vocabulary } from '@/data/vocabulary'
import { FiArrowLeft, FiCheck, FiX, FiAward, FiRefreshCw } from 'react-icons/fi'
import Link from 'next/link'
import TopicIcon from '@/components/TopicIcon'
import { useParams } from 'next/navigation'

type QuizQuestion = {
  word: Vocabulary
  options: string[]
  correctAnswer: string
  userAnswer?: string
}

export default function QuizPage() {
  const params = useParams()
  const topicId = params.id as string

  const [topic, setTopic] = useState<typeof topics[0] | null>(null)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    if (topicId) {
      const foundTopic = topics.find(t => t.id === topicId)
      if (foundTopic) {
        setTopic(foundTopic)
        generateQuestions(foundTopic)
      }
    }
  }, [topicId])

  const generateQuestions = (topic: typeof topics[0]) => {
    // Randomly select 10 words
    const shuffled = [...topic.vocabulary].sort(() => Math.random() - 0.5)
    const selectedWords = shuffled.slice(0, Math.min(10, topic.vocabulary.length))

    const quizQuestions = selectedWords.map(word => {
      // Get correct answer
      const correctAnswer = word.meaning

      // Get 3 random wrong answers from other words
      const otherWords = topic.vocabulary.filter((w: Vocabulary) => w.word !== word.word)
      const wrongAnswers = otherWords
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((w: Vocabulary) => w.meaning)

      // Shuffle options
      const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)

      return {
        word,
        options,
        correctAnswer,
        userAnswer: undefined
      }
    })

    setQuestions(quizQuestions)
  }

  const handleAnswer = (answer: string) => {
    if (isAnswered) return

    setSelectedAnswer(answer)
    setIsAnswered(true)

    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestion].userAnswer = answer

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setQuestions(updatedQuestions)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
      saveQuizResult()
    }
  }

  const saveQuizResult = () => {
    if (typeof window !== 'undefined') {
      const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '{}')
      if (!quizHistory[topicId]) {
        quizHistory[topicId] = []
      }
      quizHistory[topicId].push({
        date: new Date().toISOString(),
        score: score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0),
        total: questions.length
      })
      localStorage.setItem('quizHistory', JSON.stringify(quizHistory))
    }
  }

  const restartQuiz = () => {
    if (topic) {
      generateQuestions(topic)
      setCurrentQuestion(0)
      setScore(0)
      setShowResult(false)
      setSelectedAnswer(null)
      setIsAnswered(false)
    }
  }

  if (!topic) {
    return (
      <main className="quiz-page">
        <div className="quiz-container">
          <div className="loading">Đang tải...</div>
        </div>
      </main>
    )
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    const passed = percentage >= 70

    return (
      <main className="quiz-page">
        <div className="quiz-container">
          <div className="quiz-result">
            <div className="result-icon">
              <FiAward size={80} className={passed ? 'success' : 'warning'} />
            </div>
            <h1 className="result-title">{passed ? 'Xuất sắc!' : 'Cố gắng thêm nhé!'}</h1>
            <div className="result-score">
              <span className="score-value">{score}</span>
              <span className="score-divider">/</span>
              <span className="score-total">{questions.length}</span>
            </div>
            <div className="result-percentage">{percentage}% đúng</div>
            <p className="result-message">
              {passed
                ? 'Bạn đã nắm vững từ vựng trong chủ đề này!'
                : 'Hãy ôn lại và thử lại nhé!'}
            </p>

            <div className="result-actions">
              <button className="btn btn-primary" onClick={restartQuiz}>
                <FiRefreshCw /> Làm lại
              </button>
              <Link href={`/study/${topicId}`} className="btn btn-secondary">
                Ôn lại Flashcards
              </Link>
              <Link href="/topics" className="btn btn-secondary">
                Chọn chủ đề khác
              </Link>
            </div>

            <div className="review-section">
              <h3>Xem lại đáp án</h3>
              <div className="review-list">
                {questions.map((q, idx) => (
                  <div key={idx} className={`review-item ${q.userAnswer === q.correctAnswer ? 'correct' : 'wrong'}`}>
                    <div className="review-header">
                      <span className="review-number">Câu {idx + 1}</span>
                      {q.userAnswer === q.correctAnswer ? (
                        <FiCheck className="review-icon success" />
                      ) : (
                        <FiX className="review-icon error" />
                      )}
                    </div>
                    <div className="review-word">{q.word.word}</div>
                    <div className="review-phonetic">{q.word.phonetic}</div>
                    {q.userAnswer !== q.correctAnswer && (
                      <>
                        <div className="review-answer wrong">
                          <FiX /> Bạn chọn: {q.userAnswer}
                        </div>
                        <div className="review-answer correct">
                          <FiCheck /> Đáp án đúng: {q.correctAnswer}
                        </div>
                      </>
                    )}
                    {q.userAnswer === q.correctAnswer && (
                      <div className="review-answer correct">
                        <FiCheck /> {q.correctAnswer}
                      </div>
                    )}
                    <div className="review-example">&ldquo;{q.word.example}&rdquo;</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  const question = questions[currentQuestion]
  if (!question) {
    return (
      <main className="quiz-page">
        <div className="quiz-container">
          <div className="loading">Đang tải câu hỏi...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <Link href={`/topics`} className="back-link">
            <FiArrowLeft /> Quay lại
          </Link>
          <div className="quiz-topic">
            <TopicIcon topicId={topic.id} />
            <span>{topic.nameVi}</span>
          </div>
        </div>

        <div className="quiz-progress">
          <div className="progress-text">
            Câu {currentQuestion + 1} / {questions.length}
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="score-display">
            Điểm: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
          </div>
        </div>

        <div className="quiz-content">
          <div className="question-word">
            <h2>{question.word.word}</h2>
            <p className="question-phonetic">{question.word.phonetic}</p>
          </div>

          <div className="question-prompt">Chọn nghĩa đúng:</div>

          <div className="options-grid">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === question.correctAnswer
              const showCorrect = isAnswered && isCorrect
              const showWrong = isAnswered && isSelected && !isCorrect

              return (
                <button
                  key={idx}
                  className={`option-btn ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                >
                  <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                  <span className="option-text">{option}</span>
                  {showCorrect && <FiCheck className="option-icon" />}
                  {showWrong && <FiX className="option-icon" />}
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <div className={`feedback ${selectedAnswer === question.correctAnswer ? 'correct' : 'wrong'}`}>
              <div className="feedback-icon">
                {selectedAnswer === question.correctAnswer ? <FiCheck size={32} /> : <FiX size={32} />}
              </div>
              <div className="feedback-text">
                {selectedAnswer === question.correctAnswer ? (
                  <>
                    <strong>Chính xác!</strong>
                    <p>Bạn đã chọn đúng đáp án.</p>
                  </>
                ) : (
                  <>
                    <strong>Chưa đúng!</strong>
                    <p>Đáp án đúng là: <strong>{question.correctAnswer}</strong></p>
                  </>
                )}
                <p className="feedback-example">Ví dụ: &ldquo;{question.word.example}&rdquo;</p>
              </div>
            </div>
          )}

          {isAnswered && (
            <button className="btn btn-primary btn-next" onClick={handleNext}>
              {currentQuestion < questions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}
