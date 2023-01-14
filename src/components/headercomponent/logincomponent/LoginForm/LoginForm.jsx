import { useState } from 'react';
import { Form, Input, Checkbox, Avatar, Card, Button, notification, Spin } from 'antd';
import Link from 'antd/es/typography/Link';
import AccountService from '../../../../services/AccountService';
import './LoginForm.css';
import { FacebookFilled, GoogleCircleFilled, GithubFilled } from '@ant-design/icons';

const LoginForm = ({ setCurrentForm }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onFinish = async () => {
        setLoading(true);
        try {
            const tokenInfo = await AccountService.signIn(username, password);
            notification.open({ message: "Chào mừng" + tokenInfo.value.username + "trở lại" })
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };


    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Card title="Đăng nhập" className="LoginForm" headStyle={{ textAlign: 'center', fontSize: '20px' }}>
            <Spin spinning={loading}>
                <Form
                    onFinish={onFinish}
                    className="form"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" onChange={onUsernameChange} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" onChange={onPasswordChange} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox >Remember me</Checkbox>
                        <Link to="/forgot-password" style={{ float: 'right' }}>Forgot password?</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        <div className="social-login">
                            <Button type="default" icon={<FacebookFilled />} className="social-login-btn">
                                Facebook
                            </Button>
                            <Button type="default" icon={<GoogleCircleFilled />} className="social-login-btn">
                                Google
                            </Button>
                            <Button type="default" icon={<GithubFilled />} className="social-login-btn">
                                Github
                            </Button>
                        </div>
                    </Form.Item>
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to="/sign-up" onClick={() => setCurrentForm("registration")}>Create new account</Link>
                    </Form.Item>

                </Form>
            </Spin>
        </Card>
    );
};

export default LoginForm;