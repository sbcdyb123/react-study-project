import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useState, useEffect } from 'react'
import { cleanObject } from 'utils'
import { useDebounce, useMount } from 'hooks'
import { useHttp } from 'utils/http'
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const http = useHttp()
  useEffect(() => {
    http('projects', { data: cleanObject(debounceParam) }).then(setList)
    // eslint-disable-next-line
  }, [debounceParam])
  useMount(() => {
    http('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}
