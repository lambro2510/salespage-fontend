import React from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Tabs } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import ProfileCard from "./ProfileCard";
import OrderCard from "./OrderCard";
import PaymentCard from './PaymentCard';

const { TabPane } = Tabs;

const Profile = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    return (
        <div className=''>
            <BasePageContainer>
                <div className=' w-full'>
                    <Tabs tabPosition="left" defaultActiveKey="profile">
                        <TabPane tab="Tài khoản" key="profile" className='w-full'>
                            <ProfileCard />
                        </TabPane>
                        <TabPane className="w-full" tab="Đơn hàng" key="order">
                            <OrderCard />
                        </TabPane>
                        <TabPane tab="Thanh toán" key="payment">
                            <PaymentCard />
                        </TabPane>
                    </Tabs>
                </div>
            </BasePageContainer>
        </div>
    );
};

export default Profile;
