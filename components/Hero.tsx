'use client'

import { FiGlobe, FiHeart, FiMonitor, FiNavigation } from 'react-icons/fi'

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <div className="hero-content">
          <h1 className="hero-title">
            Chinh phục <span className="gradient-text">Từ vựng IELTS</span>
            <br />theo chủ đề
          </h1>
          <p className="hero-subtitle">
            Học từ vựng thông minh với bản đồ tư duy, flashcards tương tác 
            và theo dõi tiến độ học tập của bạn
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">65+</span>
              <span className="stat-label">Chủ đề</span>
            </div>
            <div className="stat">
              <span className="stat-number">2500+</span>
              <span className="stat-label">Từ vựng</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Miễn phí</span>
            </div>
          </div>
          <div className="hero-actions">
            <a href="#topics" onClick={(e) => { e.preventDefault(); scrollToSection('topics') }} className="btn btn-primary">Bắt đầu học</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }} className="btn btn-secondary">Tìm hiểu thêm</a>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="floating-card card-1">
            <FiGlobe style={{ marginRight: '8px' }} />
            Environment
          </div>
          <div className="floating-card card-2">
            <FiHeart style={{ marginRight: '8px' }} />
            Health
          </div>
          <div className="floating-card card-3">
            <FiMonitor style={{ marginRight: '8px' }} />
            Technology
          </div>
          <div className="floating-card card-4">
            <FiNavigation style={{ marginRight: '8px' }} />
            Travel
          </div>
        </div>
      </div>
    </section>
  )
}
