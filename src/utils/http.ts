import { loginout } from 'authProvider'
import { useAuth } from 'context/AuthContext'
import { stringify } from 'qs'
import { useCallback } from 'react'

const apiUrl = process.env.REACT_APP_API_URL
interface Config extends RequestInit {
  data?: object
  token?: string
}
export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {},
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-type': data ? 'application/json' : '',
    },
    ...customConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    url += `?${stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }
  return fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    if (response.status === 401) {
      await loginout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export const useHttp = () => {
  const { user } = useAuth()
  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
      http(url, { ...config, token: user?.token }),
    [user?.token],
  )
}
