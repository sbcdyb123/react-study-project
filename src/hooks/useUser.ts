import { useHttp } from 'utils/http'
import { useAsync } from 'hooks'
import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { User } from 'types/User'

export const useUser = (param?: Partial<User>) => {
  const http = useHttp()
  const { run, ...result } = useAsync<User[]>()
  useEffect(() => {
    run(http('users', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line
  }, [param])
  return result
}
