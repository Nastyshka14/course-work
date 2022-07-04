import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { useHttp } from '../hooks/http.hook';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import { message } from 'antd';
import { Link } from 'react-router-dom';


// import { API_PATH } from '../constants';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
const { loading, request} = useHttp();
                    const [form, setForm] = useState({
                        email: '',
                        password: '',
                    });

                    const changeHandler = (event) => {
                        setForm({ ...form, [event.target.name]: event.target.value });
                    };


  const showMessage = (msg) => {
    message.error(msg);
  };

  const loginHandler = async () => {
    try {
      const data = await request( '/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId);
    } catch (e) {
        showMessage(e.message);
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card style={{
        width: '25%',
        minWidth: '400px'
      }}>
        <h1
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '25px'
          }}
        >
          Авторизация
        </h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              placeholder="Введите email"
              id="email"
              type="text"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Введите пароль"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={changeHandler}
              className="yellow-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              style={{ marginBottom: '10px' }}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </Button>

            <Link to="/reg" replace>
              <Button block disabled={loading}>
                Регистрация
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
