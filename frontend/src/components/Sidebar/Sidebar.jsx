import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('Student Meal On Off');

  const menuItems = [
    'My Profile',
    'Student Meal On Off',
    'Payment Details',
    'Change Login Password'
  ];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <span className="checkbox-icon">☑</span>
            Student
          </h3>
          <button 
            className="toggle-btn"
            onClick={toggleExpanded}
          >
            {isExpanded ? '−' : '+'}
          </button>
        </div>
        
        {isExpanded && (
          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`sidebar-link ${activeItem === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item);
                }}
              >
                <span className="checkbox-icon">☑</span>
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
