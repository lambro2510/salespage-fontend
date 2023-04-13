import * as React from 'react';
import { Form, QRCode, Button, Input, Checkbox, notification } from 'antd';
import { FacebookOutlined, GoogleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AccountService from '../../../service/AccountService';
import './style.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = React.useState({
    username: '',
    password: '',
  });

  const handleMouseEnter = () => {
    notification.open({
      message: 'Mã QR',
      description: <QRCode value={'localhost'} size={200} />,
      placement: 'bottomRight',
      duration: 100,
    });
  };

  const handleLogin = () => {
    AccountService.signIn(loginData)
      .then(response => {
        notification.success({ message: 'Đăng nhập thành công' });
        navigate(-1);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (

    <Form className="form-container" onFinish={handleLogin}>
      <div className="login-header">
        <h2>Đăng nhập</h2>
        <div onMouseEnter={handleMouseEnter}>
      <QRCode value={'localhost'} size={100} />
    </div>
      </div>
      <div className="input-container">
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên đăng nhập',
            },
          ]}
        >
          <Input placeholder="Tên đăng nhập" name="username" value={loginData.username} onChange={handleInputChange} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item className='options-actions' >
          <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          <Link to={'/forgot-password'} className='forgot-password'>Quên mật khẩu?</Link>
        </Form.Item>
        <Form.Item>
          <Button className="login-button" onClick={handleLogin}>Đăng nhập</Button>
        </Form.Item>
        <div className="other-login-options">
        <Button icon={<FacebookOutlined />} className="fb-login-button">
        </Button>
        <Button icon={<GoogleOutlined />} className="google-login-button">
        </Button>
        <Button icon={<PhoneOutlined />} className="phone-login-button">
        </Button>
      </div>
      <div className='register'>
        <span>
          Chưa có tài khoản?
          <Link to={'/register'} > Đăng ký ngay!</Link>
        </span>
      </div>
      </div>
    </Form>

  );
};

export default LoginForm;
