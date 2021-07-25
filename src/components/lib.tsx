import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'
export const FullPageFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <DevTools />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPage>
  )
}
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
)
export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => `${props.marginBottom}rem`};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? `${props.gap}rem`
        : props.gap
        ? '2rem'
        : undefined};
  }
`
