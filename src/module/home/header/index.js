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

  const handleSearch = async (params) => {
    const response = await ProductService.findProduct(params);
    setSearchResults(response.data);
    setShowSearchResults(true);
  }

  const handleSearchName = (value) => {
    const params = {...productFilter, productName: value};
    setProductFilter(params);
    handleSearch(params);
  }

  const getListProduct = (products) => {
    return products = products.map(product => {
      return {
        id: product.productId,
        name: product.productName
      }
    })
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
        <SearchInput onChange={handleSearchName} searchResults={getListProduct(searchResults)} placeholder={"Nhập tên sản phẩm"} />
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
        </>
      }
      <SearchModal isModalVisible={isModalVisible} handleModalVisible={handleModalVisible} />
    </div>
  );
};

export default Header;
