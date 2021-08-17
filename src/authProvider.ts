import { User } from './types/User'
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者自行开发
const apiUrl = process.env.REACT_APP_API_URL
const localstorageKey = '__auth_provider_token__'

export const getToken = () => localStorage.getItem(localstorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  localStorage.setItem(localstorageKey, user.token || '')
  return user
}
export interface LoginParam {
  username: string
  password: string
}
/**
 * @Date: 2021-07-24 03:45:54
 * @name: 方龙
 * @description: 登录
 * @param {LoginParam} data
 * @return {*}
 */
export const login = (data: LoginParam) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}
/**
 * @Date: 2021-07-24 03:46:03
 * @name: 方龙
 * @description: 注册
 * @param {LoginParam} data
 * @return {*}
 */
export const register = (data: LoginParam) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json())
    } else {
      return Promise.reject(await response.json())
    }
  })
}

/**
 * @Date: 2021-07-24 03:46:10
 * @name: 方龙
 * @description: 退出登录
 * @param {*}
 * @return {*}
 */
export const loginout = async () => localStorage.removeItem(localstorageKey)
