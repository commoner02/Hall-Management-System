import React from 'react';
import './Header.css';

const Header = () => {
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: true 
    });
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="university-logo">
            <div className="logo-circle">
              <span className="logo-text">কু</span>
            </div>
          </div>
          <div className="university-info">
            <h1 className="university-name">Khulna University of Engineering and Technology</h1>
            <h2 className="system-name">Shaheed Smriti Hall Management System</h2>
          </div>
        </div>
        <div className="header-right">
          <div className="current-time">{getCurrentTime()}</div>
        </div>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link">Home</a>
        <a href="#" className="nav-link dropdown">
          Help <span className="dropdown-arrow">▼</span>
        </a>
        <a href="#" className="nav-link">Contact</a>
        <a href="#" className="nav-link">Logout</a>
      </nav>
    </header>
  );
};

export default Header;
