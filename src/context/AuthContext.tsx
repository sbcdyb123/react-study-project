import * as auth from 'authProvider'
import { useMount } from 'hooks'
import React, { ReactNode, useContext, useState } from 'react'
import { User } from 'screens/ProjectList/SearchPanel'
import { http } from 'utils/http'
type AuthContextType =
  | {
      user: User | null
      login: (form: auth.LoginParam) => void
      register: (form: auth.LoginParam) => void
      loginout: () => void
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
  const [user, setUser] = useState<User | null>(null)
  const login = (form: auth.LoginParam) => {
    auth.login(form).then(setUser)
  }
  const register = (form: auth.LoginParam) => {
    auth.register(form).then(setUser)
  }
  const loginout = () => {
    auth.loginout().then(() => {
      setUser(null)
    })
  }
  useMount(() => {
    bootstrapUser().then(setUser)
  })
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
