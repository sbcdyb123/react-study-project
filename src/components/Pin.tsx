import { Rate } from 'antd'
import { ComponentProps } from 'react'

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}
export const Pin = (props: PinProps) => {
  const { checked, onCheckedChange, ...restProps } = props
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(value) => {
        onCheckedChange?.(!!value)
      }}
      {...restProps}
    />
  )
}
