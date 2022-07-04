import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Dropdown, Menu } from 'antd';
import './Navbar.css';
import { UserOutlined, DatabaseOutlined, LogoutOutlined } from '@ant-design/icons';

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    auth.logout();
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to="/collections">Мои коллекции</Link>,
          icon: <DatabaseOutlined />
        },
        {
          key: '2',
          label: <div onClick={logoutHandler}>Выйти</div>,
          icon: <LogoutOutlined />,
          danger: true
        },
      ]}
    />
  );

  return (
    <div className="header">
      <Link className="logo" to="/homepage" />
      <Dropdown overlay={menu}>
        <div className="username">
          <div>User Name</div>
          <UserOutlined />
        </div>
      </Dropdown>
    </div>
  );
};
