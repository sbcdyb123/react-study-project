import { User } from './SearchPanel'
export interface Project {
  id: number
  name: string
  personId: number
  organization: string
  pin: string
}
interface ListProps {
  list: Project[]
  users: User[]
}
export const List = ({ list, users }: ListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
