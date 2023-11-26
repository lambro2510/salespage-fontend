import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { Badge, Dropdown, Input, Menu } from 'antd';
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

  const renderSiderMenu = (a: any) => {
    console.log('a: ', a);

    if (a.isMobile == true) {
      return (
        <div className='flex justify-between'>
          <Input
            placeholder='Tìm kiếm...'
            size='small'
            prefix={<BiSearch />}
          />
          <Badge count={99} className='mr-3 ml-3'>
              <MdOutlineNotificationsNone className='m-1 text-lg' />
            </Badge>

            <BiCart className='mr-3 ml-3 text-2xl'/>
        </div>

      )

    } else {
      return (
        <div className='flex justify-around'>
          <Menu mode='horizontal' selectedKeys={[location.pathname]} style={{ border: 'none', width: '75vw', backgroundColor: 'inherit'}}>
            {sidebar.map((item) => (
              <Menu.Item key={item.path} icon={item.icon}>
                <Link to={item.path}>{item.name}</Link>
              </Menu.Item>
            ))}
          </Menu>
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

            <BiCart className='mr-3 ml-3 text-2xl'/>
          </div>
        </div>
      );
    }
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
        headerContentRender={(a) => renderSiderMenu(a)}
        avatarProps={{
          src: `${auth?.imgUrl}`,
          className: 'bg-primary bg-opacity-20 text-primary text-opacity-90',
          size: 'small',
          shape: 'square',
          title: 'Admin',
          render: (_, dom) => {
            return (
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
            );
          },
        }}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default memo(Layout);
