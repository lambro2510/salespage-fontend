import React, { useState } from 'react';
import { Form, Input, Button, DatePicker } from 'antd';
import AccountService from '../../../../services/AccountService';
import './RegistrationForm.css'
import translate from '../../../../language';
import {useSelector} from 'react-redux'
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RegistrationForm = () => {

  const text = translate[useSelector(state => state.language)];

  const [form] = Form.useForm();
  const { request } = {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: ''

  }

  const onFinish = async values => {
    try {
      const response = await AccountService.signUp(values.username, values.password, values.confirmPassword, values.firstName, values.lastName, values.email, values.phoneNumber, values.dateOfBirth);
      console.log('Successful registration:', response);
    } catch (error) {
      console.log('Error registering:', error);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label={text.username}
        name="username"
        rules={[{ required: true, message: text.please_input_username }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={text.first_name}
        name="firstName"
        rules={[{ required: true, message: text.please_input_first_name }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={text.last_name}
        name="lastName"
        rules={[{ required: true, message: text.please_input_last_name }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={text.password}
        name="password"
        rules={[{ required: true, message: text.please_input_password }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={text.confirm_password}
        name="confirmPassword"
        rules={[{ required: true, message: text.please_input_confirm_password }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label={text.email}
        name="email"
        rules={[
          { required: true, message: text.please_input_email },
          { type: 'email', message: text.please_enter_valid_email_format },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={text.phone_number}
        name="phoneNumber"
        rules={[
          { required: true, message: text.please_input_phone_number },
          { pattern: /^\d{10,11}$/, message: 'Vui lòng nhập đúng định dạng số điện thoại (10-11 chữ số)!' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item 
      label={text.date_of_birth}
      name="dateOfBirth" rules={[{ required: true, message: 'Vui lòng nhập ngày sinh của bạn!' }]}>
        <DatePicker />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          {text.sign_up}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
