'use client'

import { useState, useEffect } from 'react'
import { FiTarget } from 'react-icons/fi'

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    targetBand: '6.5',
    examDate: '',
    studyGoal: 20
  })
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('profile')
        if (saved) {
          setFormData(JSON.parse(saved))
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      localStorage.setItem('profile', JSON.stringify(formData))
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Có lỗi xảy ra khi lưu thông tin')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const getStudyGoalText = () => {
    const goal = parseInt(formData.studyGoal.toString())
    if (goal >= 50) return `${goal} từ/ngày - Tốc độ cao!`
    if (goal >= 30) return `${goal} từ/ngày = ~${Math.round(goal * 7)} từ/tuần`
    return `${goal} từ/ngày = ~${Math.round(goal * 7)} từ/tuần`
  }

  if (!isOpen) return null

  return (
    <>
      <div className={`modal ${isOpen ? 'active' : ''}`}>
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>&times;</button>
          <h2 className="modal-title">Thông tin cá nhân</h2>
          <p className="modal-subtitle">Cá nhân hóa trải nghiệm học tập của bạn</p>
          
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group avatar-upload">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ielts" alt="Avatar" className="profile-avatar" id="profileAvatar" />
              <button type="button" className="change-avatar-btn">Đổi avatar</button>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Họ</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Nguyễn" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Tên</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Văn A" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" />
            </div>
            
            <div className="form-group">
              <label htmlFor="targetBand">
                Mục tiêu band điểm
                <span className="field-helper">Dùng để gợi ý lộ trình học phù hợp</span>
              </label>
              <select id="targetBand" name="targetBand" value={formData.targetBand} onChange={handleChange}>
                <option value="5.5">Band 5.5</option>
                <option value="6.0">Band 6.0</option>
                <option value="6.5">Band 6.5</option>
                <option value="7.0">Band 7.0</option>
                <option value="7.5">Band 7.5</option>
                <option value="8.0">Band 8.0+</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="examDate">
                Ngày thi dự kiến
                <span className="field-helper">Giúp bạn lên kế hoạch ôn tập</span>
              </label>
              <input type="date" id="examDate" name="examDate" value={formData.examDate} onChange={handleChange} />
            </div>
            
            <div className="form-group">
              <label htmlFor="studyGoal">
                Mục tiêu học mỗi ngày
                <span className="field-helper">{getStudyGoalText()}</span>
              </label>
              <input 
                type="range" 
                id="studyGoal" 
                name="studyGoal" 
                value={formData.studyGoal} 
                onChange={handleChange} 
                min="5" 
                max="100"
                step="5"
                className="study-goal-slider"
              />
              <div className="slider-labels">
                <span>5 từ</span>
                <span className="current-goal">{formData.studyGoal} từ</span>
                <span>100 từ</span>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-full btn-save-profile">
              Lưu thông tin
            </button>
          </form>
        </div>
      </div>
      
      {showToast && (
        <div className="toast toast-success">
          <FiTarget className="toast-icon" />
          <span className="toast-message">Đã cập nhật mục tiêu học!</span>
        </div>
      )}
    </>
  )
}
