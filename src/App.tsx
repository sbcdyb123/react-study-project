import './App.css'
import { AuthenticatedApp } from 'AuthenticatedApp'
import { useAuth } from 'context/AuthContext'
import { UnauthenticatedApp } from 'unauthenticated-app'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { FullPageFallback } from 'components/lib'

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  )
}

export default App
