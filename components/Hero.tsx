'use client'

import Link from 'next/link'
import { FiBook, FiTarget, FiZap, FiStar, FiCheck } from 'react-icons/fi'
import ScrollReveal from './ScrollReveal'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 80px)' }}>
        <ScrollReveal className="hero-content">
          <h1 className="hero-title">
            Chinh phục<br />
            <span className="gradient-text">Từ vựng IELTS</span>
            <br />theo chủ đề
          </h1>
          <p className="hero-subtitle">
            Học từ vựng thông minh với bản đồ tư duy, flashcards tương tác 
            và theo dõi tiến độ học tập của bạn
          </p>
          <div className="hero-features">
            <div className="hero-feature-item">
              <FiCheck className="feature-check" />
              <span>Học theo chủ đề IELTS</span>
            </div>
            <div className="hero-feature-item">
              <FiCheck className="feature-check" />
              <span>Flashcards tương tác</span>
            </div>
            <div className="hero-feature-item">
              <FiCheck className="feature-check" />
              <span>Theo dõi tiến độ</span>
            </div>
            <div className="hero-feature-item">
              <FiCheck className="feature-check" />
              <span>Hoàn toàn miễn phí</span>
            </div>
          </div>
          <div className="hero-actions">
            <Link href="/flashcards" className="btn btn-primary btn-hero-primary">Bắt đầu học miễn phí</Link>
            <Link href="/topics" className="btn btn-secondary btn-hero-secondary">Xem lộ trình học</Link>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={200} className="hero-illustration">
          <div className="illustration-gradient-bg"></div>
          <div className="illustration-stats-grid">
            <div className="mini-stat">
              <div className="mini-stat-icon"><FiBook /></div>
              <div className="mini-stat-value">500+</div>
              <div className="mini-stat-label">Từ vựng</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-icon"><FiTarget /></div>
              <div className="mini-stat-value">Band 7+</div>
              <div className="mini-stat-label">Mục tiêu</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-icon"><FiZap /></div>
              <div className="mini-stat-value">15+</div>
              <div className="mini-stat-label">Chủ đề</div>
            </div>
            <div className="mini-stat">
              <div className="mini-stat-icon"><FiStar /></div>
              <div className="mini-stat-value">100%</div>
              <div className="mini-stat-label">Miễn phí</div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
