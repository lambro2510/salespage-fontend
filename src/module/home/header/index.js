import * as React from 'react';
import { Input, Button, Badge, Modal, Select, InputNumber, Menu, List } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import './style.scss';
import { REGISTER } from '../../login/constant';
import ProductService from '../../../service/ProductService';

const { Option } = Select;

const Header = ({ username }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [showSearchResults, setShowSearchResults] = React.useState(false);
  const [productFilter, setProductFilter] = React.useState({
    productType: '',
    productName: '',
    minPrice: '',
    maxPrice: '',
    storeName: '',
    ownerStoreUsername: '',
    page: 0,
    size: 10,
    sort: '',
  });
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = async () => {
    const response = await ProductService.findProduct(productFilter);
    console.log(response.data);
    setSearchResults(response.data);
    setShowSearchResults(true);
  }

  const handleModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="header">
      <div className="header-icon">
        <HomeOutlined />
      </div>
      <div className="header-search">
        <Input.Search
          placeholder="Tên sản phẩm"
          enterButton={<Button icon={<SearchOutlined onClick={handleSearch} />} />}
          prefix={<div className="header-advanced-search">
            <Button onClick={handleModalVisible}>Tìm kiếm chi tiết</Button>
          </div>}
        />
        <div className='search-result' style={{ display: showSearchResults ? 'block' : 'none' }}>
          <List
            className='list-search-product'
            bordered
            dataSource={searchResults}
            renderItem={(item) => (
              <List.Item>
                <div>{item.productName}</div>
                <div>{item.storeName}</div>
                <div>{item.price}</div>
              </List.Item>
            )}
          />
        </div>
      </div>
      <div className="header-notification">
        <Badge count={5}>
          <BellOutlined />
        </Badge>
      </div>
      {username ?
        <div className="header-userinfo" onClick={() => navigate('/profile')}>
          <UserOutlined />
          <span className="header-username">Xin chào, {username}</span>
        </div>
        :
        <>
          <div className="header-login">
            <Button icon={<UserOutlined />} onClick={() => navigate('login')}>Đăng nhập</Button>
          </div>
          <div className="header-register">
            <Button icon={<UserOutlined />} onClick={() => navigate('login', { setForm: REGISTER })}>Đăng ký</Button>
          </div>
        </>
      }
      <SearchModal isModalVisible={isModalVisible} handleModalVisible={handleModalVisible} />
    </div>
  );
};

export default Header;
