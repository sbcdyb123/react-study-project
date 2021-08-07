import * as auth from 'authProvider'
import { FullPageFallback, FullPageLoading } from 'components/lib'
import { useAsync, useMount } from 'hooks'
import React, { ReactNode, useCallback } from 'react'
import { User } from 'screens/ProjectList/SearchPanel'
import { http } from 'utils/http'
import * as authStore from 'store/auth-slice'
import { useDispatch, useSelector } from 'react-redux'

export const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>()
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  useMount(() => {
    run(dispatch(authStore.bootStrap()))
  })
  if (isIdle || isLoading) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageFallback error={error} />
  }
  return <div>{children}</div>
}
export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch()
  const user = useSelector(authStore.selectUser)
  const login = useCallback(
    (form: auth.LoginParam) => dispatch(authStore.login(form)),
    [dispatch],
  )
  const register = useCallback(
    (form: auth.LoginParam) => dispatch(authStore.register(form)),
    [dispatch],
  )
  const loginout = useCallback(() => dispatch(authStore.loginout()), [dispatch])
  return {
    user,
    login,
    register,
    loginout,
  }
}
