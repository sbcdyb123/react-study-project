import { List } from './List'
import { SearchPanel } from './SearchPanel'
import { useState, useEffect } from 'react'
import * as qs from 'qs'
import { cleanObject } from 'utils'
import { useDebounce, useMount } from 'hooks'
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param)
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`,
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debounceParam])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
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
