import { useState } from 'react'
import Login from './pages/Login'
import Welcome from './pages/Welcome'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      {isLoggedIn ? (
        <Welcome />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  )
}

export default App