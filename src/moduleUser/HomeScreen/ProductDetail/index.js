import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Image, Row, Card, List, Carousel, Rate, Spin } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductService from '../../../service/ProductService';
import './style.scss';
import ProductCard from './ProductCard';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: <LeftOutlined />,
  nextArrow: <RightOutlined />,
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductDetail(productId);
  }, [productId]);

  const getProductDetail = async (productId) => {
    try {
      setLoading(true); // Start loading
      const productDetailData = await ProductService.getProductDetail(productId);
      setProductDetail(productDetailData);
      setLoading(false); // Stop loading
    } catch (error) {
      setLoading(false); // Stop loading in case of an error
      // Handle error (e.g., show error message)
    }
  };

  const handleUpdatePoint = (rate) => {
    setProductDetail({ ...productDetail, productRate: rate?.rate, rate: rate?.yourRate });
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Row justify="center">
      <Col>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={12} lg={10}>
            <Row justify="center">
              <img className="main-image" src={productDetail?.imageUrl} alt={productDetail?.productName} />
            </Row>
            <Carousel {...settings}>
              {productDetail?.imageUrls?.map((image) => (
                <img className="sub-image" src={image?.url} key={image?.uid} alt={productDetail?.productName} />
              ))}
            </Carousel>
          </Col>
          <Col xs={24} sm={12} md={12} lg={14}>
            <ProductCard productDetail={productDetail} handleUpdatePoint={handleUpdatePoint} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
