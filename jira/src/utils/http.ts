import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "auth-provider";

const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        // 未登录或token失效
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

// JS 中的typeof，是在runtime时运行的
// return typeof 1 === 'number

// TS 中的typeof，是在静态环境中运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
export const useHttp = () => {
  const { user } = useAuth();
  // Utility Type的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 联合类型
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
// TS2322: Type '{}' is not assignable to type 'string | number'
// myFavoriteNumber = {}
let jackFavoriteNumber: string | number

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string
// }
// type Person = {name: string}
// const xiaoMing: Person = {name: 'xiaoming'}


// 类型别名，interface 在这种情况下没法替代type
type FavoriteNumber = string | number
let roseFavoriteNumber: FavoriteNumber = '6'

// interface 也没法实现Utility type
type Person = {
  name: string,
  age: number
}
const xiaoMing: Partial<Person> = {name: 'xiaoMing'} // Partial 键值可选
const shenMiRen: Omit<Person, 'name'> = {age: 8} // Omit 删除某些键值
const shenMiRen1: Omit<Person, 'name'|'age'> = {}

type PersonKeys = keyof Person // keyof 键值的集合
type PersonOnlyName = Pick<Person, 'name'> // Pick: 挑选几个键值，形成新的别名
type Age = Exclude<PersonKeys, 'name'> // Exclude 过滤掉键值

// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
};
