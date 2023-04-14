import * as React from 'react';
import { Form, InputNumber, Button } from 'antd'
const LoginWithPhone = ({ setForm }) => {
    return (
        <div className='form-container'>
            <Form className='form'>
                <InputNumber placeholder='So dien thoai' />
                <Button >Dang nhap</Button>
                <div onClick={() => { setForm('login') }}>
                    Da co tai khoan, dang nhap ngay
                </div>
            </Form>
        </div>
    )
}

export default LoginWithPhone;