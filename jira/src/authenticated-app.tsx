import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "compoments/lib";
import { useAuth } from "context/auth-context";
import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import {ReactComponent as SoftwareLogo} from 'assets/logo.svg'
import { Button, Dropdown, Menu } from "antd";
import {Navigate, Route, Routes} from 'react-router'
import { ProjectScreen } from "screens/project";
import {BrowserRouter as Router} from 'react-router-dom'
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "compoments/project-popover";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用fles，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，油内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再把元素往里填充
 * 从布局出发，用flex
 * 从内容出发，用grid
 */

// prop drilling

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const value:any = undefined
  return (
    <Container>
      <PageHeader projectButton={
        <ButtonNoPadding
          onClick={() => setProjectModalOpen(true)}
          type={"link"}
        >创建项目</ButtonNoPadding>
      } />
      <Button onClick={() => setProjectModalOpen(true)}>打开</Button>
      {/* <Nav>nav</Nav> */}
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route
              path={'/projects'}
              element={
                <ProjectListScreen projectButton={
                  <ButtonNoPadding
                    onClick={() => setProjectModalOpen(true)}
                    type={"link"}
                  >创建项目</ButtonNoPadding>
                }/>
              }
            />
            <Route path={'/projects/:projectId/*'} element={<ProjectScreen/>}/>
            <Route path="*" element={<Navigate to="/projects" replace={true}/>} />
          </Routes>
        </Router>
      </Main>
      {/* <Aside>aside</Aside>
      <Footer>footer</Footer> */}
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  );
};

// const HeaderItem = styled.h3`margin-right: 3rem;`

const PageHeader = (props: {projectButton: JSX.Element}) => {
  return <Header between={true}>
    <HeaderLeft gap={true}>
      {/* <img src={logo} /> */}
      <ButtonNoPadding style={{padding: 0}} type={'link'} onClick={resetRoute}>
        <SoftwareLogo width={'8rem'} color={'rgb(38, 132, 255)'}/>
      </ButtonNoPadding>
      {/* <h3>项目</h3> */}
      <ProjectPopover {...props}/>
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <User/>
      {/* <button onClick={logout}>登出</button> */}
    </HeaderRight>
  </Header>
}

const User = () => {
  const { logout, user } = useAuth();
  return <Dropdown overlay={<Menu>
    <Menu.Item key={'logout'}>
      <Button type={"link"} onClick={logout}>登出</Button>
      {/* <a onClick={logout}>登出</a> */}
    </Menu.Item>
  </Menu>}>
    <Button type={"link"} onClick={e => e.preventDefault()}>
      Hi, {user?.name}
    </Button>
  </Dropdown>
}

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  /* grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer"
  ; */
  height: 100vh;
  /* grid-gap: 10rem; */
`

// const PageHeader = styled.header`
//   height: 6rem;
//   background-color: gray;
// `

// const Main = styled.main`
//   height: calc(100vh - 6rem);
// `

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  /* grid-area: header; */
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)`
`;

const HeaderRight = styled.div``;
const Main = styled.main``;
// const Nav = styled.nav`grid-area: nav;`
// const Aside = styled.aside`grid-area: aside;`
// const Footer = styled.footer`grid-area: footer;`
