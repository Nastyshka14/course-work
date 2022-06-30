import { Button, PageHeader } from 'antd';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import './Navbar.css';

const { Header } = Layout;
const items1 = ['Мои коллекции'].map((key) => ({
  key,
  label: `${key}`,
}));

export const Navbar = () => {
//   const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
  auth.logout();
    // navigate('/');
  };
  return (
<Layout>
    <Header className="header">
    <Link to="/homepage">
    <div className="logo" />
    </Link>
    <Link to="/homepage">
    <p className='title'>Коллекции</p>
    </Link>
    <div className='menu'>
    
    <Link to="/collections"><Menu theme="dark" mode="horizontal"  items={items1} /></Link>

    <Button className='logoutBtn' key="1" type="primary" onClick={logoutHandler}>
          Выйти
        </Button>
        </div>
  </Header>
  </Layout>

  );
};