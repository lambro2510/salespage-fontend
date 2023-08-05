import * as React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginScreen from './moduleUser/LoginScreen';
import HomeScreen from './moduleUser/HomeScreen';
import LocationMap from './moduleUser/HomeScreen/LocationMap';
import UserProfile from './moduleUser/HomeScreen/UserProfile';
import PaymentTransaction from './moduleUser/HomeScreen/UserProfile/PaymentTransaction';
import CreatePayment from './moduleUser/HomeScreen/UserProfile/CreatePayment';

import UnauthorizedPage from './component/403Error';

import ProductScreen from './moduleUser/HomeScreen/ProductDetail';

import SellerLoginScreen from './moduleSeller/LoginScreen';
import DashboardScreen from './moduleSeller/DashboardScreen';
import SellerHomeScreen from './moduleSeller/HomeScreen';
import SellerProductScreen from './moduleSeller/HomeScreen/ProductScreen';
import ProductCategoryScreen from './moduleSeller/HomeScreen/ProductCategoryScreen';
import SellerStoreScreen from './moduleSeller/HomeScreen/StoreScreen';
import SellerVoucherStore from './moduleSeller/HomeScreen/VoucherStore';
const Router = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} >
                <Route path='/product/:productId' element={<ProductScreen />} />    
                <Route path='profile' element={<UserProfile />} >
                    <Route path='payment/transaction' element={<PaymentTransaction />} />    
                    <Route path='payment/create' element={<CreatePayment />} />    
                </Route>
            </Route>
            <Route path='location-map' element={<LocationMap />} />
            <Route path="/unauthorize" element={<UnauthorizedPage />} />
            

            <Route path="/seller" element={<SellerHomeScreen />} >
                <Route path="dashboard" element={<DashboardScreen />} />
                <Route path="product" element={<SellerProductScreen />} />
                <Route path="product-category" element={<ProductCategoryScreen />} />
                <Route path="store" element={<SellerStoreScreen />} />
                <Route path="voucher-store" element={<SellerVoucherStore />} />
            </Route>
            <Route path="/seller/login" element={<SellerLoginScreen />} />
        </Routes>
    )
}

export default Router;
