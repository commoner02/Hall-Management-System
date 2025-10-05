import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // October 2025

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getDateStatus = (day) => {
    if (day <= 4) return 'meal-close';
    return 'meal-on';
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button 
          className="nav-button"
          onClick={() => navigateMonth(-1)}
        >
          Sep
        </button>
        <h3 className="month-year">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button 
          className="nav-button"
          onClick={() => navigateMonth(1)}
        >
          Nov
        </button>
      </div>
      
      <div className="calendar-grid">
        {dayNames.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day ? getDateStatus(day) : 'empty'}`}
          >
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color meal-on"></div>
          <span>Meal On</span>
        </div>
        <div className="legend-item">
          <div className="legend-color meal-off"></div>
          <span>Meal Off</span>
        </div>
        <div className="legend-item">
          <div className="legend-color meal-close"></div>
          <span>Meal Close</span>
        </div>
        <div className="legend-item">
          <div className="legend-color hall-close"></div>
          <span>Hall Close</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
