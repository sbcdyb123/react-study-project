import { Table } from 'antd'
import { User } from './SearchPanel'
export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  pin: string
}
interface ListProps {
  list: Project[]
  users: User[]
}
export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
      ]}
      dataSource={list}
    />
  )
}
