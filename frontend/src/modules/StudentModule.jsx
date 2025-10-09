import React from 'react';
import styles from './StudentModule.module.css';

export default function StudentModule({ user }) {
  return (
    <div className={styles.studentModule}>
      <div className={styles.header}>
        <h1>Student Dashboard</h1>
        <p>Hello, {user.name}!</p>
        <p className={styles.mealStatus}>
          Meal Status: <span className={user.mealStatus === 'On' ? styles.on : styles.off}>
            {user.mealStatus}
          </span>
        </p>
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <button className={styles.actionBtn}>Book Today's Meal</button>
          <button className={styles.actionBtn}>View Meal Schedule</button>
          <button className={styles.actionBtn}>My Profile</button>
          <button className={styles.actionBtn}>Meal History</button>
        </div>
      </div>

      <div className={styles.mealInfo}>
        <h2>Today's Menu</h2>
        <div className={styles.menuCard}>
          <h3>Lunch</h3>
          <p>Rice, Dal, Vegetables, Fish Curry</p>
        </div>
        <div className={styles.menuCard}>
          <h3>Dinner</h3>
          <p>Rice, Dal, Chicken, Salad</p>
        </div>
      </div>
    </div>
  );
}