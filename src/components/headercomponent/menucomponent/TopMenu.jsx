import React from "react";
import {FacebookOutlined, TwitterOutlined} from '@ant-design/icons'
import './TopMenu.css'
function TopMenu() {

    return (
        <div className="top-header">
            <nav class="navbar-wrapper">
                <div className="sub-navbar-1">
                    <div><a href="">Seller centre</a></div>
                    <div><a href="">Join as seller</a></div>
                    <div><a href="">Download</a></div>
                    <div>
                        <a href="">Follow us on</a>
                        <FacebookOutlined />
                        <TwitterOutlined />
                    </div>
                </div>
                <div className="sub-navbar-2">
                    <div><a href="">Notifications</a></div>
                    <div><a href="">Help</a></div>
                    <div><a href="">English</a></div>
                    <div><a href="">Sign in</a></div>
                    <div><a href="">Login</a></div>
                </div>
            </nav>
        </div>
    )
}

export default TopMenu