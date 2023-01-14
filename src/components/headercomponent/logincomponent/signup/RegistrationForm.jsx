import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegisterForm = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập của bạn!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Họ"
        name="firstName"
        rules={[{ required: true, message: 'Vui lòng nhập họ của bạn!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Tên"
        name="lastName"
        rules={[{ required: true, message: 'Vui lòng nhập tên của bạn!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Vui lòng nhập email của bạn!' },
          { type: 'email', message: 'Vui lòng nhập đúng định dạng email!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Số điện thoại"
        name="phoneNumber"
        rules={[
          { required: true, message: 'Vui lòng nhập số điện thoại của bạn!' },
          { pattern: /^\d{10,11}$/, message: 'Vui lòng nhập đúng định dạng số điện thoại (10-11 chữ số)!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Ngày sinh" name="dateOfBirth">
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Đăng ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
