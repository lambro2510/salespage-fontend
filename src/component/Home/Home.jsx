import React, { useState } from "react";
import { Layout } from 'antd';
import { Content, Footer, Header } from "antd/es/layout/layout";
import './Home.css'
import Sider from "antd/es/layout/Sider";
import MainSider from "../Share/MainSider";
import HomeHeader from "../Share/HomeHeader";
export default function Home() {
    const [collapsed, setCollapsed] = useState(true);

    
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <MainSider collapsed={collapsed} setCollapsed={setCollapsed}></MainSider>
            </Sider>
            <Layout style={{ display: "grid" }}>
                <Header className="header" style={{ backgroundColor: "inherit", padding: "0px 25px" }}>
                    <HomeHeader></HomeHeader>
                </Header>
                <Content className="content" style={{ backgroundColor: "palegoldenrod", display: "flex" }}>

                    <div>asds</div>
                </Content>
                <Footer className="footer" style={{ backgroundColor: "yellow" }}>footer 2</Footer>
            </Layout>
        </Layout>
    )
}