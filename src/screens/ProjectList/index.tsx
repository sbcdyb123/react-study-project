import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useDebounce, useDocumentTitle } from 'hooks'
import styled from '@emotion/styled'
import { useProjects } from 'utils/project'
import { useUser } from 'hooks/useUser'
import { useProjectsSearchParams } from './utils'
// import { Helmet } from 'react-helmet'
export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param))
  const { data: users } = useUser()
  return (
    <Container>
      {/* <Helmet>
        <title>项目列表</title>
      </Helmet> */}
      <h1>项目列表</h1>
      {error?.message}
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
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
