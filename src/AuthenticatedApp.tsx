import styled from '@emotion/styled'
import { Button, Dropdown, Menu } from 'antd'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/AuthContext'
import { ProjectListScreen } from 'screens/ProjectList'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { ProjectScreen } from 'screens/Project'
import { resetRoute } from 'utils'
import { ProjectModal } from 'screens/ProjectList/ProjectModal'
import { ProjectPopover } from 'components/ProjectPopover'
/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

export const AuthenticatedApp = () => {
  return (
    <Container>
      <Router>
        <Header />
        <Main>
          {/* <ProjectListScreen /> */}
          <Routes>
            <Route path={'/projects'} element={<ProjectListScreen />} />
            <Route
              path={'/projects/:projectId/*'}
              element={<ProjectScreen />}
            />
            <Navigate to={'/projects'} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  )
}
const Header = () => {
  return (
    <PageHeader between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38,138,255)" />
        </ButtonNoPadding>
        {/* <h3>项目</h3> */}
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </PageHeader>
  )
}
const User = () => {
  const { loginout, user } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key="loginout">
            <Button type="link" onClick={loginout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const PageHeader = styled(Row)`
  padding: 0 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const Main = styled.main``
