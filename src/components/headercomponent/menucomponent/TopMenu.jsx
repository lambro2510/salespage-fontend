import React, { useState } from "react";
import { Menu } from "antd"
import { FacebookOutlined, TwitterOutlined, DownOutlined, GlobalOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import './TopMenu.css'
import ChangeLanguage from "../../UI/ChangeLanguage";
function TopMenu() {

    const [showChooseLanguage, setShowChooseLanguage] = useState(false);

    return (
        <div className="top-header">
            <nav class="navbar-wrapper">
                <div className="sub-navbar-1">
                    <div className="hover-fade">
                        <a href="">Seller centre</a>
                    </div>
                    <div className="hover-fade">
                        <a href="">Join as seller</a>
                    </div>
                    <div className="hover-fade">
                        <a href="">Download</a>
                    </div>
                    <div>
                        <a href="">Follow us on</a>
                        <FacebookOutlined />
                        <TwitterOutlined />
                    </div>
                </div>

                <div className="sub-navbar-2">
                    <div className="hover-fade ">
                        <BellOutlined />
                        <a href="">Notifications</a>
                    </div>
                    <div className="hover-fade">
                        <QuestionCircleOutlined />
                        <a href="">Help</a>
                    </div>
                    <div onMouseEnter={() => setShowChooseLanguage(true)} onMouseLeave={() => setShowChooseLanguage(false)}>
                        <GlobalOutlined className="hover-fade" />
                        <a href="" className="hover-fade">English</a>
                        <DownOutlined className="hover-fade" />
                        {showChooseLanguage && (
                            <ChangeLanguage />
                        )}
                    </div>
                    <div className="hover-fade">
                        <a href="">Sign in</a>
                    </div>
                    <div className="hover-fade">
                        <a href="">Login</a>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default TopMenu