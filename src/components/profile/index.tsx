import React from 'react';
import { useNavigate, Route, Routes, NavLink } from 'react-router-dom';
import ProfileCard from "./profile-card";
import OrderCard from "./order-card";
import { webRoutes } from '../../routes/web';
import { Outlet } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Tabs } from 'antd';
import BasePageContainer from '../layout/PageContainer';


const Profile = () => {

    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    const navigateToProfileCard = (id: string) => {
        navigate(`${id}`);
    };

    const navigateToOrderCard = () => {
        navigate(`order`);
    };

    return (
        <div className=''>
            <BasePageContainer>
                <NavLink to={`${auth?.username}`}>
                    Go to Profile Card by link
                </NavLink>
                <button onClick={() => navigateToProfileCard('123')}>Go to Profile Card</button>
                <button onClick={navigateToOrderCard}>Go to Order Card</button>
                <div className=' flex justify-center'>

                    <Outlet />
                </div>
            </BasePageContainer>
        </div>
    );
};

export default Profile;
