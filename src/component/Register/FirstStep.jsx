import { Button, DatePicker, Form, Input } from "antd";
import { useState } from "react";
import translate from "../../language";
import './Register.css'
export default function FirstStep({setCurrentStep, setEmail}) {

    const text = translate[localStorage.getItem('language') || "English"]
    const [username, setusername] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastname] = useState()
    const clickButton = () =>{
        setCurrentStep(1)
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
                <Input className="input" />
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
                <Input className="input" />
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
                <Input className="input" />
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
                <DatePicker className="input" placeholder={text.select_date}/>
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
                <Input className="input" />
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
                <Input className="input" />
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
                <Input className="input" onChange={(event) => setEmail(event.target.value)}/>
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
                <Input className="input" />
            </Form.Item>

            
            <Button type="primary" onClick={clickButton}>{text.register}</Button>
        </Form>
    )
}
