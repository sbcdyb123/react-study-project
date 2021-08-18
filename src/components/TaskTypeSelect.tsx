import { ComponentProps } from 'react'
import { useTaskTypes } from 'utils/task-type'
import { IdSelect } from './IdSelect'

export const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}
