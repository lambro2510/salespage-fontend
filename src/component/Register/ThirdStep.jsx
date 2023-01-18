import { Button, Form } from "antd";
import { Link } from "react-router-dom";

export default function ThirdStep({ setCurrentStep }) {
    return (
        <Form>
            <Button type="primary"><Link to={'/'} style={{ color: "white" }}>Skip</Link></Button>
            <Button type="primary"><Link to={'/'} style={{ color: "white" }}>Complete</Link></Button>
        </Form>
    )
}