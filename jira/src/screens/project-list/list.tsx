import {User} from 'screens/project-list/search-panel'
import React from "react";
import {Table} from 'antd'
import {TableProps} from 'antd/es/table'
import dayjs from 'dayjs';
// react-router 和 react-router-dom 的关系，类似于 react 和 react-dom/react-native/react-vr... 的关系
import {Link} from 'react-router-dom'

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project>{
  users: User[]
}

type PropsType = Omit<ListProps, 'users'>

export const List = ({ users, ...props }: ListProps) => {
  return <Table
    pagination={false}
    columns={[
      {
        title: '名称',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{project.name}</Link>
        }
      }, {
        title: '部门',
        dataIndex: 'organization'
      }, {
        title: '负责人',
        render(value, project) {
          return <span>
            {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
          </span>
        }
      }, {
        title: '创建时间',
        render(value, project) {
          return <span>
            {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
          </span>
        }
      }
    ]}
    {...props}
  />
  // return (
  //   <table>
  //     <thead>

  //       <tr>
  //         <th>名称</th>
  //         <th>负责人</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {list.map((project) => (
  //         <tr key={project.id}>
  //           <td>{project.name}</td>
  //           {/* undefined.name */}
  //           <td>
  //             {users.find((user) => user.id === project.personId)?.name ||
  //               "未知"}
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};
