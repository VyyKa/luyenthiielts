import { FiBook, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <FiBook className="logo-icon" />
              <span className="logo-text">IELTS<span className="accent">Vocab</span></span>
            </div>
            <p>Học từ vựng IELTS thông minh và hiệu quả</p>
          </div>
          
          <div className="footer-links">
            <h4>Liên kết</h4>
            <ul>
              <li><a href="#home">Trang chủ</a></li>
              <li><a href="#topics">Chủ đề</a></li>
              <li><a href="#flashcards">Flashcards</a></li>
              <li><a href="#progress">Tiến độ</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Tài nguyên</h4>
            <ul>
              <li><a href="https://ielts.idp.com/vietnam" target="_blank" rel="noopener noreferrer">IDP IELTS</a></li>
              <li><a href="https://ielts.idp.com/vietnam/about/news-and-articles/article-common-vocabulary-ielts-topics" target="_blank" rel="noopener noreferrer">Nguồn từ vựng</a></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Liên hệ</h4>
            <p>📧 contact@ieltsvocab.com</p>
            <div className="social-links">
              <a href="#" className="social-link"><FiFacebook /></a>
              <a href="#" className="social-link"><FiInstagram /></a>
              <a href="#" className="social-link"><FiTwitter /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 IELTS Vocab Master. Nguồn từ vựng từ <a href="https://ielts.idp.com/vietnam/about/news-and-articles/article-common-vocabulary-ielts-topics" target="_blank" rel="noopener noreferrer">IDP IELTS Vietnam</a></p>
        </div>
      </div>
    </footer>
  )
}
