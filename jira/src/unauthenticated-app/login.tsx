import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Button, Form, Input} from 'antd'
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

// interface Base {
//   id: number
// }

// interface Advance extends Base {
//   name: string
// }

// const test = (p: Base) => {
// }

// // 鸭子类型（duck typing）：面向接口编程 而不是面向对象编程
// const a: Advance = {id: 1, name: 'jack'}
// test(a)
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = ({onError}: {onError:(error:Error)=>void}) => {
  const { login, user } = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true})
  console.log(5)

  // HTMLFormElement extends Element
  const handleSubmit = async (values: {username: string, password: string}) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    // run(login(values)).catch(onError);
    try {
      await run(login(values))
    } catch(e:any) {
      onError(e)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
        {/* <label htmlFor="username">用户名</label> */}
        <Input placeholder={'用户名'} type="text" id={"username"} />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
        {/* <label htmlFor="password">密码</label> */}
        <Input placeholder={'密码'} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={"primary"}>登录</LongButton>
      </Form.Item>
      {/* <button type={"submit"}>登录</button> */}
    </Form>
  );
};
