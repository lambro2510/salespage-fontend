import { Col } from 'antd'
import { Header } from "antd/es/layout/layout";
import { Link } from 'react-router-dom';

export default function LoginHeader({ type, message }) {
    return (
        <Header className="header" style={{ backgroundColor: "orchid", display: "flex", justifyContent: "space-between" }}>
            <Col span={8} style={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
                <Link to="/">
                    <img src={require('../../asserts/Main-Logo.png')} alt="Logo" className="logo" style={{ height: "100%", width: "100%" }} />
                </Link>
                <div style={{ fontSize: "20px" }}>{type}</div>
            </Col>
            <Col className="help" span={8} style={{ fontSize: "20px" }}>{message}</Col>
        </Header>
    )
}