import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Dropdown, Menu } from "antd";
import "./Navbar.css";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined
} from "@ant-design/icons";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth.isAuthenticated;
  const username = auth.username;

  const logoutHandler = (event) => {
    auth.logout();
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/collections">Мои коллекции</Link>,
          icon: <DatabaseOutlined />,
        },
        {
          key: "2",
          label: <Link to="/users">Users List</Link>,
          icon: <UsergroupDeleteOutlined />,
        },
        {
          key: "3",
          label: <div onClick={logoutHandler}>Выйти</div>,
          icon: <LogoutOutlined />,
          danger: true,
        },
      ]}
    />
  );

  return (
    <div className="header">
      <Link className="logo" to="/homepage" />
      {isAuthenticated ? (
        <Dropdown overlay={menu}>
          <div className="username">
            <div>{username}</div>
            <UserOutlined />
          </div>
        </Dropdown>
      ) : (
        <Link to='/'>
          <Button type="primary">Войти</Button>        
        </Link>       
      )}
    </div>
  );
};
