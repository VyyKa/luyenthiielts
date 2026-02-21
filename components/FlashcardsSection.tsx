'use client'

import Link from 'next/link'
import { FiBook, FiChevronRight } from 'react-icons/fi'

export default function FlashcardsSection() {
  return (
    <section id="flashcards" className="flashcards-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Flashcards học tập</h2>
          <p className="section-subtitle">Học từ vựng hiệu quả với phương pháp lặp lại ngắt quãng — chọn chủ đề và luyện trên trang riêng</p>
        </div>
        <div className="flashcards-cta">
          <div className="flashcards-cta-content">
            <div className="flashcards-cta-icon">
              <FiBook />
            </div>
            <div>
              <h3 className="flashcards-cta-title">Học Flashcards theo chủ đề</h3>
              <p className="flashcards-cta-desc">65+ chủ đề, 2500+ từ — lật thẻ, đánh dấu dễ/khó, theo dõi tiến độ. Mở trang Flashcards để bắt đầu.</p>
            </div>
          </div>
          <Link href="/flashcards" className="btn btn-primary flashcards-cta-btn">
            Mở trang Flashcards
            <FiChevronRight style={{ marginLeft: '8px' }} />
          </Link>
        </div>
      </div>
    </section>
  )
}
