import { useState } from 'react';
import { Form, Input, Checkbox, Avatar, Card, Button, notification, Spin } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AccountService from '../../../../services/AccountService';
import './LoginForm.css';
import { FacebookFilled, GoogleCircleFilled, GithubFilled } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import translate from '../../../../language';

const LoginForm = ({ setCurrentForm }) => {
    const nav = useNavigate()
    const text = translate[useSelector(state => state.language)];
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const onFinish = async () => {
        setLoading(true);
        try {
            const tokenInfo = await AccountService.signIn(username, password);
            setLoading(false);
            nav('/')
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
        <Card title={text.login} className="LoginForm" headStyle={{ textAlign: 'center', fontSize: '20px' }}>
            <Spin spinning={loading}>
                <Form
                    onFinish={onFinish}
                    className="form"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: text.please_input_username }]}
                    >
                        <Input placeholder={text.username} onChange={onUsernameChange} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: text.please_input_password }]}
                    >
                        <Input.Password placeholder={text.password} onChange={onPasswordChange} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked">
                        <Checkbox >{text.remember_me}</Checkbox>
                        <Link to="/forgot-password" style={{ float: 'right' }}>{text.forgot_password}</Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {text.login}
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
                        <Link to="/sign-up" onClick={() => setCurrentForm("registration")}>{text.create_account}</Link>
                    </Form.Item>

                </Form>
            </Spin>
        </Card>
    );
};

export default LoginForm;