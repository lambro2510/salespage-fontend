import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Image, Row, Card, List, Carousel, Rate } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import ProductService from '../../../service/ProductService';
import './style.scss';
import { point } from 'leaflet';

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

  useEffect(() => {
    getProductDetail(productId);
  }, [productId]);

  const getProductDetail = async (productId) => {
    try {
      const productDetailData = await ProductService.getProductDetail(productId);
      setProductDetail(productDetailData);
    } catch (error) {
      // Handle error (e.g., show error message)
    }
  };

  const handleRating = async (point) => {
    const point = await ProductService.ratingProduct(productId, point);
    
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
            <Card title={productDetail?.productName}>
              <p>Giá bán: {productDetail?.productPrice} VND</p>
              <p>Mô tả: {productDetail?.description}</p>
              <p>Người bán: {productDetail?.sellerUsername}</p>
              <p>Cửa hàng bán: {productDetail?.storeName}</p>
              <p>Địa chỉ bán hàng: {productDetail?.sellingAddress}</p>
              <p>Đánh giá trung bình: <Rate value={productDetail?.productRate?.avgPoint} /></p>
              <p>Tổng điểm đánh giá: {productDetail?.productRate?.totalPoint}</p>
              <p>Tổng số đánh giá: {productDetail?.productRate?.totalRate}</p>
              {/* Add any other product details you want to display */}
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;
