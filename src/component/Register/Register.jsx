import { Button, Card, Checkbox, Col, Form, Input, Layout, Row, Steps } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import { GoogleOutlined, FacebookOutlined, TwitterOutlined } from '@ant-design/icons'
import React, { useState } from "react";
import translate from "../../language";
import LoginHeader from "../Share/LoginHeader";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
function Register() {
    const text = translate[localStorage.getItem('language') || "English"]
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState();
    const steps = [
        {
            title: text.fill_in_information,
            content: "fill data"
        },
        {
            title: text.verify_information,
            content: "verify"
        },
        {
            title: text.fill_in_profile,
            content: "fill profile"
        },
    ]

    const nextStep = () => {
        setCurrentStep(currentStep + 1)
    }

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <Layout className="layout">
            <LoginHeader type={"Register"} />
            <Content className="layout-content">
                <Row align="top" className="content-row" />
                <Row justify="space-between" align="middle" className="content-middle-row" style={{ height: '100%', backgroundColor: "GrayText" }}>
                    <Col span={8} />
                    <Col span={8}>
                        <Card title="Register" className="card-register" style={{ backgroundColor: "ButtonFace" }}>
                            <Steps current={currentStep} items={items} />
                            <hr />
                            {
                                currentStep === 0 ? <FirstStep setCurrentStep={setCurrentStep} setEmail={setEmail} /> : null
                            }
                            {
                                currentStep === 1 ? <SecondStep setCurrentStep={setCurrentStep} email={email} /> : null
                            }
                            {
                                currentStep === 2 ? <div><ThirdStep /></div> : null
                            }
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

export default Register