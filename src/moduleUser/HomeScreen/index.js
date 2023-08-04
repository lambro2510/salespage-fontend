import * as React from 'react';
import MainMenu from './MainMenu';
import AdsBanner from './AdsBanner';
import ProductCategory from './ProductCategory';
import FlashSaleProduct from './FlashSaleProduct';
import { Col } from 'antd';
import Product from './Product';
import FoodProduct from './FoodProduct';
import HomeFooter from './HomeFooter';
import './style.scss';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import LoginErrorComponent from '../../component/LoginErrorComponent';
import PaymentErrorComponent from '../../component/PaymentErrorComponent';
import PaymentComponent from '../../component/PaymentModalComponent';
import UserProfile from './UserProfile';
import PaymentTransaction from './UserProfile/PaymentTransaction';

const HomeScreen = () => {
    const home = (
        <>
            <AdsBanner></AdsBanner>
            <ProductCategory></ProductCategory>
            <FlashSaleProduct></FlashSaleProduct>
            <Product></Product>
            <FoodProduct></FoodProduct>
        </>
    )

    const modal = (
        <>
        <LoginErrorComponent></LoginErrorComponent>
        <PaymentErrorComponent></PaymentErrorComponent>
        <PaymentComponent/>
        </>
    )
    return (
        <Col className='home'>
            {modal}
            <MainMenu></MainMenu>
            <Routes>
                <Route path='/' element={home} />
                <Route path='/product/:productId' element={<ProductDetail />} />
                <Route path='profile' element={<UserProfile />} >
                    <Route path='payment' element={<PaymentTransaction />} />
                </Route>
            </Routes>

            <HomeFooter></HomeFooter>
        </Col>
    )
}

export default HomeScreen;