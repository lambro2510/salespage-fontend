import * as React from 'react';
import MainMenu from './MainMenu';
import AdsBanner from './AdsBanner';
import ProductCategory from './ProductCategory';
import FlashSaleProduct from './FlashSaleProduct';
import { Col } from 'antd';
import Product from './Product';
import FoodProduct from './FoodProduct';
import HomeFooter from './HomeFooter';

const HomeScreen = () => {
    return (
        <Col className='home'>
            <MainMenu></MainMenu>
            <AdsBanner></AdsBanner>
            <ProductCategory></ProductCategory>
            <FlashSaleProduct></FlashSaleProduct>
            <Product></Product>
            <FoodProduct></FoodProduct>
            <HomeFooter></HomeFooter>
        </Col>
    )
}

export default HomeScreen;