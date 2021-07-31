import { Drawer } from 'antd'
import { ComponentProps } from 'react'
type DrawerProps = ComponentProps<typeof Drawer>
interface ProjectModalProps extends Omit<DrawerProps, 'visible' | 'onClose'> {
  projectModalOpen: boolean
  onClose: () => void
}
export const ProjectModal = ({
  projectModalOpen,
  onClose,
  ...resetProps
}: ProjectModalProps) => {
  return (
    <Drawer
      onClose={onClose}
      width="100%"
      visible={projectModalOpen}
      {...resetProps}
    >
      <h1>123</h1>
    </Drawer>
  )
}
