import { useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined, GlobalOutlined, QuestionCircleOutlined, CaretDownOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom";
import { Input, Col, Layout, Row, Select, Popover, Button } from "antd"
import translate from "../../language";
import "./Share.scss"
import { useState } from "react";
import Cookies from "js-cookie";

export default function HomeHeader() {
    const [language, setLanguage] = useState("English")
    const [username, setUsername] = useState()

    const text = translate[localStorage.getItem('language') || "English"]

    const setPageLanguage = (newLanguage) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    }

    useEffect(() => {
        var username = Cookies.get('username');
        if (typeof (username) != "undefined" || username != "undefined") {
            console.log("get username: " + username)
            setUsername(username)
        }
    }, [])
    return (
        <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={2} >
                <Link to="/">
                    <img src={require('../../asserts/Main-Logo.png')} style={{ height: "75px", width: "auto" }} />
                </Link>
            </Col>
            <Col span={10} style={{ paddingTop: "6px" }}>
                <Input prefix={<SearchOutlined />} />
            </Col>
            <Col span={12} style={{ paddingTop: "6px", textAlign: "center" }}>
                <Row>
                    <Col span={6} />
                    <Col span={3}>
                        <Link to={'/ho-tro'} style={{ color: "black" }} className="button">
                            <QuestionCircleOutlined style={{ marginRight: "6px" }} />
                            <span>{text.support}</span>
                        </Link>
                    </Col>
                    <Col span={3} className="button">
                        <Link to={'/ho-tro'} style={{ color: "black" }}>
                            <QuestionCircleOutlined style={{ marginRight: "6px" }} />
                            <span>{text.contact}</span>
                        </Link>
                    </Col>
                    <Col span={3} className="button">
                        <Link to={'/ho-tro'} style={{ color: "black" }}>
                            <QuestionCircleOutlined style={{ marginRight: "6px" }} />
                            <span>{text.download}</span>
                        </Link>
                    </Col>
                    <Col span={3} className="button">
                        <div>
                            <Popover content={
                                <>
                                    <div style={{ display: "grid", marginRight: "10px", textAlign: "left"}}>
                                        <div className="button" onClick={() => setPageLanguage("English")}>English</div>
                                        <div className="button" onClick={() => setPageLanguage("Vietnamese")}>Tiếng việt</div>
                                    </div>
                                </>
                            }
                                style={{ margin: "0px" }}
                            >
                                <div>
                                    <GlobalOutlined />
                                    <span>{text.language}</span>
                                    <CaretDownOutlined />
                                </div>
                            </Popover>
                        </div>
                    </Col>
                    <Col span={4} className="button">
                        {
                            username ? username
                                : <>
                                    <Row>
                                        <Col span={12}>
                                            <Link className="button" to={'/register'} style={{ color: "black" }}>{text.register}</Link>
                                        </Col>
                                        <Col span={12}>
                                            <Link className="button" to={'/login'} style={{ color: "black" }}>{text.login}</Link>
                                        </Col>
                                    </Row>
                                </>
                        }
                    </Col>
                </Row>

            </Col>

        </Row>
    )
}