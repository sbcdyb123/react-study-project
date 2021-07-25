import * as auth from 'authProvider'
import { FullPageFallback, FullPageLoading } from 'components/lib'
import { useAsync, useMount } from 'hooks'
import React, { ReactNode, useContext } from 'react'
import { User } from 'screens/ProjectList/SearchPanel'
import { http } from 'utils/http'
type AuthContextType =
  | {
      user: User | null
      login: (form: auth.LoginParam) => Promise<void>
      register: (form: auth.LoginParam) => Promise<void>
      loginout: () => Promise<void>
    }
  | undefined
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}
const AuthContext = React.createContext<AuthContextType>(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>()
  // const [user, setUser] = useState<User | null>(null)
  const login = (form: auth.LoginParam) => auth.login(form).then(setUser)
  const register = (form: auth.LoginParam) => auth.register(form).then(setUser)
  const loginout = () =>
    auth.loginout().then(() => {
      setUser(null)
    })

  useMount(() => {
    run(bootstrapUser())
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageFallback error={error} />
  }
  return (
    <AuthContext.Provider
      value={{ user, login, loginout, register }}
      children={children}
    />
  )
}
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
