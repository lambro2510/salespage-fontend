import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { webRoutes } from '../../routes/web';
import { Badge, Button, Col, Popover, Input, Row, Typography, Dropdown, Card, Modal, Avatar, AutoComplete } from 'antd';
import { ProCard, ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import {LogoutOutlined, LoadingOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { memo, useEffect, useState } from 'react';
import { sidebar } from './sidebar';
import { apiRoutes } from '../../routes/api';
import http from '../../utils/http';
import { convertToVietnamTime, formatTimeDifference, handleErrorResponse } from '../../utils';
import { BiCart, BiMoney, BiSearch } from 'react-icons/bi';
import { MdOutlineNotificationsNone, MdPayment } from "react-icons/md";
import { RootState } from '../../store';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { ImProfile } from 'react-icons/im';
import { CartResponse, NotificationDetailResponse, NotificationResponse, NotificationType } from '../../interfaces/interface';
import { modalState } from '../../interfaces/models/data';
import { RiPassExpiredFill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import LazyAvatar from '../lazy-avatar';
const { Title, Text } = Typography;

interface ProductInfo {
  productId: string;
  productName: string;
  productRate: {
    totalPoint: number;
    totalRate: number;
    avgPoint: number;
  };
  sellerUsername: string;
  minSellPrice: number;
  maxSellPrice: number;
  minOriginPrice: number;
  maxOriginPrice: number;
  maxDiscountPercent: number;
  totalSell: number;
  totalView: number;
  imageUrl: string;
  createdAt: number;
  categoryId: string;
  isHot: boolean;
}

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState<NotificationResponse[]>([])
  const [cartItems, setCartItems] = useState<CartResponse[]>([])
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [modalProps, setModalProps] = useState<modalState>(
    {
      isOpen: false,
      title: '',
      content: ''
    }
  )
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

  const renderImageFromNotifyType = (notify: NotificationResponse) => {
    switch (notify.type) {
      case 'PAYMENT_CART_TRANSACTION':
        return <Avatar icon={<BiMoney size={30} className='w-full' />} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
      case 'ADD_TO_CART':
        return <Avatar src={notify.imgUrl} ></Avatar>;
      case 'NEW_PAYMENT':
        return <Avatar icon={<MdPayment size={30} className='w-full bg-green-500' />}></Avatar>
      case 'EXPIRE_PAYMENT':
        return <Avatar icon={<RiPassExpiredFill size={30} className='w-full' />} ></Avatar>
      case 'PAYMENT_TRANSACTION_IN_SUCCESS':
        return <Avatar icon={<FaPlus size={30} className='w-full bg-rose-500' />}></Avatar>
      default:
        return <Avatar>U</Avatar>
    }

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


  const getProduct = async (productName: any) => {
    const response = await http.get(apiRoutes.products, {
      params: {
        productName: productName,
        page: 0,
        size: 5
      }
    })
    setProducts(response.data.data.data)
    console.log("response.data.data.data" , response.data.data.data)
  }
  const getNotification = async () => {
    try {
      const response = await http.get(`${apiRoutes.notification}/NOT_SEEN`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setTotal(response.data.data?.metadata.total);
      setNotifications(response.data.data?.data);
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  const clearNotify = async () => {
    try {
      setNotifications([]);
      setTotal(0)
      await http.put(`${apiRoutes.notification}`);
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  const getNotificationDetail = async (id: string) => {
    try {
      const response = await http.get(`${apiRoutes.notification}/detail`, {
        params: {
          notificationId: id,
        }
      });
      const responseData = response.data.data as NotificationDetailResponse;
      setModalProps({
        isOpen: true,
        title: responseData.title,
        content: responseData.content,
        createdAt: convertToVietnamTime(responseData.createdAt)
      })
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  const getCart = async () => {
    try {
      const response = await http.get(`${apiRoutes.cart}/all`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setCartItems(response.data.data.data)
    } catch (err) {
      handleErrorResponse(err)
    }
  };

  useEffect(() => {
    if (auth) {
      getCart();
      getNotification();

      const intervalId = setInterval(() => {
        getCart();
        getNotification();
      }, 3000);

      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [auth]);

  useEffect(() => {
    getProduct(searchValue)
  }, [searchValue])

  const renderNotifiMenu = () => {
    return (

      <Popover
        className='m-0 p-0'
        content={
          <Card
            bordered={false}
            bodyStyle={{ margin: 0, padding: 0 }}
            style={isMobile ? { width: '60vw', boxShadow: 'none', border: 'none' } : { width: '20vw', boxShadow: 'none', border: 'none' }}
            actions={[
              <div onClick={() => clearNotify()}>
                Xoá tất cả
              </div>

            ]}>
            <div className='m-0 p-0'>
              {notifications.length === 0 ? (
                <div className='text-center p-3'>Không có thông báo</div>
              ) : (
                notifications.map((notify: NotificationResponse) => (
                  <div className='cursor-pointer pt-3 pb-3 hover:bg-card w-full' onClick={() => getNotificationDetail(notify.id)}>
                    <Row gutter={[16, 16]} key={notify.id}>
                      <Col span={6} className='flex justify-center'>
                        {renderImageFromNotifyType(notify)}
                      </Col>
                      <Col span={18}>
                        <Text key={notify.id} className='m-auto pl-1 line-clamp-2 w-full'>{notify.title}</Text>
                        <Text key={notify.id} className='m-auto pl-1 line-clamp-1 w-full text-blue'>{formatTimeDifference(notify.createdAt)}</Text>
                      </Col>
                    </Row>
                  </div>
                )))}
            </div>
          </Card>
        }
        trigger={["hover", "click"]}
      >
        <Badge count={total}>
          <MdOutlineNotificationsNone className="m-1 text-lg" />
        </Badge>
      </Popover>
    );
  };

  const renderCardMenu = () => {
    return (
      <div className='flex justify-center items-center' onClick={() => navigate(`${webRoutes.cart}`)} >
        <Popover
          content={
            <div className='max-w-xs'>
              {cartItems.length === 0 ? (
                <div className='text-center p-3'>Không có sản phẩm nào trong giỏ hàng</div>
              ) : (
                cartItems.map((cart: CartResponse) => (
                  <div className='flex items-center cursor-pointer  pt-3 pb-3 hover:bg-card w-full'>
                    <Avatar src={cart.product.defaultImageUrl} size={35} />
                    <Text key={cart.cartId} className='m-auto pl-1 line-clamp-1 w-full'>{cart.productName}</Text>
                  </div>
                )))}
            </div>
          }
          trigger={["hover", "click"]}
        >
          <Badge count={cartItems.length}>
            <BiCart className='mr-2 ml-3 text-xl' onClick={() => navigate(`${webRoutes.cart}`)} />
          </Badge>
        </Popover>
      </div>
    );
  };

  const renderFooter = () => {
    return (
      <footer style={{ backgroundColor: "#f6f6f6", padding: "50px 0", color: "black" }}>
        <Row gutter={[0, 32]}>
          <Col xs={24} lg={8}>
            <Col span={24}>
              <Title level={3} className='text-center mb-10'>Điều khoản và chính sách</Title>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Chính sách giao hàng</Text>
            </Col>
            <Col span={24} className='flex justify-center'>
              <Text className='mb-5'>Điều khoản điều kiện</Text>
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
          size: 'large',
          shape: 'square',
          title: auth ? (!isMobile ? auth.username : '') : 'Đăng nhập',

          render: (_, dom) => {
            if (auth) {
              return (
                <div className='hover:bg-inherit'>
                  <div className='flex justify-around items-center'>
                  <AutoComplete
                      options={products.map((product) => ({
                        label: (
                          <Row className="flex  justify-around items-center m-2">
                            <Col span={6}>
                              <LazyAvatar src={product.imageUrl} icon={<LoadingOutlined />}/>
                            </Col>
                            <Col span={18}>
                              <p style={{fontSize : '5'}}>{product.productName}</p>
                            </Col>
                          </Row>
                        ),
                        value: product.productId
                      }))}
                      onSelect={(value) => {
                        navigate(`${webRoutes.products}/${value}`);
                        setSearchValue(''); // Xoá dữ liệu trong ô nhập
                      }}
                      onChange={(value) => setSearchValue(value)}
                      value={searchValue} // Gán giá trị của ô nhập
                      placeholder='Tìm kiếm...'
                      size='small'
                      suffixIcon={<BiSearch />}
                      className='w-96 min-w-fit'
                    />
                    {renderNotifiMenu()}
                    {renderCardMenu()}
                  </div>
                  <Dropdown
                    className='pl-3'
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
                  <div className='flex justify-evenly items-center'>
                  <AutoComplete
                      options={products.map((product) => ({
                        label: (
                          <Row className="flex  justify-around items-center m-2">
                            <Col span={6}>
                              <LazyAvatar src={product.imageUrl} icon={<LoadingOutlined />}/>
                            </Col>
                            <Col span={18}>
                              <p>{product.productName}</p>
                            </Col>
                          </Row>
                        ),
                        value: product.productId
                      }))}
                      onSelect={(value) => {
                        navigate(`${webRoutes.products}/${value}`);
                        setSearchValue(''); // Xoá dữ liệu trong ô nhập
                      }}
                      onChange={(value) => setSearchValue(value)}
                      value={searchValue} // Gán giá trị của ô nhập
                      placeholder='Tìm kiếm...'
                      size='small'
                      suffixIcon={<BiSearch />}
                      className='w-64 min-w-fit'
                    />

                    {renderNotifiMenu()}
                    {renderCardMenu()}
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
        <Modal
          className='m-auto'
          title={modalProps.title}
          centered
          open={modalProps.isOpen}
          okType='primary'
          closable={false}
          footer={[
            <div className='flex justify-center' key="modal-footer">
              <Button
                key="submit"
                type="primary"
                onClick={() => setModalProps({ isOpen: false })}
              >
                Xác nhận
              </Button>
            </div>
          ]}
        >
          <div className="p-4">
            <Text>{modalProps.content}</Text>
            <br />
            <Text className='text-blue'>{modalProps.createdAt?.toString()}</Text>
          </div>
        </Modal>
      </ProLayout>
    </div>
  );
};

export default memo(Layout);
