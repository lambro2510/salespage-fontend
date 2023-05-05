import React from 'react';
import { Input, Button, Badge } from 'antd';
import { HomeOutlined, BellOutlined, LoginOutlined, UserAddOutlined, SearchOutlined } from '@ant-design/icons';
import './style.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header-icon">
        <HomeOutlined />
      </div>
      <div className="header-search">
        <Input.Search
          placeholder="Tìm kiếm sản phẩm"
          enterButton={<Button icon={<SearchOutlined />} />}
        />
      </div>
      <div className="header-notification">
        <Badge count={5}>
          <BellOutlined />
        </Badge>
      </div>
      <div className="header-login">
        <Button icon={<LoginOutlined />}>Đăng nhập</Button>
      </div>
      <div className="header-register">
        <Button type="primary" icon={<UserAddOutlined />}>Đăng ký</Button>
      </div>
    </div>
  );
};

export default Header;
