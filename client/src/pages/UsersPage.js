import "./UsersPage.css";
import React, {useCallback, useEffect, useRef, useState} from "react";
import { useHttp } from "../hooks/http.hook";
import {Button, Input, Space, Table, Tag, Tooltip} from "antd";
import {CheckCircleOutlined, DeleteOutlined, SearchOutlined, StopOutlined} from "@ant-design/icons";


export const UsersPage = () => {
  const { request } = useHttp();
  const [users, setUsers] = useState([]);
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/auth/users", "GET", null);
      setUsers(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const deleteUser = async (id) => {
    const data = await request(`/api/auth/user/${id}`, 'DELETE')
    fetchUsers()
    return data
  }

  const blockUser = async (user) => {
    const data = await request(
      `/api/auth/user/${user._id}`,
      'PUT',
      { ...user, status: user.status === 'blocked' ? 'active' : 'blocked' }
    )
    fetchUsers()
    return data
  }

  const columns = [
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Статус",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        status === 'active' ? <Tag color='green'>{status.toUpperCase()}</Tag> : <Tag color='red'>{status.toUpperCase()}</Tag>
      )
    },
    {
      title: "Действия",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title='Delete'>
            <a onClick={() => deleteUser(record._id)}>
              <DeleteOutlined />
            </a>
          </Tooltip>
          <Tooltip title={ record.status === 'active' ? 'Block' : 'Unblock' }>
            <a onClick={() => blockUser(record)}>{
              record.status === 'active' ? <StopOutlined/> : <CheckCircleOutlined /> }
            </a>
          </Tooltip>
        </Space>
      )
    },
  ];

  return (
    <div className="container">
      <Table columns={columns} dataSource={users} />
    </div>
  );
};
