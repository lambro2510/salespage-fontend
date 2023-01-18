import { Col } from 'antd'
import { Header } from "antd/es/layout/layout";

export default function LoginHeader({type}) {
    return (
        <Header className="header" style={{ backgroundColor: "orchid", display: "flex", justifyContent: "space-between" }}>
            <Col span={8} style={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
                <img src={require('../../asserts/Main-Logo.png')} alt="Logo" className="logo" style={{ height: "auto", width: "auto" }}></img>
                <div style={{ fontSize: "20px" }}>{type}</div>
            </Col>
            <Col className="help" span={8} style={{ fontSize: "20px" }}>Ban can giup do</Col>
        </Header>
    )
}