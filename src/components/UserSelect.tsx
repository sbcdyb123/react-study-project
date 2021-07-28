import { useUser } from 'hooks/useUser'
import { ComponentProps } from 'react'
import { IdSelect } from './IdSelect'

export const UserSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUser()
  return <IdSelect options={users || []} {...props}></IdSelect>
}
