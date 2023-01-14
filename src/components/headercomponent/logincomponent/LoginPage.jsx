import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegistrationForm from "./signup/RegistrationForm";
import "./LoginPage.css";

function LoginPage(setProfile) {
    const [currentForm, setCurrentForm] = useState("login");

    return (
        <div className="login-page">
            <div className="login-header">
                <div className="header-logo">
                    <img src={require("../../../asserts/Main-Logo.png")} alt="logo" />
                    <h1>{currentForm}</h1>
                </div>
            </div>
            <div className="container">
                {currentForm === "login" ? (
                    <>
                        <LoginForm setProfile={setProfile} setCurrentForm={setCurrentForm}/>
                    </>
                ) : (
                    <>
                        <RegistrationForm/>
                    </>
                )}
            </div>
            <div className="footer"></div>
        </div>
    );
}

export default LoginPage;
