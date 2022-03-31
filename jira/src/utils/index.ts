import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: {[key: string]: unknown}) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // 0
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// const debounce = (func, delay) => {
//   let timeout;
//   return (...param) => {
//     if(timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(function() {
//       func(...param);
//     }, delay);
//   }
// }
// const log = debounce(() => console.log('call'), 5000)
// log()
// log()
// log()

// debounce 原理讲解（闭包原理）
// 0s ---> 1s ---> 2s ---> ...
// 一定要理解：这三个函数都是同步操作，所以它们都是在 0-1s 这个时间段内瞬间完成的
// log()#1 // timeout#1
// log()#2 // 发现timeout#1 取消之，然后设置timeout#2
// log()#3 // 发现timeout#2 取消之，然后设置timeout#3
// 所以，log()#3 结束后，就只剩timeout#3在独自等待了

// 如果里面有hook就要用hook
// 后面用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // TODO 依赖项里加上callback会造成无限循环，这个usCallback以及useMemo有关系
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useArray = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
