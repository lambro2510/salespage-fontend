import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { AutoComplete, Avatar, Button, Col, Dropdown, Input, Menu, Row, SelectProps } from 'antd';
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
import { RootState } from '../../store';
import LazyImage from '../lazy-image';
import { BiCart, BiSearch } from 'react-icons/bi';
import { ProductDataResponse, ProductDetailInfoResponse } from '../../interfaces/Interface';

const { Option } = AutoComplete;
const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [searchInput, setSearchInput] = useState<string>("")

  useEffect(() => {
    getSuggestProduct();
  }, [searchInput])
  const getSuggestProduct = async () => {
    const response = await http.get(`${apiRoutes.products}`, {
      params: {
        productName: searchInput
      }
    })
    const listProduct : ProductDataResponse[] = response.data?.data?.data as ProductDataResponse[];
    const productNameList: any[] = listProduct.map((product) => {
      return {
        value:  product.productName
      }
    }) as any[];
    setOptions(productNameList)
  };

  const renderNotLoginMenu = () => {
    return (
      <NavLink to={'login'}>
        Đăng nhập
      </NavLink>
    )
  };

  const renderLoginMenu = () => {
    return (
      <div className='flex justify-center'>
        <Avatar size={'small'} src="" />
        {auth?.username}
      </div>
    )
  }

  const renderProfile = () => {
    if (!auth) {
      return renderNotLoginMenu();
    } else {
      return renderLoginMenu();
    }
  }
  const renderDropDownMenu = (dom: any) => {
    return (
      <Dropdown menu={{
        items: [
          {
            key: 'profile',
            icon: <LogoutOutlined />,
            label: 'Thông tin tài khoản',
            onClick: () => {
              navigate(webRoutes.profile);
            },
          },
          {
            key: 'order',
            icon: <LogoutOutlined />,
            label: 'Hóa đơn',
            onClick: () => {
              logoutAdmin();
            },
          },
          {
            key: 'payment',
            icon: <LogoutOutlined />,
            label: 'Nạp tiền vào tài khoản',
            onClick: () => {
              logoutAdmin();
            },
          },
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => {
              logoutAdmin();
            },
          },
        ],
      }}>
        {dom}
      </Dropdown>
    )
  };

  const renderFooter = () => {
    return (
      <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0f2f5' }}>
        backend git link: https://github.com/lambro2510/salespage-service.git;
        fontend git link: https://github.com/lambro2510/salespage-fontend.git;
        © lambro2510@gmail.com
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className='h-1/6 flex justify-center m-auto bg-gradient-to-b from-primary to-lightRed'>
        <div className='w-8/12 text-white'>
          <div className='p-4 flex justify-between'>
            <Row className='w-5/12  flex justify-between'>
              <Col className='flex justify-center'>
                <a >Kênh người bán</a>
              </Col>
              <Col className='flex justify-center' >
                <a>Trỏ thành người bán</a>
              </Col>
              <Col className='flex justify-center' >
                <a>Tải ứng dụng</a>
              </Col>
              <Col className='flex justify-center'>
                <a>Kết nối</a>
              </Col>
            </Row>
            <Row className='w-5/12 flex justify-between'>
              <Col className='flex justify-center' >
                <a>Thông báo</a>
              </Col>
              <Col className='flex justify-center'>
                <a>Hỗ trợ</a>
              </Col>
              <Col className='flex justify-center' >
                <a>Tiếng việt</a>
              </Col>
              <Col className='flex justify-center' >
                {renderProfile()}
              </Col>
            </Row>
          </div>
          <Row className='p-4 max-h-3'>
            <Col span={3}>
              <LazyImage className='h-20' src='/icon.png' />
            </Col>
            <Col span={18}>
              <Row className='w-full'>
                <AutoComplete
                  popupMatchSelectWidth={10}
                  style={{ width: '100%' }}
                  options={options}
                  onSelect={(value) => {
        
                    setSearchInput(value);
                  }}
                >
                  <Input
                    onChange={(e) => setSearchInput(e.target.value)}
                    size="large"
                    className='rounded-none'
                    placeholder='Tìm kiếm sản phẩm'
                    addonAfter={<BiSearch className='cursor-pointer' onClick={() => getSuggestProduct()} />}
                  />
                </AutoComplete>
              </Row>
              <Row className='pt-4'>
                <Col className='flex justify-center' span={3}>
                  <a>Áo khoác</a>
                </Col>
                <Col className='flex justify-center' span={3} >
                  <a>1k</a>
                </Col>
                <Col className='flex justify-center' span={3}>
                  <a>Freeship</a>
                </Col>
                <Col className='flex justify-center' span={3}>
                  <a>Săn sale</a>
                </Col>
                <Col className='flex justify-center' span={3} >
                  <a>Áo 0đ</a>
                </Col>
                <Col className='flex justify-center' span={3}>
                  <a>Vợt cầu lông</a>
                </Col>
                <Col className='flex justify-center' span={3} >
                  <a>Tivi</a>
                </Col>
                <Col className='flex justify-center' span={3}>
                  <a>Laptop</a>
                </Col>
              </Row>
            </Col>
            <Col span={3} className='flex justify-center items-center'>
              <BiCart size={"3rem"} onClick={() => navigate(`${webRoutes.cart}`)} />
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  const defaultProps: ProLayoutProps = {
    title: CONFIG.appName,
    logo: '/icon.png',
    fixedHeader: true,
    fixSiderbar: true,
    layout: CONFIG.theme.sidebarLayout,
    route: {
      routes: sidebar,
    },
    footerRender: renderFooter,
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
      {renderHeader()}
      <Outlet />

    </div>
  );
};

export default memo(Layout);
