import { FiTarget, FiRotateCw, FiBarChart2, FiMoon } from 'react-icons/fi'

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">Về IELTS Vocab Master</h2>
            <p>
              Trang web được xây dựng dựa trên nguồn từ vựng từ 
              <a href="https://ielts.idp.com/vietnam/about/news-and-articles/article-common-vocabulary-ielts-topics" target="_blank" rel="noopener noreferrer"> IDP IELTS</a>, 
              giúp bạn học từ vựng theo chủ đề một cách hiệu quả.
            </p>
            <p>
              Sử dụng phương pháp bản đồ tư duy và lặp lại ngắt quãng (Spaced Repetition) 
              để ghi nhớ từ vựng lâu dài hơn.
            </p>
            
            <div className="features-list">
              <div className="feature">
                <span className="feature-icon"><FiTarget /></span>
                <div>
                  <h4>Học theo chủ đề</h4>
                  <p>15+ chủ đề phổ biến trong IELTS</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon"><FiRotateCw /></span>
                <div>
                  <h4>Flashcards tương tác</h4>
                  <p>Lật thẻ để học từ hiệu quả</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon"><FiBarChart2 /></span>
                <div>
                  <h4>Theo dõi tiến độ</h4>
                  <p>Biết bạn đã học được bao nhiêu</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon"><FiMoon /></span>
                <div>
                  <h4>Dark/Light mode</h4>
                  <p>Bảo vệ mắt khi học đêm</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="mindmap-preview">
              <div className="mindmap-center">IELTS Vocab</div>
              <div className="mindmap-branch branch-1">Environment</div>
              <div className="mindmap-branch branch-2">Health</div>
              <div className="mindmap-branch branch-3">Technology</div>
              <div className="mindmap-branch branch-4">Education</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
