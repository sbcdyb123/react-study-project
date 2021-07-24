import { Button } from 'antd'
import { useAuth } from 'context/AuthContext'
import { ProjectListScreen } from 'screens/ProjectList'

export const AuthenticatedApp = () => {
  const { loginout } = useAuth()
  return (
    <div>
      <Button type="primary" onClick={loginout}>
        退出登录
      </Button>
      <ProjectListScreen />
    </div>
  )
}
