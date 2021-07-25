import { useHttp } from 'utils/http'
import { useAsync } from 'hooks'
import { useEffect } from 'react'
import { Project } from 'screens/ProjectList/List'
import { cleanObject } from 'utils'

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  useEffect(() => {
    run(http('projects', { data: cleanObject(param || {}) }))
    // eslint-disable-next-line
  }, [param])
  return result
}
