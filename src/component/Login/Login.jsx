import { Button, Card, Checkbox, Col, Form, Input, Layout, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import translate from "../../language";
import LoginHeader from "../Share/LoginHeader";
import AccountService from "../../services/AccountService";
import { useState } from "react";
import Cookies from 'js-cookie'
function Login() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState('')
    const [error, setError] = useState();
    const nagative = useNavigate()
    const text = translate[localStorage.getItem('language') || "English"]

    const signIn = async () => {
        try {
            let response = await AccountService.signIn(username, password);
            console.log(response);
            Cookies.set('token', response.token, {expires: 1});
            Cookies.set('username', response.username, {expires: 0.1});
            nagative('/')
        } catch {
            setError(text.login_error); // login error message
        }

    }

    return (
        <Layout className="layout">
            <LoginHeader type={"Login"} />
            <Content className="layout-content">
                <Row align="top" className="content-row" />
                <Row justify="space-between" align="middle" className="content-middle-row" style={{ height: '100%', backgroundColor: "GrayText" }}>
                    <Col span={8} />
                    <Col span={8}>
                        <Card title="Login" className="card-login" style={{ backgroundColor: "ButtonFace" }}>
                            <Form className="login-form">
                                <Input className="text-input" type="text" placeholder={text.username} onChange={(e) => setUsername(e.target.value)}></Input>
                                {error ? null : <><label style={{ color: "red" }}>{error}</label></>}
                                <Input className="text-input" type="password" placeholder={text.password} onChange={(e) => setPassword(e.target.value)}></Input>
                                <Row className="cb-input">
                                    <Checkbox >{text.remember_password}</Checkbox>
                                    <Link >{text.forgot_password}</Link>
                                </Row>
                                <Button className="btn-input" type="primary" onClick={signIn}>{text.login}</Button>
                                <Row className="icon-row">
                                    <Col span={3.5} className="icon-col">
                                        <Button icon={<GoogleOutlined className="icon" style={{ marginRight: 5 }} />}>
                                            <Link >Google</Link>
                                        </Button>
                                    </Col>
                                    <Col span={3.5} className="icon-col">
                                        <Button icon={<FacebookOutlined className="icon" style={{ marginRight: 5 }} />}>
                                            <Link>Facebook</Link>
                                        </Button>
                                    </Col>
                                    <Col span={3.5} className="icon-col">
                                        <Button icon={<TwitterOutlined className="icon" style={{ marginRight: 5 }} />}>
                                            <Link>Twitter</Link>
                                        </Button>
                                    </Col>
                                </Row>
                                <Row className="bottom-row">
                                    <span>{text.you_dont_have_account}
                                        <Link style={{ color: "red" }} to={'/register'}>{text.register_now}</Link>
                                    </span>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={8} />
                </Row>
            </Content>
            <Footer style={{ height: '30vh' }}>

            </Footer>
        </Layout>
    )
}

export default Login