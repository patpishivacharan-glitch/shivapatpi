import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-icon" onClick={closeMobileMenu} title="Home">
            <span className="home-icon">🏠</span>
          </Link>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        <nav className={`nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link 
                to="/about" 
                className={`nav-link ${isActive('/about')}`}
                onClick={closeMobileMenu}
                title="About Me"
              >
                <span className="nav-icon">👤</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/technical" 
                className={`nav-link ${isActive('/technical')}`}
                onClick={closeMobileMenu}
                title="Technical"
              >
                <span className="nav-icon">💻</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/spiritual" 
                className={`nav-link ${isActive('/spiritual')}`}
                onClick={closeMobileMenu}
                title="Spiritual"
              >
                <span className="nav-icon">🧘</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/friends" 
                className={`nav-link ${isActive('/friends')}`}
                onClick={closeMobileMenu}
                title="Friends"
              >
                <span className="nav-icon">👥</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/books" 
                className={`nav-link ${isActive('/books')}`}
                onClick={closeMobileMenu}
                title="Books"
              >
                <span className="nav-icon">📚</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`nav-link ${isActive('/contact')}`}
                onClick={closeMobileMenu}
                title="Contact Us"
              >
                <span className="nav-icon">📧</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
        )}
      </div>
    </header>
  );
};

export default Header;