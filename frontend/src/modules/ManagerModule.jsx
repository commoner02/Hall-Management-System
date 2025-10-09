import React from 'react';
import styles from './ManagerModule.module.css';

export default function ManagerModule({ user }) {
  return (
    <div className={styles.managerModule}>
      <div className={styles.header}>
        <h1>Manager Dashboard</h1>
        <p>Welcome, {user.name}!</p>
      </div>

      <div className={styles.todayOverview}>
        <h2>Today's Overview</h2>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewCard}>
            <h3>Meal Orders</h3>
            <p className={styles.number}>87</p>
          </div>
          <div className={styles.overviewCard}>
            <h3>Students Present</h3>
            <p className={styles.number}>145</p>
          </div>
        </div>
      </div>

      <div className={styles.managerActions}>
        <h2>Manager Tools</h2>
        <div className={styles.actionGrid}>
          <button className={styles.actionBtn}>Meal Planning</button>
          <button className={styles.actionBtn}>Student Management</button>
          <button className={styles.actionBtn}>Meal Reports</button>
          <button className={styles.actionBtn}>Inventory</button>
        </div>
      </div>
    </div>
  );
}