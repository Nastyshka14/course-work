import React, { useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Form, Input, Button } from 'antd';
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5%',
      }}
    >
      <h1
        style={{
          marginBottom: '20px',
        }}
      >
        Регистрация
      </h1>
      <Form
        style={{ width: '70%', paddingRight: '15%' }}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        validateMessages={validateMessages}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
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
          label="Email"
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
          label="Пароль"
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

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        ></Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
          htmlType="submit"
            onClick={registerHandler}
            // disabled={loading}
            style={{ marginRight: '10px' }}
          >
            Зарегистрироваться
          </Button>
          <Link to="/" replace>
            <Button>Войти</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};