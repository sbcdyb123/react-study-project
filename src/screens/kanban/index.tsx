import styled from '@emotion/styled'
import { useDocumentTitle } from 'hooks'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './KanbanColumn'
import { SearchPanel } from './SearchPanel'
import { useKanbanSearchParams, useProjectInUrl } from './utils'

export const KanbanScreen = () => {
  useDocumentTitle('看板列表')
  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans } = useKanbans(useKanbanSearchParams())
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </div>
  )
}
const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
