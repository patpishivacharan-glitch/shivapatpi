import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-text">
            ShivaPatpi
          </Link>
        </div>
        <nav className="nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={`nav-link ${isActive('/about')}`}>
                AboutMe
              </Link>
            </li>
            <li>
              <Link to="/technical" className={`nav-link ${isActive('/technical')}`}>
                Technical
              </Link>
            </li>
            <li>
              <Link to="/spiritual" className={`nav-link ${isActive('/spiritual')}`}>
                Spiritual
              </Link>
            </li>
            <li>
              <Link to="/friends" className={`nav-link ${isActive('/friends')}`}>
                Friends
              </Link>
            </li>
            <li>
              <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
                ContactUs
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;