import React, { useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Form, Input, Button } from 'antd';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import { message } from 'antd';
import { Link } from 'react-router-dom';

// import { API_PATH } from '../constants';

export const RegPage = () => {
//   const auth = useContext(AuthContext);
                    const { loading, request} = useHttp();
                    const [form, setForm] = useState({
                        username: '',
                        email: '',
                        password: '',
                    });

                    const changeHandler = (event) => {
                        setForm({ ...form, [event.target.name]: event.target.value });
                    };

                    const registerHandler = async () => {
                        try {
                    const data = await request('/api/auth/register', 'POST', {...form})
                    await message.success(data.message);
                } catch (e) {
                  showMessage(e.message);
                }
              };
  const showMessage = (msg) => {
    message.error(msg);
  };

//   const loginHandler = async () => {
//     try {
//       const data = await request( `${API_PATH}auth/login`, 'POST', { ...form }).catch(
//         (err) => {
//           console.log({ err });
//         //   showMessage(err.message);
//         }
//       );
//       auth.login(data.token, data.userId);
//     } catch (e) {}
//   };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const validateMessages = {
    required: ' Введите ${label}',
    types: {
      email: 'Введите валидный ${label}!'
    },
    string: {
      range: '${label} должен иметь ${max} символов',
    },
    }


  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Card
        style={{
          width: '25%',
          minWidth: '400px'
        }}
      >
        <h1
          style={{
            width: '100%',
            textAlign: 'center',
            fontSize: '25px'
          }}
        >
          Регистрация
        </h1>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Введите имя пользователя"
              id="username"
              type="text"
              name="username"
              value={form.username}
              onChange={changeHandler}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
              }]}
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
            rules={[
              {
                type: 'string',
                required: true,
                min: 9,
                max: 9,

              },
            ]}
          >
            <Input.Password
              placeholder="Введите пароль"
              id="password"
              type="password"
              name="password"
              value={form.password}
              className="yellow-input"
              onChange={changeHandler}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              block
              htmlType="submit"
              onClick={registerHandler}
              style={{ marginBottom: '10px' }}
            >
              Зарегистрироваться
            </Button>
            <Link to="/" replace>
              <Button block>Войти</Button>
            </Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
