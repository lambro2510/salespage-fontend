import * as React from 'react';
import {} from "antd";
import LoginForm from './loginForm'
import "./style.scss"
const Login = () => {
    return (
        <div className='container'>
            <div className='login-header'>
                <p>Đăng nhập</p>
                <p>Cần trợ giúp</p>
            </div>
            <div className='login-container'>
                <div className='login-form'>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login;