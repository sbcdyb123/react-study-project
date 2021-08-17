import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'

interface KanbanColumnProps {
  kanban: Kanban
}

export const KanbanColumn = ({ kanban }: KanbanColumnProps) => {
  const { data: allTasks } = useTasks()
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  )
}
