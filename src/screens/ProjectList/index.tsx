import { List, Project } from './List'
import { SearchPanel } from './SearchPanel'
import { useState } from 'react'
import { useDebounce } from 'hooks'
import styled from '@emotion/styled'
import { useProjects } from 'hooks/useProject'
import { useUser } from 'hooks/useUser'
export const ProjectListScreen = () => {
  const [param, setParam] = useState<Partial<Project>>({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param)
  const { isLoading, error, data: list } = useProjects(debounceParam)
  const { data: users } = useUser()
  return (
    <Container>
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
const Container = styled.div`
  padding: 3.2rem;
`
