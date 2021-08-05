import styled from '@emotion/styled'
import { Divider, List, Popover, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { projectListActions } from 'screens/ProjectList/projectList.slice'
import { useProjects } from 'utils/project'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const dispatch = useDispatch()
  const Content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding
        type="link"
        onClick={() => dispatch(projectListActions.openProjectModal())}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={Content}>
      项目
    </Popover>
  )
}
const ContentContainer = styled.div`
  min-width: 30rem;
`
