import React, { useState } from 'react';
import { Form, Input, Button, Checkbox,Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginForm.css'

function LoginForm() {
    const [form] = Form.useForm();
    
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="login-page">
            <Card className="login-card" bordered={false}>
                <div className="login-card-header">
                    <h1 className="login-card-title">Đăng nhập</h1>
                </div>
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên đăng nhập!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên đăng nhập" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập mật khẩu!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>
    
                        <a className="login-form-forgot" href="">
                            Quên mật khẩu
                        </a>
                    </Form.Item>
    
                    <Form.Item className='btn-submit'>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng nhập
                        </Button>
                        Hoặc <a href="">Đăng ký tài khoản mới</a>
                    </Form.Item>
                    <Form.Item>
                        <img src={require("../../../../asserts/Facebook.png")} alt="facebook"/>
                        <img src={require("../../../../asserts/Google.png")} alt="facebook"/>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}
export default LoginForm;