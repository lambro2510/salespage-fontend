import { Button, DatePicker, Form, Input, notification } from "antd";
import { useState } from "react";
import translate from "../../language";
import './Register.css'
import AccountService from "../../services/AccountService";
import Cookies from 'js-cookie'
export default function FirstStep({ email, setCurrentStep, setEmail }) {

    const text = translate[localStorage.getItem('language') || "English"]
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastname] = useState()

    const clickButton = async () => {
        try {
            const response = await AccountService.signUp(username, password, confirmPassword, firstName, lastName, email, phoneNumber, dateOfBirth);
            Cookies.set('token', response.token, { expires: 1 });
            Cookies.set('username', response.username, { expires: 0.1 });
            setCurrentStep(1)
        } catch (error) {
            notification.error({
                message: text.register_failed,
                description: `${text.error} ${error.message}`
            });
        }
    }

    return (
        <Form layout="horizontal" style={{ marginTop: 30 }} size="small">

            <Form.Item
                label={text.username}
                name={"username"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_username
                    }
                ]}>
                <Input className="input" onChange={(event) => setUsername(event.target.value)}/>
            </Form.Item>

            <Form.Item
                label={text.password}
                name={"password"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_password
                    }
                ]}>
                <Input.Password className="input" onChange={(event) => setPassword(event.target.value)}/>
            </Form.Item>

            <Form.Item
                label={text.confirm_password}
                name={"confirmPassword"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_confirm_password
                    }
                ]}>
                <Input.Password className="input" onChange={(event) => setConfirmPassword(event.target.value)}/>
            </Form.Item>
            
            <Form.Item
                label={text.first_name}
                name={"firstName"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_confirm_password
                    }
                ]}>
                <Input className="input" onChange={(event) => setFirstName(event.target.value)}/>
            </Form.Item>

            <Form.Item
                label={text.last_name}
                name={"lastName"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_confirm_password
                    }
                ]}>
                <Input className="input" onChange={(event) => setLastname(event.target.value)}/>
            </Form.Item>

            <Form.Item
                label={text.date_of_birth}
                name={"dateOfBirth"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_date_of_birth
                    }
                ]}>
                <DatePicker className="input" placeholder={text.select_date} onChange={(event) => setDateOfBirth(event.target.value)}/>
            </Form.Item>

            <Form.Item
                label={text.email}
                name={"email"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_email
                    },
                    {
                        type: 'email',
                        message: text.please_enter_correct_email_format
                    }

                ]}>
                <Input className="input" onChange={(event) => setEmail(event.target.value)} />
            </Form.Item>

            <Form.Item
                label={text.phone_number}
                name={"phoneNumber"}
                rules={[
                    {
                        required: true,
                        message: text.please_enter_phone_number
                    },
                    {
                        pattern: /^[0-9]*$/,
                        message: text.please_enter_correct_phone_number_format
                    }

                ]}>
                <Input className="input" onChange={(event) => setPhoneNumber(event.target.value)}/>
            </Form.Item>


            <Button type="primary" onClick={clickButton}>{text.register}</Button>
        </Form>
    )
}
