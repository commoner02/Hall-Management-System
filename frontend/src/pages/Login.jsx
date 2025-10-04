import { useState } from 'react'
import styles from './Login.module.css'

export default function Login({ onLogin }) {
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (loginId === '2107000' && password === '518east') {
      onLogin()
      setError('')
    } else {
      setError('Invalid Login ID or Password')
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>KUET Hall 01</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Login Id :</label>
          <input
            type="text"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
    </div>
  )
}