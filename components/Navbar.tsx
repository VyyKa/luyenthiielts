'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import ProfileModal from './ProfileModal'
import { FiBook, FiSun, FiMoon } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const { toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/')
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="nav-brand">
            <Link href="/" className="logo-link">
              <div className="logo">
                <FiBook className="logo-icon" />
                <span className="logo-text">IELTS<span className="accent">Vocab</span></span>
              </div>
            </Link>
          </div>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link href="/" onClick={closeMenu} className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                Trang chủ
              </Link>
            </li>
            <li>
              <Link href="/topics" onClick={closeMenu} className={`nav-link ${isActive('/topics') ? 'active' : ''}`}>
                Chủ đề
              </Link>
            </li>
            <li>
              <Link
                href="/flashcards"
                onClick={closeMenu}
                className={`nav-link ${isActive('/flashcards') || isActive('/study') ? 'active' : ''}`}
              >
                Flashcards
              </Link>
            </li>
            <li>
              <Link href="/progress" onClick={closeMenu} className={`nav-link ${isActive('/progress') ? 'active' : ''}`}>
                Tiến độ
              </Link>
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
