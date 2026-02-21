'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import ProfileModal from './ProfileModal'
import { FiBook, FiSun, FiMoon } from 'react-icons/fi'

export default function Navbar() {
  const pathname = usePathname()
  const { toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'topics', 'progress', 'about']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-brand">
            <Link href="/" className="logo" aria-label="Về trang chủ">
              <FiBook className="logo-icon" />
              <span className="logo-text">IELTS<span className="accent">Vocab</span></span>
            </Link>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              {isHomePage ? (
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home') }} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Trang chủ</a>
              ) : (
                <Link href="/" className="nav-link">Trang chủ</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#topics" onClick={(e) => { e.preventDefault(); scrollToSection('topics') }} className={`nav-link ${activeSection === 'topics' ? 'active' : ''}`}>Chủ đề</a>
              ) : (
                <Link href="/#topics" className="nav-link">Chủ đề</Link>
              )}
            </li>
            <li>
              <Link href="/flashcards" className={`nav-link ${pathname === '/flashcards' ? 'active' : ''}`}>Flashcards</Link>
            </li>
            <li>
              {isHomePage ? (
                <a href="#progress" onClick={(e) => { e.preventDefault(); scrollToSection('progress') }} className={`nav-link ${activeSection === 'progress' ? 'active' : ''}`}>Tiến độ</a>
              ) : (
                <Link href="/#progress" className="nav-link">Tiến độ</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>Giới thiệu</a>
              ) : (
                <Link href="/#about" className="nav-link">Giới thiệu</Link>
              )}
            </li>
          </ul>
          
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <FiSun className="sun-icon" />
              <FiMoon className="moon-icon" />
            </button>
            <button className="profile-btn" onClick={() => setIsProfileOpen(true)}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=ielts" alt="Avatar" className="avatar" />
              <span className="profile-name">Học viên</span>
            </button>
          </div>
          
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>
      
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  )
}
