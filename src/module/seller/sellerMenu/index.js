import * as React from 'react';
import { Menu, Row, Col, Space, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PieChartOutlined, DollarOutlined, ShoppingCartOutlined, ShopOutlined, UserOutlined, LockOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

function SellerMenu() {
  const navigate = useNavigate();
  const profileData = useSelector((state) => state.auth);
  const [showText, setShowText] = React.useState(false);

  React.useEffect(() => {
    if (profileData.role !== 'SELLER') {
      navigate('/403Error')
    }
  })

  const toggleShowText = () => {
    setShowText(!showText);
  };

  return (
    <Space>
      <Menu mode="vertical">
        <SubMenu key="sub1" title={showText ? 'Thống kê' : ''} icon={<PieChartOutlined />}>
          <Menu.Item key="1" icon={<PieChartOutlined />} onClick={() => navigate('/seller')}>Tổng quan</Menu.Item>
          <Menu.Item key="2" icon={<DollarOutlined />} onClick={() => navigate('/seller')}>Doanh thu</Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />} onClick={() => navigate('/seller/products')}>Sản phẩm bán chạy</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={showText ? 'Cửa hàng' : ''} icon={<ShopOutlined />}>
          <Menu.Item key="4" icon={<ShopOutlined />} onClick={() => navigate('/seller/store')}>Danh sách cửa hàng</Menu.Item>
          <Menu.Item key="5" icon={<ShopOutlined />} onClick={() => navigate('/seller')}>Thêm cửa hàng mới</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={showText ? 'Thông tin tài khoản' : ''} icon={<UserOutlined />}>
          <Menu.Item key="7" icon={<UserOutlined />} onClick={() => navigate('/seller')}>Cập nhật thông tin</Menu.Item>
          <Menu.Item key="8" icon={<LockOutlined />} onClick={() => navigate('/seller')}>Đổi mật khẩu</Menu.Item>
        </SubMenu>
        <Menu.Item onClick={toggleShowText} >{showText ? 'Thu nhỏ' : <MenuUnfoldOutlined />}</Menu.Item>
      </Menu>
    </Space>
  );
}

export default SellerMenu;
