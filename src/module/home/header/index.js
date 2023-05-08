import * as React from 'react';
import { Input, Button, Badge, List } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import './style.scss';
import { REGISTER } from '../../login/constant';
import ProductService from '../../../service/ProductService';
import SearchInput from '../../../component/SearchInput';

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
    setSearchResults(response.data);
    setShowSearchResults(true);
  }

  const handleSearchName = (value) => {
    setProductFilter({...productFilter, productName: value});
    handleSearch();
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
        <SearchInput onChange={handleSearchName} searchResults={searchResults} placeholder={"Nhập tên sản phẩm"} />
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
