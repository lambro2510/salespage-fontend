import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import "./LoginPage.css";

function LoginPage(setProfile) {
    return (
        <div className="login-page">
            <div className="login-header">
                <div className="header-logo">
                    <img src={require("../../../asserts/Main-Logo.png")} alt="logo" />
                    <h1>Đăng nhập</h1>
                </div>
            </div>
            <div className="container">
                <LoginForm setProfile={setProfile} />
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default LoginPage