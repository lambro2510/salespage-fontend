import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';

import MainMenu from './MainMenu';
import { Layout, Button, theme } from 'antd';
import { Route, Routes } from 'react-router-dom';
import DashboardScreen from '../DashboardScreen';
import SellerProductScreen from './ProductScreen'
import ProductCategoryScreen from './ProductCategoryScreen';
import StoreScreen from './StoreScreen';
import VoucherStore from './VoucherStore';

const { Header, Content } = Layout;

const HomeScreen = () => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <MainMenu collapsed={collapsed}></MainMenu>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: '80vh',
                        background: colorBgContainer,
                    }}
                >

                    <Routes>
                        <Route path="product" element={<SellerProductScreen />} />
                        <Route path="dashboard" element={<DashboardScreen />} />
                        <Route path="product-category" element={<ProductCategoryScreen />} />
                        <Route path="store" element={<StoreScreen />} />
                        <Route path="voucher-store" element={<VoucherStore />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default HomeScreen;
