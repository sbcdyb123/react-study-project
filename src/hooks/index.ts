import { useEffect, useState } from 'react'

/*******
 * @Date: 2021-07-22 23:16:15
 * @name: 方龙
 * @description: 组件初始化只执行一次 hook
 * @param {function} callback
 * @return {*}
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
/*******
 * @Date: 2021-07-22 23:32:39
 * @name: 方龙
 * @description: 将state依赖值进行防抖处理
 * @param {any} value 需要进行防抖处理的依赖值
 * @param {number} delay 延迟毫秒
 * @return {any}
 */
export const useDebounce = (value: unknown, delay = 500) => {
  const [debounceValue, setBebounceValue] = useState(value)
  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => {
      setBebounceValue(value)
    }, delay)
    // 每次在上一个useEffect处理完以后清除定时器
    return () => {
      clearTimeout(timeout)
    }
  }, [value, delay])
  return debounceValue
}
