import styled from '@emotion/styled'
import { Button, Form, Input } from 'antd'
import { LoginParam } from 'authProvider'
import { useAuth } from 'context/AuthContext'

export const LoginScreen = () => {
  const { login } = useAuth()
  const handleSubmit = ({ username, password }: LoginParam) => {
    login({ username, password })
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
        <LongButton type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  )
}

const LongButton = styled(Button)`
  width: 100%;
`
