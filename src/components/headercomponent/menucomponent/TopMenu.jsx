import React, { useState } from "react";
import { Menu } from "antd"
import { FacebookOutlined, TwitterOutlined, DownOutlined, GlobalOutlined, BellOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import './TopMenu.css'
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
                    <div className="hover-fade" onMouseEnter={() => setShowChooseLanguage(true)} onMouseLeave={() => setShowChooseLanguage(false)}>
                        <GlobalOutlined />
                        <a href="">English</a>
                        <DownOutlined />
                        {showChooseLanguage && (
                            <div className="dropdown-menu">
                                <a href="#">English</a>
                                <a href="#">Tiếng Việt</a>
                            </div>
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