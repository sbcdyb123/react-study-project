import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'hooks'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'hooks/useUser'
import { useProjectModal, useProjectsSearchParams } from './utils'
import { Row } from 'antd'
import { ButtonNoPadding, ErrorBox } from 'components/lib'
// import { Helmet } from 'react-helmet'
export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param))
  const { data: users } = useUser()
  const { open } = useProjectModal()
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row justify="space-between">
        <span>项目列表</span>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <ErrorBox error={error} />
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </Container>
  )
}
ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
`
