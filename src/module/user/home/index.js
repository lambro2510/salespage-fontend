import * as React from 'react';
import { useSelector } from 'react-redux';
import { Button, notification } from 'antd';
import UserService from '../../../service/UserService';
import Header from './header';
import ProductDetail from '../product/productDetail';
import HomeProductMenu from './homeProductScreen';
import './style.scss';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlide';
const Home = () => {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.auth);
    React.useEffect(() => {
        
        if(profileData.isLogin){
            console.log(profileData.token);
            getProfile(profileData.token)
        }
    }, [profileData.isLogin] )

    React.useEffect(() => {
        // dispatch(login(localStorage.getItem('token'), localStorage.getItem('username'), localStorage.getItem('role')))
    }, [] )

    const getProfile = async (token) => {
        const response = await UserService.getProfile(token);
    }
    return(
        <div>
            <Header username={profileData.username}/>
            <Routes>
                <Route path="products/:productId" element={<ProductDetail />} />
                <Route path="/" element={<HomeProductMenu />} />
            </Routes>
            
        </div>
    )
}

export default Home;