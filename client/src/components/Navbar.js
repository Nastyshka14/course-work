import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Button, Dropdown, Menu, Input, Space, suffix } from "antd";
import "./Navbar.css";
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined,
  AudioOutlined, PoweroffOutlined
} from "@ant-design/icons";
import { useHttp } from "../hooks/http.hook";
const { Search } = Input;
const emojiesList = [
  {
    "title": "100",
    "symbol": "💯",
    "keywords": "hundred points symbol symbol wow wow win win perfect perfect parties parties"
  },
  {
    "title": "1234",
    "symbol": "🔢",
    "keywords": "input symbol for numbers symbol"
  },
  {
    "title": "Grinning",
    "symbol": "😀",
    "keywords": "grinning face happy smiley emotion emotion"
  }]

export const Navbar = ({toggleTheme}) => {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth.isAuthenticated;
  const username = auth.username;
  const userRole = auth.userRole
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [emojies, setEmojies] = useState(collections);

  // const fetchCollections = useCallback(async () => {
  //   try {
  //     const fetched = await request("/api/collection/", "GET", null, {
  //       Authorization: `Bearer ${token}`,
  //     });
  //     setCollections(fetched);
  //
  //   } catch (e) {}
  // }, [token, request]);
  //
  // useEffect(() => {
  //   fetchCollections();
  // }, [fetchCollections, collections]);

  const searchEmoji = (inputValue) => {
    if (inputValue) {
      setEmojies([
        ...collections.filter((emoji) =>
          emoji.title
            .toLocaleLowerCase()
            .includes(inputValue.toLocaleLowerCase())
        ),
      ]);
    } else {
      setEmojies(emojiesList);
    }
  };

  const logoutHandler = (event) => {
    auth.logout();
  };

  const menuItemsUser = [
    {
      key: "1",
      label: <Link to="/collections">Мои коллекции</Link>,
      icon: <DatabaseOutlined />,
    },
    {
      key: "3",
      label: <div onClick={logoutHandler}>Выйти</div>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ]

  const menuItemsAdmin = [
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
  ]

  const menu = userRole === 'Admin' ? <Menu items={ menuItemsAdmin } /> : <Menu items={ menuItemsUser } />

  const onSearch = (value) => searchEmoji(value);

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

  return (
    <div className="header">
      <Link className="logo" to="/homepage" />
      <Space direction="vertical">
      <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{
        width: 200,
      }}

    />
    {emojies.map((item, index) => {
          const { symbol, title } = item;

          return <div styles={{backgroundColor: 'red', width: 50}} key={index}  >{symbol} {title}</div>;
        })}
    </Space>

    <div className="menu-wrapp">
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

      <Button ghost shape="circle" onClick={toggleTheme}><PoweroffOutlined /></Button>
    </div>


    </div>
  );
};
