import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from './useOptimisiticOptions'
import { useHttp } from 'utils/http'
import { Project } from 'types/Project'
import { QueryKey, useMutation, useQuery } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const http = useHttp()
  return useQuery<Project[]>(['projects', param], () =>
    http('projects', { data: param }),
  )
}
export const useEditProject = (queryKey: QueryKey) => {
  const http = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey),
  )
}
export const useAddProject = (queryKey: QueryKey) => {
  const http = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        data: params,
        method: 'POST',
      }),
    useAddConfig(queryKey),
  )
}
export const useDeleteProject = (queryKey: QueryKey) => {
  const http = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      http(`projects/${id}`, {
        method: 'DELETE',
      }),
    useDeleteConfig(queryKey),
  )
}
export const useProject = (id: number) => {
  const http = useHttp()
  return useQuery<Project>(['project', { id }], () => http(`projects/${id}`), {
    enabled: !!id,
  })
}
