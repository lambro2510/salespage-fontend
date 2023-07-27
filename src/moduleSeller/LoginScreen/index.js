import * as React from 'react';
import { Card, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, FacebookOutlined, GoogleOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import AccountService from '../../service/AccountService';
import './style.scss';
import {getToken, setToken} from '../../helper/localStore';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prevLoginForm) => ({ ...prevLoginForm, [name]: value }));
    };

    const handleLogin = async () => {
        const loginResponse = await AccountService.signIn(loginForm);
        if(loginResponse?.role !== 'SELLER'){
            navigate('/not-found');
        }else{
            setToken(loginResponse.token);
            navigate('/seller');
        }
        
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                <Card title="Đăng nhập" className="login-card">
                    <Input
                        name="username"
                        placeholder="Tên người dùng"
                        prefix={<UserOutlined />}
                        value={loginForm.username || ''}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <Input.Password
                        name="password"
                        placeholder="Mật khẩu"
                        prefix={<LockOutlined />}
                        value={loginForm.password || ''}
                        onChange={handleChange}
                        className="input-field"
                    />
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                        </Col>
                        <Col>
                            <Link to="/forgot-password" className="forgot-password-link">
                                Quên mật khẩu
                            </Link>
                        </Col>
                    </Row>
                    <Row className="social-icons" justify="space-around">
                        <div className='facebook-icon-login'>
                        <FacebookOutlined className='facebook-icon-login' />
                        </div>
                        <div className='google-icon-login'>
                        <GoogleOutlined className='google-icon-login' />
                        </div>
                        <div className='phone-icon-login'>
                        <PhoneOutlined className='phone-icon-login' />
                        </div>
                    </Row>
                    <Row justify="center">
                        <Button type="primary" onClick={handleLogin} className="login-button">
                            Đăng nhập
                        </Button>
                    </Row>
                    <Row justify="center">
                        <p className="register-link">
                            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
                        </p>
                    </Row>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginScreen;
