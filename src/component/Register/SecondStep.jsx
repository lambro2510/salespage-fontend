import { Button, Input, Row } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import translate from "../../language";
import "./Register.css"
export default function SecondStep({setCurrentStep ,email }) {

    const text = translate[localStorage.getItem('language') || "English"]
    const nextStep = () => {
        setCurrentStep(2);
    }
    return (
        <div>
            <Header style={{ backgroundColor: "inherit", fontSize: "25px" }}>
                {text.please_enter_the_verification_code}
            </Header>

            <div style={{ marginTop: "1vh" }}>
                <div>
                    {text.the_verification_code_has_been_sent_via_email}
                    <br></br>
                    {email}
                </div>
                <Input style={{ marginTop: "4vh", width: "60%" }} size="large"></Input>
            </div>
            <div style={{ marginTop: "6vh" }}>
                <Button type="primary" onClick={nextStep}>{text.verify_code}</Button>
            </div>
        </div>
    )
}