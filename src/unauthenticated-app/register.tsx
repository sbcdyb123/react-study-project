import styled from '@emotion/styled'
import { Button, Form, Input } from 'antd'
import { LoginParam } from 'authProvider'
import { useAuth } from 'context/AuthContext'
import { useAsync } from 'hooks'
interface RegisterType extends LoginParam {
  cpassword: string
}
export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({
    username,
    password,
    cpassword,
  }: RegisterType) => {
    try {
      if (cpassword !== password) {
        return onError(new Error('请确认两次密码相同'))
      }
      await run(register({ username, password }))
    } catch (error) {
      console.log(error)

      onError(error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="cpassword"
        rules={[{ required: true, message: '请输入确认密码' }]}
      >
        <Input.Password placeholder="确认密码" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
const LongButton = styled(Button)`
  width: 100%;
`
