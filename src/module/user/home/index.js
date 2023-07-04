import * as React from 'react';
import { useSelector } from 'react-redux';
import UserService from '../../../service/UserService';
import Header from './header';
import ProductDetail from '../product/productDetail';
import HomeProductMenu from './homeProductScreen';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../redux/authSlide';
import './style.scss';
const Home = () => {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.auth);
    React.useEffect(() => {
        console.log("token storage");
        console.log(localStorage.getItem('token'));
        if(localStorage.getItem('token')){
            getProfile(localStorage.getItem('token'))
            dispatch(login({ token: localStorage.getItem('token'), username: localStorage.getItem('username'), role: localStorage.getItem('role') }));
        }
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