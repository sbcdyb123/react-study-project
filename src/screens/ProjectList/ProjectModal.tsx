import { Drawer } from 'antd'
import { ComponentProps } from 'react'
import { useProjectModal } from './utils'
type DrawerProps = ComponentProps<typeof Drawer>
interface ProjectModalProps extends Omit<DrawerProps, 'visible' | 'onClose'> {}
export const ProjectModal = ({ ...resetProps }: ProjectModalProps) => {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer
      onClose={close}
      width="100%"
      visible={projectModalOpen}
      {...resetProps}
    >
      <h1>123</h1>
    </Drawer>
  )
}
