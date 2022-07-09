import "./CollectionsPage.css";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ModalCreate } from "../components/ModalCreate";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { Card, Space, Table, Tag } from "antd";
import { BrowserRouter, Link, NavLink } from "react-router-dom";
const { Meta } = Card;

export const UsersPage = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request("/api/auth/users", "GET", null);
      setUsers(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, users]);

  //   const updateCollection = (collection) => {
  //     setCollections([...collections, collection])
  //     console.log('collection: ', {collection, collections})
  //   }

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Имя",
      dataIndex: "username",
      key: "username",
      render: (username) => <Tag>{username}</Tag>,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
  ];

  return (
    <div className="container">
      {/* <ModalCreate updateCollection={updateCollection} /> */}

      <div className="collectionsList">
        <div>
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    </div>
  );
};
