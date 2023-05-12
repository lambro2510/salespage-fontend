import * as React from 'react';
import { Input, Button, Badge, List, Row, Col } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import ProductService from '../../../service/ProductService';
import SearchInput from '../../../component/SearchInput';
import './style.scss';
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

  const getProductData = async (productId) => {
    const response = await ProductService.getProductDetail(productId);
    navigate(`/products/${productId}`,{ state: { product: response } });
  };


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
    <Row justify="space-between" align="middle" className="header">
      <Col className="header-icon">
          <HomeOutlined />
      </Col>
      <Col flex={1} className="header-search">
          <SearchInput
            onChange={handleSearchName}
            searchResults={getListProduct(searchResults)}
            placeholder={"Nhập tên sản phẩm"}
            onClick={getProductData}
          />
      </Col>
      <Button onClick={() => navigate('/seller')}/>
      <Col className="header-notification">
          <Badge count={5}>
            <BellOutlined />
          </Badge>
      </Col>
      <Col>
        {username ?
          <div className="header-userinfo" onClick={() => navigate('/profile')}>
            <UserOutlined />
            <span className="header-username">{username}</span>
          </div>
          :
          <div className="header-login">
            <Button icon={<UserOutlined />} onClick={() => navigate('login')}>Đăng nhập</Button>
          </div>
        }
      </Col>
      <Col>
        <SearchModal isModalVisible={isModalVisible} handleModalVisible={handleModalVisible} />
      </Col>
    </Row>
  );
};


export default Header;
