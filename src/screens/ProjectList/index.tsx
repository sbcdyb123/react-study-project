import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'hooks'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'hooks/useUser'
import { useProjectsSearchParams } from './utils'
import { Button, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { projectListActions } from './projectList.slice'
// import { Helmet } from 'react-helmet'
export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param))
  const { data: users } = useUser()
  const dispatch = useDispatch()
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <Row justify="space-between">
        <span>项目列表</span>
        <Button
          type="default"
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </Button>
      </Row>
      {error?.message}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List
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
