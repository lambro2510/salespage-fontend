import * as React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginScreen from './moduleUser/LoginScreen';
import HomeScreen from './moduleUser/HomeScreen';
import UnauthorizedPage from './component/403Error';

import SellerLoginScreen from './moduleSeller/LoginScreen';
import DashboardScreen from './moduleSeller/DashboardScreen';
import SellerHomeScreen from './moduleSeller/HomeScreen';
import SellerProductScreen from './moduleSeller/HomeScreen/ProductScreen';
const Router = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/not-found" element={<UnauthorizedPage />} />

            <Route path="/seller" element={<SellerHomeScreen />} >
                <Route path="/seller/dashboard" element={<DashboardScreen />} />
                <Route path="/seller/product" element={<SellerProductScreen />} />
            </Route>
            <Route path="/seller/login" element={<SellerLoginScreen />} />
        </Routes>
    )
}

export default Router;
