import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import './MainContent.css';

const MainContent = () => {
  const [studentRoll, setStudentRoll] = useState('2107105');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [mealStatus, setMealStatus] = useState('OFF');

  const handleUpdate = () => {
    // Handle meal status update logic here
    console.log('Updating meal status:', {
      studentRoll,
      fromDate,
      toDate,
      mealStatus
    });
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h1 className="content-title">Boarder Meal Management</h1>
        <p className="content-instruction">
          You can off/ on your meal from or later date of 06/10/2025
        </p>
      </div>

      <div className="meal-management-section">
        <div className="section-divider">
          <hr />
          <span className="section-label">Meal On Off</span>
        </div>

        <div className="student-info">
          <div className="student-roll-section">
            <label className="form-label">Student Roll:</label>
            <div className="input-group">
              <input
                type="text"
                value={studentRoll}
                onChange={(e) => setStudentRoll(e.target.value)}
                className="form-input"
              />
              <button className="show-btn">Show</button>
            </div>
          </div>
          <div className="student-details">
            <p>Student Name: ABDULLAH AL NOMAN, Department: XXX</p>
          </div>
        </div>

        <div className="date-selection">
          <div className="date-input-group">
            <label className="form-label">From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="date-input-group">
            <label className="form-label">to:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="meal-status-control">
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="mealStatus"
                value="ON"
                checked={mealStatus === 'ON'}
                onChange={(e) => setMealStatus(e.target.value)}
              />
              <span className="radio-text">ON</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mealStatus"
                value="OFF"
                checked={mealStatus === 'OFF'}
                onChange={(e) => setMealStatus(e.target.value)}
              />
              <span className="radio-text">OFF</span>
            </label>
          </div>
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>

        <Calendar />
      </div>
    </main>
  );
};

export default MainContent;
