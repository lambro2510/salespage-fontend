import * as React from 'react';
import UserService from '../../../../service/UserService';
import { Col, Row, Menu, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { BellOutlined, QuestionCircleOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';
import './style.scss';
import NotificationService from '../../../../service/NotificationService';
import { getToken, deleteToken, getLanguage, setLanguage } from '../../../../helper/localStore';

const TopMenu = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = React.useState({});
    const [notifications, setNotifications] = React.useState([])
    const [language, setLanguage] = React.useState(getLanguage() || "Tiếng Việt")
    const [metaData, setMetaData] = React.useState(
        {
            total: 0,
            totalPages: 0
        }
    )
    React.useEffect(() => {
        if (getToken()) {
            getProfileData();
            getNotification();
        }
    }, []);


    const getProfileData = async () => {
        try {
            const profileData = await UserService.getProfile();
            setProfile(profileData);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const getNotification = async () => {
        try {
            let page = 0;
            let size = 5;
            const notificationData = await NotificationService.getAllNotification(page, size);
            setNotifications(notificationData?.data);
            setMetaData(notificationData?.metaData);
        } catch (error) {
            console.error('Error fetching notification data:', error);
        }
    }

    const handleLogout = () => {
        deleteToken()
        setProfile({})
    };

    const profileMenu = (
        <Menu>
            <Menu.Item key="profile">
                Thông tin tài khoản
            </Menu.Item>
            <Menu.Item key="order">
                Đơn hàng
            </Menu.Item>
            <Menu.Item key="logout" onClick={handleLogout}>
                Đăng xuất
            </Menu.Item>
        </Menu>
    );

    const languageMenu = (
        <Menu>
            <Menu.Item key="Vietnamese" onClick={() => setLanguage('Vietnamese')}>
                Tiếng Việt
            </Menu.Item>
            <Menu.Item key="English" onClick={() => setLanguage('English')}>
                Tiếng Anh
            </Menu.Item>
        </Menu>
    );

    const notificationMenu = (
        <>
            {!getToken() ? (
                <div className="notification-menu">
                    <p>Vui lòng đăng nhập để xem thông báo.</p>
                </div>
            ) : (
                <Menu>
                    {notifications.length === 0 ? (
                        <Menu.Item disabled className="notification-menu">
                            Không có thông báo nào.
                        </Menu.Item>
                    ) : (
                        <>
                            <Menu.Item>
                                Thông báo
                            </Menu.Item>
                            {
                                notifications.map((notification) => (
                                    <Menu.Item
                                        key={notification?.id}
                                        className={notification?.status === 'SEEN' ? 'notification-seen' : 'notification-unseen'}
                                    >
                                        <div className="notification-item">
                                            <div className="notification-title">{notification?.tittle}</div>
                                            <div className="notification-info">
                                                <span className="notification-date">{notification?.created}</span>
                                            </div>
                                        </div>
                                    </Menu.Item>
                                ))
                            }
                            <Menu.Item>
                                Xem tất cả thông báo
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            )}
        </>
    );


    return (
        <Row justify='space-between' className='top-menu' >
            <Col span={11}>
                <Row justify='space-evenly'>
                    <Col>
                        <span className='hover-text'>
                            <p>Kênh người bán</p>
                        </span>
                    </Col>
                    <Col>
                        <span className='hover-text'>
                            <p>Trở thành người bán hàng Shopee</p>
                        </span>

                    </Col>
                    <Col>
                        <span className='hover-text'>
                            <p>Tải ứng dụng</p>
                        </span>

                    </Col>
                    <Col>
                        <span className='hover-text'>
                            <p>Kết nối</p>
                        </span>

                    </Col>
                </Row>
            </Col>

            <Col span={11}>
                <Row justify='space-evenly'>
                    <Dropdown overlay={notificationMenu} trigger={['click', 'hover']}>
                        <span className='hover-text'>
                            <BellOutlined className='icon' />
                            <p>Thông báo</p>
                        </span>
                    </Dropdown>
                    <Col>
                        <span className='hover-text'>
                            <QuestionCircleOutlined className='icon' />
                            <p>Hỗ trợ</p>
                        </span>
                    </Col>
                    <Col>
                        <Dropdown overlay={languageMenu} trigger={['click', 'hover']}>
                            <span className='hover-text'>
                                <GlobalOutlined className='icon' />
                                <p>{language}</p>
                            </span>
                        </Dropdown>
                    </Col>
                    <Col>
                        {profile?.username ? (
                            <Dropdown overlay={profileMenu} trigger={['click', 'hover']}>
                                <span className='hover-text'>
                                    {profile?.imageUrl ? (
                                        <Avatar className='custom-avatar' src={profile.imageUrl} alt="User Avatar" />
                                    ) : (
                                        <Avatar className='custom-avatar' icon={<UserOutlined />} />
                                    )}
                                    <p>{profile?.username}</p>
                                </span>
                            </Dropdown>
                        ) : (

                            <div className='login-regis'>
                                <span className='btn' onClick={() => navigate('login')}>
                              Đăng nhập
                            </span>
                            {' | '}
                            <span className='btn' onClick={() => navigate('regis')}>
                              Đăng ký
                            </span>
                            </div>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default TopMenu;
