'use client'

import { useState, useEffect } from 'react'

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
      alert('Đã lưu thông tin!')
      onClose()
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

  if (!isOpen) return null

  return (
    <div className={`modal ${isOpen ? 'active' : ''}`}>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Thông tin cá nhân</h2>
        
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
            <label htmlFor="targetBand">Mục tiêu band điểm</label>
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
            <label htmlFor="examDate">Ngày thi dự kiến</label>
            <input type="date" id="examDate" name="examDate" value={formData.examDate} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="studyGoal">Mục tiêu học mỗi ngày (từ)</label>
            <input type="number" id="studyGoal" name="studyGoal" value={formData.studyGoal} onChange={handleChange} min="5" max="100" />
          </div>
          
          <button type="submit" className="btn btn-primary btn-full">Lưu thông tin</button>
        </form>
      </div>
    </div>
  )
}
