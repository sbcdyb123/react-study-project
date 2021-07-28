import { ComponentProps } from 'react'
import { Select } from 'antd'
import { Raw } from 'types'
type SelectProps = ComponentProps<typeof Select>
interface IdSelectProps
  extends Omit<
    SelectProps,
    'value' | 'onChange' | 'options' | 'defalutOptionName'
  > {
  value?: Raw | null | undefined
  onChange?: (value?: number) => void
  defalutOptionName?: string
  options?: { name: string; id: number }[]
}
/**
 * value 可以传入多种类型的值
 * onChange只会回调 number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @param props
 * @constructor
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defalutOptionName, options, ...restProps } = props
  return (
    <Select
      {...restProps}
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(Number(value) || undefined)}
    >
      {defalutOptionName ? (
        <Select.Option value={0}>{defalutOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (number: unknown) =>
  isNaN(Number(number)) ? 0 : Number(number)
