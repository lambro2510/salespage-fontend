import * as React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginScreen from './module/LoginScreen';
import HomeScreen from './module/HomeScreen';
const Router = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/" element={<HomeScreen />} />
        </Routes>
    )
}

export default Router;
