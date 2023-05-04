import * as React from 'react';
import { Form, Input, Button,notification } from 'antd';
import AccountService from '../../../service/AccountService';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../constant';
import './style.scss'
const RegisterForm = ({ setForm }) => {
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = React.useState(
    {
      username: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: ""
    }
  )
  const onFinish = async () => {
    try {
      AccountService.signUp(signUpForm).then(res => {
        notification.success({ message: 'Đăng ký thành công' });
				navigate(-1);
      })
    } catch (error) {
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="register"
      className='form-container'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please input a valid email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dateOfBirth"
        rules={[{ required: true, message: 'Please input your date of birth!' }]}
      >
        <Input type="date" />
      </Form.Item>

      <Form.Item >
        <div className='list-btn'>
          <Button type="primary" htmlType="submit">
            Dang ky
          </Button>
          <Button onClick={() => setForm(LOGIN)}>
            Tro lai dang nhap
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
