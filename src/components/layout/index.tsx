import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { Badge, Button, Col, Popover, Input, Menu, Row, Typography, Dropdown } from 'antd';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { memo, useEffect, useState } from 'react';
import { sidebar } from './sidebar';
import { apiRoutes } from '../../routes/api';
import http from '../../utils/http';
import { handleErrorResponse } from '../../utils';
import { RiShieldUserFill } from 'react-icons/ri';
import { BiCart, BiNotification, BiSearch } from 'react-icons/bi';
import { MdOutlineNotificationsNone } from "react-icons/md";
import { RootState } from '../../store';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { ImProfile } from 'react-icons/im';
import { NotificationResponse } from '../../interfaces/interface';

const { Title, Text } = Typography;
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [notifications, setNotifications] = useState<NotificationResponse[]>([])

  const defaultProps: ProLayoutProps = {
    title: CONFIG.appName,
    logo: '/icon.png',
    fixedHeader: true,
    fixSiderbar: true,
    layout: CONFIG.theme.sidebarLayout,
    route: {
      routes: sidebar,
    },
  };



  const logoutAdmin = () => {
    dispatch(logout());
    // navigate(webRoutes.login, {
    //   replace: true,
    // });
    // http.post(apiRoutes.logout).catch((error) => {
    //   handleErrorResponse(error);
    // });
  };

  const getNotification = async () => {
    try {
      const response = await http.get(`${apiRoutes.notification}`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setNotifications(response.data.data?.data);
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  const getCart = () => {
    try {
      const response = http.get(`${apiRoutes.cart}/all`, {
        params: {
          page: 0,
          size: 10
        }
      });
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  useEffect(() => {
    if (auth) {
      getNotification();
      getCart();
    }
  }, [auth]);

  const renderNotifiMenu = () => {
    return (
      <Popover
        content={
          <div className='w-52'>
            {notifications.map((notify: NotificationResponse) => (
              <div key={notify.id} className='pt-1 pl-1'>
                <Text className='line-clamp-1'>{notify.title}</Text>
              </div>
            ))}
          </div>
        }
        trigger={["hover", "click"]}
      >
        <Badge count={notifications.length}>
          <MdOutlineNotificationsNone className="m-1 text-lg" />
        </Badge>
      </Popover>
    );
  };

  const renderFooter = () => {
    return (
      <footer style={{ backgroundColor: "#f6f6f6", padding: "50px 0", color: "black" }}>
        <Row gutter={[0, 32]}>
          <Col xs={24} lg={8}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>E-web</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>E-web nơi bạn có thể giao dịch mọi thứ</Text>
            </Col>
          </Col>
          <Col xs={24} lg={4}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>Giới thiệu</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Về tôi</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Trung tâm giúp đỡ</Text>
            </Col>
          </Col>
          <Col xs={24} lg={4}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>Người dùng</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Thành viên</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Khuyến mãi</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Tài khoản</Text>
            </Col>
          </Col>
          <Col xs={24} lg={4}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>Trợ giúp</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Liên lạc</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Phương thức thanh toán</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Cửa hàng</Text>
            </Col>
          </Col>
          <Col xs={24} lg={4}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>FAQ</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Người dùng</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Hệ thống</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Hướng dẫn</Text>
            </Col>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <a href="/">
              <FacebookOutlined style={{ fontSize: "24px", margin: "0 10px" }} />
            </a>
            <a href="/">
              <TwitterOutlined style={{ fontSize: "24px", margin: "0 10px" }} />
            </a>
            <a href="/">
              <InstagramOutlined style={{ fontSize: "24px", margin: "0 10px" }} />
            </a>
            <a href="/">
              <YoutubeOutlined style={{ fontSize: "24px", margin: "0 10px" }} />
            </a>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "20px" }}>
          <Col>
            <Text style={{ color: "#8c8c8c" }}>
              © {new Date().getFullYear()} Đồ án tốt nghiệp demo sản phẩm
            </Text>
          </Col>
        </Row>
      </footer>
    )
  }
  return (
    <div className="h-screen">
      <ProLayout
        {...defaultProps}
        token={{
          sider: {
            colorMenuBackground: '#f5f5f5',
          },
          header: {
            colorBgHeader: 'primary'
          }
        }}
        location={location}
        onMenuHeaderClick={() => navigate(webRoutes.home)}
        menuItemRender={(item, dom) => (
          <a
            onClick={(e) => {
              e.preventDefault();
              item.path && navigate(item.path);
            }}
            href={item.path}
          >
            {dom}
          </a>
        )}
        avatarProps={{
          src: auth ? auth.imgUrl : '',
          className: 'bg-primary bg-opacity-20 text-primary text-opacity-90',
          size: 'small',
          shape: 'square',
          title: auth ? auth.username : 'Đăng nhập',

          render: (_, dom) => {
            if (auth) {
              return (
                <div>
                  <div className='flex justify-around items-center'>
                    <Input
                      placeholder='Tìm kiếm...'
                      size='small'
                      prefix={<BiSearch />}
                      style={{ maxWidth: 200 }}
                    />
                    {renderNotifiMenu()}
                    <BiCart className='mr-3 ml-3 text-2xl' />
                  </div>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'profile',
                          icon: <ImProfile />,
                          label: 'Tài khoản',
                          onClick: () => {
                            navigate(webRoutes.profile);
                          },
                        },
                        {
                          key: 'logout',
                          icon: <LogoutOutlined />,
                          label: 'Đăng xuất',
                          onClick: () => {
                            logoutAdmin();
                          },
                        },
                      ],
                    }}
                  >
                    {dom}
                  </Dropdown>
                </div>
              );
            } else {
              return (
                <div>
                  <div className='flex justify-around items-center'>
                    <Input
                      placeholder='Tìm kiếm...'
                      size='small'
                      prefix={<BiSearch />}
                      style={{ maxWidth: 200 }}
                    />

                    {renderNotifiMenu()}

                    <BiCart className='mr-3 ml-3 text-2xl' />
                  </div>
                  <Button onClick={() => navigate(`${webRoutes.login}`)} style={{ border: 'none', boxShadow: 'none' }}>Đăng nhập</Button>
                </div>

              )
            }
          },
        }}
        footerRender={renderFooter}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default memo(Layout);
