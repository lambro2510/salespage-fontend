import * as React from 'react';
import {} from "antd";
import LoginForm from './loginForm';
import RegisterFrom from './registerForm';
import LoginWithPhone from './loginForm/loginWithPhone';
import {LOGIN, REGISTER, LOGIN_WITH_PHONE} from './constant';
import "./style.scss";

const Login = () => {
    const [form, setForm] = React.useState('login');
    React.useEffect(() => {
    })

    return (
        <div className='login'>
            <div className='login-header'>
                <h2 className='login-header-title'>Đăng nhập</h2>
                <p className='login-header-help-button'>Cần trợ giúp</p>
            </div>
            <div className='login-form-container'>
                <div className='login-form'>
                    {form === LOGIN ? <LoginForm setForm={setForm}/> : null }
                    {form === REGISTER ? <RegisterFrom setForm={setForm}/> : null }
                    {form === LOGIN_WITH_PHONE ? <LoginWithPhone setForm={setForm}/> : null }
                </div>
            </div>
        </div>
    )
}

export default Login;