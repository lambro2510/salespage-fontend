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
import ProfileScreen from '../profile';
const Home = () => {
    const dispatch = useDispatch();
    const profileData = useSelector((state) => state.auth);
    const [profile, setProfile] = React.useState({})
    React.useEffect(() => {

        if(localStorage.getItem('token')){
            let res = getProfile(localStorage.getItem('token'))
            dispatch(login({ token: localStorage.getItem('token'), username: localStorage.getItem('username'), role: localStorage.getItem('role') }));
        }
    }, [] )

    const getProfile = async (token) => {
        const response = await UserService.getProfile(token);
        setProfile(response);
        return response;
    }
    
    return(
        <div>
            <Header profile={profile}/>
            <Routes>
                <Route path="products/:productId" element={<ProductDetail />} />
                <Route path="/" element={<HomeProductMenu />} />
                <Route path="profile" element={<ProfileScreen />} />
            </Routes>
            
        </div>
    )
}

export default Home;