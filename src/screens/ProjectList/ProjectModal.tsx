import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/UserSelect'
import { ComponentProps, useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project'
import { useProjectModal } from './utils'
type DrawerProps = ComponentProps<typeof Drawer>
interface ProjectModalProps extends Omit<DrawerProps, 'visible' | 'onClose'> {}
export const ProjectModal = ({ ...resetProps }: ProjectModalProps) => {
  const { projectModalOpen, close, editProject, isLoading } = useProjectModal()
  const useMutateProject = editProject ? useEditProject : useAddProject

  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }
  const closeModal = () => {
    form.resetFields()
    close()
  }
  useEffect(() => {
    form.setFieldsValue(editProject)
  }, [editProject, form])
  const title = editProject ? '编辑项目' : '创建项目'

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      width="100%"
      visible={projectModalOpen}
      {...resetProps}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error} />
          <Form
            form={form}
            layout="vertical"
            style={{ width: '40rem' }}
            onFinish={onFinish}
          >
            <Form.Item
              label="名称"
              name="name"
              rules={[{ required: true, message: '请输入项目名' }]}
            >
              <Input placeholder="请输入项目名称"></Input>
            </Form.Item>
            <Form.Item
              label="部门"
              name="organization"
              rules={[{ required: true, message: '请输入部门命' }]}
            >
              <Input placeholder="请输入部门名"></Input>
            </Form.Item>
            <Form.Item label="负责人" name="personId">
              <UserSelect defalutOptionName="负责人" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" loading={mutateLoading} htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </Drawer>
  )
}
