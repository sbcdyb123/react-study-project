import { useAuth } from 'context/AuthContext'
import { ProjectListScreen } from 'screens/ProjectList'

export const AuthenticatedApp = () => {
  const { loginout } = useAuth()
  return (
    <div>
      <button onClick={loginout}>退出登录</button>
      <ProjectListScreen />
    </div>
  )
}
