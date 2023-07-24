import * as React from 'react'
import { Route, Routes } from "react-router-dom";
import LoginScreen from './module/LoginScreen';
const Router = () => {

    return (
        <Routes>
            <Route path="/login" element={<LoginScreen />} />
        </Routes>
    )
}

export default Router;
