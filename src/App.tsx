import './App.css'
import { AuthenticatedApp } from 'AuthenticatedApp'
import { useAuth } from 'context/AuthContext'
import { UnauthenticatedApp } from 'unauthenticated-app'
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  )
}

export default App
