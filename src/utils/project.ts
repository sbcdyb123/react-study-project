import { useHttp } from 'utils/http'
import { Project } from 'screens/ProjectList/List'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp()
  return useQuery<Project[]>(['projects', param], () =>
    http('projects', { data: param }),
  )
}
export const useEditProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      http(`project/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    { onSuccess: () => queryClient.invalidateQueries('projects') },
  )
}
export const useAddProject = () => {
  const http = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        data: params,
        method: 'POST',
      }),
    { onSuccess: () => queryClient.invalidateQueries('projects') },
  )
}

export const useProject = (id: number) => {
  const http = useHttp()
  return useQuery<Project>(['project', { id }], () => http(`projects/${id}`), {
    enabled: !!id,
  })
}
