import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Button, Modal, Dropdown, Menu, Input, Space, suffix } from 'antd';
import './Navbar.css';
import {
  UserOutlined,
  DatabaseOutlined,
  LogoutOutlined,
  UsergroupDeleteOutlined,
  AudioOutlined,
  LockFilled,
  PoweroffOutlined,
} from '@ant-design/icons';
import { useHttp } from '../hooks/http.hook';
const { Search } = Input;


export const Navbar = ({ toggleTheme }) => {
  const auth = useContext(AuthContext);
  const isAuthenticated = auth.isAuthenticated;
  const username = auth.username;
  const userRole = auth.userRole;
  const { request } = useHttp();
  const { token } = useContext(AuthContext);
  const [collections, setCollections] = useState([]);
  const [items, setItems] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const location = useLocation();
  console.log(location);
  const isNavbarVisible =
    location.pathname !== '/' && location.pathname !== '/reg';

  const fetchItems = useCallback(async () => {
    try {
      const fetched = await request('/api/item/', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setItems(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const fetchCollections = useCallback(async () => {
    try {
      const fetched = await request('/api/collection/', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setCollections(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const searchEmoji = (inputValue) => {
    if (inputValue) {
      setItemsList([
        ...collections.filter((emoji) =>
          Object.values(emoji).includes(inputValue)
        ),  ...items.filter((emoji) =>
        Object.values(emoji).includes(inputValue))]);
    };
    if (!itemsList) {
    <div className="list">Nothing</div>}
  };

  const logoutHandler = (event) => {
    auth.logout();
  };

  const menuItemsUser = [
    {
      key: '1',
      label: <Link to="/collections">Мои коллекции</Link>,
      icon: <DatabaseOutlined />,
    },
    {
      key: '3',
      label: <div onClick={logoutHandler}>Выйти</div>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menuItemsAdmin = [
    {
      key: '1',
      label: <Link to="/collections">Мои коллекции</Link>,
      icon: <DatabaseOutlined />,
    },
    {
      key: '2',
      label: <Link to="/users">Users List</Link>,
      icon: <UsergroupDeleteOutlined />,
    },
    {
      key: '3',
      label: <div onClick={logoutHandler}>Выйти</div>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const menu =
    userRole === 'Admin' ? (
      <Menu items={menuItemsAdmin} />
    ) : (
      <Menu items={menuItemsUser} />
    );

  function onSearch (value) {
    showModal()
    searchEmoji(value); }

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );

  return (
    <>
      {isNavbarVisible ? (
        <div className="header">
          <Link className="logo" to="/homepage" />

          <Space direction="vertical">
            <Search
              placeholder="input search text"
              allowClear
              onSearch={(value) => onSearch(value)}
              style={{
                width: 200,
              }}
            />
            <Modal title="Результаты поиска" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {!itemsList.length ? <div>Нет совпадений</div> : itemsList.map((item, index) => {
              return (
                 <Link to={item.collectionsName ? `/item/${item._id}` : `/detail/${item._id}`} onClick={handleOk}>
                <div className='headList'>
                <div className="listName">{item.name}</div>
                <div className="listBelong">{item.collectionsName ? 'Коллекция: ' : 'Коллекция'}{item.collectionsName || null}</div>
                </div>
                </Link>
              );
            })}
      </Modal>


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
              <Link to="/">
                <Button type="primary">Войти</Button>
              </Link>
            )}

            <Button ghost shape="circle" onClick={toggleTheme}>
              <PoweroffOutlined />
            </Button>
          </div>
        </div>
      ) : null}
    </>
  )
}