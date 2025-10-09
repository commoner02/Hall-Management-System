import React from 'react';
import styles from './Header.module.css';

export default function Header({ user, onLogout }) {
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
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.left}>
          <h1>KUET Hall 01 - Dining Manager</h1>
        </div>
        
        <div className={styles.right}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.name}</span>
            <span className={styles.userRole}>({user?.role})</span>
          </div>
          <button 
            onClick={onLogout}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
