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
    // TODO 依赖项里有callback的话会造成无限循环,这个和useCallback和useMemo有关
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
export const useDebounce = <T>(value: T, delay = 500) => {
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

interface State<D> {
  error: Error | null
  data: D | null
  stat: 'idle' | 'loading' | 'error' | 'success'
}
const defalutInitialState: State<null> = {
  error: null,
  data: null,
  stat: 'idle',
}
const defaultConfig = {
  throwOnError: false,
}
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const [state, setState] = useState<State<D>>({
    ...defalutInitialState,
    ...initialState,
  })
  const config = { ...defaultConfig, ...initialConfig }
  const setData = (data: D) => {
    setState({
      data,
      stat: 'success',
      error: null,
    })
  }
  const setError = (error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error,
    })
  }
  // 用来触发异步请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入Promise类型数据')
    }
    setState({ ...state, stat: 'loading' })
    return promise
      .then((data) => {
        setData(data)
        return data
      })
      .catch((error) => {
        setError(error)
        if (config.throwOnError) return Promise.reject(error)
        return error
      })
  }
  return {
    isIdle: state.stat === 'idle',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    ...state,
  }
}
