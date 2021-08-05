import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'hooks'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'hooks/useUser'
import { useProjectsSearchParams } from './utils'
import { Row } from 'antd'
// import { Helmet } from 'react-helmet'
export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param))
  const { data: users } = useUser()
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row justify="space-between">
        <span>项目列表</span>
        {props.projectButton}
      </Row>
      {error?.message}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List
        projectButton={props.projectButton}
        refresh={retry}
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
