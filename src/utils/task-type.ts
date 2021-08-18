import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'
import { TaskType } from 'types/taskType'

export const useTaskTypes = () => {
  const http = useHttp()
  return useQuery<TaskType[]>(['taskTypes'], () => http('taskTypes'))
}
