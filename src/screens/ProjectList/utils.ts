import { useUrlQueryParam } from 'hooks'
import { useMemo } from 'react'

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(() => {
      return { ...param, personId: Number(param.personId) || undefined }
    }, [param]),
    setParam,
  ] as const
}
