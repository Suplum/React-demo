import React from "react";
import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import qs from "qs";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from '@emotion/styled';
import { Button, Typography } from "antd";
import { useAsync } from "utils/use-async";
import {Project} from 'screens/project-list/list'
import { useProject } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { Row } from "compoments/lib";

// 使用 JS 的同学，大部分的错误都是在runtime（运行时）的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = (props: {
  projectButton: JSX.Element
}) => {
  useDocumentTitle('项目列表', false)
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)

  // const [, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // https://codesandbox.io/s/relaxed-hoover-ol5dv?file=/src/app.js

  // const [keys] = useState<('name'|'personId')[]>(['name', 'personId'])

  // const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  // const projectsParam = {...param, personId: Number(param.personId) || undefined}
  // console.log(param, 'param')
  // setParam({name: '123'})
  // const debouncedParam = useDebounce(projectsParam, 200);
  // const [list, setList] = useState([]);
  // const client = useHttp();
  const [param, setParam] = useProjectsSearchParams()
  const {isLoading, error, data: list, retry} = useProject(useDebounce(param, 200))
  const {data: users} = useUsers()

  console.log(useUrlQueryParam(['name']))
  const test = useUrlQueryParam(['name'])


  // useEffect(() => {
  //   // setIsLoading(true)
  //   run(
  //     client("projects", { data: cleanObject(debouncedParam) })
  //   )

  //     // .then(setList)
  //     // .catch(error => {
  //     //   setList([])
  //     //   setError(error)
  //     // })
  //     // .finally(() => setIsLoading(false));
  //   // eslint-disable-line react-hooks/exhaustive-deps
  // }, [debouncedParam]);

  // useMount(() => {
  //   client("users").then(setUsers);
  // });

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        {props.projectButton}
        {/* <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button> */}
      </Row>
      {/* <select onChange={evt => {
        const value = evt.target.value
        console.log(value, typeof value)
      }}>
        <option value={undefined}>默认选项</option>
        <option value={1}>第一个选项</option>
      </select> */}
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text>:null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false

// class Test extends React.Component<any, any>{
//   static whyDidYouRender = true
// }

const Container = styled.div`
  padding: 3.2rem;
`
