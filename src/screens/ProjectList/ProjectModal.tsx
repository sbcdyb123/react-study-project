import { Drawer } from 'antd'
import { ComponentProps } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './projectList.slice'
type DrawerProps = ComponentProps<typeof Drawer>
interface ProjectModalProps extends Omit<DrawerProps, 'visible' | 'onClose'> {}
export const ProjectModal = ({ ...resetProps }: ProjectModalProps) => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width="100%"
      visible={projectModalOpen}
      {...resetProps}
    >
      <h1>123</h1>
    </Drawer>
  )
}
