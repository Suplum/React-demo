import { useMemo } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"
import { cleanObject } from "utils"

/**
 * 返回页面url中，指定键的参数
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams()
  // console.log(searchParams.get('name'));
  return [
    useMemo(
      () => keys.reduce((prev: {[p in K]: string}, key: K) => {
        return {...prev, [key]: searchParams.get(key) || ''}
      }, {} as {[key in K]: string}),
      // eslint-disable-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{[key in K]: unknown}>) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      const o = cleanObject({...Object.fromEntries(searchParams), ...params}) as URLSearchParamsInit
      // Object.fromEntries：把键值对列表转换为一个对象
      return setSearchParam(o)
    }
  ] as const
}

// const a = ['jack', 12, {gender: 'male'}] as const
// const b = ['12'] as const
