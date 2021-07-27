import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { User } from './SearchPanel'
export interface Project {
  id: number
  name: string
  personId: number | string
  organization: string
  pin: string
  created: number
}
interface ListProps extends TableProps<Project> {
  users: User[]
}
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: '名称',
          key: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
          key: 'organization',
        },
        {
          title: '负责人',
          key: 'personId',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
        {
          title: '创建时间',
          key: 'created',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
      ]}
      {...props}
    />
  )
}
