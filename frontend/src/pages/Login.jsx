// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const API_URL = 'https://hall-dining-management-system.vercel.app/api/v1/user/login';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        credentials: 'include', // This is crucial for cookies
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log('Login response:', data);
        console.log('Cookies after login:', document.cookie);

        if (data.success) {
          // Store complete user data from the response
          localStorage.setItem('user', JSON.stringify(data.data));
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('isLoggedIn', 'true');

          // Navigate to home page
          navigate('/home');
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KUET Hall 01</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Enter your email"
            disabled={isLoading}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Enter your password"
            disabled={isLoading}
            required
          />
        </div>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Test credentials for development */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          background: '#f8f9fa', 
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          <strong>🔧 Development Test Info:</strong>
          <br />
          <strong>API:</strong> {API_URL}
          <br />
          <strong>Test Email:</strong> saleheen.sakin@gmail.com
          <br />
          <strong>Test Password:</strong> Pass1234!
          <br />
          <br />
          <button 
            type="button" 
            onClick={() => {
              setEmail('saleheen.sakin@gmail.com');
              setPassword('Pass1234!');
            }}
            style={{
              padding: '5px 10px',
              background: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Fill Test Credentials
          </button>
        </div>
      )}
    </div>
  );
}