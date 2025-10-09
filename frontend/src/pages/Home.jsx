import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminModule from '../modules/AdminModule';
import ManagerModule from '../modules/ManagerModule';
import StudentModule from '../modules/StudentModule';
import Header from '../components/Header/Header';
import styles from './Home.module.css';

export const API_BASE_URL = 'https://hall-dining-management-system.vercel.app/api/v1';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // First try to get user from localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setLoading(false);
        return;
      }

      // If no stored user, fetch from API using cookies
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.data);
          localStorage.setItem('user', JSON.stringify(data.data));
        } else {
          throw new Error('Failed to fetch user data');
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load user data');
      // Redirect to login if authentication fails
      localStorage.clear();
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Back to Login</button>
      </div>
    );
  }

  const renderModuleByRole = () => {
    switch (user?.role?.toLowerCase()) {
      case 'admin':
        return <AdminModule user={user} />;
      case 'manager':
        return <ManagerModule user={user} />;
      case 'student':
        return <StudentModule user={user} />;
      default:
        return (
          <div className={styles.unknownRole}>
            <h2>Unknown Role</h2>
            <p>Your role "{user?.role}" is not recognized.</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        );
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Header user={user} onLogout={handleLogout} />
      <main className={styles.mainContent}>
        {renderModuleByRole()}
      </main>
    </div>
  );
}