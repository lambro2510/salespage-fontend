import * as React from 'react';
import {} from "antd";
import LoginForm from './loginForm';
import "./style.scss";

const Login = () => {
    return (
        <div className='login'>
            <div className='login-header'>
                <h2 className='login-header-title'>Đăng nhập</h2>
                <p className='login-header-help-button'>Cần trợ giúp</p>
            </div>
            <div className='login-form-container'>
                <div className='login-form'>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login;