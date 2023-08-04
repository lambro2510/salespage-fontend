import { useEffect, useState } from "react";
import PaymentTransaction from "./PaymentTransaction";
import UserService from "../../../service/UserService";
import { Card, Layout, Menu, Slider } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { Link, Route, Routes } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import Profile from "./Profile";

const UserProfile = () => {

    

    return (
        <Layout>
            <Profile style={{ width: '100%' }} />
            <Layout>
                <Sider style={{ backgroundColor: "#fff" }}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        <SubMenu key="sub2" title="Tài khoản">
                            <Menu.Item key="1">
                                <Link to={'account'}>Thông tin tài khoản</Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub1" title="Giao dịch">

                            <Menu.Item key="2">
                                <Link to={'bank-account'}>Liên kết tài khoản</Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to={'payment'}>Lịch sử giao dịch</Link>
                            </Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Content>
                    <Routes >
                        <Route path='payment' element={<PaymentTransaction />} />
                    </Routes>
                </Content>

            </Layout>
        </Layout>
    )
}

export default UserProfile;