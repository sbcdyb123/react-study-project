import { cleanObject, subset } from './../utils/index'
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'

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
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef],
  )
}
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig,
) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defalutInitialState,
      ...initialState,
    },
  )
  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {})
  const config = { ...defaultConfig, ...initialConfig }
  const setData = useCallback(
    (data: D) => {
      safeDispatch({
        data,
        stat: 'success',
        error: null,
      })
    },
    [safeDispatch],
  )
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        stat: 'error',
        error,
      })
    },
    [safeDispatch],
  )
  // 用来触发异步请求
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入Promise类型数据')
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      safeDispatch({ stat: 'loading' })
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
    },
    [config.throwOnError, safeDispatch, setData, setError],
  )
  return {
    isIdle: state.stat === 'idle',
    isError: state.stat === 'error',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  }
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string
        },
      [searchParams, stateKeys],
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params)
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    },
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })
  return mountedRef
}
