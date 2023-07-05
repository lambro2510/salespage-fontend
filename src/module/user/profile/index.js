import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Avatar, Row, Col, Typography, Divider, Menu, Space } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  BankOutlined,
  StarOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import UserService from '../../../service/UserService';
import './style.scss';
import { setProfile } from '../../../redux/profileSlide';

const { Title, Text } = Typography;

const ProfileScreen = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    
  }, []);

  const getProfile = async () => {
    const response = await UserService.getProfile(localStorage.getItem('token'));
    dispatch(setProfile(response?.data));
  }
  const uploadProfileImage = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const response = await UserService.uploadImage(formData);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-container">
      <div className="profile-content" style={{ marginTop: '1rem' }}>
        <Row gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12, offset: 6 }} md={{ span: 8, offset: 4 }}>
            <Avatar
              className="profile-image"
              size={120}
              src={profile.imageUrl}
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              ref={fileInputRef}
              onChange={uploadProfileImage}
            />
            <Divider />
            <Title level={3}>{profile.username}</Title>
            <Text type="secondary">{profile.displayName}</Text>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Title level={4}>Thông tin cá nhân</Title>
            <Divider />
            <div className="profile-info">
              <p className="info-item">
                <UserOutlined className="info-icon" /> {profile.firstName} {profile.lastName}
              </p>
              <p className="info-item">
                <MailOutlined className="info-icon" /> {profile.email}
              </p>
              <p className="info-item">
                <PhoneOutlined className="info-icon" /> {profile.phoneNumber}
              </p>
              <p className="info-item">
                <CalendarOutlined className="info-icon" /> {profile.dateOfBirth}
              </p>
            </div>
          </Col>
          <Col xs={{ span: 24 }}>
            <Card className="menu-card">
              <Menu mode="vertical" theme="light">
                <Menu.Item key="1" icon={<BankOutlined />}>
                  Liên kết ví
                </Menu.Item>
                <Menu.Item key="2" icon={<StarOutlined />}>
                  Nạp tiền
                </Menu.Item>
                <Menu.Item key="3" icon={<DollarOutlined />}>
                  Tài khoản
                </Menu.Item>
                <Menu.Item key="4" icon={<DollarOutlined />}>
                  Đăng xuất
                </Menu.Item>
                {/* Thêm các menu chức năng khác tại đây */}
              </Menu>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProfileScreen;
