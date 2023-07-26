import * as React from 'react';
import MainMenu from './MainMenu';
import AdsBanner from './AdsBanner';
import ProductCategory from './ProductCategory';
import FlashSaleProduct from './FlashSaleProduct';
import { Col } from 'antd';

const HomeScreen = () => {
    return (
        <Col className='home'>
            <MainMenu></MainMenu>
            <AdsBanner></AdsBanner>
            <ProductCategory></ProductCategory>
            <FlashSaleProduct></FlashSaleProduct>
        </Col>
    )
}

export default HomeScreen;