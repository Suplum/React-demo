import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"

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
    setSearchParam
  ] as const
}

// const a = ['jack', 12, {gender: 'male'}] as const
// const b = ['12'] as const
