import { useHttp } from 'utils/http'
import { useAsync } from 'hooks'
import { useCallback, useEffect } from 'react'
import { Project } from 'screens/ProjectList/List'
import { cleanObject } from 'utils'

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp()
  const { run, ...result } = useAsync<Project[]>()
  const fetchProjects = useCallback(
    () => http('projects', { data: cleanObject(param || {}) }),
    [http, param],
  )
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    })
  }, [fetchProjects, param, run])
  return result
}
export const useEditProject = () => {
  const http = useHttp()
  const { run, ...result } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(
      http(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      }),
    )
  }
  return { mutate, ...result }
}
export const useAddProject = () => {
  const http = useHttp()
  const { run, ...result } = useAsync()
  const mutate = (params: Partial<Project>) => {
    return run(
      http(`projects/${params.id}`, {
        data: params,
        method: 'POST',
      }),
    )
  }
  return { mutate, ...result }
}
