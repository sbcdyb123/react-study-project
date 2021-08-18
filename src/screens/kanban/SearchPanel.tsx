import { Button, Col, Input, Row } from 'antd'
import { TaskTypeSelect } from 'components/TaskTypeSelect'
import { UserSelect } from 'components/UserSelect'
import { useSetUrlSearchParam } from 'hooks'
import { useTasksSearchParams } from './utils'

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const reset = () => {
    setSearchParams({
      projectId: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    })
  }
  return (
    <Row gutter={20}>
      <Col>
        <Input
          style={{ width: '20rem' }}
          placeholder="任务名"
          value={searchParams.name}
          onChange={(evt) => setSearchParams({ name: evt.target.value })}
        ></Input>
      </Col>
      <Col>
        <UserSelect
          defalutOptionName="经办人"
          value={searchParams.processorId}
          onChange={(value) => setSearchParams({ processorId: value })}
        />
      </Col>
      <Col>
        <TaskTypeSelect
          defalutOptionName="类型"
          value={searchParams.typeId}
          onChange={(value) => setSearchParams({ typeId: value })}
        />
      </Col>
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  )
}
