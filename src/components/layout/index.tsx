import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { Badge, Button, Col, Dropdown, Input, Menu, Row, Typography } from 'antd';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import Icon, { LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { memo } from 'react';
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

const { Title, Text } = Typography;
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
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
    navigate(webRoutes.login, {
      replace: true,
    });

    http.post(apiRoutes.logout).catch((error) => {
      handleErrorResponse(error);
    });
  };

  const renderFooter = () => {
    return (
      <footer style={{ backgroundColor: "#f6f6f6", padding: "50px 0", color: "black" }}>
        <Row gutter={[16, 16]}>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Title level={3}>E-web</Title>
            <Text className='m-auto'>
              Mang mọi thứ về nhà bạn
            </Text>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Title level={4}>Trang web</Title>
            <ul>
              <li>
                <Link to="/">Trang chủ</Link>
              </li>
              <li>
                <Link to="/products">Sản phẩm</Link>
              </li>
              <li>
                <Link to="/about">Về chúng tôi</Link>
              </li>
              <li>
                <Link to="/contact">Liên hệ</Link>
              </li>
            </ul>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <Title level={4}>Kết nối với chúng tôi</Title>
            <Text>
              78 ngõ 70 Phùng Khoang, Đại Mỗ, phường Nam Từ Liêm , Thành phố Hà Nội
              <br />
              Email: lambro2510@gmail.com
              <br />
              Phone: +84 979 *** 206
            </Text>
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

                    <Badge count={99} className='mr-3 ml-3'>
                      <MdOutlineNotificationsNone className='m-1 text-lg' />
                    </Badge>

                    <BiCart className='mr-3 ml-3 text-2xl' />
                  </div>
                  <Dropdown
                    menu={{
                      items: [
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

                    <Badge count={99} className='mr-3 ml-3'>
                      <MdOutlineNotificationsNone className='m-1 text-lg' />
                    </Badge>

                    <BiCart className='mr-3 ml-3 text-2xl' />
                  </div>
                  <Button onClick={() => navigate(`${webRoutes.login}`)} style={{ border: 'none', boxShadow: 'none' }}>Đăng nhập</Button>
                </div>

              )
            }
          },
        }}
        footerRender = {renderFooter}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default memo(Layout);
