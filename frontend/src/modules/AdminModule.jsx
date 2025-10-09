import React from 'react';
import styles from './AdminModule.module.css';
const API_BASE_URL = 'https://hall-dining-management-system.vercel.app/api/v1';

export default async function AdminModule({ user }) {
    const date = new Date(Date.now()).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    const response = await fetch(`${API_BASE_URL}/summary/${date}`, {
        method: 'GET',
        credentials: 'include',
        
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      console.log(await response.json());
  return (
    <div className={styles.adminModule}>
      <div className={styles.header}>
        <h1>Admin Dashboard</h1>
        <p>Welcome back, {user.name}!</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Users</h3>
          <p className={styles.statNumber}>150</p>
        </div>
        <div className={styles.statCard}>
          <h3>Active Managers</h3>
          <p className={styles.statNumber}>5</p>
        </div>
        <div className={styles.statCard}>
          <h3>Students</h3>
          <p className={styles.statNumber}>145</p>
        </div>
        <div className={styles.statCard}>
          <h3>Meal Orders Today</h3>
          <p className={styles.statNumber}>87</p>
        </div>
      </div>

      <div className={styles.adminActions}>
        <h2>Admin Actions</h2>
        <div className={styles.actionGrid}>
          <button className={styles.actionBtn}>Manage Users</button>
          <button className={styles.actionBtn}>System Settings</button>
          <button className={styles.actionBtn}>View Reports</button>
          <button className={styles.actionBtn}>Meal Management</button>
        </div>
      </div>
    </div>
  );
}