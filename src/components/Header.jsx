import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import './Header.css';

const Header = ({ currentPage, setCurrentPage }) => {
  const { user, isAuthenticated, logout, getUserDisplayName, getUserInitials } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavClick = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const handleSignUpClick = () => {
    setCurrentPage('profile');
  };

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    setCurrentPage('home');
  };

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      {/* Top highlight bar */}
      <div className="highlight-bar"></div>
      
      {/* Main navigation */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo/Brand */}
            <div className="brand">
              <button 
                className="brand-link"
                onClick={(e) => handleNavClick('home', e)}
              >
                <span className="brand-text">NASA Space Biology KG</span>
              </button>
            </div>
            
            {/* Navigation menu */}
            <nav className="nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick('home', e)}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${currentPage === 'search' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick('search', e)}
                  >
                    Search
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${currentPage === 'resources' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick('resources', e)}
                  >
                    Resources
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
                    onClick={(e) => handleNavClick('profile', e)}
                  >
                    About
                  </button>
                </li>
              </ul>
            </nav>
            
            {/* Header Actions - Sign Up or User Menu */}
            <div className="header-actions">
              {isAuthenticated() ? (
                <div className="user-menu" ref={userMenuRef}>
                  <button 
                    className="user-menu-trigger"
                    onClick={handleUserMenuToggle}
                  >
                    <div className="user-avatar-small">
                      {getUserInitials()}
                    </div>
                    <span className="user-name">{getUserDisplayName()}</span>
                    <svg 
                      className={`dropdown-arrow ${showUserMenu ? 'open' : ''}`}
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <div className="dropdown-header">
                        <div className="user-info-dropdown">
                          <div className="user-name-dropdown">{getUserDisplayName()}</div>
                          <div className="user-email-dropdown">{user?.email}</div>
                        </div>
                      </div>
                      <div className="dropdown-menu">
                        <button 
                          className="dropdown-item"
                          onClick={(e) => {
                            handleNavClick('profile', e);
                            setShowUserMenu(false);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                          </svg>
                          My Profile
                        </button>
                        <button 
                          className="dropdown-item"
                          onClick={(e) => {
                            handleNavClick('search', e);
                            setShowUserMenu(false);
                          }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                          </svg>
                          Search
                        </button>
                        <div className="dropdown-divider"></div>
                        <button 
                          className="dropdown-item logout"
                          onClick={handleLogout}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  className="btn btn-primary sign-up-btn"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;