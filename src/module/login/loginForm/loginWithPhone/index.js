import * as React from 'react';
import { Form, Input, Button } from 'antd';
import {LOGIN} from '../../constant'
import { Link } from 'react-router-dom';
const LoginWithPhone = ({ setForm }) => {
    return (
        <Form className='form-container'>
            <div className="input-container">
                <Input placeholder='So dien thoai' />
                <Button className="login-button" >Dang nhap</Button>
                <span className='footer-text' >
                    dang nhap bang tai khoan
                    <Link onClick={() => { setForm(LOGIN) }}>
                        Dang nhap ngay
                    </Link>
                </span>
            </div>
        </Form>
    )
}

export default LoginWithPhone;