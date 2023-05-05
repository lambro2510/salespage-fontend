import * as React from 'react';
import { useSelector } from 'react-redux';
import { message, notification } from 'antd';
import UserService from '../../service/UserService';
import Header from './header';
import ProductMenu from '../menu/mainMenu';
const Home = () => {
    const profileData = useSelector((state) => state.auth);
    React.useEffect(() => {
        console.log(profileData);
        if(profileData){
            UserService.getProfile(profileData.token).then((res) => {
                notification.success({message : res});
            }).catch((err) => {
                notification.info({message : "Phiên đăng nhập hết hạn vui lòng đăng nhập lại"});
            })
        }
    })
    return(
        <div>
            <Header />
            <ProductMenu />
        </div>
    )
}

export default Home;