import { Kanban } from './../types/kanban'
import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'

export const useKanbans = (param?: Partial<Kanban>) => {
  const http = useHttp()
  return useQuery<Kanban[]>(['kanbans', param], () =>
    http('kanbans', { data: param }),
  )
}
