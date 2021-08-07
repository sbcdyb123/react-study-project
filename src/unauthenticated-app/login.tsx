import styled from '@emotion/styled'
import { Button, Form, Input } from 'antd'
import { LoginParam } from 'authProvider'
import { useAuth } from 'context/AuthContext'
import { useAsync } from 'hooks'
export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({ username, password }: LoginParam) => {
    try {
      await run(login({ username, password }))
    } catch (error) {
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
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}

const LongButton = styled(Button)`
  width: 100%;
`
