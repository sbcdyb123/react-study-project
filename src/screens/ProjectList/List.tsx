import { Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { ButtonNoPadding } from 'components/lib'
import { Pin } from 'components/Pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useDeleteProject, useEditProject } from 'utils/project'
import { Project } from '../../types/Project'
import { User } from '../../types/User'
import { useProjectModal, useProjectQueryKey } from './utils'
interface ListProps extends TableProps<Project> {
  users: User[]
  refresh?: () => void
  // setProjectModalOpen: (isOpen: boolean) => void
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey())
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
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
            return <More project={project} />
          },
        },
      ]}
      {...props}
    />
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确认删除这个项目吗?',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        deleteProject({ id })
      },
    })
  }
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="edit">
            <ButtonNoPadding type="link" onClick={editProject(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key="delete">
            <ButtonNoPadding
              type="link"
              onClick={() => confirmDeleteProject(project.id)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  )
}
