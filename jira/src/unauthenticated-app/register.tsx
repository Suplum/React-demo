import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import {Button, Form, Input} from 'antd'
import { LongButton } from "unauthenticated-app";

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

export const RegisterScreen = ({onError}: {onError:(error:Error)=>void}) => {
  const { register, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = ({cpassword, ...values}: {username: string, password: string, cpassword: string}) => {
    // event.preventDefault();
    // const username = (event.currentTarget.elements[0] as HTMLInputElement)
    //   .value;
    // const password = (event.currentTarget.elements[1] as HTMLInputElement)
    //   .value;
    if(cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    register(values).catch(onError);
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
      <Form.Item name={'cpassword'} rules={[{required: true, message: '请确认密码'}]}>
        {/* <label htmlFor="password">密码</label> */}
        <Input placeholder={'确认密码'} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={'submit'} type={"primary"}>注册</LongButton>
      </Form.Item>
      {/* <button type={"submit"}>登录</button> */}
    </Form>
  );
};
