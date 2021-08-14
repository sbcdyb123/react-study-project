import { useUrlQueryParam } from 'hooks'
import { useMemo } from 'react'
import { useProject } from 'utils/project'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined }
    }, [param]),
    setParam,
  ] as const
}
export const useProjectQueryKey = () => {
  const [params] = useProjectsSearchParams()
  return ['projects', params]
}
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    'projectCreate',
  ])
  const [{ editProjectId }, setEditProjectId] = useUrlQueryParam([
    'editProjectId',
  ])
  const { data: editProject, isLoading } = useProject(Number(editProjectId))
  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => {
    setEditProjectId({ editProjectId: undefined })
    setProjectModalOpen({ projectCreate: undefined })
  }
  const startEdit = (id: number) => setEditProjectId({ editProjectId: id })
  return {
    projectModalOpen: projectCreate === 'true' || Boolean(editProjectId),
    open,
    close,
    startEdit,
    editProject,
    isLoading,
  }
}
