import { useEffect, useState } from "react";
import PaymentTransaction from "./PaymentTransaction";
import UserService from "../../../service/UserService";
import { Card, Layout, Menu, Slider } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Route, Routes } from "react-router-dom";

const UserProfile = () => {

    const [profile, setProfile] = useState();

    useEffect(() => {
        getProfile();
    }, []);


    const getProfile = async () => {
        const profileData = UserService.getProfile();
        setProfile(profileData);
    };



    return (
        <Layout >
            <Sider style={{ backgroundColor: "inherit" }}>
                <Menu title="Giao dịch">
                    <Menu.Item>
                        <Link to={'payment'}>Giao dịch</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Header color="inherit" style={{ backgroundColor: "inherit" }}>
                123
            </Header>

            <Content>
                <Routes >
                    <Route path='payment' element={<PaymentTransaction />} />
                </Routes>
            </Content>

        </Layout>
    )
}

export default UserProfile;