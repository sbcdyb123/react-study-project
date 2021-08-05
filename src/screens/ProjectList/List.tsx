import { Dropdown, Menu, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/Pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/project'
import { User } from './SearchPanel'
export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  pin: boolean
  created: number
}
interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
  // setProjectModalOpen: (isOpen: boolean) => void
  projectButton: JSX.Element
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh) // 函数柯里化
  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked disabled />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          },
        },
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
        {
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="edit">{props.projectButton}</Menu.Item>
                    <Menu.Item key="delete">
                      <ButtonNoPadding type="link">删除</ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type="link">...</ButtonNoPadding>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    />
  )
}
