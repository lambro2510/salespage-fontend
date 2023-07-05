import * as React from 'react';
import { Input, Button, Badge, List, Row, Col } from 'antd';
import { HomeOutlined, BellOutlined, UserOutlined, FileSearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchModal from './SearchModal';
import ProductService from '../../../../service/ProductService';
import SearchInput from '../../../../component/SearchInput';
import { setProfile } from '../../../../redux/profileSlide';
import './style.scss';
const Header = ({ profile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const getProductData = (productId) => {
    navigate(`/products/${productId}`,{ state: { productId: productId } });
  };

  const navigateProfile = () => {
    dispatch(setProfile(profile));
    navigate('/profile');
  };


  const getListProduct = (products) => {
    if (products) {
      return products.map(product => {
        return {
          id: product.productId,
          name: product.productName
        }
      })
    }
    return [];
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
        {profile?.username ?
          <div className="header-userinfo" onClick={() => navigateProfile()}>
            <UserOutlined />
            <span className="header-username">{profile?.username}</span>
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
